import React, { useState, useEffect } from 'react';
import { Menu, X, Sparkles, Music, Bell } from 'lucide-react';
import { NAV_ITEMS } from '../constants';
import { motion, AnimatePresence } from 'framer-motion';
import { NavbarProps } from '../types';

const Navbar: React.FC<NavbarProps> = ({ isCelebrating, onToggleCelebration }) => {
  const [isScrolled, setIsScrolled] = useState(false);
  const [isMobileMenuOpen, setIsMobileMenuOpen] = useState(false);

  useEffect(() => {
    const handleScroll = () => {
      setIsScrolled(window.scrollY > 50);
    };
    window.addEventListener('scroll', handleScroll);
    return () => window.removeEventListener('scroll', handleScroll);
  }, []);

  return (
    <nav
      className={`fixed top-0 left-0 w-full z-50 transition-all duration-300 ${isScrolled ? 'bg-[#020617]/80 backdrop-blur-md border-b border-white/5 py-4' : 'bg-transparent py-6'
        }`}
    >
      <div className="container mx-auto px-6 flex justify-between items-center">
        <div className="flex items-center gap-2 cursor-pointer group" onClick={() => window.scrollTo({ top: 0, behavior: 'smooth' })}>
          <Sparkles className={`w-6 h-6 text-amber-400 transition-transform duration-500 ${isCelebrating ? 'animate-spin' : 'group-hover:rotate-12'}`} />
          <span className="text-xl font-light tracking-widest text-white">
            SATISH <span className="font-bold text-amber-400">2026</span>
          </span>
        </div>

        {/* Desktop Nav */}
        <div className="hidden md:flex items-center gap-8">
          {NAV_ITEMS.map((item) => (
            <a
              key={item.label}
              href={item.href}
              className="text-sm uppercase tracking-widest text-slate-300 hover:text-white transition-colors relative group"
            >
              {item.label}
              <span className="absolute -bottom-1 left-0 w-0 h-[1px] bg-amber-400 transition-all duration-300 group-hover:w-full"></span>
            </a>
          ))}
          <button
            onClick={onToggleCelebration}
            className={`px-5 py-2 text-xs font-bold uppercase tracking-wider border transition-all rounded-full flex items-center gap-2 ${isCelebrating
              ? 'bg-amber-400 text-slate-900 border-amber-400 hover:bg-amber-300'
              : 'border-white/20 hover:bg-white hover:text-slate-900 text-white'
              }`}
          >
            {isCelebrating ? <><Music className="w-3 h-3 animate-pulse" /> Playing</> : 'Celebrate'}
          </button>

          <button
            onClick={() => {
              if ("Notification" in window) {
                Notification.requestPermission().then(p => {
                  if (p === 'granted') alert("Notifications Enabled!");
                })
              }
            }}
            className="p-2 text-slate-400 hover:text-amber-400 transition-colors"
            title="Enable Notifications"
          >
            <Bell className="w-5 h-5" />
          </button>
        </div>

        {/* Mobile Toggle */}
        <div className="flex items-center gap-4 md:hidden">
          <button
            onClick={onToggleCelebration}
            className={`p-2 rounded-full border ${isCelebrating ? 'bg-amber-400 border-amber-400 text-slate-900' : 'border-white/20 text-white'}`}
          >
            <Sparkles className="w-4 h-4" />
          </button>
          <button
            className="text-white"
            onClick={() => setIsMobileMenuOpen(!isMobileMenuOpen)}
          >
            {isMobileMenuOpen ? <X /> : <Menu />}
          </button>
        </div>
      </div>

      {/* Mobile Menu */}
      <AnimatePresence>
        {isMobileMenuOpen && (
          <motion.div
            initial={{ opacity: 0, y: -20 }}
            animate={{ opacity: 1, y: 0 }}
            exit={{ opacity: 0, y: -20 }}
            className="absolute top-full left-0 w-full bg-[#020617] border-b border-white/10 md:hidden flex flex-col items-center py-8 gap-6 shadow-2xl"
          >
            {NAV_ITEMS.map((item) => (
              <a
                key={item.label}
                href={item.href}
                className="text-lg text-slate-200"
                onClick={() => setIsMobileMenuOpen(false)}
              >
                {item.label}
              </a>
            ))}
          </motion.div>
        )}
      </AnimatePresence>
    </nav>
  );
};

export default Navbar;