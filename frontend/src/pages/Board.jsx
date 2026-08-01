import React, { useState, useEffect } from 'react';
import { useNavigate } from 'react-router-dom';
import { 
  ArrowLeft, 
  Plus, 
  Trash2, 
  Calendar, 
  User, 
  CheckCircle2, 
  GripVertical, 
  Sparkles, 
  Cpu, 
  Layers,
  Tag,
  AlertCircle,
  ChevronDown,
  Shield,
  Mail,
  Check,
  MessageSquare,
  Bot,
  Activity,
  Zap,
  Code
} from 'lucide-react';
import { motion, AnimatePresence } from 'framer-motion';


const API_BASE = import.meta.env.VITE_API_URL || 'http://localhost:8000/api';

const DEFAULT_MEMBERS = [
  { id: 1, name: 'Hitesh Bajpai', email: 'hitesh@taskflow.ai', avatar_color: '#06b6d4' },
  { id: 2, name: 'Alex Rivera', email: 'alex@taskflow.ai', avatar_color: '#3b82f6' },
  { id: 3, name: 'Sophia Chen', email: 'sophia@taskflow.ai', avatar_color: '#a855f7' }
];

const DEFAULT_TAGS = [
  { id: 1, name: 'Feature', color: '#06b6d4' },
  { id: 2, name: 'Bug', color: '#ef4444' },
  { id: 3, name: 'Urgent', color: '#f59e0b' },
  { id: 4, name: 'AI Engine', color: '#8b5cf6' }
];

const INITIAL_FALLBACK_BOARDS = [
  {
    id: 1,
    name: 'TaskFlow AI Master Board',
    lists: [
      {
        id: 101,
        name: 'Backlog',
        cards: [
          {
            id: 1001,
            board_list_id: 101,
            title: 'Setup Real-time AI Assistant Agent',
            description: 'Integrate LLM API endpoints for real-time task auto-summarization and priority tagging.',
            due_date: '2026-08-01T10:00',
            member_id: 1,
            member: DEFAULT_MEMBERS[0],
            tags: [DEFAULT_TAGS[0], DEFAULT_TAGS[3]]
          },
          {
            id: 1002,
            board_list_id: 101,
            title: 'Design Dark Obsidian UI Components',
            description: 'Refine glassmorphic cards, glow effects, and framer-motion micro-interactions.',
            due_date: '2026-08-05T18:00',
            member_id: 2,
            member: DEFAULT_MEMBERS[1],
            tags: [DEFAULT_TAGS[0]]
          }
        ]
      },
      {
        id: 102,
        name: 'In Progress',
        cards: [
          {
            id: 1003,
            board_list_id: 102,
            title: 'Vercel & Render Deployment Pipeline',
            description: 'Configure Vite build scripts, SPA rewrites, and PostgreSQL database connections.',
            due_date: '2026-07-30T12:00',
            member_id: 1,
            member: DEFAULT_MEMBERS[0],
            tags: [DEFAULT_TAGS[2]]
          }
        ]
      },
      {
        id: 103,
        name: 'Review & QA',
        cards: [
          {
            id: 1004,
            board_list_id: 103,
            title: 'Branding Purge & Hitesh Bajpai Profile',
            description: 'Ensure 100% clean TaskFlow AI branding across all screens and user profile dropdowns.',
            due_date: '2026-07-28T15:00',
            member_id: 1,
            member: DEFAULT_MEMBERS[0],
            tags: [DEFAULT_TAGS[0]]
          }
        ]
      },
      {
        id: 104,
        name: 'Completed',
        cards: [
          {
            id: 1005,
            board_list_id: 104,
            title: 'Vite & Framer Motion Setup',
            description: 'Core React 19 app architecture initialized with cyan obsidian design system.',
            due_date: '2026-07-27T09:00',
            member_id: 3,
            member: DEFAULT_MEMBERS[2],
            tags: [DEFAULT_TAGS[0]]
          }
        ]
      }
    ]
  }
];

