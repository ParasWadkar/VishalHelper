import os
import json
import re
from fastapi import FastAPI, HTTPException
from fastapi.middleware.cors import CORSMiddleware
from fastapi.responses import StreamingResponse
from pydantic import BaseModel
import google.generativeai as genai

genai.configure(api_key=os.environ.get("GEMINI_API_KEY"))

app = FastAPI(title="LexiAI Backend")

app.add_middleware(
    CORSMiddleware,
    allow_origins=["*"],
    allow_methods=["*"],
    allow_headers=["*"],
)

MODES = {
    "grammar": "Fix all grammar and spelling errors. Return a JSON object with keys: corrected_text, changes (list of {original, corrected, type}), score (0-100).",
    "improve": "Improve clarity, flow, and readability while preserving the original meaning. Return a JSON object with keys: corrected_text, changes (list of {original, corrected, type}), score (0-100).",
    "professional": "Rewrite this text in a professional, formal business tone. Return a JSON object with keys: corrected_text, changes (list of {original, corrected, type}), score (0-100).",
    "casual": "Rewrite this text in a friendly, casual conversational tone. Return a JSON object with keys: corrected_text, changes (list of {original, corrected, type}), score (0-100).",
    "tone": "Analyze and enhance the tone to be more engaging and impactful. Return a JSON object with keys: corrected_text, changes (list of {original, corrected, type}), score (0-100), tone_detected (string).",
    "rewrite": "Completely rewrite this text to be significantly better — clearer, more concise, and more compelling. Return a JSON object with keys: corrected_text, changes (list of {original, corrected, type}), score (0-100).",
}

SYSTEM_PROMPT = """You are LexiAI, an expert writing assistant. You process text and return ONLY valid JSON with no markdown fences, no explanation, just raw JSON.

Rules:
- corrected_text: the improved version of the text
- changes: array of objects, each with: original (original phrase), corrected (new phrase), type (grammar/spelling/clarity/tone/structure)
- score: integer 0-100 representing how much improvement was made (higher = more was fixed)
- For tone mode, also include tone_detected: a string like "professional", "casual", "formal", "aggressive", etc.
- Return ONLY JSON, no other text."""

model = genai.GenerativeModel(
    model_name="gemini-1.5-flash",
    system_instruction=SYSTEM_PROMPT,
)


class ProcessRequest(BaseModel):
    text: str
    mode: str = "grammar"


class ProcessResponse(BaseModel):
    corrected_text: str
    changes: list
    score: int
    tone_detected: str | None = None
    original_text: str
    mode: str


@app.get("/")
def root():
    return {"status": "LexiAI API running", "version": "1.0.0"}


@app.get("/health")
def health():
    return {"status": "ok"}


@app.post("/api/process", response_model=ProcessResponse)
async def process_text(req: ProcessRequest):
    if not req.text.strip():
        raise HTTPException(status_code=400, detail="Text cannot be empty")

    mode = req.mode if req.mode in MODES else "grammar"
    instruction = MODES[mode]

    try:
        response = model.generate_content(
            f"Mode: {mode}\nInstruction: {instruction}\n\nText to process:\n{req.text}"
        )

        raw = response.text.strip()
        if raw.startswith("```"):
            raw = re.sub(r"^```[a-z]*\n?", "", raw)
            raw = re.sub(r"\n?```$", "", raw)

        data = json.loads(raw)

        return ProcessResponse(
            corrected_text=data.get("corrected_text", req.text),
            changes=data.get("changes", []),
            score=data.get("score", 0),
            tone_detected=data.get("tone_detected"),
            original_text=req.text,
            mode=mode,
        )

    except json.JSONDecodeError:
        return ProcessResponse(
            corrected_text=raw if "raw" in dir() else req.text,
            changes=[],
            score=0,
            original_text=req.text,
            mode=mode,
        )
    except Exception as e:
        raise HTTPException(status_code=502, detail=f"AI API error: {str(e)}")


@app.post("/api/process/stream")
async def process_text_stream(req: ProcessRequest):
    if not req.text.strip():
        raise HTTPException(status_code=400, detail="Text cannot be empty")

    mode = req.mode if req.mode in MODES else "grammar"
    instruction = MODES[mode]

    def generate():
        response = model.generate_content(
            f"Mode: {mode}\nInstruction: {instruction}\n\nText to process:\n{req.text}",
            stream=True,
        )
        for chunk in response:
            if chunk.text:
                yield f"data: {json.dumps({'chunk': chunk.text})}\n\n"
        yield "data: [DONE]\n\n"

    return StreamingResponse(generate(), media_type="text/event-stream")


if __name__ == "__main__":
    import uvicorn
    uvicorn.run(app, host="0.0.0.0", port=8000, reload=True)
