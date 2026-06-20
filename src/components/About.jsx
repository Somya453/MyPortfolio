import React from 'react';
import { IoChevronForwardOutline, IoCodeOutline, IoServerOutline, IoRocketOutline } from 'react-icons/io5';
import ScrollAnimate from './ScrollAnimate';

const About = () => {
  const skills = [
    {
      title: 'Frontend Development',
      desc: 'Crafting responsive, high-performance UI using HTML5, CSS3, JavaScript (ES6+), React, and Tailwind CSS.',
      icon: <IoCodeOutline className="text-xl" />,
      color: 'bg-emerald-600'
    },
    {
      title: 'Backend Development',
      desc: 'Building scalable server architectures, RESTful APIs, and database configurations using Node.js, Express, and databases.',
      icon: <IoServerOutline className="text-xl" />,
      color: 'bg-teal-600'
    },
    {
      title: 'Full Stack Integration',
      desc: 'Developing end-to-end web apps, implementing data persistence, and managing state across client-server boundaries.',
      icon: <IoRocketOutline className="text-xl" />,
      color: 'bg-neutral-850'
    }
  ];

  return (
    <div className="min-h-screen flex items-center justify-center bg-gradient-to-b from-neutral-950 to-neutral-900 text-slate-100 py-24 px-6 relative overflow-hidden" id="about">
      {/* Background ambient lighting */}
      <div className="absolute top-1/3 left-0 w-80 h-80 bg-emerald-500/5 rounded-full blur-3xl pointer-events-none" />
      <div className="absolute bottom-1/3 right-0 w-80 h-80 bg-teal-500/5 rounded-full blur-3xl pointer-events-none" />

      <div className="max-w-5xl w-full relative z-10">
        <ScrollAnimate className="md:flex items-center gap-12 bg-neutral-900/40 backdrop-blur-md border border-neutral-800/60 shadow-2xl rounded-3xl p-8 md:p-12">
          
          {/* Image Section (LHS) */}
          <div className="flex justify-center md:w-2/5 mb-8 md:mb-0">
            <div className="relative group">
              {/* Spinning glow ring */}
              <div className="absolute inset-0 bg-gradient-to-r from-emerald-500 via-teal-500 to-emerald-400 rounded-full blur-xl opacity-40 group-hover:opacity-75 group-hover:scale-105 transition duration-500 animate-pulse" />
              <img
                src="https://thf.bing.com/th/id/OIP.0d-U1yr-9TxQ2TLj2hSEHwHaHa?w=197&h=180&c=7&r=0&o=7&cb=thfc1falcon2&dpr=1.3&pid=1.7&rm=3"
                alt="About Me"
                onError={(e) => {
                  // Fallback image if local profile doesn't exist
                  e.target.src = 'https://images.unsplash.com/photo-1534528741775-53994a69daeb?w=400&auto=format&fit=crop&q=80';
                }}
                className="w-64 h-64 md:w-72 md:h-72 object-cover rounded-full border-4 border-neutral-850 relative z-10 shadow-2xl transition duration-500 group-hover:scale-[1.02]"
              />
            </div>
          </div>

          {/* Content Section (RHS) */}
          <div className="md:w-3/5 text-center md:text-left flex flex-col justify-center">
            <h2 className="text-3xl md:text-4xl font-extrabold text-white mb-4 tracking-tight">
              About Me
            </h2>
            <div className="h-1.5 w-20 bg-gradient-to-r from-emerald-400 to-teal-400 rounded-full mx-auto md:mx-0 mb-6" />

            <p className="text-slate-350 text-base md:text-lg leading-relaxed font-light mb-8">
              I am a passionate Full Stack Developer at the beginning of my engineering career. I enjoy learning state-of-the-art web architectures, designing responsive and accessible interfaces, and solving complex problems. I love turning creative UI concepts into solid, clean, and interactive production-ready code.
            </p>

            {/* Skills / Roles Accordion */}
            <div className="space-y-4 text-left">
              {skills.map((skill, index) => (
                <div 
                  key={index}
                  className="group flex gap-4 p-4 bg-neutral-900/50 hover:bg-neutral-900/80 border border-neutral-800/60 rounded-2xl transition-all duration-300 hover:border-neutral-750/50"
                >
                  <div className={`flex-shrink-0 flex items-center justify-center w-10 h-10 ${skill.color} text-white rounded-xl shadow-md`}>
                    {skill.icon}
                  </div>
                  <div>
                    <h4 className="font-bold text-slate-100 text-sm md:text-base flex items-center gap-1 group-hover:text-emerald-400 transition-colors">
                      {skill.title}
                      <IoChevronForwardOutline className="text-xs opacity-0 group-hover:opacity-100 group-hover:translate-x-1 transition-all" />
                    </h4>
                    <p className="text-slate-400 text-xs md:text-sm mt-1 leading-relaxed font-light">
                      {skill.desc}
                    </p>
                  </div>
                </div>
              ))}
            </div>

          </div>

        </ScrollAnimate>
      </div>
    </div>
  );
};

export default About;