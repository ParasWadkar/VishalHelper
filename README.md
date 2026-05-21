# LexiAI – AI Writing Assistant

Hey Vishal! This is an AI-powered writing assistant that fixes grammar, rewrites text professionally, adjusts tone, and more — all powered by Claude AI. Here's everything you need to get it running on your machine.

---

## What You'll Need Before Starting

Make sure you have these installed:

| Tool | Version | Download |
|------|---------|----------|
| Python | 3.10 or higher | https://python.org/downloads |
| Node.js | 18 or higher | https://nodejs.org |
| Git | Any recent version | https://git-scm.com |

You'll also need a **free Anthropic API key** — grab one at https://console.anthropic.com (sign up, go to API Keys, create one).

---

## Step 1 — Download the Repo

Open a terminal and run:

```bash
git clone https://github.com/ParasWadkar/VishalHelper.git
cd VishalHelper
```

---

## Step 2 — Set Up the Backend

The backend is a Python FastAPI server that connects to the Claude AI API.

```bash
cd backend
pip install -r requirements.txt
```

Now create your environment file with your API key:

```bash
# On Mac/Linux:
cp .env.example .env

# On Windows:
copy .env.example .env
```

Open the `.env` file in any text editor and replace `your_api_key_here` with your actual Anthropic API key:

```
ANTHROPIC_API_KEY=sk-ant-xxxxxxxxxxxxxxxx
```

Start the backend server:

```bash
# Mac/Linux:
ANTHROPIC_API_KEY=sk-ant-xxxxxxxxxxxxxxxx uvicorn main:app --reload

# Windows (Command Prompt):
set ANTHROPIC_API_KEY=sk-ant-xxxxxxxxxxxxxxxx && uvicorn main:app --reload

# Windows (PowerShell):
$env:ANTHROPIC_API_KEY="sk-ant-xxxxxxxxxxxxxxxx"; uvicorn main:app --reload
```

You should see: `Uvicorn running on http://127.0.0.1:8000`

---

## Step 3 — Set Up the Frontend

Open a **new terminal** (keep the backend running in the first one), then:

```bash
cd VishalHelper/frontend
npm install
npm run dev
```

You should see: `Local: http://localhost:5173`

---

## Step 4 — Open the App

Open your browser and go to:

```
http://localhost:5173
```

That's it — LexiAI is running!

---

## How to Use It

1. **Paste or type** any text into the left panel
2. **Choose an AI mode** from the buttons above the editor:
   - **Grammar Fix** — corrects grammar and spelling
   - **Improve** — boosts clarity and readability
   - **Professional** — rewrites in formal business tone
   - **Casual** — makes it friendly and conversational
   - **Tone Enhance** — detects and improves the tone
   - **Full Rewrite** — complete AI rewrite
3. Click **Analyze with AI**
4. See the corrected text on the right, with a list of every change made
5. Use **Copy** or **Download** to save the result

---

## Project Structure

```
VishalHelper/
├── backend/
│   ├── main.py              # FastAPI server + Claude AI logic
│   ├── requirements.txt     # Python dependencies
│   └── .env.example         # API key template
└── frontend/
    ├── src/
    │   ├── App.jsx
    │   └── components/
    │       ├── Navbar.jsx
    │       ├── Hero.jsx
    │       ├── Editor.jsx   # Main split-screen editor
    │       ├── Features.jsx
    │       ├── Analytics.jsx
    │       └── Particles.jsx
    ├── package.json
    └── vite.config.js
```

---

## Troubleshooting

**"Cannot connect to backend" / API calls failing**
- Make sure the backend terminal is still running on port 8000
- Check that your `ANTHROPIC_API_KEY` is set correctly (no extra spaces)

**`npm install` fails**
- Make sure Node.js 18+ is installed: `node --version`

**`pip install` fails**
- Make sure Python 3.10+ is installed: `python --version` or `python3 --version`
- Try `pip3 install -r requirements.txt` instead

**Port already in use**
- Backend on a different port: `uvicorn main:app --reload --port 8001`
- Frontend proxy won't auto-update — just use a fresh port for both

---

Built by Paras • Powered by Claude AI
