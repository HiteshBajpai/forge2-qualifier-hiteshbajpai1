import React, { useState } from 'react';
import { useNavigate } from 'react-router-dom';
import { motion, AnimatePresence } from 'framer-motion';
import { 
  Sparkles, 
  Cpu, 
  Zap, 
  Layers, 
  TrendingUp, 
  Users, 
  ShieldCheck, 
  ArrowRight, 
  CheckCircle2, 
  ChevronDown, 
  Mail, 
  Send,
  MessageSquare,
  Bot,
  Activity,
  Code,
  Share2,
  Globe,
  Flame
} from 'lucide-react';


export default function LandingPage() {
  const navigate = useNavigate();
  const [openFaq, setOpenFaq] = useState(0);
  const [contactSubmitted, setContactSubmitted] = useState(false);
  const [activeChannel, setActiveChannel] = useState('#sprint-main');
  const [isSimulating, setIsSimulating] = useState(false);
  const [agentLogs, setAgentLogs] = useState({
    '#sprint-main': [
      { sender: 'Hitesh Bajpai (PM)', time: '15:43:00', type: 'human', text: 'Plan & scaffold TaskFlow AI master board with full Laravel API endpoints.' },
      { sender: 'Hermes (The Brain)', time: '15:43:30', type: 'hermes', text: 'Goal accepted. Decomposing into 4 phases: DB migrations, Eloquent models, REST controllers, React Vite frontend. Dispatching execution orders to OpenClaw via #agent-coder.' }
    ],
    '#agent-coder': [
      { sender: 'Hermes (The Brain)', time: '15:44:00', type: 'hermes', text: '@OpenClaw Scaffold models & migrations for Board, BoardList, Card, Member, Tag. Execute php artisan migrate.' },
      { sender: 'OpenClaw (The Hands)', time: '15:44:20', type: 'openclaw', text: 'Scaffolded models & migrations. Applied 6 migrations successfully (9.94ms DONE). Controller REST routes wired.' }
    ],
    '#agent-log': [
      { sender: 'System Audit', time: '15:44:25', type: 'system', text: '[AUDIT] 2026_07_16_105512_create_boards_table.php ... DONE' },
      { sender: 'System Audit', time: '15:56:22', type: 'system', text: '[AUDIT] routes/api.php published. Allowed CORS origins [*].' }
    ]
  });

  const handleSimulateTask = () => {
    if (isSimulating) return;
    setIsSimulating(true);
    const timestamp = new Date().toLocaleTimeString();
    
    // Add prompt in #sprint-main
    setTimeout(() => {
      setAgentLogs(prev => ({
        ...prev,
        '#sprint-main': [
          ...prev['#sprint-main'],
          { sender: 'Hitesh Bajpai (PM)', time: timestamp, type: 'human', text: 'Connect Hermes, OpenClaw, and Slack 3-way handshake in TaskFlow AI.' }
        ]
      }));
    }, 500);

    // Hermes responds in #sprint-main & #agent-coder
    setTimeout(() => {
      setAgentLogs(prev => ({
        ...prev,
        '#sprint-main': [
          ...prev['#sprint-main'],
          { sender: 'Hermes (The Brain)', time: timestamp, type: 'hermes', text: '3-Way connection request acknowledged. Dispatching socket configuration to OpenClaw via #agent-coder.' }
        ],
        '#agent-coder': [
          ...prev['#agent-coder'],
          { sender: 'Hermes (The Brain)', time: timestamp, type: 'hermes', text: '@OpenClaw Update openclaw.json & hermes-config.yaml to establish bidirectional Slack socket subscribers.' }
        ]
      }));
    }, 1500);

    // OpenClaw executes in #agent-coder & streams to #agent-log
    setTimeout(() => {
      setAgentLogs(prev => ({
        ...prev,
        '#agent-coder': [
          ...prev['#agent-coder'],
          { sender: 'OpenClaw (The Hands)', time: timestamp, type: 'openclaw', text: 'Configurations updated! Executed node scripts/agent-connector.js. Handshake verified 100% SUCCESS.' }
        ],
        '#agent-log': [
          ...prev['#agent-log'],
          { sender: 'System Audit', time: timestamp, type: 'system', text: '[SUCCESS] Hermes <-> OpenClaw <-> Slack 3-Way Interconnection Verified.' }
        ]
      }));
      setIsSimulating(false);
    }, 3000);
  };


  const containerVariants = {
    hidden: { opacity: 0 },
    visible: { 
      opacity: 1, 
      transition: { staggerChildren: 0.15, delayChildren: 0.1 } 
    }
  };

  const itemVariants = {
    hidden: { opacity: 0, y: 25 },
    visible: { opacity: 1, y: 0, transition: { duration: 0.6, ease: [0.16, 1, 0.3, 1] } }
  };

  const faqs = [
    {
      q: "How does TaskFlow AI enhance project management?",
      a: "TaskFlow AI uses specialized autonomous agents to automatically categorize tasks, forecast sprint velocity, detect potential bottlenecks, and generate optimal subtasks based on high-level team prompts."
    },
    {
      q: "Can I connect TaskFlow AI with my existing Laravel backend?",
      a: "Yes! TaskFlow AI is built natively to integrate with Laravel REST APIs, utilizing lightweight JSON data formats for seamless real-time syncing between frontend swimlanes and your database."
    },
    {
      q: "Is TaskFlow AI suitable for enterprise-scale teams?",
      a: "Absolutely. With end-to-end encryption, role-based member permissions, custom swimlane tags, and sub-second load times, TaskFlow AI is architected to scale effortlessly."
    },
    {
      q: "How does drag-and-drop swimlane syncing work?",
      a: "Cards can be dragged seamlessly across custom columns. Position and list updates are dispatched immediately to the server, keeping team members in sync instantly."
    },
    {
      q: "Is there a free trial available?",
      a: "Yes! You can launch the interactive workspace immediately to test all AI board management features with zero setup required."
    }
  ];

  const handleContactSubmit = (e) => {
    e.preventDefault();
    setContactSubmitted(true);
    setTimeout(() => setContactSubmitted(false), 4000);
  };

  return (
    <div className="landing-container">
      {/* Background Gradients & Mesh */}
      <div className="dynamic-3d-bg"></div>
      <div className="bg-glow-radial"></div>
      <div className="bg-glow-secondary"></div>
      <div className="mesh-grid-bg"></div>

      {/* Navigation Bar */}
      <nav className="landing-nav">
        <div className="nav-brand" onClick={() => navigate('/')}>
          <div className="ai-logo-box">
            <Sparkles size={22} className="cyan-glow-text" />
          </div>
          <div className="brand-text">
            <span className="brand-name">TaskFlow AI</span>
            <span className="brand-tag-pill">AI-Powered Workspace</span>
          </div>
        </div>

        <ul className="nav-links">
          <li><a href="#why-choose" className="nav-link">Why Choose Us</a></li>
          <li><a href="#features" className="nav-link">Features</a></li>
          <li><a href="#workflow" className="nav-link">Workflow</a></li>
          <li><a href="#analytics" className="nav-link">Analytics</a></li>
          <li><a href="#testimonials" className="nav-link">Testimonials</a></li>
          <li><a href="#faq" className="nav-link">FAQ</a></li>
        </ul>

        <div>
          <button className="btn btn-primary" onClick={() => navigate('/board')}>
            Launch Dashboard <ArrowRight size={16} />
          </button>
        </div>
      </nav>

      <main className="landing-main">
        {/* HERO SECTION */}
        <section className="hero-container">
          <motion.div 
            className="hero-left"
            variants={containerVariants}
            initial="hidden"
            animate="visible"
          >
            <motion.div className="hero-badge" variants={itemVariants}>
              <Cpu size={14} /> AI-Powered Project & Task Management
            </motion.div>

            <motion.h1 className="hero-title" variants={itemVariants}>
              Where Great Teams Build <br/>
              <span className="text-cyan-gradient">Extraordinary Products.</span>
            </motion.h1>

            <motion.p className="hero-subtitle" variants={itemVariants}>
              A modern AI-powered workspace that helps teams plan projects, manage tasks, collaborate seamlessly, automate workflows, and deliver exceptional results faster than ever.
            </motion.p>

            <motion.div className="hero-cta-group" variants={itemVariants}>
              <button className="btn btn-primary btn-large" onClick={() => navigate('/board')}>
                Launch Dashboard <ArrowRight size={18} />
              </button>
              <a href="#features" className="btn btn-secondary btn-large">
                Explore Features
              </a>
            </motion.div>
          </motion.div>

          {/* Futuristic 3D AI Dashboard Graphic */}
          <motion.div 
            className="hero-right"
            initial={{ opacity: 0, scale: 0.9 }}
            animate={{ opacity: 1, scale: 1 }}
            transition={{ duration: 0.8, delay: 0.2 }}
          >
            <div className="floating-ai-chip">
              <Bot size={20} className="text-cyan-bright" />
              <div>
                <div style={{ fontSize: '0.75rem', fontWeight: 700, color: 'var(--cyan-glow)' }}>TaskFlow AI Agent</div>
                <div style={{ fontSize: '0.65rem', color: 'var(--text-secondary)' }}>Automating Sprint Tasks...</div>
              </div>
            </div>

            <div className="dashboard-illustration-card">
              <div className="illustr-header">
                <div className="illustr-dots">
                  <div className="illustr-dot dot-red"></div>
                  <div className="illustr-dot dot-yellow"></div>
                  <div className="illustr-dot dot-green"></div>
                </div>
                <div style={{ fontSize: '0.75rem', color: 'var(--cyan-bright)', fontWeight: 600, display: 'flex', alignItems: 'center', gap: '4px' }}>
                  <Activity size={12} /> Active AI Sprint #42
                </div>
              </div>

              <div className="illustr-grid">
                <div className="illustr-column">
                  <div className="illustr-col-header">
                    <span>Backlog</span>
                    <span>3</span>
                  </div>
                  <div className="illustr-mini-card">
                    <div className="illustr-mini-card-title">Setup OAuth2 Provider</div>
                    <span className="illustr-mini-card-tag">Backend</span>
                  </div>
                  <div className="illustr-mini-card">
                    <div className="illustr-mini-card-title">Dark Mode Theme Spec</div>
                    <span className="illustr-mini-card-tag">UI/UX</span>
                  </div>
                </div>

                <div className="illustr-column" style={{ borderTop: '2px solid var(--cyan-bright)' }}>
                  <div className="illustr-col-header">
                    <span>In Progress</span>
                    <span>2</span>
                  </div>
                  <div className="illustr-mini-card" style={{ borderColor: 'var(--cyan-bright)', background: 'rgba(34, 211, 238, 0.08)' }}>
                    <div className="illustr-mini-card-title" style={{ color: 'var(--cyan-glow)' }}>AI Workflow Sync</div>
                    <span className="illustr-mini-card-tag" style={{ background: 'var(--cyan-bright)', color: '#030712' }}>Active Agent</span>
                  </div>
                  <div className="illustr-mini-card">
                    <div className="illustr-mini-card-title">Laravel Rest API</div>
                    <span className="illustr-mini-card-tag">API</span>
                  </div>
                </div>

                <div className="illustr-column">
                  <div className="illustr-col-header">
                    <span>Completed</span>
                    <span>5</span>
                  </div>
                  <div className="illustr-mini-card">
                    <div className="illustr-mini-card-title">Vite 6 Frontend Core</div>
                    <span className="illustr-mini-card-tag" style={{ background: 'rgba(16, 185, 129, 0.2)', color: '#10b981' }}>Done</span>
                  </div>
                  <div className="illustr-mini-card">
                    <div className="illustr-mini-card-title">Drag & Drop Engine</div>
                    <span className="illustr-mini-card-tag" style={{ background: 'rgba(16, 185, 129, 0.2)', color: '#10b981' }}>Done</span>
                  </div>
                </div>
              </div>
            </div>
          </motion.div>
        </section>

        {/* SECTION 1: WHY CHOOSE TASKFLOW AI */}
        <section id="why-choose">
          <div className="section-header">
            <span className="section-tag">Why TaskFlow AI</span>
            <h2 className="section-title">Built for High-Velocity Teams</h2>
            <p className="section-subtitle">
              Traditional project management tools are clunky and slow. TaskFlow AI combines modern glassmorphism with intelligent backend orchestration to streamline execution.
            </p>
          </div>

          <motion.div 
            className="benefits-grid"
            variants={containerVariants}
            initial="hidden"
            whileInView="visible"
            viewport={{ once: true, margin: "-50px" }}
          >
            <motion.div className="benefit-card" variants={itemVariants}>
              <div className="benefit-icon-box">
                <Cpu size={28} />
              </div>
              <h3>Intelligent Automation</h3>
              <p>Let AI agents organize your backlogs, assign member tags, and suggest priority updates so your team can focus on shipping.</p>
            </motion.div>

            <motion.div className="benefit-card" variants={itemVariants}>
              <div className="benefit-icon-box">
                <Zap size={28} />
              </div>
              <h3>Sub-Second Sync</h3>
              <p>Instant state mutations paired with a robust Laravel API backend ensure zero input delay across all swimlanes.</p>
            </motion.div>

            <motion.div className="benefit-card" variants={itemVariants}>
              <div className="benefit-icon-box">
                <ShieldCheck size={28} />
              </div>
              <h3>Enterprise Grade</h3>
              <p>Built with granular task controls, due-date tracking, member avatar assignees, and persistent database storage.</p>
            </motion.div>

            <motion.div className="benefit-card" variants={itemVariants}>
              <div className="benefit-icon-box">
                <TrendingUp size={28} />
              </div>
              <h3>Predictive Insights</h3>
              <p>Real-time analytics track project completion metrics and highlight overdue items before they impact deadlines.</p>
            </motion.div>
          </motion.div>
        </section>

        {/* SECTION: INTERCONNECTED MULTI-AGENT ENGINE */}
        <section id="agents" style={{ padding: '3rem 0' }}>

          <div className="section-header">
            <span className="section-tag" style={{ background: 'rgba(168, 85, 247, 0.15)', color: '#c084fc', borderColor: 'rgba(168, 85, 247, 0.3)' }}>
              3-Way Interconnected Architecture
            </span>
            <h2 className="section-title">Hermes & OpenClaw Connected via Slack</h2>
            <p className="section-subtitle">
              Hermes (The Brain) decomposes goals and delegates execution to OpenClaw (The Hands) through interconnected Slack socket gateways.
            </p>
          </div>

          <div className="agent-connector-wrapper">
            <div className="agent-nodes-grid">
              {/* NODE 1: HERMES */}
              <div className="agent-node-card active">
                <div className="agent-node-header">
                  <span className="agent-node-badge badge-brain">
                    <Sparkles size={12} /> The Brain
                  </span>
                  <div className="pulse-dot-green" title="Connected"></div>
                </div>
                <div className="agent-node-title">
                  <Bot size={22} className="text-purple-glow" style={{ color: '#c084fc' }} /> Hermes Agent
                </div>
                <p className="agent-node-desc">
                  Planning & Reasoning Engine. Maintains session context, decomposes user goals into structured contracts, and triggers execution.
                </p>
                <div style={{ fontSize: '0.75rem', color: 'var(--text-muted)', background: 'rgba(0,0,0,0.3)', padding: '0.4rem 0.6rem', borderRadius: '6px' }}>
                  Model: <span style={{ color: 'var(--cyan-glow)' }}>Gemini 2.5 Flash / Groq</span>
                </div>
              </div>

              {/* NODE 2: SLACK HUB */}
              <div className="agent-node-card active" style={{ borderColor: 'rgba(234, 179, 8, 0.5)' }}>
                <div className="agent-node-header">
                  <span className="agent-node-badge badge-slack">
                    <Activity size={12} /> Socket Gateway
                  </span>
                  <div className="pulse-dot-green" title="Socket Active"></div>
                </div>
                <div className="agent-node-title">
                  <MessageSquare size={22} style={{ color: '#facc15' }} /> Slack Channels
                </div>
                <p className="agent-node-desc">
                  Real-time event bus routing messages across <code>#sprint-main</code>, <code>#agent-coder</code>, and <code>#agent-log</code>.
                </p>
                <div style={{ fontSize: '0.75rem', color: 'var(--text-muted)', background: 'rgba(0,0,0,0.3)', padding: '0.4rem 0.6rem', borderRadius: '6px' }}>
                  Mode: <span style={{ color: '#facc15' }}>Socket Mode (xoxb/xapp)</span>
                </div>
              </div>

              {/* NODE 3: OPENCLAW */}
              <div className="agent-node-card active">
                <div className="agent-node-header">
                  <span className="agent-node-badge badge-hands">
                    <Code size={12} /> The Hands
                  </span>
                  <div className="pulse-dot-green" title="Connected"></div>
                </div>
                <div className="agent-node-title">
                  <Cpu size={22} className="text-cyan-glow" /> OpenClaw Agent
                </div>
                <p className="agent-node-desc">
                  Execution & Coding Engine. Runs migrations, compiles React Vite bundles, wires APIs, and streams execution trace logs.
                </p>
                <div style={{ fontSize: '0.75rem', color: 'var(--text-muted)', background: 'rgba(0,0,0,0.3)', padding: '0.4rem 0.6rem', borderRadius: '6px' }}>
                  Model: <span style={{ color: 'var(--cyan-glow)' }}>Groq / Ollama Qwen2.5</span>
                </div>
              </div>
            </div>

            {/* LIVE INTERACTIVE SLACK CHANNEL VIEWER */}
            <div style={{ display: 'flex', justifyContent: 'space-between', alignItems: 'center', marginBottom: '1rem', flexWrap: 'wrap', gap: '1rem' }}>
              <div className="channel-tabs-container" style={{ margin: 0 }}>
                {['#sprint-main', '#agent-coder', '#agent-log'].map(ch => (
                  <button 
                    key={ch}
                    className={`channel-tab-btn ${activeChannel === ch ? 'active' : ''}`}
                    onClick={() => setActiveChannel(ch)}
                  >
                    <MessageSquare size={14} /> {ch}
                  </button>
                ))}
              </div>

              <button 
                className="btn btn-secondary btn-small"
                onClick={handleSimulateTask}
                disabled={isSimulating}
                style={{ display: 'flex', alignItems: 'center', gap: '0.5rem', background: 'rgba(34, 211, 238, 0.15)', borderColor: 'var(--cyan-bright)' }}
              >
                <Zap size={14} className={isSimulating ? 'spin' : ''} /> 
                {isSimulating ? 'Executing 3-Way Handshake...' : 'Simulate 3-Way Agent Task Run'}
              </button>
            </div>

            {/* TERMINAL BOX */}
            <div className="slack-terminal-box">
              {agentLogs[activeChannel] && agentLogs[activeChannel].map((msg, i) => (
                <div key={i} className={`slack-msg-row ${msg.type}`}>
                  <div className="slack-msg-content" style={{ width: '100%' }}>
                    <div style={{ display: 'flex', justifyContent: 'space-between', alignItems: 'center', marginBottom: '0.2rem' }}>
                      <span className="slack-msg-sender" style={{
                        color: msg.type === 'hermes' ? '#c084fc' : msg.type === 'openclaw' ? '#22d3ee' : msg.type === 'human' ? '#10b981' : '#facc15'
                      }}>
                        {msg.sender}
                      </span>
                      <span className="slack-msg-time">{msg.time}</span>
                    </div>
                    <div className="slack-msg-body">{msg.text}</div>
                  </div>
                </div>
              ))}
            </div>
          </div>
        </section>

        {/* SECTION 2: AI POWERED FEATURES */}
        <section id="features">
          <div className="section-header">
            <span className="section-tag">Powerful Capabilities</span>
            <h2 className="section-title">Next-Generation AI Features</h2>
            <p className="section-subtitle">
              Everything you need to orchestrate complex tasks, automate routine workflows, and deliver software at lightning speed.
            </p>
          </div>

          <motion.div 
            className="features-grid"
            variants={containerVariants}
            initial="hidden"
            whileInView="visible"
            viewport={{ once: true, margin: "-50px" }}
          >
            <motion.div className="feature-card" variants={itemVariants}>
              <div className="feature-icon-wrapper"><Layers size={24} /></div>
              <h3>Fluid Swimlanes</h3>
              <p>Drag and drop tasks effortlessly across customizable columns with real-time UI reordering and zero latency.</p>
            </motion.div>

            <motion.div className="feature-card" variants={itemVariants}>
              <div className="feature-icon-wrapper"><Bot size={24} /></div>
              <h3>AI Agent Assistant</h3>
              <p>Automate repetitive updates, seed realistic demo workspace data, and maintain clean task descriptions effortlessly.</p>
            </motion.div>

            <motion.div className="feature-card" variants={itemVariants}>
              <div className="feature-icon-wrapper"><Users size={24} /></div>
              <h3>Team Sync & Avatars</h3>
              <p>Assign team members with custom color avatars, track responsibilities, and monitor member workloads visually.</p>
            </motion.div>

            <motion.div className="feature-card" variants={itemVariants}>
              <div className="feature-icon-wrapper"><Flame size={24} /></div>
              <h3>Tag & Color Categorization</h3>
              <p>Label cards with customizable color badges (Frontend, Backend, Bug, High Priority) for instant visual scanning.</p>
            </motion.div>

            <motion.div className="feature-card" variants={itemVariants}>
              <div className="feature-icon-wrapper"><ShieldCheck size={24} /></div>
              <h3>Laravel REST Integration</h3>
              <p>Backed by clean, robust RESTful API endpoints written in Laravel with standard JSON error handling.</p>
            </motion.div>

            <motion.div className="feature-card" variants={itemVariants}>
              <div className="feature-icon-wrapper"><Sparkles size={24} /></div>
              <h3>Glassmorphic UI Engine</h3>
              <p>Crafted with modern CSS glassmorphism, soft glowing highlights, ambient background radial beams, and dark mode brilliance.</p>
            </motion.div>
          </motion.div>
        </section>

        {/* SECTION 3: WORKFLOW OVERVIEW */}
        <section id="workflow">
          <div className="section-header">
            <span className="section-tag">How It Works</span>
            <h2 className="section-title">Streamlined 4-Step Workflow</h2>
            <p className="section-subtitle">
              From initial idea to production deployment in four simple, automated steps.
            </p>
          </div>

          <div className="workflow-steps">
            <div className="workflow-card">
              <div className="step-number">01</div>
              <h3>Create Workspace</h3>
              <p>Initialize project boards or click "Seed Demo Workspace" for instant pre-populated swimlane columns.</p>
            </div>

            <div className="workflow-card">
              <div className="step-number">02</div>
              <h3>Organize & Tag</h3>
              <p>Add task cards with rich descriptions, due dates, custom tags, and assigned team members.</p>
            </div>

            <div className="workflow-card">
              <div className="step-number">03</div>
              <h3>Drag & Move</h3>
              <p>Shift tasks smoothly across swimlane columns as work progresses from Backlog to In Progress to Done.</p>
            </div>

            <div className="workflow-card">
              <div className="step-number">04</div>
              <h3>Deliver & Scale</h3>
              <p>Track overdue alerts, review task completion metrics, and release features faster than ever.</p>
            </div>
          </div>
        </section>

        {/* SECTION 4: PROJECT ANALYTICS */}
        <section id="analytics">
          <div className="analytics-showcase">
            <div className="analytics-content">
              <span className="section-tag">Real-Time Metrics</span>
              <h3>Advanced Project Analytics</h3>
              <p>
                Get full visibility into team velocity, completed task throughput, and current sprint bottlenecks with live performance meters.
              </p>
              <ul className="analytics-list">
                <li className="analytics-list-item">
                  <CheckCircle2 size={18} className="analytics-check-icon" /> Real-time sprint velocity charts
                </li>
                <li className="analytics-list-item">
                  <CheckCircle2 size={18} className="analytics-check-icon" /> Automatic overdue date detection
                </li>
                <li className="analytics-list-item">
                  <CheckCircle2 size={18} className="analytics-check-icon" /> Workload distribution per team member
                </li>
              </ul>
            </div>

            <div className="analytics-graphic-card">
              <div style={{ display: 'flex', justifyContent: 'space-between', marginBottom: '1.25rem', color: 'var(--text-white)' }}>
                <span style={{ fontWeight: 700, fontFamily: 'var(--font-display)' }}>Sprint Throughput</span>
                <span style={{ color: 'var(--cyan-glow)', fontWeight: 600 }}>94.8% Target</span>
              </div>
              <div className="metric-bar-group">
                <div className="metric-item">
                  <div className="metric-header">
                    <span>Task Completion Speed</span>
                    <span>+38% vs Last Sprint</span>
                  </div>
                  <div className="metric-bar-track">
                    <div className="metric-bar-fill" style={{ width: '85%' }}></div>
                  </div>
                </div>

                <div className="metric-item">
                  <div className="metric-header">
                    <span>API Response Latency</span>
                    <span>12ms Avg</span>
                  </div>
                  <div className="metric-bar-track">
                    <div className="metric-bar-fill" style={{ width: '96%' }}></div>
                  </div>
                </div>

                <div className="metric-item">
                  <div className="metric-header">
                    <span>Active Member Engagement</span>
                    <span>99.2%</span>
                  </div>
                  <div className="metric-bar-track">
                    <div className="metric-bar-fill" style={{ width: '92%' }}></div>
                  </div>
                </div>
              </div>
            </div>
          </div>
        </section>

        {/* SECTION 5: STATISTICS */}
        <section id="stats">
          <div className="section-header">
            <span className="section-tag">Proven Results</span>
            <h2 className="section-title">Trusted by Thousands Worldwide</h2>
          </div>

          <motion.div 
            className="stats-grid"
            variants={containerVariants}
            initial="hidden"
            whileInView="visible"
            viewport={{ once: true }}
          >
            <motion.div className="stat-card" variants={itemVariants}>
              <div className="stat-value">10K+</div>
              <div className="stat-label">Tasks Managed</div>
            </motion.div>

            <motion.div className="stat-card" variants={itemVariants}>
              <div className="stat-value">500+</div>
              <div className="stat-label">Teams</div>
            </motion.div>

            <motion.div className="stat-card" variants={itemVariants}>
              <div className="stat-value">99.9%</div>
              <div className="stat-label">Uptime</div>
            </motion.div>

            <motion.div className="stat-card" variants={itemVariants}>
              <div className="stat-value">1M+</div>
              <div className="stat-label">Tasks Completed</div>
            </motion.div>
          </motion.div>
        </section>

        {/* SECTION 6: TESTIMONIALS */}
        <section id="testimonials">
          <div className="section-header">
            <span className="section-tag">Customer Stories</span>
            <h2 className="section-title">Loved by Engineering Leaders</h2>
          </div>

          <div className="testimonials-grid">
            <div className="testimonial-card">
              <div className="rating-stars">★★★★★</div>
              <p className="testimonial-quote">
                "TaskFlow AI completely transformed how our product engineering team operates. The glassmorphic interface is stunning and the drag-and-drop swimlane responsiveness is unbeatable."
              </p>
              <div className="testimonial-author">
                <div className="author-avatar">HB</div>
                <div className="author-info">
                  <h4>Hitesh Bajpai</h4>
                  <p>Lead Systems Architect</p>
                </div>
              </div>
            </div>

            <div className="testimonial-card">
              <div className="rating-stars">★★★★★</div>
              <p className="testimonial-quote">
                "Connecting TaskFlow AI to our Laravel REST backend took zero hassle. The instant feedback when moving cards and setting member assignees keeps everyone aligned."
              </p>
              <div className="testimonial-author">
                <div className="author-avatar">SK</div>
                <div className="author-info">
                  <h4>Sarah Jenkins</h4>
                  <p>VP of Product, CloudTech</p>
                </div>
              </div>
            </div>

            <div className="testimonial-card">
              <div className="rating-stars">★★★★★</div>
              <p className="testimonial-quote">
                "The dark cyan aesthetic feels like using software built in 2030. The demo seeding functionality made onboarding our whole department effortless."
              </p>
              <div className="testimonial-author">
                <div className="author-avatar">AR</div>
                <div className="author-info">
                  <h4>Alex Rodriguez</h4>
                  <p>Engineering Director</p>
                </div>
              </div>
            </div>
          </div>
        </section>

        {/* SECTION 7: FAQ */}
        <section id="faq">
          <div className="section-header">
            <span className="section-tag">Got Questions?</span>
            <h2 className="section-title">Frequently Asked Questions</h2>
          </div>

          <div className="faq-list">
            {faqs.map((faq, index) => {
              const isOpen = openFaq === index;
              return (
                <div key={index} className={`faq-item ${isOpen ? 'active' : ''}`}>
                  <div className="faq-question" onClick={() => setOpenFaq(isOpen ? null : index)}>
                    <span>{faq.q}</span>
                    <ChevronDown 
                      size={20} 
                      style={{ 
                        transform: isOpen ? 'rotate(180deg)' : 'rotate(0deg)',
                        transition: 'transform 0.3s ease',
                        color: 'var(--cyan-bright)'
                      }} 
                    />
                  </div>
                  <AnimatePresence>
                    {isOpen && (
                      <motion.div 
                        initial={{ opacity: 0, height: 0 }}
                        animate={{ opacity: 1, height: 'auto' }}
                        exit={{ opacity: 0, height: 0 }}
                        transition={{ duration: 0.3 }}
                        className="faq-answer"
                      >
                        {faq.a}
                      </motion.div>
                    )}
                  </AnimatePresence>
                </div>
              );
            })}
          </div>
        </section>

        {/* SECTION 8: CONTACT */}
        <section id="contact">
          <div className="section-header">
            <span className="section-tag">Get in Touch</span>
            <h2 className="section-title">Have Questions? Reach Out</h2>
            <p className="section-subtitle">Our team is always here to help you get the most out of TaskFlow AI.</p>
          </div>

          <div className="contact-container">
            {contactSubmitted ? (
              <div style={{ textAlign: 'center', padding: '2rem 0', color: 'var(--cyan-glow)' }}>
                <CheckCircle2 size={48} style={{ margin: '0 auto 1rem' }} />
                <h3>Thank you! Your message has been sent successfully.</h3>
              </div>
            ) : (
              <form className="contact-form" onSubmit={handleContactSubmit}>
                <div className="form-row">
                  <div className="form-group-landing">
                    <label>Full Name</label>
                    <input type="text" className="form-input-landing" placeholder="John Doe" required />
                  </div>
                  <div className="form-group-landing">
                    <label>Email Address</label>
                    <input type="email" className="form-input-landing" placeholder="john@company.com" required />
                  </div>
                </div>
                <div className="form-group-landing">
                  <label>Message</label>
                  <textarea className="form-textarea-landing" rows="4" placeholder="How can we help your team?" required></textarea>
                </div>
                <button type="submit" className="btn btn-primary btn-large" style={{ marginTop: '0.5rem' }}>
                  Send Message <Send size={16} />
                </button>
              </form>
            )}
          </div>
        </section>

        {/* SECTION 9: PREMIUM CTA */}
        <section>
          <div className="cta-banner">
            <Sparkles size={40} className="cyan-glow-text" style={{ color: 'var(--cyan-glow)' }} />
            <h2>Ready to Elevate Your Team's Productivity?</h2>
            <p>Experience the future of AI-powered project and task management today.</p>
            <button className="btn btn-primary btn-large" onClick={() => navigate('/board')}>
              Launch Dashboard Now <ArrowRight size={18} />
            </button>
          </div>
        </section>
      </main>

      {/* FOOTER */}
      <footer className="landing-footer">
        <div className="footer-top">
          <div>
            <div className="nav-brand" onClick={() => navigate('/')}>
              <div className="ai-logo-box">
                <Sparkles size={20} />
              </div>
              <span className="brand-name">TaskFlow AI</span>
            </div>
            <p className="footer-brand-desc">
              AI-Powered Project & Task Management engineered for high-performance software teams.
            </p>
          </div>

          <div className="footer-col">
            <h4>Product</h4>
            <ul className="footer-links">
              <li><a href="#features">Features</a></li>
              <li><a href="#workflow">Workflow</a></li>
              <li><a href="#analytics">Analytics</a></li>
              <li><a href="#stats">Statistics</a></li>
            </ul>
          </div>

          <div className="footer-col">
            <h4>Resources</h4>
            <ul className="footer-links">
              <li><a href="#why-choose">Why Us</a></li>
              <li><a href="#testimonials">Testimonials</a></li>
              <li><a href="#faq">FAQ</a></li>
              <li><a href="#contact">Contact</a></li>
            </ul>
          </div>

          <div className="footer-col">
            <h4>Connect</h4>
            <div style={{ display: 'flex', gap: '0.85rem', marginTop: '0.5rem' }}>
              <a href="#" style={{ color: 'var(--text-secondary)' }} title="Code"><Code size={20} /></a>
              <a href="#" style={{ color: 'var(--text-secondary)' }} title="Web"><Globe size={20} /></a>
              <a href="#" style={{ color: 'var(--text-secondary)' }} title="Social"><Share2 size={20} /></a>
              <a href="#" style={{ color: 'var(--text-secondary)' }} title="Community"><MessageSquare size={20} /></a>

            </div>
          </div>
        </div>

        {/* EXACT REQUIRED FOOTER CONTENT */}
        <div className="footer-bottom">
          <div className="footer-credits" style={{ fontSize: '1.1rem', fontWeight: 800 }}>TaskFlow AI</div>
          <div className="footer-credits">Designed & Developed by Hitesh Bajpai</div>
          <div className="footer-tech">Powered by React, Vite & Laravel</div>
          <div className="footer-copy">© 2026 TaskFlow AI. All Rights Reserved.</div>
        </div>
q
      </footer>
    </div>
  );
}
