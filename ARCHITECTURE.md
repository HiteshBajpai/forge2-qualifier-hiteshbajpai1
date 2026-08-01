# System Architecture - TaskFlow AI Multi-Agent Engine

This document describes the 3-way interconnected multi-agent ecosystem (**Hermes [Brain] + OpenClaw [Hands] + Slack Socket Gateway**) engineered to develop, manage, and automate **TaskFlow AI**.

```mermaid
flowchart TD
    subgraph HumanLayer ["👤 User Layer"]
        Human["<b>Hitesh Bajpai</b><br/>(Project Manager / Lead)"]
    end

    subgraph SlackBus ["💬 Slack Socket Gateway (Event Bus)"]
        direction LR
        C1["<b>#sprint-main</b><br/>Human ↔ Hermes"]
        C2["<b>#agent-coder</b><br/>Hermes ↔ OpenClaw"]
        C3["<b>#agent-log</b><br/>System Audit Stream"]
    end

    subgraph AgentCore ["🤖 Interconnected Multi-Agent Core"]
        Hermes["🧠 <b>Hermes (The Brain)</b><br/>Model: Gemini 2.5 / Groq gpt-oss-120b<br/><i>Goal Decomposition & Task Dispatch</i>"]
        OpenClaw["🛠️ <b>OpenClaw (The Hands)</b><br/>Model: Qwen 2.5 / Groq Llama 3.3<br/><i>Code Synthesis & Local Execution</i>"]
    end

    subgraph AppLayer ["⚡ Application Environment"]
        App["<b>TaskFlow AI Application</b><br/>React 19 (Vite) + Laravel 11 (SQLite REST API)"]
    end

    Human -->|"1. Send Sprint Goal"| C1
    C1 -->|"2. Trigger Goal Planner"| Hermes
    Hermes -->|"3. Dispatch Subtasks"| C2
    C2 -->|"4. Receive Work Orders"| OpenClaw
    OpenClaw -->|"5. Execute Code & Migrations"| App
    OpenClaw -->|"6. Stream Execution Logs"| C3
    OpenClaw -->|"7. Report Completion"| C2
    Hermes -->|"8. Post Progress Summary"| C1
```

## 3-Way Agent Breakdown & Interconnection Scheme

### 1. Hermes (The Brain & Orchestrator)
*   **Role**: Orchestrator, Goal Planner, and Session Memory Keeper.
*   **Functionality**:
    *   Subscribes to `#sprint-main` Slack channel.
    *   Decomposes human prompts into structured subtasks with precise technical contracts.
    *   Dispatches tasks directly to OpenClaw via `#agent-coder`.
    *   Synthesizes execution updates and posts human-friendly progress reports back to `#sprint-main`.

### 2. OpenClaw (The Hands & Code Executor)
*   **Role**: Autonomous Code Executor and Environment Operator.
*   **Functionality**:
    *   Subscribes to `#agent-coder` for work orders from Hermes.
    *   Executes filesystem mutations, database migrations (`php artisan migrate`), frontend compilation (`npm run build`), and API route wiring.
    *   Streams structured execution traces and test outputs directly to `#agent-log` and reports status back to Hermes in `#agent-coder`.

### 3. Slack Gateway (Socket Mode Communications Hub)
*   **Role**: Real-Time Bidirectional Event Bus & Audit Trail.
*   **Channel Breakdown**:
    *   **`#sprint-main`**: Human $\leftrightarrow$ Hermes (High-level goal approvals and sprint status summaries).
    *   **`#agent-coder`**: Hermes $\leftrightarrow$ OpenClaw (Task delegation, JSON payloads, execution confirmation).
    *   **`#agent-log`**: System Event Stream (Raw command outputs, error tracebacks, cron jobs).

---

## Model Routing & Fallback Philosophy

We enforce the **"Strong Brain, Fast Hands"** routing model across our connected agents:

| Agent | Role / Task Type | Primary Model | Provider | Rationale |
|---|---|---|---|---|
| **Hermes** | Brain / Planning & Memory | `gemini-2.5-flash` / `openai/gpt-oss-120b` | Google Gemini / Groq | Low hallucination rate, broad reasoning capability, and high context capacity. |
| **OpenClaw** | Hands / Code Execution | `groq/llama-3.3-70b-versatile` / `qwen2.5-coder` | Groq / Ollama (Local) | Optimized for high-throughput code synthesis and zero-latency shell execution. |

### Fallback Ladder (Automatic Rate-Limit / 429 Recovery)
1. **Google Gemini** `gemini-2.5-flash` (Primary Planning & Reasoning)
2. **Groq Cloud** `openai/gpt-oss-120b` (Secondary Planning)
3. **Groq Cloud** `llama-3.3-70b-versatile` (Primary Execution)
4. **Ollama Local** `qwen2.5-coder` (Local execution fallback with unlimited tokens)

