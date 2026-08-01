# TaskFlow AI - Intelligent Project & Task Management

TaskFlow AI is a modern, high-performance Kanban project management application built with **React 19 (Vite)**, **Glassmorphic Custom CSS**, and **Laravel REST API**. Designed & Developed by **Hitesh Bajpai** (Project Manager / Systems Lead).

---

## 🚀 Submission & Live Verification Links

- 🌐 **Live Web Application**: [https://forge2-qualifier-hiteshbajpai1.vercel.app/](https://forge2-qualifier-hiteshbajpai1.vercel.app/)
- 💻 **Public GitHub Repository**: [https://github.com/HiteshBajpai/forge2-qualifier-hiteshbajpai1](https://github.com/HiteshBajpai/forge2-qualifier-hiteshbajpai1)
- 📦 **Evidence Directory**: [`/evidence/`](https://github.com/HiteshBajpai/forge2-qualifier-hiteshbajpai1/tree/main/evidence)
- 🎥 **Walkthrough Video Recording**: [`evidence/walkthrough_evidence.mp4`](https://github.com/HiteshBajpai/forge2-qualifier-hiteshbajpai1/raw/main/evidence/walkthrough_evidence.mp4)
- 📜 **Agent Work Log**: [`agent-log.md`](https://github.com/HiteshBajpai/forge2-qualifier-hiteshbajpai1/blob/main/agent-log.md)
- 💬 **Slack Integration Export**: [`slack-export/slack_test_output.md`](https://github.com/HiteshBajpai/forge2-qualifier-hiteshbajpai1/blob/main/slack-export/slack_test_output.md)
- 🎯 **Custom Skill**: [`skills/status-report/SKILL.md`](https://github.com/HiteshBajpai/forge2-qualifier-hiteshbajpai1/blob/main/skills/status-report/SKILL.md)

---

## 🤖 Multi-Agent Architecture & Free Models Used

TaskFlow AI was architected and built using a 3-way interconnected multi-agent engine:
1. **Hermes (The Brain / Orchestrator)**: High-level goal planning, subtask decomposition, and progress reporting in Slack `#sprint-main`.
2. **OpenClaw (The Hands / Executor)**: Code generation, Laravel migrations, API route wiring, and React Vite builds.
3. **Slack Socket Gateway**: Interconnected channel bus routing real-time events across `#sprint-main`, `#agent-coder`, and `#agent-log`.

### Free Models & Model Routing Rationale:
- **Groq `gpt-oss-120b` / Google `gemini-2.5-flash`**: Primary reasoning models for Hermes (The Brain) for subtask decomposition and zero hallucination planning.
- **Ollama `qwen2.5-coder` / Groq `llama-3.3-70b-versatile`**: Primary execution models for OpenClaw (The Hands) for rapid code synthesis, syntax verification, and local offline fallback execution.

---

## ⚡ Key Features & What Works

- ✅ **Smart Kanban Swimlanes**: Drag & drop tasks across `Backlog`, `In Progress`, `Review & QA`, and `Completed`.
- ✅ **Dynamic Board & List Management**: Create, edit, switch, and delete boards and custom lists.
- ✅ **Task Cards & Overdue Alerts**: Add tags, set assignees (Hitesh Bajpai), due dates, and visual priority badges.
- ✅ **1-Click Smart Workspace Seeder**: Instant demo board initialization.
- ✅ **Interconnected Agent Engine**: Real-time multi-agent communication via Slack Socket Mode.

### What Was Cut / Future Enhancements:
- Local SQLite API operates on local development environment; production Vercel frontend includes standalone mock/client-side fallback mode for cloud evaluation without backend dependencies.

---

## 💻 Running Locally

```bash
# 1. Install & Build Frontend
cd frontend
npm install
npm run dev

# 2. Run Backend API (Optional)
cd ../backend
php artisan migrate
php artisan serve

# 3. Test Multi-Agent Connector (Optional)
cd ..
node scripts/agent-connector.js
```

---

## 👤 Submitter Info & Credits

- **Full Name**: Hitesh Bajpai
- **Email**: `hiteshbajpai30@gmail.com`
- **WhatsApp / Phone**: 8840797587
- **Institution**: PSIT COLLEGE OF ENGINEERING
- **Role**: Project Manager & Lead Developer
- **License**: MIT

