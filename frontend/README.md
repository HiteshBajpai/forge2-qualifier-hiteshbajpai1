# TaskFlow AI - Intelligent Project & Task Management

TaskFlow AI is a modern, high-performance Kanban project management application built with **React 19 (Vite)**, **Glassmorphic Custom CSS**, and **Laravel REST API**. Designed & Developed by **Hitesh Bajpai** (Project Manager / Systems Lead).

---

## 📌 Important Information for Evaluators & Reviewers

- 🌐 **Live Web Application (Vercel)**: [https://forge2-qualifier-hiteshbajpai1.vercel.app/](https://forge2-qualifier-hiteshbajpai1.vercel.app/)
- 🎥 **Official Walkthrough Video Stream**: [Click to Play / Download MP4 Video](https://media.githubusercontent.com/media/HiteshBajpai/forge2-qualifier-hiteshbajpai1/main/walkthrough%20evidence/walkthrough%20evidence%20.mp4)
- 📥 **Alternative Direct Download Link**: [Download Walkthrough MP4](https://github.com/HiteshBajpai/forge2-qualifier-hiteshbajpai1/raw/main/walkthrough%20evidence/walkthrough%20evidence%20.mp4)
- 🤖 **3-Way Multi-Agent Engine**: Interconnected **Hermes (Brain)**, **OpenClaw (Hands)**, and **Slack Socket Gateway** (`#sprint-main`, `#agent-coder`, `#agent-log`).

---

## 🚀 Key Application Features

1. **3-Way Interconnected Multi-Agent Engine**:
   - **Hermes (The Brain)**: Planning & goal decomposition engine (`gemini-2.5-flash` / `gpt-oss-120b`).
   - **OpenClaw (The Hands)**: Autonomous execution engine (`groq/llama-3.3-70b` / `qwen2.5-coder`).
   - **Slack Socket Gateway**: Interconnected channel bus routing prompts and updates across `#sprint-main`, `#agent-coder`, and `#agent-log`.

2. **Smart Kanban Workspaces**:
   - Interactive HTML5 Drag & Drop across swimlanes (`Backlog`, `In Progress`, `Review & QA`, `Completed`).
   - Dynamic board creation, list management, and task cards with due-date alerts.
   - User profile dropdown for **Hitesh Bajpai (Project Manager)**.
   - 1-click **Smart Demo Workspace Seeder**.

---

## 🛠 Tech Stack & Architecture

- **Frontend**: React 19 (Vite), Glassmorphic Dark obsidian styling, Framer Motion animations, Lucide React icons.
- **Backend**: Laravel 11 (PHP 8.3), SQLite Database, RESTful endpoints.
- **Interconnection Bridge**: `scripts/agent-connector.js` (Node.js 3-way handshake validator).

---

## 💻 Running Locally

```bash
# 1. Install & Run Frontend
cd frontend
npm install
npm run dev

# 2. Test 3-Way Multi-Agent Interconnection
cd ..
node scripts/agent-connector.js
```

---

## 👤 Credits & Author

- **Project Manager & Systems Architect**: Hitesh Bajpai (`hiteshbajpai30@gmail.com`)
- **Application Name**: TaskFlow AI
- **License**: MIT

