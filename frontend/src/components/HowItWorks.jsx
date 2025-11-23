import React from 'react';
import { motion } from 'framer-motion';
import { UploadCloud, ScanFace, Search } from 'lucide-react';

const StepCard = ({ icon: Icon, title, desc, delay }) => (
  <motion.div 
    initial={{ opacity: 0, y: 20 }}
    animate={{ opacity: 1, y: 0 }}
    transition={{ delay, duration: 0.5 }}
    className="flex flex-col items-center text-center p-6 bg-slate-900/40 border border-slate-800/60 rounded-2xl backdrop-blur-sm hover:bg-slate-800/60 transition-colors group cursor-default"
  >
    <div className="p-4 bg-slate-800 rounded-full mb-4 text-violet-400 shadow-lg shadow-violet-900/10 group-hover:scale-110 transition-transform duration-300">
      <Icon className="w-8 h-8" />
    </div>
    <h3 className="text-lg font-bold text-white mb-2">{title}</h3>
    <p className="text-slate-400 text-sm leading-relaxed">{desc}</p>
  </motion.div>
);

const HowItWorks = () => {
  return (
    <div className="w-full max-w-5xl mx-auto mt-12 sm:mt-20 px-4">
      <motion.p 
        initial={{ opacity: 0 }} 
        animate={{ opacity: 1 }} 
        className="text-center text-slate-500 text-xs font-semibold tracking-widest uppercase mb-8"
      >
        How the Magic Happens
      </motion.p>
      
      <div className="grid grid-cols-1 sm:grid-cols-3 gap-6">
        <StepCard 
          icon={UploadCloud} 
          title="1. Upload" 
          desc="Drag & drop any meme. No manual tagging required."
          delay={0.2}
        />
        <StepCard 
          icon={ScanFace} 
          title="2. AI Vision" 
          desc="Our CLIP model 'watches' the image to understand the context."
          delay={0.4}
        />
        <StepCard 
          icon={Search} 
          title="3. Discover" 
          desc="Search by 'vibe' or description (e.g., 'awkward silence')."
          delay={0.6}
        />
      </div>
    </div>
  );
};

export default HowItWorks;