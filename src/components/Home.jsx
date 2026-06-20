import React, { useEffect, useState } from 'react';
import { motion } from 'framer-motion';
import ParticleCanvas from './ParticleCanvas';
import { IoChevronDownOutline } from 'react-icons/io5';

const Home = () => {
  const texts = [" Somya Sharma", " a Full Stack Developer", " a Creative Programmer"];

  const [text, setText] = useState('');
  const [index, setIndex] = useState(0);
  const [isDeleting, setIsDeleting] = useState(false);
  const [charIndex, setCharIndex] = useState(0);

  useEffect(() => {
    const currentText = texts[index];
    const speed = isDeleting ? 40 : 85; // Faster deletes

    const timeout = setTimeout(() => {
      if (!isDeleting) {
        // typing
        setText(currentText.substring(0, charIndex + 1));
        setCharIndex(charIndex + 1);

        if (charIndex + 1 === currentText.length) {
          setTimeout(() => setIsDeleting(true), 1500); // pause before deleting
        }
      } else {
        // deleting
        setText(currentText.substring(0, charIndex - 1));
        setCharIndex(charIndex - 1);

        if (charIndex - 1 === 0) {
          setIsDeleting(false);
          setIndex((prev) => (prev + 1) % texts.length);
        }
      }
    }, speed);

    return () => clearTimeout(timeout);
  }, [charIndex, isDeleting, index]);

  const handleScrollTo = (id) => {
    const element = document.getElementById(id);
    if (element) {
      element.scrollIntoView({ behavior: 'smooth' });
    }
  };

  return (
    <div 
      className="min-h-screen relative flex flex-col items-center justify-center bg-gradient-to-b from-neutral-950 via-neutral-900 to-neutral-950 text-white overflow-hidden" 
      id="home"
    >
      {/* Dynamic Network Canvas Background */}
      <ParticleCanvas />

      {/* Hero content container */}
      <div className="text-center px-6 relative z-10 max-w-4xl flex flex-col items-center mt-12">
        
        {/* Subtle Greeting Badge */}
        <motion.div
          initial={{ opacity: 0, scale: 0.9 }}
          animate={{ opacity: 1, scale: 1 }}
          transition={{ duration: 0.6 }}
          className="px-4 py-1.5 bg-emerald-500/10 border border-emerald-500/20 rounded-full text-emerald-400 text-xs font-semibold uppercase tracking-wider mb-6 backdrop-blur-md"
        >
          Welcome to my portfolio
        </motion.div>

        {/* Dynamic Title */}
        <motion.h1 
          initial={{ opacity: 0, y: 25 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ duration: 0.8, delay: 0.1 }}
          className="text-4xl sm:text-6xl font-extrabold tracking-tight leading-none text-white max-w-3xl"
        >
          Hello, I'm 
          <span className="block mt-2 bg-clip-text text-transparent bg-gradient-to-r from-emerald-400 via-teal-400 to-emerald-300">
            {text}
            <span className="inline-block w-1.5 h-8 sm:h-12 bg-emerald-400 ml-1.5 animate-pulse" />
          </span>
        </motion.h1>

        {/* Description */}
        <motion.p 
          initial={{ opacity: 0, y: 25 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ duration: 0.8, delay: 0.2 }}
          className="text-slate-350 mt-6 text-base sm:text-lg max-w-2xl leading-relaxed font-light"
        >
          I am a Full Stack Developer passionate about building high-performance, user-friendly web applications. I bridge the gap between design concepts and robust backend services.
        </motion.p>

        {/* Buttons */}
        <motion.div 
          initial={{ opacity: 0, y: 25 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ duration: 0.8, delay: 0.3 }}
          className="flex flex-wrap gap-4 justify-center mt-10"
        >
          <button 
            className="px-8 py-3.5 bg-gradient-to-r from-emerald-500 to-teal-500 hover:from-emerald-400 hover:to-teal-400 text-slate-950 font-extrabold rounded-xl shadow-lg shadow-emerald-500/20 transition-all hover:scale-105 duration-300 cursor-pointer text-sm tracking-wide"
            onClick={() => handleScrollTo('projects')}
          >
            View My Work
          </button>
          
          <button
            className="px-8 py-3.5 bg-neutral-900 hover:bg-neutral-800 text-slate-100 border border-neutral-800 font-bold rounded-xl shadow-md transition-all hover:scale-105 duration-300 cursor-pointer text-sm tracking-wide"
            onClick={() => handleScrollTo('contact')}
          >
            Contact Me
          </button>
        </motion.div>
      </div>

      {/* Down arrow link indicator */}
      <motion.div 
        initial={{ opacity: 0 }}
        animate={{ opacity: 0.7, y: [0, 10, 0] }}
        transition={{ delay: 1, duration: 2, repeat: Infinity }}
        className="absolute bottom-8 cursor-pointer z-10"
        onClick={() => handleScrollTo('about')}
      >
        <IoChevronDownOutline className="text-3xl text-slate-500 hover:text-emerald-450 transition-colors" />
      </motion.div>

    </div>
  );
};

export default Home;