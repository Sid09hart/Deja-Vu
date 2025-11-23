import React from 'react';
import { motion } from 'framer-motion';
import { Upload, Zap } from 'lucide-react';

const Navbar = ({ onOpenUpload }) => {
  return (
    <motion.div 
      initial={{ y: -50, opacity: 0 }}
      animate={{ y: 0, opacity: 1 }}
      transition={{ duration: 0.8, ease: "easeOut" }}
      className="fixed top-6 left-0 right-0 z-50 flex justify-center px-4"
    >
      {/* The Pill Container */}
      <div className="flex items-center justify-between w-full max-w-3xl bg-slate-900/60 backdrop-blur-xl border border-white/10 rounded-full px-6 py-3 shadow-2xl shadow-violet-500/10">
        
        {/* Brand */}
        <div className="flex items-center gap-3 group cursor-pointer">
          <div className="p-2 bg-gradient-to-br from-violet-500 to-fuchsia-500 rounded-full shadow-lg shadow-violet-500/40 group-hover:scale-110 transition-transform">
            <Zap className="w-4 h-4 text-white fill-white" />
          </div>
          <span className="text-white font-bold tracking-wide text-lg hidden sm:block">
            MemeEa
          </span>
        </div>

        {/* Center Links (Visual only to match reference) */}
        <div className="hidden md:flex items-center gap-8 text-sm font-medium text-slate-400">
          <span className="hover:text-white cursor-pointer transition-colors">Features</span>
          <span className="hover:text-white cursor-pointer transition-colors">Vault</span>
          <span className="hover:text-white cursor-pointer transition-colors">Pricing</span>
        </div>

        {/* Action Button */}
        <button
          onClick={onOpenUpload}
          className="flex items-center gap-2 px-5 py-2 bg-white/10 hover:bg-white/20 border border-white/10 rounded-full text-white text-sm font-semibold transition-all hover:scale-105 active:scale-95"
        >
          <Upload className="w-4 h-4" />
          <span>Upload</span>
        </button>

      </div>
    </motion.div>
  );
};

export default Navbar;