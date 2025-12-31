import React from 'react';
import { Heart } from 'lucide-react';

const Footer: React.FC = () => {
  return (
    <footer className="py-12 border-t border-white/5 relative z-10 bg-[#020617]">
      <div className="container mx-auto px-6 flex flex-col md:flex-row justify-between items-center gap-6">
        <div className="text-center md:text-left">
          <h4 className="text-lg font-light tracking-widest text-white mb-2">SATISH 2026</h4>
          <p className="text-xs text-slate-500">Kathmandu, Nepal</p>
        </div>
        
        <div className="flex items-center gap-2 text-sm text-slate-400">
          <span>Crafted with</span>
          <Heart className="w-3 h-3 text-rose-500 fill-rose-500" />
          <span>for the New Year</span>
        </div>

        <div className="flex gap-6">
          {['Instagram', 'Twitter', 'Facebook'].map(social => (
            <a key={social} href="#" className="text-xs uppercase tracking-wider text-slate-500 hover:text-amber-400 transition-colors">
              {social}
            </a>
          ))}
        </div>
      </div>
    </footer>
  );
};

export default Footer;