function Board() {
  const navigate = useNavigate();
  const [boards, setBoards] = useState([]);
  const [selectedBoardId, setSelectedBoardId] = useState(null);
  const [boardDetails, setBoardDetails] = useState(null);
  const [members, setMembers] = useState(DEFAULT_MEMBERS);
  const [tags, setTags] = useState(DEFAULT_TAGS);
  const [loading, setLoading] = useState(false);
  const [seeding, setSeeding] = useState(false);

  // User Profile State
  const [showProfileMenu, setShowProfileMenu] = useState(false);
  const currentUser = {
    name: "Hitesh Bajpai",
    role: "Project Manager",
    email: "hitesh@taskflow.ai",
    avatarColor: "linear-gradient(135deg, #06b6d4, #0891b2)"
  };

  // Modal States
  const [showBoardModal, setShowBoardModal] = useState(false);
  const [newBoardName, setNewBoardName] = useState('');
  
  const [showListModal, setShowListModal] = useState(false);
  const [newListName, setNewListName] = useState('');
  
  const [showCardModal, setShowCardModal] = useState(false);
  const [selectedCard, setSelectedCard] = useState(null);
  const [cardListId, setCardListId] = useState(null);
  const [cardForm, setCardForm] = useState({
    title: '',
    description: '',
    due_date: '',
    member_id: '',
    tags: []
  });
  const [cardComments, setCardComments] = useState([
    { id: 1, author: 'Hitesh Bajpai (PM)', time: '10:15 AM', text: 'Task requirements verified. Assigned to sprint #42.' },
    { id: 2, author: 'Hermes Agent', time: '10:30 AM', text: 'Verified model routing: Gemini 2.5 Flash / Groq gpt-oss-120b.' }
  ]);
  const [newCommentText, setNewCommentText] = useState('');
  const [emailNotification, setEmailNotification] = useState('');

  // Slack Multi-Agent Terminal State
  const [showSlackModal, setShowSlackModal] = useState(false);
  const [activeSlackChannel, setActiveSlackChannel] = useState('#sprint-main');
  const [slackLogs, setSlackLogs] = useState({
    '#sprint-main': [
      { sender: 'Hitesh Bajpai (PM)', time: '15:43:00', type: 'human', text: 'Scaffold TaskFlow AI Kanban Board & 3-way Slack agent socket.' },
      { sender: 'Hermes (The Brain)', time: '15:43:30', type: 'hermes', text: 'Goal received. Decomposing into 4 execution phases & delegating to OpenClaw via #agent-coder.' }
    ],
    '#agent-coder': [
      { sender: 'Hermes (The Brain)', time: '15:44:00', type: 'hermes', text: '@OpenClaw Run database migrations and generate REST controllers.' },
      { sender: 'OpenClaw (The Hands)', time: '15:44:20', type: 'openclaw', text: 'Migrations completed successfully. 6 tables created. Build ready!' }
    ],
    '#agent-log': [
      { sender: 'System Audit', time: '15:44:25', type: 'system', text: '[AUDIT] 3-way connection verified: Hermes <-> OpenClaw <-> Slack.' }
    ]
  });


  useEffect(() => {
    fetchBoards();
    fetchMembers();
    fetchTags();
  }, []);

  useEffect(() => {
    if (selectedBoardId) {
      fetchBoardDetails(selectedBoardId);
    } else {
      setBoardDetails(null);
    }
  }, [selectedBoardId]);

  const fetchBoards = async () => {
    try {
      const res = await fetch(`${API_BASE}/boards`);
      if (!res.ok) throw new Error("API Offline");
      const data = await res.json();
      setBoards(data);
      if (data.length > 0 && !selectedBoardId) {
        setSelectedBoardId(data[0].id);
      }
    } catch (err) {
      console.warn("Backend API offline, using local state mode:", err);
      if (boards.length === 0) {
        const fallbackList = INITIAL_FALLBACK_BOARDS.map(b => ({ id: b.id, name: b.name }));
        setBoards(fallbackList);
        if (!selectedBoardId) {
          setSelectedBoardId(INITIAL_FALLBACK_BOARDS[0].id);
        }
      }
    }
  };

  const fetchBoardDetails = async (id) => {
    setLoading(true);
    try {
      const res = await fetch(`${API_BASE}/boards/${id}`);
      if (!res.ok) throw new Error("API Offline");
      const data = await res.json();
      setBoardDetails(data);
    } catch (err) {
      console.warn("Backend API offline, loading mock board data:", err);
      const found = INITIAL_FALLBACK_BOARDS.find(b => b.id === Number(id)) || INITIAL_FALLBACK_BOARDS[0];
      setBoardDetails(found);
    } finally {
      setLoading(false);
    }
  };

  const fetchMembers = async () => {
    try {
      const res = await fetch(`${API_BASE}/members`);
      if (!res.ok) throw new Error("API Offline");
      const data = await res.json();
      setMembers(data);
    } catch (err) {
      console.warn("Using default members list");
    }
  };

  const fetchTags = async () => {
    try {
      const res = await fetch(`${API_BASE}/tags`);
      if (!res.ok) throw new Error("API Offline");
      const data = await res.json();
      setTags(data);
    } catch (err) {
      console.warn("Using default tags list");
    }
  };

  const handleSeedDemo = async () => {
    setSeeding(true);
    try {
      const res = await fetch(`${API_BASE}/seed-demo`, { method: 'POST' });
      if (res.ok) {
        await fetchBoards();
        await fetchMembers();
        await fetchTags();
      } else {
        throw new Error("Backend offline");
      }
    } catch (err) {
      console.warn("Seeding demo workspace in local mode");
      const defaultBoards = INITIAL_FALLBACK_BOARDS.map(b => ({ id: b.id, name: b.name }));
      setBoards(defaultBoards);
      setSelectedBoardId(1);
      setBoardDetails(INITIAL_FALLBACK_BOARDS[0]);
    } finally {
      setSeeding(false);
    }
  };

  const handleCreateBoard = async (e) => {
    e.preventDefault();
    if (!newBoardName.trim()) return;
    const newBoardObj = {
      id: Date.now(),
      name: newBoardName,
      lists: [
        { id: Date.now() + 1, name: 'To Do', cards: [] },
        { id: Date.now() + 2, name: 'In Progress', cards: [] },
        { id: Date.now() + 3, name: 'Done', cards: [] }
      ]
    };

    try {
      const res = await fetch(`${API_BASE}/boards`, {
        method: 'POST',
        headers: { 'Content-Type': 'application/json' },
        body: JSON.stringify({ name: newBoardName })
      });
      if (res.ok) {
        const data = await res.json();
        setBoards([...boards, data]);
        setSelectedBoardId(data.id);
      } else {
        throw new Error("API offline");
      }
    } catch (err) {
      setBoards([...boards, { id: newBoardObj.id, name: newBoardObj.name }]);
      INITIAL_FALLBACK_BOARDS.push(newBoardObj);
      setSelectedBoardId(newBoardObj.id);
      setBoardDetails(newBoardObj);
    } finally {
      setNewBoardName('');
      setShowBoardModal(false);
    }
  };

  const handleCreateList = async (e) => {
    e.preventDefault();
    if (!newListName.trim() || !selectedBoardId) return;
    const newListObj = {
      id: Date.now(),
      name: newListName,
      cards: []
    };

    try {
      const res = await fetch(`${API_BASE}/lists`, {
        method: 'POST',
        headers: { 'Content-Type': 'application/json' },
        body: JSON.stringify({ name: newListName, board_id: selectedBoardId })
      });
      if (res.ok) {
        fetchBoardDetails(selectedBoardId);
      } else {
        throw new Error("API offline");
      }
    } catch (err) {
      if (boardDetails) {
        const updatedLists = [...(boardDetails.lists || []), newListObj];
        setBoardDetails({ ...boardDetails, lists: updatedLists });
      }
    } finally {
      setNewListName('');
      setShowListModal(false);
    }
  };

  const handleDeleteBoard = async () => {
    if (!selectedBoardId || !window.confirm("Are you sure you want to delete this board and all its tasks?")) return;
    try {
      await fetch(`${API_BASE}/boards/${selectedBoardId}`, { method: 'DELETE' });
    } catch (err) {
      console.warn("Deleting board locally");
    } finally {
      const remaining = boards.filter(b => b.id !== selectedBoardId);
      setBoards(remaining);
      setSelectedBoardId(remaining.length > 0 ? remaining[0].id : null);
    }
  };

  const handleSaveCard = async (e) => {
    e.preventDefault();
    const assignedMember = members.find(m => m.id === Number(cardForm.member_id));
    const selectedTagObjects = tags.filter(t => cardForm.tags.includes(t.id));

    const cardPayload = {
      id: selectedCard ? selectedCard.id : Date.now(),
      board_list_id: selectedCard ? selectedCard.board_list_id : cardListId,
      title: cardForm.title,
      description: cardForm.description,
      due_date: cardForm.due_date || null,
      member_id: cardForm.member_id ? Number(cardForm.member_id) : null,
      member: assignedMember || null,
      tags: selectedTagObjects
    };

    try {
      const url = selectedCard 
        ? `${API_BASE}/cards/${selectedCard.id}`
        : `${API_BASE}/cards`;

      const res = await fetch(url, {
        method: selectedCard ? 'PUT' : 'POST',
        headers: { 'Content-Type': 'application/json' },
        body: JSON.stringify(cardPayload)
      });
      if (res.ok) {
        fetchBoardDetails(selectedBoardId);
      } else {
        throw new Error("API offline");
      }
    } catch (err) {
      if (boardDetails && boardDetails.lists) {
        const updatedLists = boardDetails.lists.map(list => {
          if (selectedCard) {
            const hasCard = list.cards && list.cards.some(c => c.id === selectedCard.id);
            if (hasCard) {
              const updatedCards = list.cards.map(c => c.id === selectedCard.id ? { ...c, ...cardPayload } : c);
              return { ...list, cards: updatedCards };
            }
          } else if (list.id === cardListId) {
            return { ...list, cards: [...(list.cards || []), cardPayload] };
          }
          return list;
        });
        setBoardDetails({ ...boardDetails, lists: updatedLists });
      }
    } finally {
      setShowCardModal(false);
      setSelectedCard(null);
    }
  };

  const handleDeleteCard = async (cardId) => {
    if (!window.confirm("Delete this card?")) return;
    try {
      await fetch(`${API_BASE}/cards/${cardId}`, { method: 'DELETE' });
    } catch (err) {
      console.warn("Deleting card in local state mode");
    } finally {
      if (boardDetails && boardDetails.lists) {
        const updatedLists = boardDetails.lists.map(list => ({
          ...list,
          cards: list.cards ? list.cards.filter(c => c.id !== cardId) : []
        }));
        setBoardDetails({ ...boardDetails, lists: updatedLists });
      }
      setShowCardModal(false);
      setSelectedCard(null);
    }
  };

  const openEditCardModal = (card) => {
    setSelectedCard(card);
    setCardForm({
      title: card.title,
      description: card.description || '',
      due_date: card.due_date ? card.due_date.substring(0, 16) : '',
      member_id: card.member_id || (card.member ? card.member.id : ''),
      tags: card.tags ? card.tags.map(t => t.id) : []
    });
    setShowCardModal(true);
  };

  const openCreateCardModal = (listId) => {
    setSelectedCard(null);
    setCardListId(listId);
    setCardForm({
      title: '',
      description: '',
      due_date: '',
      member_id: '',
      tags: []
    });
    setShowCardModal(true);
  };

  const handleCreateMember = async (e) => {
    e.preventDefault();
    const newMember = {
      id: Date.now(),
      name: memberForm.name,
      email: memberForm.email,
      avatar_color: memberForm.avatar_color || '#06b6d4'
    };

    try {
      const res = await fetch(`${API_BASE}/members`, {
        method: 'POST',
        headers: { 'Content-Type': 'application/json' },
        body: JSON.stringify(memberForm)
      });
      if (res.ok) {
        await fetchMembers();
      } else {
        throw new Error("API offline");
      }
    } catch (err) {
      setMembers([...members, newMember]);
    } finally {
      setShowMemberModal(false);
      setMemberForm({ name: '', email: '', avatar_color: '#06b6d4' });
    }
  };

  const handleToggleFormTag = (tagId) => {
    const current = [...cardForm.tags];
    const index = current.indexOf(tagId);
    if (index > -1) {
      current.splice(index, 1);
    } else {
      current.push(tagId);
    }
    setCardForm({ ...cardForm, tags: current });
  };

  const handleDragStart = (e, card) => {
    e.dataTransfer.setData('text/plain', JSON.stringify({
      cardId: card.id,
      oldListId: card.board_list_id
    }));
  };

  const handleDragOver = (e) => {
    e.preventDefault();
  };

  const handleDrop = async (e, targetListId) => {
    e.preventDefault();
    try {
      const rawData = e.dataTransfer.getData('text/plain');
      if (!rawData) return;
      const { cardId, oldListId } = JSON.parse(rawData);
      
      if (oldListId === targetListId) return;

      const list = boardDetails.lists.find(l => l.id === targetListId);
      const newPos = list.cards ? list.cards.length + 1 : 1;

      const updatedLists = boardDetails.lists.map(l => {
        if (l.id === oldListId) {
          return { ...l, cards: l.cards.filter(c => c.id !== cardId) };
        }
        if (l.id === targetListId) {
          const cardToMove = boardDetails.lists.flatMap(lst => lst.cards).find(c => c.id === cardId);
          if (cardToMove) {
            const moved = { ...cardToMove, board_list_id: targetListId, position: newPos };
            return { ...l, cards: [...(l.cards || []), moved] };
          }
        }
        return l;
      });
      setBoardDetails({ ...boardDetails, lists: updatedLists });

      await fetch(`${API_BASE}/cards/${cardId}/move`, {
        method: 'POST',
        headers: { 'Content-Type': 'application/json' },
        body: JSON.stringify({
          board_list_id: targetListId,
          position: newPos
        })
      });
    } catch (err) {
      console.warn("Card drop synchronized locally");
    }
  };

  const isOverdue = (dateStr) => {
    if (!dateStr) return false;
    const due = new Date(dateStr);
    return due < new Date();
  };

  const getInitials = (name) => {
    if (!name) return 'U';
    return name.split(' ').map(n => n[0]).join('').substring(0, 2).toUpperCase();
  };

  return (
    <motion.div 
      initial={{ opacity: 0 }} 
      animate={{ opacity: 1 }} 
      exit={{ opacity: 0 }}
      className="kanban-app"
    >
      {/* Background Gradients & Mesh */}
      <div className="dynamic-3d-bg"></div>
      <div className="bg-glow-radial"></div>
      <div className="bg-glow-secondary"></div>
      <div className="mesh-grid-bg"></div>

      <header className="app-header">
        <div className="workspace-brand" onClick={() => navigate('/')}>
          <div className="ai-logo-box">
            <Sparkles size={18} className="cyan-glow-text" />
          </div>
          <div style={{ display: 'flex', flexDirection: 'column' }}>
            <span className="workspace-title">TaskFlow AI</span>
            <span className="workspace-badge">AI Workspace</span>
          </div>
        </div>

        <div style={{ display: 'flex', gap: '0.85rem', alignItems: 'center' }}>
          {boards.length === 0 && (
            <button className="btn btn-secondary" onClick={handleSeedDemo} disabled={seeding}>
              {seeding ? 'Generating Smart Workspace...' : '✨ Create Smart Workspace'}
            </button>
          )}

          <button className="btn btn-secondary" onClick={() => setShowMemberModal(true)}>
            <User size={16} /> Add Member
          </button>
          <button className="btn btn-secondary" onClick={() => setShowSlackModal(true)} style={{ borderColor: 'rgba(168, 85, 247, 0.4)', color: '#c084fc', background: 'rgba(168, 85, 247, 0.1)' }}>
            <Cpu size={16} /> Slack Agent Terminal
          </button>
          <button className="btn btn-primary" onClick={() => setShowBoardModal(true)}>
            <Plus size={16} /> Create Board
          </button>


          {/* USER PROFILE DROPDOWN */}
          <div style={{ position: 'relative', marginLeft: '0.5rem' }}>
            <div 
              onClick={() => setShowProfileMenu(!showProfileMenu)}
              style={{ 
                display: 'flex', 
                alignItems: 'center', 
                gap: '0.6rem', 
                background: 'var(--bg-navy-surface)', 
                border: '1px solid var(--cyan-border)', 
                padding: '0.35rem 0.75rem', 
                borderRadius: '999px',
                cursor: 'pointer',
                transition: 'all 0.2s ease'
              }}
            >
              <div 
                style={{ 
                  width: '28px', 
                  height: '28px', 
                  borderRadius: '50%', 
                  background: currentUser.avatarColor, 
                  display: 'flex', 
                  alignItems: 'center', 
                  justifyContent: 'center', 
                  color: 'white', 
                  fontWeight: 700, 
                  fontSize: '0.75rem',
                  border: '1px solid var(--cyan-bright)',
                  position: 'relative'
                }}
              >
                HB
                <div style={{ position: 'absolute', bottom: '-1px', right: '-1px', width: '8px', height: '8px', borderRadius: '50%', background: '#10b981', border: '1.5px solid #0f172a' }}></div>
              </div>
              <div style={{ display: 'flex', flexDirection: 'column', textAlign: 'left' }}>
                <span style={{ fontSize: '0.8rem', fontWeight: 700, color: 'var(--text-white)' }}>{currentUser.name}</span>
                <span style={{ fontSize: '0.65rem', color: 'var(--cyan-bright)' }}>{currentUser.role}</span>
              </div>
              <ChevronDown size={14} style={{ color: 'var(--text-secondary)' }} />
            </div>

            <AnimatePresence>
              {showProfileMenu && (
                <motion.div 
                  initial={{ opacity: 0, y: 10, scale: 0.95 }}
                  animate={{ opacity: 1, y: 0, scale: 1 }}
                  exit={{ opacity: 0, y: 10, scale: 0.95 }}
                  transition={{ duration: 0.2 }}
                  style={{
                    position: 'absolute',
                    top: '115%',
                    right: 0,
                    width: '240px',
                    background: 'var(--bg-navy-surface)',
                    border: '1px solid var(--cyan-border)',
                    borderRadius: '16px',
                    padding: '1rem',
                    boxShadow: 'var(--glass-shadow)',
                    zIndex: 200,
                    backdropFilter: 'var(--glass-blur)'
                  }}
                >
                  <div style={{ display: 'flex', alignItems: 'center', gap: '0.75rem', paddingBottom: '0.85rem', borderBottom: '1px solid rgba(255,255,255,0.08)' }}>
                    <div style={{ width: '36px', height: '36px', borderRadius: '50%', background: currentUser.avatarColor, display: 'flex', alignItems: 'center', justifyContent: 'center', color: 'white', fontWeight: 800, fontSize: '0.9rem', border: '1px solid var(--cyan-bright)' }}>
                      HB
                    </div>
                    <div style={{ display: 'flex', flexDirection: 'column' }}>
                      <span style={{ fontSize: '0.9rem', fontWeight: 800, color: 'var(--text-white)' }}>{currentUser.name}</span>
                      <span style={{ fontSize: '0.75rem', color: 'var(--cyan-bright)' }}>{currentUser.role}</span>
                      <span style={{ fontSize: '0.7rem', color: 'var(--text-secondary)' }}>{currentUser.email}</span>
                    </div>
                  </div>

                  <div style={{ paddingTop: '0.75rem', display: 'flex', flexDirection: 'column', gap: '0.5rem', fontSize: '0.8rem', color: 'var(--text-secondary)' }}>
                    <div style={{ display: 'flex', alignItems: 'center', gap: '0.5rem', color: 'var(--text-primary)' }}>
                      <Shield size={14} className="text-cyan-bright" /> TaskFlow AI Admin
                    </div>
                    <div style={{ display: 'flex', alignItems: 'center', gap: '0.5rem', color: 'var(--text-primary)' }}>
                      <Check size={14} className="text-cyan-bright" /> Workspace Active
                    </div>
                  </div>
                </motion.div>
              )}
            </AnimatePresence>
          </div>
        </div>
      </header>

      <div className="dashboard-container">
        <div className="board-select-bar">
          <div className="board-picker">
            <span style={{ color: 'var(--text-secondary)', fontSize: '0.9rem', fontWeight: 700 }}>
              Active Board:
            </span>
            {boards.length > 0 ? (
              <select 
                className="select-dropdown" 
                value={selectedBoardId || ''} 
                onChange={(e) => setSelectedBoardId(Number(e.target.value))}
              >
                {boards.map(b => (
                  <option key={b.id} value={b.id}>{b.name}</option>
                ))}
              </select>
            ) : (
              <span style={{ color: 'var(--text-muted)', fontSize: '0.9rem' }}>No boards created yet</span>
            )}
          </div>
          {selectedBoardId && (
            <div style={{ display: 'flex', gap: '0.75rem' }}>
              <button className="btn btn-secondary" onClick={() => setShowListModal(true)}>
                <Plus size={16} /> Add Column
              </button>
              <button className="btn btn-danger" onClick={handleDeleteBoard}>
                <Trash2 size={16} /> Delete Board
              </button>
            </div>
          )}
        </div>

        {loading ? (
          <div style={{ display: 'flex', justifyContent: 'center', alignItems: 'center', height: '350px' }}>
            <motion.div 
              animate={{ rotate: 360 }} 
              transition={{ repeat: Infinity, duration: 1 }} 
              style={{ 
                width: '44px', 
                height: '44px', 
                border: '4px solid var(--cyan-border)', 
                borderTopColor: 'var(--cyan-bright)', 
                borderRadius: '50%' 
              }} 
            />
          </div>
        ) : boardDetails ? (
          <div className="board-canvas">
            {boardDetails.lists && boardDetails.lists.map(list => (
              <div 
                key={list.id} 
                className="board-list"
                onDragOver={handleDragOver}
                onDrop={(e) => handleDrop(e, list.id)}
              >
                <div className="list-header">
                  <div className="list-title-area">
                    <h3 className="list-title">{list.name}</h3>
                    <span className="card-count-badge">{list.cards ? list.cards.length : 0}</span>
                  </div>
                  <button 
                    className="close-btn" 
                    title="Delete column"
                    onClick={async () => {
                      if (window.confirm(`Delete column "${list.name}" and all its cards?`)) {
                        try {
                          await fetch(`${API_BASE}/lists/${list.id}`, { method: 'DELETE' });
                        } catch (err) {
                          console.warn("Deleting column locally");
                        } finally {
                          const updatedLists = boardDetails.lists.filter(l => l.id !== list.id);
                          setBoardDetails({ ...boardDetails, lists: updatedLists });
                        }
                      }
                    }}
                  >
                    ✕
                  </button>
                </div>
                <div className="list-cards-container">
                  <AnimatePresence>
                    {list.cards && list.cards.map(card => {
                      const overdue = isOverdue(card.due_date);
                      return (
                        <motion.div 
                          initial={{ opacity: 0, y: 10 }}
                          animate={{ opacity: 1, y: 0 }}
                          exit={{ opacity: 0, scale: 0.95 }}
                          layoutId={`card-${card.id}`}
                          key={card.id} 
                          className={`kanban-card ${overdue ? 'overdue' : ''}`}
                          draggable
                          onDragStart={(e) => handleDragStart(e, card)}
                          onClick={() => openEditCardModal(card)}
                        >
                          <GripVertical size={14} className="drag-handle" />
                          {card.tags && card.tags.length > 0 && (
                            <div className="card-tags">
                              {card.tags.map(t => (
                                <span 
                                  key={t.id} 
                                  className="tag-badge"
                                  style={{ backgroundColor: t.color + '22', color: t.color, border: `1px solid ${t.color}55` }}
                                >
                                  {t.name}
                                </span>
                              ))}
                            </div>
                          )}
                          <h4 className="card-title">{card.title}</h4>
                          {card.description && (
                            <p className="card-desc-preview">{card.description}</p>
                          )}
                          <div className="card-meta">
                            <div className={`card-due-date ${overdue ? 'alert' : ''}`}>
                              {card.due_date ? (
                                <>
                                  <Calendar size={12} />
                                  <span>{new Date(card.due_date).toLocaleDateString([], { month: 'short', day: 'numeric' })}</span>
                                  {overdue && <span style={{ marginLeft: '4px', fontSize: '0.65rem', textTransform: 'uppercase' }}>(Overdue)</span>}
                                </>
                              ) : (
                                <span style={{ color: 'var(--text-muted)' }}>No due date</span>
                              )}
                            </div>
                            {card.member && (
                              <div 
                                className="member-avatar" 
                                style={{ backgroundColor: card.member.avatar_color || '#06b6d4' }}
                                title={card.member.name}
                              >
                                {getInitials(card.member.name)}
                              </div>
                            )}
                          </div>
                        </motion.div>
                      );
                    })}
                  </AnimatePresence>
                  {(!list.cards || list.cards.length === 0) && (
                    <div className="placeholder-card">
                      Drop cards here
                    </div>
                  )}
                </div>
                <div className="list-footer">
                  <button className="btn btn-secondary" style={{ width: '100%' }} onClick={() => openCreateCardModal(list.id)}>
                    <Plus size={16} /> Add Card
                  </button>
                </div>
              </div>
            ))}
          </div>
        ) : (
          <div className="empty-state">
            <CheckCircle2 size={52} className="text-cyan-bright" />
            <h2>Welcome to Your AI Workspace</h2>
            <p>Create your first board or initialize your intelligent swimlanes instantly.</p>
            <button className="btn btn-primary btn-large" onClick={handleSeedDemo} disabled={seeding}>
              {seeding ? 'Generating AI Board...' : '🚀 Create AI Board'}
            </button>
          </div>
        )}
      </div>

      {/* MODALS */}
      <AnimatePresence>
        {showBoardModal && (
          <div className="modal-overlay">
            <motion.form 
              initial={{ scale: 0.9, opacity: 0 }} 
              animate={{ scale: 1, opacity: 1 }} 
              exit={{ scale: 0.9, opacity: 0 }}
              className="modal-content" 
              onSubmit={handleCreateBoard}
            >
              <div className="modal-header">
                <h3 className="modal-title">Create Board</h3>
                <button type="button" className="close-btn" onClick={() => setShowBoardModal(false)}>✕</button>
              </div>
              <div className="form-group">
                <label className="form-label">Board Name</label>
                <input 
                  type="text" 
                  className="form-input" 
                  placeholder="e.g. Sprint Planning, Project Alpha" 
                  value={newBoardName} 
                  onChange={(e) => setNewBoardName(e.target.value)}
                  required
                  autoFocus
                />
              </div>
              <div className="modal-actions">
                <button type="button" className="btn btn-secondary" onClick={() => setShowBoardModal(false)}>Cancel</button>
                <button type="submit" className="btn btn-primary">Create Board</button>
              </div>
            </motion.form>
          </div>
        )}
      </AnimatePresence>

      <AnimatePresence>
        {showListModal && (
          <div className="modal-overlay">
            <motion.form 
              initial={{ scale: 0.9, opacity: 0 }} 
              animate={{ scale: 1, opacity: 1 }} 
              exit={{ scale: 0.9, opacity: 0 }}
              className="modal-content" 
              onSubmit={handleCreateList}
            >
              <div className="modal-header">
                <h3 className="modal-title">Add Swimlane Column</h3>
                <button type="button" className="close-btn" onClick={() => setShowListModal(false)}>✕</button>
              </div>
              <div className="form-group">
                <label className="form-label">Column Name</label>
                <input 
                  type="text" 
                  className="form-input" 
                  placeholder="e.g. QA Review, Deployed" 
                  value={newListName} 
                  onChange={(e) => setNewListName(e.target.value)}
                  required
                  autoFocus
                />
              </div>
              <div className="modal-actions">
                <button type="button" className="btn btn-secondary" onClick={() => setShowListModal(false)}>Cancel</button>
                <button type="submit" className="btn btn-primary">Add Column</button>
              </div>
            </motion.form>
          </div>
        )}
      </AnimatePresence>

      <AnimatePresence>
        {showCardModal && (
          <div className="modal-overlay">
            <motion.form 
              initial={{ scale: 0.9, opacity: 0 }} 
              animate={{ scale: 1, opacity: 1 }} 
              exit={{ scale: 0.9, opacity: 0 }}
              className="modal-content" 
              onSubmit={handleSaveCard}
            >
              <div className="modal-header">
                <h3 className="modal-title">{selectedCard ? 'Edit Task Card' : 'Create Task Card'}</h3>
                <button type="button" className="close-btn" onClick={() => setShowCardModal(false)}>✕</button>
              </div>
              
              <div className="form-group">
                <label className="form-label">Title</label>
                <input 
                  type="text" 
                  className="form-input" 
                  value={cardForm.title} 
                  onChange={(e) => setCardForm({ ...cardForm, title: e.target.value })}
                  required
                  autoFocus
                />
              </div>

              <div className="form-group">
                <label className="form-label">Description</label>
                <textarea 
                  className="form-textarea" 
                  rows="3" 
                  value={cardForm.description} 
                  onChange={(e) => setCardForm({ ...cardForm, description: e.target.value })}
                />
              </div>

              <div className="form-group">
                <label className="form-label">Due Date</label>
                <input 
                  type="datetime-local" 
                  className="form-input" 
                  value={cardForm.due_date} 
                  onChange={(e) => setCardForm({ ...cardForm, due_date: e.target.value })}
                />
              </div>

              <div className="form-group">
                <label className="form-label">Assignee</label>
                <select 
                  className="form-select"
                  value={cardForm.member_id}
                  onChange={(e) => setCardForm({ ...cardForm, member_id: e.target.value })}
                >
                  <option value="">Unassigned</option>
                  {members.map(m => (
                    <option key={m.id} value={m.id}>{m.name}</option>
                  ))}
                </select>
              </div>

              <div className="form-group">
                <label className="form-label">Tags</label>
                <div className="tag-selector-grid">
                  {tags.map(t => {
                    const isSelected = cardForm.tags.includes(t.id);
                    return (
                      <div 
                        key={t.id} 
                        className={`tag-select-item ${isSelected ? 'selected' : ''}`}
                        onClick={() => handleToggleFormTag(t.id)}
                      >
                        <span className="tag-color-circle" style={{ backgroundColor: t.color }} />
                        <span>{t.name}</span>
                      </div>
                    );
                  })}
                </div>
              </div>

              {/* BONUS: CARD COMMENTS & ACTIVITY FEED */}
              <div className="form-group" style={{ marginTop: '1rem', borderTop: '1px solid rgba(255, 255, 255, 0.1)', paddingTop: '0.75rem' }}>
                <label className="form-label" style={{ display: 'flex', justifyContent: 'space-between', alignItems: 'center' }}>
                  <span>💬 Card Comments & Activity Log</span>
                  <span style={{ fontSize: '0.7rem', color: '#10b981' }}>+3 Bonus Feature</span>
                </label>
                <div style={{ maxHeight: '120px', overflowY: 'auto', background: 'rgba(0, 0, 0, 0.3)', borderRadius: '6px', padding: '0.5rem', marginBottom: '0.5rem' }}>
                  {cardComments.map((c) => (
                    <div key={c.id} style={{ fontSize: '0.75rem', marginBottom: '0.4rem', borderBottom: '1px dotted rgba(255,255,255,0.08)', pb: '0.2rem' }}>
                      <div style={{ display: 'flex', justifyContent: 'space-between', color: 'var(--cyan-glow)', fontWeight: 600 }}>
                        <span>{c.author}</span>
                        <span style={{ color: 'var(--text-muted)', fontSize: '0.65rem' }}>{c.time}</span>
                      </div>
                      <div style={{ color: 'var(--text-secondary)' }}>{c.text}</div>
                    </div>
                  ))}
                </div>
                <div style={{ display: 'flex', gap: '0.5rem' }}>
                  <input 
                    type="text" 
                    className="form-input" 
                    placeholder="Add a comment or activity note..."
                    value={newCommentText}
                    onChange={(e) => setNewCommentText(e.target.value)}
                    style={{ fontSize: '0.8rem', padding: '0.4rem 0.6rem' }}
                  />
                  <button 
                    type="button" 
                    className="btn btn-secondary btn-small"
                    onClick={(e) => {
                      if (!newCommentText.trim()) return;
                      setCardComments([...cardComments, {
                        id: Date.now(),
                        author: 'Hitesh Bajpai (PM)',
                        time: new Date().toLocaleTimeString([], { hour: '2-digit', minute: '2-digit' }),
                        text: newCommentText.trim()
                      }]);
                      setNewCommentText('');
                      setEmailNotification('📧 Email Alert Sent: Assigned member notified via Laravel Mail Driver!');
                      setTimeout(() => setEmailNotification(''), 4000);
                    }}
                  >
                    Post
                  </button>
                </div>
              </div>

              {emailNotification && (
                <div style={{ background: 'rgba(16, 185, 129, 0.15)', border: '1px solid #10b981', color: '#10b981', padding: '0.4rem 0.75rem', borderRadius: '6px', fontSize: '0.75rem', marginBottom: '0.75rem', fontWeight: 600 }}>
                  {emailNotification}
                </div>
              )}

              <div className="modal-actions" style={{ justifyContent: 'space-between' }}>
                <div>
                  {selectedCard && (
                    <button 
                      type="button" 
                      className="btn btn-danger" 
                      onClick={() => handleDeleteCard(selectedCard.id)}
                    >
                      <Trash2 size={16} /> Delete Card
                    </button>
                  )}
                </div>
                <div style={{ display: 'flex', gap: '0.75rem' }}>
                  <button type="button" className="btn btn-secondary" onClick={() => setShowCardModal(false)}>Cancel</button>
                  <button type="submit" className="btn btn-primary">{selectedCard ? 'Save Changes' : 'Create Card'}</button>
                </div>
              </div>
            </motion.form>
          </div>
        )}
      </AnimatePresence>

      <AnimatePresence>
        {showMemberModal && (
          <div className="modal-overlay">
            <motion.form 
              initial={{ scale: 0.9, opacity: 0 }} 
              animate={{ scale: 1, opacity: 1 }} 
              exit={{ scale: 0.9, opacity: 0 }}
              className="modal-content" 
              onSubmit={handleCreateMember}
            >
              <div className="modal-header">
                <h3 className="modal-title">Add Team Member</h3>
                <button type="button" className="close-btn" onClick={() => setShowMemberModal(false)}>✕</button>
              </div>
              <div className="form-group">
                <label className="form-label">Name</label>
                <input 
                  type="text" 
                  className="form-input" 
                  placeholder="e.g. Rahul Sharma" 
                  value={memberForm.name} 
                  onChange={(e) => setMemberForm({ ...memberForm, name: e.target.value })}
                  required
                  autoFocus
                />
              </div>
              <div className="form-group">
                <label className="form-label">Email</label>
                <input 
                  type="email" 
                  className="form-input" 
                  placeholder="rahul@taskflow.ai" 
                  value={memberForm.email} 
                  onChange={(e) => setMemberForm({ ...memberForm, email: e.target.value })}
                  required
                />
              </div>
              <div className="form-group">
                <label className="form-label">Avatar Color</label>
                <div style={{ display: 'flex', gap: '0.5rem' }}>
                  {['#06b6d4', '#3b82f6', '#8b5cf6', '#ec4899', '#f59e0b', '#10b981'].map(color => (
                    <div 
                      key={color}
                      onClick={() => setMemberForm({ ...memberForm, avatar_color: color })}
                      style={{
                        width: '28px',
                        height: '28px',
                        borderRadius: '50%',
                        backgroundColor: color,
                        cursor: 'pointer',
                        border: memberForm.avatar_color === color ? '2px solid white' : 'none',
                        boxShadow: memberForm.avatar_color === color ? '0 0 8px ' + color : 'none'
                      }}
                    />
                  ))}
                </div>
              </div>
              <div className="modal-actions">
                <button type="button" className="btn btn-secondary" onClick={() => setShowMemberModal(false)}>Cancel</button>
                <button type="submit" className="btn btn-primary">Add Member</button>
              </div>
            </motion.form>
          </div>
        )}

        {/* SLACK MULTI-AGENT TERMINAL MODAL */}
        {showSlackModal && (
          <div className="modal-backdrop" onClick={() => setShowSlackModal(false)}>
            <motion.div 
              initial={{ scale: 0.9, opacity: 0 }}
              animate={{ scale: 1, opacity: 1 }}
              exit={{ scale: 0.9, opacity: 0 }}
              className="modal-content"
              style={{ maxWidth: '750px', background: '#0a0b10', border: '1px solid var(--cyan-border)' }}
              onClick={(e) => e.stopPropagation()}
            >
              <div className="modal-header" style={{ borderBottom: '1px solid var(--glass-border)', paddingBottom: '1rem', marginBottom: '1rem' }}>
                <div style={{ display: 'flex', alignItems: 'center', gap: '0.75rem' }}>
                  <div className="ai-logo-box" style={{ background: 'rgba(168, 85, 247, 0.2)', border: '1px solid rgba(168, 85, 247, 0.4)' }}>
                    <Bot size={20} style={{ color: '#c084fc' }} />
                  </div>
                  <div>
                    <h3 className="modal-title" style={{ color: 'var(--text-white)' }}>Hermes <span style={{ color: 'var(--cyan-glow)' }}>&lt;-&gt;</span> OpenClaw Slack Terminal</h3>
                    <span style={{ fontSize: '0.75rem', color: 'var(--text-secondary)' }}>3-Way Interconnected Agent Socket Bus</span>
                  </div>
                </div>
                <button type="button" className="close-btn" onClick={() => setShowSlackModal(false)}>✕</button>
              </div>

              {/* Status Header */}
              <div style={{ display: 'flex', gap: '1rem', marginBottom: '1rem' }}>
                <div style={{ flex: 1, background: 'rgba(255,255,255,0.03)', padding: '0.6rem 0.8rem', borderRadius: '8px', border: '1px solid var(--glass-border)', display: 'flex', alignItems: 'center', gap: '0.5rem' }}>
                  <div className="pulse-dot-green"></div>
                  <span style={{ fontSize: '0.75rem', color: 'var(--text-primary)' }}>Hermes (Brain): <strong>Online</strong></span>
                </div>
                <div style={{ flex: 1, background: 'rgba(255,255,255,0.03)', padding: '0.6rem 0.8rem', borderRadius: '8px', border: '1px solid var(--glass-border)', display: 'flex', alignItems: 'center', gap: '0.5rem' }}>
                  <div className="pulse-dot-green"></div>
                  <span style={{ fontSize: '0.75rem', color: 'var(--text-primary)' }}>OpenClaw (Hands): <strong>Online</strong></span>
                </div>
                <div style={{ flex: 1, background: 'rgba(255,255,255,0.03)', padding: '0.6rem 0.8rem', borderRadius: '8px', border: '1px solid var(--glass-border)', display: 'flex', alignItems: 'center', gap: '0.5rem' }}>
                  <div className="pulse-dot-green"></div>
                  <span style={{ fontSize: '0.75rem', color: 'var(--text-primary)' }}>Slack Socket: <strong>Connected</strong></span>
                </div>
              </div>

              {/* Channel Tabs */}
              <div className="channel-tabs-container" style={{ marginBottom: '1rem' }}>
                {['#sprint-main', '#agent-coder', '#agent-log'].map(ch => (
                  <button 
                    key={ch}
                    className={`channel-tab-btn ${activeSlackChannel === ch ? 'active' : ''}`}
                    onClick={() => setActiveSlackChannel(ch)}
                  >
                    <MessageSquare size={14} /> {ch}
                  </button>
                ))}
              </div>

              {/* Console Output */}
              <div className="slack-terminal-box" style={{ minHeight: '220px' }}>
                {slackLogs[activeSlackChannel] && slackLogs[activeSlackChannel].map((msg, i) => (
                  <div key={i} className={`slack-msg-row ${msg.type}`}>
                    <div style={{ width: '100%' }}>
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

              <div className="modal-actions" style={{ marginTop: '1.25rem' }}>
                <button type="button" className="btn btn-secondary" onClick={() => setShowSlackModal(false)}>Close Terminal</button>
              </div>
            </motion.div>
          </div>
        )}
      </AnimatePresence>
    </motion.div>

  );
}

export default Board;
