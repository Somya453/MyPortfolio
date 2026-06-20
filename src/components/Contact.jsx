import React, { useState } from 'react';
import { motion, AnimatePresence } from 'framer-motion';
import { IoMailOutline, IoLocationOutline, IoLockClosedOutline, IoLockOpenOutline, IoSendOutline, IoCheckmarkCircleOutline } from 'react-icons/io5';
import { FaLinkedin, FaGithub } from 'react-icons/fa';
import ScrollAnimate from './ScrollAnimate';
import AdminPanel from './AdminPanel';

const Contact = () => {
  const [name, setName] = useState('');
  const [email, setEmail] = useState('');
  const [subject, setSubject] = useState('');
  const [message, setMessage] = useState('');
  
  // Submission states
  const [status, setStatus] = useState('idle'); // 'idle' | 'sending' | 'success' | 'error'
  const [errorMessage, setErrorMessage] = useState('');

  // Lock and Admin panel states
  const [showPasscodeField, setShowPasscodeField] = useState(false);
  const [enteredPasscode, setEnteredPasscode] = useState('');
  const [isAdminOpen, setIsAdminOpen] = useState(false);
  const [authError, setAuthError] = useState(false);

  const handleSubmit = async (e) => {
    e.preventDefault();
    if (!name || !email || !message) {
      setStatus('error');
      setErrorMessage('Please fill in Name, Email, and Message.');
      return;
    }

    setStatus('sending');
    setErrorMessage('');
    
    try {
      const res = await fetch('http://localhost:5000/api/messages', {
        method: 'POST',
        headers: {
          'Content-Type': 'application/json'
        },
        body: JSON.stringify({ name, email, subject, message })
      });

      if (!res.ok) {
        throw new Error('Server returned an error');
      }

      setStatus('success');
      setName('');
      setEmail('');
      setSubject('');
      setMessage('');

      // Return to idle after a few seconds
      setTimeout(() => setStatus('idle'), 4000);
    } catch (err) {
      console.error('Contact submission error:', err);
      setStatus('error');
      setErrorMessage('Failed to send message. Please try again or use the email link.');
      setTimeout(() => setStatus('idle'), 5000);
    }
  };

  const handleAdminAuth = (e) => {
    e.preventDefault();
    if (enteredPasscode === 'admin123') {
      setIsAdminOpen(true);
      setShowPasscodeField(false);
      setAuthError(false);
      setEnteredPasscode('');
    } else {
      setAuthError(true);
      setTimeout(() => setAuthError(false), 2000);
    }
  };

  return (
    <div className="min-h-screen relative flex items-center justify-center bg-gradient-to-tr from-neutral-950 via-neutral-900 to-neutral-950 py-24 px-6 overflow-hidden text-slate-100" id="contact">
      
      {/* Decorative Blur Backgrounds */}
      <div className="absolute top-1/3 right-0 w-80 h-80 bg-emerald-550/5 rounded-full blur-3xl pointer-events-none" />
      <div className="absolute bottom-0 left-1/4 w-96 h-96 bg-teal-550/5 rounded-full blur-3xl pointer-events-none" />

      <div className="max-w-5xl w-full relative z-10">
        
        {/* Title */}
        <ScrollAnimate className="text-center mb-16">
          <h2 className="text-4xl md:text-5xl font-extrabold text-white tracking-tight">
            Get In Touch
          </h2>
          <div className="h-1.5 w-24 bg-gradient-to-r from-emerald-400 to-teal-400 rounded-full mx-auto mt-4 mb-6" />
          <p className="text-neutral-400 max-w-xl mx-auto text-base md:text-lg">
            Have a project in mind, a question, or just want to say hi? Drop me a message below!
          </p>
        </ScrollAnimate>

        <div className="grid grid-cols-1 lg:grid-cols-12 gap-8 items-stretch">
          
          {/* Contact Info (LHS) */}
          <ScrollAnimate delay={0.1} className="lg:col-span-5 flex flex-col justify-between bg-neutral-900 border border-neutral-800/80 text-slate-100 rounded-3xl p-8 md:p-10 shadow-2xl relative overflow-hidden">
            {/* Mesh background effect */}
            <div className="absolute top-0 right-0 w-64 h-64 bg-emerald-500/5 rounded-full blur-3xl pointer-events-none" />
            
            <div className="relative z-10">
              <h3 className="text-2xl font-bold tracking-tight mb-4">Contact Info</h3>
              <p className="text-neutral-400 text-sm md:text-base leading-relaxed mb-8">
                Ready to work together or brainstorm ideas? Reach out via these channels.
              </p>

              <div className="space-y-6">
                
                {/* Email link */}
                <motion.a 
                  whileHover={{ x: 6 }} 
                  href="mailto:somyasharma0488@gmail.com" 
                  className="flex items-center gap-4 group cursor-pointer"
                >
                  <div className="p-3 bg-neutral-950 border border-neutral-800 rounded-2xl group-hover:bg-emerald-600 transition-colors duration-300">
                    <IoMailOutline className="text-xl text-emerald-400 group-hover:text-white transition-colors duration-300" />
                  </div>
                  <div>
                    <span className="block text-xs text-neutral-500 uppercase tracking-wider font-semibold">Email Me</span>
                    <span className="text-slate-350 text-sm md:text-base group-hover:underline">somyasharma0488@gmail.com</span>
                  </div>
                </motion.a>

                {/* LinkedIn */}
                <motion.a 
                  whileHover={{ x: 6 }} 
                  href="https://www.linkedin.com/in/somya-sharma-0984a8264/" 
                  target="_blank" 
                  rel="noopener noreferrer"
                  className="flex items-center gap-4 group cursor-pointer"
                >
                  <div className="p-3 bg-neutral-950 border border-neutral-800 rounded-2xl group-hover:bg-teal-600 transition-colors duration-300">
                    <FaLinkedin className="text-xl text-teal-400 group-hover:text-white transition-colors duration-300" />
                  </div>
                  <div>
                    <span className="block text-xs text-neutral-500 uppercase tracking-wider font-semibold">LinkedIn</span>
                    <span className="text-slate-350 text-sm md:text-base group-hover:underline truncate max-w-[200px] block">somya-sharma</span>
                  </div>
                </motion.a>

                {/* GitHub */}
                <motion.a 
                  whileHover={{ x: 6 }} 
                  href="https://github.com/Somya453" 
                  target="_blank" 
                  rel="noopener noreferrer"
                  className="flex items-center gap-4 group cursor-pointer"
                >
                  <div className="p-3 bg-neutral-950 border border-neutral-800 rounded-2xl group-hover:bg-neutral-800 transition-colors duration-300">
                    <FaGithub className="text-xl text-neutral-400 group-hover:text-white transition-colors duration-300" />
                  </div>
                  <div>
                    <span className="block text-xs text-neutral-500 uppercase tracking-wider font-semibold">GitHub</span>
                    <span className="text-slate-350 text-sm md:text-base group-hover:underline">github.com/Somya453</span>
                  </div>
                </motion.a>

                {/* Location */}
                <div className="flex items-center gap-4">
                  <div className="p-3 bg-slate-800 rounded-2xl">
                    <IoLocationOutline className="text-xl text-emerald-400" />
                  </div>
                  <div>
                    <span className="block text-xs text-slate-500 uppercase tracking-wider font-semibold">Location</span>
                    <span className="text-slate-300 text-sm md:text-base">India</span>
                  </div>
                </div>

              </div>
            </div>

            <div className="mt-12 pt-6 border-t border-neutral-800 text-slate-500 text-xs flex justify-between items-center relative z-10">
              <span>© {new Date().getFullYear()} Somya Sharma</span>
              
              {/* Trigger for Passcode Entry */}
              <button 
                onClick={() => setShowPasscodeField(!showPasscodeField)}
                className="p-2 bg-neutral-800/80 rounded-full hover:bg-emerald-500 hover:text-slate-950 transition-colors duration-200"
                title="Admin Access"
              >
                {showPasscodeField ? <IoLockOpenOutline className="text-sm" /> : <IoLockClosedOutline className="text-sm" />}
              </button>
            </div>
            
            {/* Float-in Admin Authentication Overlay */}
            <AnimatePresence>
              {showPasscodeField && (
                <motion.form 
                  onSubmit={handleAdminAuth}
                  initial={{ opacity: 0, y: 20 }}
                  animate={{ opacity: 1, y: 0 }}
                  exit={{ opacity: 0, y: 20 }}
                  className="absolute inset-0 bg-neutral-950/95 flex flex-col items-center justify-center p-6 text-center z-20 border border-neutral-800 rounded-3xl"
                >
                  <IoLockClosedOutline className="text-3xl text-emerald-400 mb-2 animate-bounce" />
                  <h4 className="text-base font-bold text-slate-200 mb-1">Owner Authentication</h4>
                  <p className="text-xs text-slate-400 max-w-[200px] mb-4">Enter secret passcode to view message vault.</p>
                  
                  <input
                    type="password"
                    value={enteredPasscode}
                    onChange={(e) => setEnteredPasscode(e.target.value)}
                    placeholder="Enter Passcode"
                    className="bg-neutral-900 border border-neutral-800 rounded-xl px-4 py-2 text-sm text-slate-100 focus:outline-none focus:border-emerald-400 text-center w-48 mb-2 font-mono"
                  />
                  {authError && <p className="text-xs text-rose-400 font-semibold mb-2">Incorrect Code!</p>}
                  
                  <div className="flex gap-2">
                    <button
                      type="submit"
                      className="px-4 py-1.5 bg-emerald-500 hover:bg-emerald-400 text-slate-950 font-bold rounded-lg text-xs cursor-pointer"
                    >
                      Verify
                    </button>
                    <button
                      type="button"
                      onClick={() => setShowPasscodeField(false)}
                      className="px-4 py-1.5 bg-neutral-800 hover:bg-neutral-750 text-slate-350 rounded-lg text-xs cursor-pointer"
                    >
                      Cancel
                    </button>
                  </div>
                </motion.form>
              )}
            </AnimatePresence>
          </ScrollAnimate>

          {/* Form (RHS) */}
          <ScrollAnimate delay={0.2} className="lg:col-span-7 bg-neutral-900/60 backdrop-blur-md border border-neutral-800/80 shadow-2xl rounded-3xl p-8 md:p-10 relative overflow-hidden flex flex-col justify-center">
            
            <AnimatePresence mode="wait">
              {status === 'success' ? (
                <motion.div
                  key="success"
                  initial={{ opacity: 0, scale: 0.95 }}
                  animate={{ opacity: 1, scale: 1 }}
                  exit={{ opacity: 0, scale: 0.95 }}
                  className="flex flex-col items-center justify-center text-center py-8"
                >
                  <IoCheckmarkCircleOutline className="text-6xl text-emerald-500 mb-4 animate-pulse" />
                  <h4 className="text-2xl font-bold text-slate-800">Message Received!</h4>
                  <p className="text-slate-600 mt-2 max-w-sm">
                    Thank you so much! Your message has been stored in the database. I'll get back to you soon.
                  </p>
                </motion.div>
              ) : (
                <motion.form
                  key="form"
                  onSubmit={handleSubmit}
                  className="space-y-4"
                >
                  {errorMessage && (
                    <div className="p-3.5 bg-rose-100 border border-rose-200 text-rose-700 text-sm rounded-xl font-medium text-center">
                      {errorMessage}
                    </div>
                  )}

                  <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
                    <div>
                      <label className="block text-xs font-semibold text-neutral-400 uppercase tracking-wider mb-1.5">Your Name *</label>
                      <input
                        type="text"
                        required
                        value={name}
                        onChange={(e) => setName(e.target.value)}
                        placeholder="John Doe"
                        className="w-full bg-neutral-950/80 border border-neutral-800/85 rounded-xl py-2.5 px-4 text-sm text-slate-100 placeholder-neutral-600 focus:outline-none focus:ring-2 focus:ring-emerald-500/20 focus:border-emerald-450 transition"
                      />
                    </div>
                    <div>
                      <label className="block text-xs font-semibold text-neutral-400 uppercase tracking-wider mb-1.5">Email Address *</label>
                      <input
                        type="email"
                        required
                        value={email}
                        onChange={(e) => setEmail(e.target.value)}
                        placeholder="john@example.com"
                        className="w-full bg-neutral-950/80 border border-neutral-800/85 rounded-xl py-2.5 px-4 text-sm text-slate-100 placeholder-neutral-600 focus:outline-none focus:ring-2 focus:ring-emerald-500/20 focus:border-emerald-450 transition"
                      />
                    </div>
                  </div>

                  <div>
                    <label className="block text-xs font-semibold text-neutral-400 uppercase tracking-wider mb-1.5">Subject</label>
                    <input
                      type="text"
                      value={subject}
                      onChange={(e) => setSubject(e.target.value)}
                      placeholder="Collaboration opportunity"
                      className="w-full bg-neutral-950/80 border border-neutral-800/85 rounded-xl py-2.5 px-4 text-sm text-slate-100 placeholder-neutral-600 focus:outline-none focus:ring-2 focus:ring-emerald-500/20 focus:border-emerald-450 transition"
                    />
                  </div>

                  <div>
                    <label className="block text-xs font-semibold text-neutral-400 uppercase tracking-wider mb-1.5">Your Message *</label>
                    <textarea
                      required
                      rows="4"
                      value={message}
                      onChange={(e) => setMessage(e.target.value)}
                      placeholder="Hi Somya, let's talk about..."
                      className="w-full bg-neutral-950/80 border border-neutral-800/85 rounded-xl py-2.5 px-4 text-sm text-slate-100 placeholder-neutral-600 focus:outline-none focus:ring-2 focus:ring-emerald-500/20 focus:border-emerald-450 transition resize-none"
                    />
                  </div>

                  <button
                    type="submit"
                    disabled={status === 'sending'}
                    className="w-full py-3 bg-gradient-to-r from-emerald-500 to-teal-500 hover:from-emerald-400 hover:to-teal-400 text-slate-950 font-bold shadow-lg shadow-emerald-500/10 hover:shadow-emerald-500/20 transition-all duration-300 flex items-center justify-center gap-2 cursor-pointer disabled:opacity-50"
                  >
                    {status === 'sending' ? (
                      <>
                        <div className="animate-spin rounded-full h-4 w-4 border-b-2 border-white" />
                        Sending...
                      </>
                    ) : (
                      <>
                        <IoSendOutline className="text-sm" />
                        Send Message
                      </>
                    )}
                  </button>
                </motion.form>
              )}
            </AnimatePresence>

          </ScrollAnimate>
          
        </div>

      </div>

      {/* Admin Panel Drawer */}
      <AdminPanel 
        isOpen={isAdminOpen} 
        onClose={() => setIsAdminOpen(false)} 
        passcode="admin123" 
      />

    </div>
  );
};

export default Contact;