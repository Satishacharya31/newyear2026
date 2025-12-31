import React from 'react';
import { motion } from 'framer-motion';
import { WISHES } from '../constants';

const container = {
  hidden: { opacity: 0 },
  show: {
    opacity: 1,
    transition: {
      staggerChildren: 0.2
    }
  }
};

const item = {
  hidden: { opacity: 0, y: 20 },
  show: { opacity: 1, y: 0, transition: { duration: 0.6 } }
};

const Wishes: React.FC = () => {
  return (
    <section id="wishes" className="py-24 px-4 relative z-10">
      <div className="container mx-auto max-w-6xl">
        <motion.div
          initial={{ opacity: 0, y: 10 }}
          whileInView={{ opacity: 1, y: 0 }}
          viewport={{ once: true }}
          className="text-center mb-16"
        >
          <h2 className="text-3xl md:text-4xl font-light mb-4 text-white">
            Wishes for the <span className="text-amber-400 font-normal">New Era</span>
          </h2>
          <div className="w-24 h-[1px] bg-gradient-to-r from-transparent via-amber-500/50 to-transparent mx-auto"></div>
        </motion.div>

        <motion.div
          variants={container}
          initial="hidden"
          whileInView="show"
          viewport={{ once: true }}
          className="grid grid-cols-1 md:grid-cols-3 gap-8"
        >
          {WISHES.map((wish) => (
            <motion.div
              key={wish.id}
              variants={item}
              whileHover={{ y: -5 }}
              className="glass-card p-8 rounded-2xl border-t border-white/10 hover:border-amber-500/30 transition-colors duration-300 group"
            >
              <div className="mb-6">
                <span className="text-amber-500/20 text-6xl font-serif absolute top-4 right-6 group-hover:text-amber-500/40 transition-colors">”</span>
                <h3 className="text-xl font-medium text-slate-100 mb-2">{wish.title}</h3>
              </div>
              <p className="text-slate-400 font-light leading-relaxed mb-6">
                {wish.message}
              </p>
              {wish.nepaliMessage && (
                <p className="text-amber-100/80 font-nepali text-sm mb-6 border-l-2 border-amber-500/30 pl-3 py-1">
                  {wish.nepaliMessage}
                </p>
              )}
              <div className="flex items-center gap-3 mt-auto">
                <div className="w-8 h-[1px] bg-slate-700"></div>
                <span className="text-xs uppercase tracking-widest text-slate-500 group-hover:text-amber-400 transition-colors">
                  {wish.author}
                </span>
              </div>
            </motion.div>
          ))}
        </motion.div>
      </div>
    </section>
  );
};

export default Wishes;
