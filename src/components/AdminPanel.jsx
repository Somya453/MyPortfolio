import React, { useState, useEffect } from 'react';
import { motion, AnimatePresence } from 'framer-motion';
import { IoCloseOutline, IoTrashOutline, IoMailOutline, IoBriefcaseOutline, IoAddCircleOutline, IoShieldCheckmarkOutline } from 'react-icons/io5';

const AdminPanel = ({ isOpen, onClose, passcode }) => {
  const [activeTab, setActiveTab] = useState('messages'); // 'messages' | 'projects'
  const [messages, setMessages] = useState([]);
  const [projects, setProjects] = useState([]);
  const [loading, setLoading] = useState(false);
  const [error, setError] = useState('');
  
  // Project form state
  const [projTitle, setProjTitle] = useState('');
  const [projDesc, setProjDesc] = useState('');
  const [projImg, setProjImg] = useState('');
  const [projDemo, setProjDemo] = useState('');
  const [projCode, setProjCode] = useState('');
  const [actionSuccess, setActionSuccess] = useState('');

  const fetchMessages = async () => {
    setLoading(true);
    setError('');
    try {
      const res = await fetch('http://localhost:5000/api/messages', {
        headers: { 'x-admin-passcode': passcode }
      });
      if (!res.ok) throw new Error('Failed to retrieve messages');
      const data = await res.json();
      setMessages(data.sort((a, b) => new Date(b.timestamp) - new Date(a.timestamp)));
    } catch (err) {
      setError(err.message);
    } finally {
      setLoading(false);
    }
  };

  const fetchProjects = async () => {
    setLoading(true);
    setError('');
    try {
      const res = await fetch('http://localhost:5000/api/projects');
      if (!res.ok) throw new Error('Failed to retrieve projects');
      const data = await res.json();
      setProjects(data);
    } catch (err) {
      setError(err.message);
    } finally {
      setLoading(false);
    }
  };

  useEffect(() => {
    if (isOpen) {
      if (activeTab === 'messages') {
        fetchMessages();
      } else {
        fetchProjects();
      }
    }
  }, [isOpen, activeTab]);

  const handleDeleteMessage = async (id) => {
    try {
      const res = await fetch(`http://localhost:5000/api/messages/${id}`, {
        method: 'DELETE',
        headers: { 'x-admin-passcode': passcode }
      });
      if (!res.ok) throw new Error('Failed to delete message');
      setMessages(messages.filter((m) => m.id !== id));
      showToast('Message deleted successfully');
    } catch (err) {
      setError(err.message);
    }
  };

  const handleDeleteProject = async (id) => {
    try {
      const res = await fetch(`http://localhost:5000/api/projects/${id}`, {
        method: 'DELETE',
        headers: { 'x-admin-passcode': passcode }
      });
      if (!res.ok) throw new Error('Failed to delete project');
      setProjects(projects.filter((p) => p.id !== id));
      showToast('Project deleted successfully');
      window.dispatchEvent(new Event('projects-updated'));
    } catch (err) {
      setError(err.message);
    }
  };

  const handleAddProject = async (e) => {
    e.preventDefault();
    if (!projTitle || !projDesc) {
      setError('Title and description are required.');
      return;
    }
    setError('');
    try {
      const res = await fetch('http://localhost:5000/api/projects', {
        method: 'POST',
        headers: {
          'Content-Type': 'application/json',
          'x-admin-passcode': passcode
        },
        body: JSON.stringify({
          title: projTitle,
          description: projDesc,
          image: projImg,
          demoLink: projDemo,
          codeLink: projCode
        })
      });
      if (!res.ok) throw new Error('Failed to create project');
      const newProj = await res.json();
      
      setProjects([...projects, newProj.data]);
      setProjTitle('');
      setProjDesc('');
      setProjImg('');
      setProjDemo('');
      setProjCode('');
      showToast('Project added successfully!');
      setActiveTab('projects'); // Switch back to see projects list
      window.dispatchEvent(new Event('projects-updated'));
    } catch (err) {
      setError(err.message);
    }
  };

  const showToast = (msg) => {
    setActionSuccess(msg);
    setTimeout(() => setActionSuccess(''), 3000);
  };

  return (
    <AnimatePresence>
      {isOpen && (
        <>
          {/* Backdrop overlay */}
          <motion.div
            initial={{ opacity: 0 }}
            animate={{ opacity: 0.6 }}
            exit={{ opacity: 0 }}
            onClick={onClose}
            className="fixed inset-0 bg-black/60 backdrop-blur-sm z-50 cursor-pointer"
          />

          {/* Drawer side panel */}
          <motion.div
            initial={{ x: '100%' }}
            animate={{ x: 0 }}
            exit={{ x: '100%' }}
            transition={{ type: 'spring', damping: 25, stiffness: 200 }}
            className="fixed top-0 right-0 h-screen w-full sm:w-[480px] bg-neutral-900/95 backdrop-blur-xl border-l border-neutral-800/50 shadow-2xl text-slate-100 p-6 flex flex-col z-50 overflow-hidden"
          >
            {/* Header */}
            <div className="flex items-center justify-between pb-4 border-b border-neutral-800">
              <div className="flex items-center gap-2">
                <IoShieldCheckmarkOutline className="text-emerald-400 text-2xl" />
                <h3 className="text-xl font-bold tracking-wide">Admin Dashboard</h3>
              </div>
              <button
                onClick={onClose}
                className="p-1 rounded-full hover:bg-neutral-800 text-slate-400 hover:text-slate-200 transition"
              >
                <IoCloseOutline className="text-3xl" />
              </button>
            </div>

            {/* Navigation Tabs */}
            <div className="flex gap-2 my-4 bg-neutral-950/50 p-1 rounded-lg">
              <button
                onClick={() => setActiveTab('messages')}
                className={`flex-1 flex items-center justify-center gap-2 py-2 text-sm font-semibold rounded-md transition ${
                  activeTab === 'messages'
                    ? 'bg-emerald-500 text-slate-950 shadow-md font-bold'
                    : 'text-neutral-400 hover:text-neutral-200'
                }`}
              >
                <IoMailOutline />
                Messages
              </button>
              <button
                onClick={() => setActiveTab('projects')}
                className={`flex-1 flex items-center justify-center gap-2 py-2 text-sm font-semibold rounded-md transition ${
                  activeTab === 'projects'
                    ? 'bg-emerald-500 text-slate-950 shadow-md font-bold'
                    : 'text-neutral-400 hover:text-neutral-200'
                }`}
              >
                <IoBriefcaseOutline />
                Manage Projects
              </button>
            </div>

            {/* Notification messages */}
            {actionSuccess && (
              <motion.div
                initial={{ opacity: 0, y: -10 }}
                animate={{ opacity: 1, y: 0 }}
                className="bg-emerald-500/20 border border-emerald-500/40 text-emerald-300 p-3 rounded-lg text-sm text-center mb-3"
              >
                {actionSuccess}
              </motion.div>
            )}

            {error && (
              <div className="bg-rose-500/20 border border-rose-500/40 text-rose-300 p-3 rounded-lg text-sm text-center mb-3">
                {error}
              </div>
            )}

            {/* Main Content Area */}
            <div className="flex-1 overflow-y-auto pr-1 space-y-4">
              {loading && (
                <div className="flex flex-col items-center justify-center py-12 text-slate-450">
                  <div className="animate-spin rounded-full h-8 w-8 border-b-2 border-emerald-400 mb-2"></div>
                  <p>Loading database entries...</p>
                </div>
              )}

              {!loading && activeTab === 'messages' && (
                <>
                  {messages.length === 0 ? (
                    <div className="text-center py-12 text-slate-500">
                      <IoMailOutline className="text-5xl mx-auto mb-2 opacity-35" />
                      <p>No messages received yet.</p>
                    </div>
                  ) : (
                    <div className="space-y-3">
                      <AnimatePresence initial={false}>
                        {messages.map((msg) => (
                          <motion.div
                            key={msg.id}
                            initial={{ opacity: 0, height: 0, y: 15 }}
                            animate={{ opacity: 1, height: 'auto', y: 0 }}
                            exit={{ opacity: 0, height: 0, y: -15 }}
                            transition={{ duration: 0.3 }}
                            className="bg-neutral-800/50 border border-neutral-750/40 rounded-xl p-4 flex flex-col justify-between hover:bg-neutral-850/30 transition overflow-hidden"
                          >
                            <div className="flex justify-between items-start mb-2">
                              <div>
                                <h4 className="font-bold text-slate-200">{msg.name}</h4>
                                <p className="text-xs text-neutral-400 font-mono">{msg.email}</p>
                              </div>
                              <button
                                onClick={() => handleDeleteMessage(msg.id)}
                                className="p-1.5 rounded-lg text-slate-400 hover:text-rose-450 hover:bg-neutral-700/50 transition"
                                title="Delete Message"
                              >
                                <IoTrashOutline className="text-lg" />
                              </button>
                            </div>
                            <div className="mt-1">
                              <p className="text-xs font-bold text-emerald-400 uppercase tracking-wider mb-1">
                                Sub: {msg.subject}
                              </p>
                              <p className="text-sm text-slate-350 whitespace-pre-wrap bg-neutral-950/40 p-2.5 rounded-lg border border-neutral-800/50">
                                {msg.message}
                              </p>
                            </div>
                            <span className="text-[10px] text-slate-500 text-right mt-2">
                              {new Date(msg.timestamp).toLocaleString()}
                            </span>
                          </motion.div>
                        ))}
                      </AnimatePresence>
                    </div>
                  )}
                </>
              )}

              {!loading && activeTab === 'projects' && (
                <div className="space-y-6">
                  {/* Add project form */}
                  <form onSubmit={handleAddProject} className="bg-neutral-800/40 border border-neutral-750/30 rounded-xl p-4 space-y-3">
                    <h4 className="text-sm font-bold text-slate-300 flex items-center gap-1.5 border-b border-neutral-800/50 pb-2 mb-2">
                      <IoAddCircleOutline className="text-emerald-400 text-lg" />
                      Add New Project
                    </h4>
                    
                    <div>
                      <label className="block text-xs text-neutral-400 mb-1 font-semibold">Title *</label>
                      <input
                        type="text"
                        required
                        value={projTitle}
                        onChange={(e) => setProjTitle(e.target.value)}
                        placeholder="e.g. Weather Forecast App"
                        className="w-full bg-neutral-950/70 border border-neutral-800/70 rounded-lg py-1.5 px-3 text-sm text-slate-100 focus:outline-none focus:border-emerald-400 transition"
                      />
                    </div>

                    <div>
                      <label className="block text-xs text-neutral-400 mb-1 font-semibold">Description *</label>
                      <textarea
                        required
                        rows="2"
                        value={projDesc}
                        onChange={(e) => setProjDesc(e.target.value)}
                        placeholder="Short summary of features and tech stack..."
                        className="w-full bg-neutral-950/70 border border-neutral-800/70 rounded-lg py-1.5 px-3 text-sm text-slate-100 focus:outline-none focus:border-emerald-400 transition resize-none"
                      />
                    </div>

                    <div>
                      <label className="block text-xs text-neutral-400 mb-1 font-semibold">Image URL (Unsplash or direct)</label>
                      <input
                        type="url"
                        value={projImg}
                        onChange={(e) => setProjImg(e.target.value)}
                        placeholder="https://images.unsplash.com/photo-..."
                        className="w-full bg-neutral-950/70 border border-neutral-800/70 rounded-lg py-1.5 px-3 text-sm text-slate-100 focus:outline-none focus:border-emerald-400 transition"
                      />
                    </div>

                    <div className="grid grid-cols-2 gap-2">
                      <div>
                        <label className="block text-xs text-neutral-400 mb-1 font-semibold">Demo URL</label>
                        <input
                          type="url"
                          value={projDemo}
                          onChange={(e) => setProjDemo(e.target.value)}
                          placeholder="Live site link"
                          className="w-full bg-neutral-950/70 border border-neutral-800/70 rounded-lg py-1.5 px-3 text-sm text-slate-100 focus:outline-none focus:border-emerald-400 transition"
                        />
                      </div>
                      <div>
                        <label className="block text-xs text-neutral-400 mb-1 font-semibold">Code Repository URL</label>
                        <input
                          type="url"
                          value={projCode}
                          onChange={(e) => setProjCode(e.target.value)}
                          placeholder="GitHub URL"
                          className="w-full bg-neutral-950/70 border border-neutral-800/70 rounded-lg py-1.5 px-3 text-sm text-slate-100 focus:outline-none focus:border-emerald-400 transition"
                        />
                      </div>
                    </div>

                    <button
                      type="submit"
                      className="w-full py-2 bg-emerald-500 hover:bg-emerald-400 text-slate-950 font-bold rounded-lg text-sm transition duration-200 mt-2 cursor-pointer flex items-center justify-center gap-1.5"
                    >
                      <IoAddCircleOutline className="text-lg" />
                      Add Project to Portfolio
                    </button>
                  </form>

                  {/* Existing project deletion list */}
                  <div className="space-y-3">
                    <h4 className="text-sm font-bold text-slate-350 border-b border-neutral-800/50 pb-2">
                      Existing Projects ({projects.length})
                    </h4>
                    {projects.length === 0 ? (
                      <p className="text-center py-6 text-slate-500 text-sm">No projects listed.</p>
                    ) : (
                      <div className="space-y-2">
                        {projects.map((p) => (
                          <div
                            key={p.id}
                            className="flex items-center gap-3 bg-neutral-950/40 border border-neutral-800/80 rounded-lg p-2 hover:bg-neutral-850/20 transition"
                          >
                            <img
                              src={p.image}
                              alt={p.title}
                              className="w-12 h-12 object-cover rounded-md border border-neutral-850"
                            />
                            <div className="flex-1 min-w-0">
                              <h5 className="font-semibold text-sm text-slate-200 truncate">{p.title}</h5>
                              <p className="text-xs text-neutral-400 truncate">{p.description}</p>
                            </div>
                            <button
                              onClick={() => handleDeleteProject(p.id)}
                              className="p-2 text-slate-400 hover:text-rose-450 hover:bg-neutral-800/50 rounded-lg transition"
                              title="Delete Project"
                            >
                              <IoTrashOutline className="text-base" />
                            </button>
                          </div>
                        ))}
                      </div>
                    )}
                  </div>
                </div>
              )}
            </div>
          </motion.div>
        </>
      )}
    </AnimatePresence>
  );
};

export default AdminPanel;
