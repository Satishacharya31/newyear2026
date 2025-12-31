import React, { useState } from 'react';
import { motion } from 'framer-motion';
import { Check } from 'lucide-react';
import { VisionProps } from '../types';

const Vision: React.FC<VisionProps> = ({ onCelebrate }) => {
  const [committed, setCommitted] = useState(false);

  const handleCommit = () => {
    setCommitted(true);
    // Trigger the celebration effect in App
    onCelebrate();
    // Reset after 3 seconds so they can click again if they want
    setTimeout(() => setCommitted(false), 3000);
  };

  return (
    <section id="vision" className="py-24 px-4 relative overflow-hidden">
      {/* Background Mandala Hint */}
      <div className="absolute top-1/2 left-1/2 -translate-x-1/2 -translate-y-1/2 w-[800px] h-[800px] border border-white/5 rounded-full opacity-20 pointer-events-none"></div>
      <div className="absolute top-1/2 left-1/2 -translate-x-1/2 -translate-y-1/2 w-[600px] h-[600px] border border-white/5 rounded-full opacity-30 pointer-events-none"></div>
      
      <div className="container mx-auto max-w-4xl text-center relative z-10">
        <motion.div
          initial={{ opacity: 0, scale: 0.95 }}
          whileInView={{ opacity: 1, scale: 1 }}
          viewport={{ once: true }}
          transition={{ duration: 0.8 }}
          className="glass-card p-12 md:p-20 rounded-3xl"
        >
          <span className="block text-rose-400 text-sm tracking-[0.3em] uppercase mb-8">
            The Vision
          </span>
          <h3 className="text-2xl md:text-4xl font-light leading-tight text-white mb-8">
            "2026 is not just a new date. It is a canvas for our collective dreams. 
            Let us paint it with <span className="text-amber-400 font-normal">kindness</span>, 
            <span className="text-rose-400 font-normal"> courage</span>, and 
            <span className="text-sky-400 font-normal"> unwavering hope</span>."
          </h3>
          <div className="flex justify-center items-center gap-4 mb-10">
            <span className="h-[1px] w-12 bg-slate-700"></span>
            <span className="font-nepali text-lg text-slate-400">समृद्ध नेपाल, सुखी नेपाली</span>
            <span className="h-[1px] w-12 bg-slate-700"></span>
          </div>

          <button
            onClick={handleCommit}
            className={`group relative overflow-hidden px-8 py-3 rounded-full transition-all duration-300 ${
              committed ? 'bg-green-500 text-white' : 'bg-white/10 hover:bg-white/20 text-white'
            }`}
          >
            <span className={`flex items-center gap-2 text-sm font-bold uppercase tracking-widest ${committed ? 'opacity-100' : 'opacity-100'}`}>
               {committed ? <Check className="w-4 h-4" /> : null}
               {committed ? 'Vision Embraced' : 'Embrace the Vision'}
            </span>
            {!committed && (
              <span className="absolute bottom-0 left-0 w-full h-[2px] bg-amber-400 transform scale-x-0 group-hover:scale-x-100 transition-transform duration-300"></span>
            )}
          </button>

        </motion.div>
      </div>
    </section>
  );
};

export default Vision;