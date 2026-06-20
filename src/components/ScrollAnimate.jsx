import React from 'react';
import { motion } from 'framer-motion';

const ScrollAnimate = ({ children, delay = 0, duration = 0.6, className = "" }) => {
  return (
    <motion.div
      initial={{ opacity: 0, y: 35 }}
      whileInView={{ opacity: 1, y: 0 }}
      viewport={{ once: true, margin: "-80px" }}
      transition={{ duration, delay, ease: [0.16, 1, 0.3, 1] }} // smooth easeOutExpo
      className={className}
    >
      {children}
    </motion.div>
  );
};

export default ScrollAnimate;
