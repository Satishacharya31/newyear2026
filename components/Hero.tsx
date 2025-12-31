import React from 'react';
import { motion } from 'framer-motion';
import { HERO_TITLE_EN, HERO_TITLE_NE, HERO_SUBTITLE } from '../constants';
import Countdown from './Countdown';
import { ChevronDown } from 'lucide-react';

const Hero: React.FC = () => {
  return (
    <section id="hero" className="relative min-h-screen flex flex-col justify-center items-center px-4 pt-20 overflow-hidden">
      
      {/* Decorative Gradient Blob */}
      <div className="absolute top-1/4 left-1/2 -translate-x-1/2 w-[500px] h-[500px] bg-rose-500/10 rounded-full blur-[100px] pointer-events-none" />
      <div className="absolute bottom-0 right-0 w-[400px] h-[400px] bg-amber-500/5 rounded-full blur-[80px] pointer-events-none" />

      <motion.div
        initial={{ opacity: 0, y: 30 }}
        animate={{ opacity: 1, y: 0 }}
        transition={{ duration: 1, ease: "easeOut" }}
        className="text-center z-10"
      >
        <span className="inline-block py-1 px-3 rounded-full border border-amber-500/30 text-amber-400 text-xs tracking-[0.2em] uppercase mb-6 bg-amber-900/10 backdrop-blur-sm">
          Coming Soon
        </span>
        
        <h1 className="text-7xl md:text-9xl font-bold mb-2 tracking-tighter text-transparent bg-clip-text bg-gradient-to-b from-white to-slate-400">
          2026
        </h1>
        
        <div className="space-y-2 mb-10">
          <p className="text-xl md:text-2xl font-light text-slate-200 tracking-wide">
            {HERO_TITLE_EN}
          </p>
          <p className="text-lg md:text-xl font-nepali text-amber-400/90">
            {HERO_TITLE_NE}
          </p>
        </div>

        <div className="mb-12">
          <p className="text-sm text-slate-400 tracking-widest uppercase mb-8 max-w-md mx-auto leading-relaxed">
            {HERO_SUBTITLE}
          </p>
          <Countdown />
        </div>

      </motion.div>

      <motion.div
        initial={{ opacity: 0 }}
        animate={{ opacity: 1 }}
        transition={{ delay: 1.5, duration: 1 }}
        className="absolute bottom-8 left-1/2 -translate-x-1/2 animate-bounce"
      >
        <ChevronDown className="text-slate-600 w-6 h-6" />
      </motion.div>
    </section>
  );
};

export default Hero;
