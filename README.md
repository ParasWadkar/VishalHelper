# LexiAI – AI Writing Assistant 🧠

Hey Vishal! So Paras made this AI writing assistant that's basically smarter than both of us combined (which honestly isn't saying much). It fixes your grammar, rewrites stuff professionally, detects your passive-aggressive tone, and more — all powered by actual Claude AI. Here's everything you need to get it running, written in a way that assumes you've never touched a terminal in your life (which is probably true).

---

## What You'll Need Before Starting

Before you even THINK about cloning this repo, make sure you have these installed. Don't skip this section like you skip the terms and conditions (you'll regret it).

| Tool | Version | Download | Why |
|------|---------|----------|-----|
| Python | 3.10+ | https://python.org/downloads | The backend is literally just Python pretending to be smart |
| Node.js | 18+ | https://nodejs.org | JavaScript but make it slightly less painful |
| Git | Any | https://git-scm.com | For downloading the repo without unzipping a .zip like an animal |

You'll also need a **free Anthropic API key** — the magic ingredient that makes this whole thing not just a fancy text box (it really is just a fancy text box without it). Get one at https://console.anthropic.com. Sign up, go to API Keys, click Create. It's free to start and you'll use approximately 4 credits testing this app.

---

## Step 1 — Download the Repo

Open a terminal. Yes, the black/dark window thing. Don't be scared. (It won't bite. Probably.)

```bash
git clone https://github.com/ParasWadkar/VishalHelper.git
cd VishalHelper
```

Congratulations, you now have the code on your computer. Tell your parents. (Seriously though, that's all cloning is — just downloading files in a way that sounds impressive.)

---

## Step 2 — Set Up the Backend

The backend is a Python server that acts as the middleman between you and the AI, because apparently they can't talk directly (the AI is shy). (The real reason is security — you don't want your API key exposed in the browser.)

```bash
cd backend
pip install -r requirements.txt
```

This downloads about 47 packages you'll never look at. (It's actually just 5 packages. The 47 are their dependencies. Modern software development.)

Now create your secret `.env` file. Don't share this file with anyone, not even your mum. (Seriously, the API key in here costs money if someone spams it.)

```bash
# On Mac/Linux:
cp .env.example .env

# On Windows:
copy .env.example .env
```

Open `.env` in any text editor (Notepad is fine, we don't judge here) (we absolutely judge) and replace `your_api_key_here` with your real key:

```
ANTHROPIC_API_KEY=sk-ant-xxxxxxxxxxxxxxxx
```

Now, the moment of truth. Start the backend:

```bash
# Mac/Linux:
ANTHROPIC_API_KEY=sk-ant-xxxxxxxxxxxxxxxx uvicorn main:app --reload

# Windows (Command Prompt):
set ANTHROPIC_API_KEY=sk-ant-xxxxxxxxxxxxxxxx && uvicorn main:app --reload

# Windows (PowerShell):
$env:ANTHROPIC_API_KEY="sk-ant-xxxxxxxxxxxxxxxx"; uvicorn main:app --reload
```

You should see: `Uvicorn running on http://127.0.0.1:8000` — this means it worked and you are now a backend developer. Put it on your CV. (Please don't.)

---

## Step 3 — Set Up the Frontend

Open a **new terminal window** (keep the backend one open, it needs to stay running, it has separation anxiety). (It really does — if you close it, the AI stops working.)

```bash
cd VishalHelper/frontend
npm install
npm run dev
```

`npm install` will take 15–30 seconds and download the entire internet. (Not quite — just 137 packages. Still a lot for a writing app.)

You should see: `Local: http://localhost:5173` — your app is alive!

---

## Step 4 — Open the App

Go to your browser (Chrome, Firefox, Edge, even Safari if you're a brave soul) and type:

```
http://localhost:5173
```

Boom. LexiAI. You're welcome. Paras is welcome. Claude AI is welcome. (It took a non-trivial amount of effort to build this, so do appreciate it for at least 30 seconds.)

---

## How to Use It

1. **Paste or type** your grammatically questionable text into the left box (yes, the one on the LEFT — there are only two boxes, you'll figure it out)
2. **Choose an AI mode** — pick your poison:
   - **Grammar Fix** — for when you write like you text (it corrects grammar and spelling errors, genuinely useful)
   - **Improve** — for when your writing is technically correct but spiritually broken (boosts clarity and flow)
   - **Professional** — turns "yo can u send that" into a business email (formal rewrite, actually impressive)
   - **Casual** — turns your corporate robot voice back into a human (makes text friendly and conversational)
   - **Tone Enhance** — tells you that you sound passive-aggressive (which you probably knew) (it detects and adjusts emotional tone)
   - **Full Rewrite** — nuclear option, AI rewrites everything (complete rewrite preserving only your original meaning)
3. Click **Analyze with AI** and wait a heroic 1–3 seconds
4. Read the corrected text on the right and feel personally attacked (the changes list shows exactly what was wrong)
5. **Copy** or **Download** the result and pretend you wrote it like that the first time

---

## Project Structure

For the curious (or those who broke something and need to find where):

```
VishalHelper/
├── backend/
│   ├── main.py              # Where the AI magic actually happens (FastAPI + Claude SDK)
│   ├── requirements.txt     # List of things Python needs to function (dependencies)
│   └── .env.example         # Template for your secret API key (don't commit the real .env)
└── frontend/
    ├── src/
    │   ├── App.jsx           # The glue holding everything together (root component)
    │   └── components/
    │       ├── Navbar.jsx    # The bar at the top (navigation bar)
    │       ├── Hero.jsx      # The big flashy welcome section (landing hero with typing animation)
    │       ├── Editor.jsx    # The actual useful part (split-screen AI editor)
    │       ├── Features.jsx  # Cards listing what the app does (feature showcase)
    │       ├── Analytics.jsx # Fake numbers that look impressive (UI demo stats, not real data)
    │       └── Particles.jsx # The floating green dots (animated canvas background)
    ├── package.json          # Node's version of requirements.txt (JS dependencies)
    └── vite.config.js        # Build tool config (makes the frontend run fast)
```

---

## Troubleshooting

Because something will go wrong. It always does. (This is not a criticism of you personally. Software is just like that.)

**"Cannot connect to backend" / nothing works**
- Is the backend terminal still running? Did you close it? Why did you close it? (Keep the uvicorn process alive in its own terminal window)
- Is your API key correct? No spaces, no quotes around it in the env file. (Copy-paste it directly from the Anthropic console)

**`npm install` fails and you want to cry**
- Check Node version: `node --version` — needs to be 18 or higher (Node 16 and below are too old)
- Try deleting `node_modules` folder and running `npm install` again (classic IT support move, it works 40% of the time)

**`pip install` fails**
- Try `python3` instead of `python` — Mac/Linux thing (Python 2 and Python 3 coexist on some systems)
- Make sure you're in the `backend/` folder when you run it (easy to forget, don't feel bad)

**Port already in use (you're a power user apparently)**
- Backend: `uvicorn main:app --reload --port 8001` (change the port number)
- Frontend: update the proxy in `vite.config.js` to match the new port (find `target: 'http://localhost:8000'` and change 8000)

---

Built by Paras (with Claude AI doing 90% of the work, but Paras had the vision) (this is accurate)
