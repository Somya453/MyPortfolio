import React, { useState, useEffect } from 'react';
import { motion, AnimatePresence } from 'framer-motion';

const Navbar = () => {
  const [menu, setMenu] = useState(false);
  const [scrolled, setScrolled] = useState(false);

  // Detect scroll to style the navbar sticky background
  useEffect(() => {
    const handleScroll = () => {
      if (window.scrollY > 40) {
        setScrolled(true);
      } else {
        setScrolled(false);
      }
    };
    window.addEventListener('scroll', handleScroll);
    return () => window.removeEventListener('scroll', handleScroll);
  }, []);

  const navItems = [
    { label: 'Home', id: 'home' },
    { label: 'About', id: 'about' },
    { label: 'Projects', id: 'projects' },
    { label: 'Contact', id: 'contact' },
  ];

  const handleScrollTo = (id) => {
    setMenu(false);
    const element = document.getElementById(id);
    if (element) {
      element.scrollIntoView({ behavior: 'smooth' });
    }
  };

  return (
    <nav className={`fixed top-0 left-0 w-full z-40 transition-all duration-300 ${
      scrolled 
        ? 'bg-neutral-950/80 backdrop-blur-lg border-b border-neutral-900/50 py-3 shadow-lg' 
        : 'bg-transparent py-5'
    }`}>
      <div className="max-w-6xl mx-auto px-6 flex items-center justify-between">
        
        {/* Logo */}
        <motion.div 
          initial={{ opacity: 0, x: -20 }}
          animate={{ opacity: 1, x: 0 }}
          className="text-white font-extrabold text-xl tracking-wider bg-clip-text text-transparent bg-gradient-to-r from-emerald-400 to-teal-400 cursor-pointer"
          onClick={() => handleScrollTo('home')}
        >
          SOMYA SHARMA
        </motion.div>

        {/* Desktop Menu Link Options */}
        <ul className="hidden md:flex items-center gap-8">
          {navItems.map((item, index) => (
            <motion.li 
              key={item.id}
              initial={{ opacity: 0, y: -10 }}
              animate={{ opacity: 1, y: 0 }}
              transition={{ delay: index * 0.1 }}
            >
              <button
                onClick={() => handleScrollTo(item.id)}
                className="text-slate-300 hover:text-white text-sm font-semibold tracking-wide cursor-pointer transition-colors duration-200 relative group py-1.5"
              >
                {item.label}
                <span className="absolute bottom-0 left-0 w-0 h-0.5 bg-gradient-to-r from-emerald-400 to-teal-400 transition-all duration-300 group-hover:w-full" />
              </button>
            </motion.li>
          ))}
        </ul>

        {/* Hamburger Menu Toggle for Mobile */}
        <motion.button
          initial={{ opacity: 0, scale: 0.8 }}
          animate={{ opacity: 1, scale: 1 }}
          onClick={() => setMenu(!menu)}
          className="text-slate-200 md:hidden p-2 hover:bg-slate-800/50 rounded-lg transition-colors cursor-pointer"
        >
          <div className="w-6 h-5 flex flex-col justify-between items-end">
            <span className={`h-0.5 bg-current rounded transition-all duration-300 ${menu ? 'w-6 translate-y-2 rotate-45' : 'w-6'}`} />
            <span className={`h-0.5 bg-current rounded transition-all duration-300 ${menu ? 'w-0 opacity-0' : 'w-4'}`} />
            <span className={`h-0.5 bg-current rounded transition-all duration-300 ${menu ? 'w-6 -translate-y-2.5 -rotate-45' : 'w-5'}`} />
          </div>
        </motion.button>
      </div>

      {/* Mobile Drawer Menu Links */}
      <AnimatePresence>
        {menu && (
          <motion.div
            initial={{ opacity: 0, height: 0 }}
            animate={{ opacity: 1, height: 'auto' }}
            exit={{ opacity: 0, height: 0 }}
            className="md:hidden bg-neutral-900/95 backdrop-blur-xl border-b border-neutral-850/60"
          >
            <ul className="px-6 py-4 flex flex-col gap-4">
              {navItems.map((item) => (
                <li key={item.id}>
                  <button
                    onClick={() => handleScrollTo(item.id)}
                    className="text-slate-300 hover:text-white text-left font-semibold text-base py-1 w-full cursor-pointer transition-colors"
                  >
                    {item.label}
                  </button>
                </li>
              ))}
            </ul>
          </motion.div>
        )}
      </AnimatePresence>
    </nav>
  );
};

export default Navbar;