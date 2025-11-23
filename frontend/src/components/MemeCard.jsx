import React from 'react';
import { motion } from 'framer-motion';
import { Sparkles } from 'lucide-react';
import { optimizeImage } from '@/utils/image'; // ✨ Import this

const MemeCard = ({ meme, index }) => {
  const matchPercentage = Math.round(meme.score * 100);
  const isTopMatch = index === 0;
  
  // ... (Keep existing colors logic) ...
  const glowColor = isTopMatch ? 'shadow-violet-500/40 border-violet-500/30' : 
                    matchPercentage > 75 ? 'shadow-emerald-500/20 border-emerald-500/20' : 
                    'shadow-blue-500/10 border-white/10';

  return (
    <motion.div
      // ... (Keep existing animation props) ...
      layout
      initial={{ opacity: 0, y: 20 }}
      animate={{ opacity: 1, y: 0 }}
      transition={{ duration: 0.4, delay: index * 0.1 }}
      whileHover={{ y: -8, scale: 1.02 }}
      className={`relative mb-6 break-inside-avoid rounded-2xl overflow-hidden bg-slate-900/40 backdrop-blur-md border ${glowColor} shadow-xl transition-all duration-300 group cursor-zoom-in`}
    >
      
      {/* ✨ OPTIMIZED IMAGE SOURCE */}
      <img 
        src={optimizeImage(meme.imageUrl, 600)} 
        alt={meme.description || "Meme search result"} 
        className="w-full h-auto object-cover block"
        loading="lazy"
        // Add basic width/height to prevent layout shift if known, otherwise CSS handles it
      />

      {/* ... (Keep the rest of the component exactly the same) ... */}
      {isTopMatch && (
        <div className="absolute top-3 right-3 bg-violet-600 text-white text-[10px] font-bold px-3 py-1 rounded-full shadow-lg shadow-violet-500/50 flex items-center gap-1 z-10 animate-pulse">
          <Sparkles className="w-3 h-3" /> TOP MATCH
        </div>
      )}

      <div className="absolute inset-0 bg-gradient-to-t from-slate-950 via-transparent to-transparent opacity-80 transition-opacity duration-300 flex flex-col justify-end p-4">
        <div className="flex justify-between items-end">
          <div className="flex flex-col gap-1">
            <span className="text-[10px] text-slate-400 font-medium tracking-wider uppercase">Match Score</span>
            <span className={`text-2xl font-black tracking-tight ${isTopMatch ? 'text-violet-400' : 'text-white'}`}>
              {matchPercentage}%
            </span>
          </div>
          <div className="h-1 w-12 bg-slate-700 rounded-full overflow-hidden">
            <motion.div 
              initial={{ width: 0 }}
              animate={{ width: `${matchPercentage}%` }}
              transition={{ duration: 1, delay: 0.5 }}
              className={`h-full ${isTopMatch ? 'bg-violet-500' : 'bg-blue-400'}`} 
            />
          </div>
        </div>
        
        {meme.description && (
          <motion.div 
            initial={{ height: 0, opacity: 0 }}
            whileHover={{ height: 'auto', opacity: 1 }}
            className="overflow-hidden sm:group-hover:mt-3"
          >
            <p className="text-slate-300 text-xs font-medium leading-relaxed border-l-2 border-slate-600 pl-2">
              {meme.description}
            </p>
          </motion.div>
        )}
      </div>

      <div className={`absolute -inset-1 bg-gradient-to-r ${isTopMatch ? 'from-violet-600/20 to-fuchsia-600/20' : 'from-blue-500/0 to-cyan-500/0'} blur-xl -z-10 group-hover:opacity-100 opacity-0 transition-opacity duration-500`} />

    </motion.div>
  );
};

export default MemeCard;