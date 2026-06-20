import React from 'react';
import { motion } from 'framer-motion';
import { IoGlobeOutline, IoCodeSlashOutline } from 'react-icons/io5';

const Cards = ({ title, image, description, demoLink, codeLink, index = 0 }) => {
  return (
    <motion.div
      initial={{ opacity: 0, y: 40 }}
      whileInView={{ opacity: 1, y: 0 }}
      viewport={{ once: true, margin: '-50px' }}
      transition={{ duration: 0.5, delay: index * 0.1, ease: [0.25, 0.1, 0.25, 1] }}
      whileHover={{ 
        y: -10,
        boxShadow: '0 20px 30px -10px rgba(52, 211, 153, 0.15), 0 10px 15px -5px rgba(45, 212, 191, 0.1)'
      }}
      className="bg-neutral-900/60 backdrop-blur-md border border-neutral-800/60 shadow-xl rounded-2xl overflow-hidden flex flex-col h-full transform-gpu transition-shadow duration-300"
    >
      {/* Image Container with Glow/Zoom */}
      {image && (
        <div className="relative overflow-hidden group h-48 w-full bg-neutral-950">
          <img
            src={image}
            alt={title}
            className="w-full h-full object-cover transform group-hover:scale-110 transition-transform duration-500 ease-out"
          />
          <div className="absolute inset-0 bg-gradient-to-t from-slate-900/40 via-transparent to-transparent opacity-0 group-hover:opacity-100 transition-opacity duration-300 pointer-events-none" />
        </div>
      )}

      {/* Content */}
      <div className="p-6 flex flex-col flex-1 text-center sm:text-left justify-between">
        <div>
          <h3 className="text-xl font-bold text-white tracking-tight group-hover:text-emerald-400 transition-colors">
            {title}
          </h3>
          <p className="text-neutral-400 mt-2.5 text-sm leading-relaxed font-light">
            {description}
          </p>
        </div>

        {/* Buttons */}
        <div className="flex items-center justify-center sm:justify-start gap-3 mt-6">
          {demoLink && (
            <motion.a
              whileTap={{ scale: 0.95 }}
              href={demoLink}
              target="_blank"
              rel="noopener noreferrer"
              className="flex items-center gap-1.5 px-4 py-2 bg-emerald-500 hover:bg-emerald-400 text-slate-950 text-xs font-bold rounded-lg shadow-sm shadow-emerald-500/10 transition-colors cursor-pointer"
            >
              <IoGlobeOutline className="text-sm" />
              Demo
            </motion.a>
          )}

          {codeLink && (
            <motion.a
              whileTap={{ scale: 0.95 }}
              href={codeLink}
              target="_blank"
              rel="noopener noreferrer"
              className="flex items-center gap-1.5 px-4 py-2 bg-neutral-800 hover:bg-neutral-750 text-neutral-300 border border-neutral-700/50 text-xs font-semibold rounded-lg shadow-sm transition-colors cursor-pointer"
            >
              <IoCodeSlashOutline className="text-sm" />
              Source Code
            </motion.a>
          )}
        </div>
      </div>
    </motion.div>
  );
};

export default Cards;