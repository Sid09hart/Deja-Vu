import React, { useMemo } from 'react'; // ✨ Import useMemo
import { motion } from 'framer-motion';
import { Cat, Dog, Rocket, Zap, Music, Ghost, Star } from 'lucide-react';

const icons = [
  { Icon: Cat, color: 'text-orange-400', size: 45 },
  { Icon: Dog, color: 'text-cyan-400', size: 50 },
  { Icon: Rocket, color: 'text-emerald-400', size: 40 },
  { Icon: Music, color: 'text-pink-500', size: 35 },
  { Icon: Zap, color: 'text-yellow-400', size: 55 },
  { Icon: Ghost, color: 'text-violet-400', size: 48 },
  { Icon: Star, color: 'text-blue-400', size: 30 },
];

const FlowingIcon = ({ item, index }) => {
  // ✨ FREEZE RANDOMNESS: Calculate these ONCE per mount, not every render
  const animationConfig = useMemo(() => {
    const isHorizontal = index % 2 === 0;
    const duration = 25 + Math.random() * 15;
    const delay = Math.random() * 5;
    
    return {
      duration,
      delay,
      variants: {
        x: isHorizontal 
           ? ['-10vw', '110vw'] 
           : [Math.random() * 100 + 'vw', Math.random() * 100 + 'vw'],
        y: isHorizontal 
           ? [Math.random() * 100 + 'vh', Math.random() * 100 + 'vh'] 
           : ['110vh', '-10vh'],
        rotate: [0, isHorizontal ? 360 : -360],
      }
    };
  }, [index]);

  return (
    <motion.div
      initial={{ opacity: 0 }}
      animate={{ 
        opacity: [0, 1, 1, 0], 
        x: animationConfig.variants.x,
        y: animationConfig.variants.y,
        rotate: animationConfig.variants.rotate,
      }}
      transition={{
        duration: animationConfig.duration,
        repeat: Infinity,
        ease: "linear",
        delay: animationConfig.delay,
      }}
      className={`absolute flex items-center justify-center rounded-full backdrop-blur-sm border border-white/10`}
      style={{
        width: item.size * 2.5 + 'px',
        height: item.size * 2.5 + 'px',
        boxShadow: `0 0 20px 5px currentColor, inset 0 0 20px 5px currentColor`, 
        color: item.color.replace('text-', '').replace('-400', '').replace('-500', '') === 'orange' ? 'rgba(251, 146, 60, 0.3)' : 
               item.color.includes('cyan') ? 'rgba(34, 211, 238, 0.3)' :
               item.color.includes('emerald') ? 'rgba(52, 211, 153, 0.3)' :
               item.color.includes('pink') ? 'rgba(244, 114, 182, 0.3)' :
               item.color.includes('yellow') ? 'rgba(250, 204, 21, 0.3)' :
               item.color.includes('violet') ? 'rgba(167, 139, 250, 0.3)' : 'rgba(96, 165, 250, 0.3)'
      }}
    >
      <item.Icon 
        size={item.size} 
        className={`${item.color} drop-shadow-[0_0_15px_rgba(255,255,255,0.8)] relative z-10`} 
        strokeWidth={2.5}
      />
      <div className="absolute top-[15%] left-[15%] w-[25%] h-[15%] bg-white/40 rounded-full blur-[2px] z-20" />
    </motion.div>
  );
};

const FloatingShapes = () => {
  return (
    <div className="fixed inset-0 pointer-events-none overflow-hidden -z-10 bg-slate-950">
      <motion.div 
        animate={{ scale: [1, 1.2, 1], opacity: [0.2, 0.4, 0.2] }}
        transition={{ duration: 10, repeat: Infinity }}
        className="absolute top-0 left-0 w-full h-full bg-gradient-to-br from-violet-900/20 via-slate-900/50 to-blue-900/20"
      />
      
      {icons.map((item, index) => (
        <FlowingIcon key={index} item={item} index={index} />
      ))}
      {icons.map((item, index) => (
        <FlowingIcon key={`dup-${index}`} item={item} index={index + 4} />
      ))}
    </div>
  );
};

// ✨ THE FIX: React.memo prevents re-renders when parent state changes
export default React.memo(FloatingShapes);