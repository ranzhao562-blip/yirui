
import React, { useState, useRef } from 'react';
import { motion, AnimatePresence } from 'framer-motion';

const CeladonEwerVisual: React.FC<{ isPouring: boolean }> = ({ isPouring }) => (
  // Mobile: w-32 h-44 (Slightly larger for better interaction), Desktop: w-40 h-56
  <div className="relative w-32 h-44 md:w-40 md:h-56 flex items-center justify-center transition-all duration-300">
    <svg viewBox="0 0 200 300" className="w-full h-full overflow-visible">
      <path d="M65,165 Q10,155 35,90 L50,95 Q30,140 75,160 Z" fill="#d4dcc6" stroke="#8a9678" strokeWidth="1" />
      <path d="M60,160 Q60,135 100,135 Q140,135 140,160 L145,240 Q145,275 100,275 Q55,275 55,240 Z" fill="#d4dcc6" stroke="#8a9678" strokeWidth="1" />
      <path d="M75,140 Q75,40 60,35 L140,35 Q125,40 125,140 Z" fill="#d4dcc6" stroke="#8a9678" strokeWidth="1.5" />
      <path d="M135,65 Q175,65 165,160 Q160,195 140,195" fill="none" stroke="#d4dcc6" strokeWidth="8" strokeLinecap="round" />
      <path d="M135,65 Q175,65 165,160 Q160,195 140,195" fill="none" stroke="#8a9678" strokeWidth="0.5" strokeLinecap="round" />
    </svg>
  </div>
);

const Step8: React.FC<{ onComplete: () => void }> = ({ onComplete }) => {
  const [isPouring, setIsPouring] = useState(false);
  const [isFinished, setIsFinished] = useState(false);
  const completeCalled = useRef(false);

  // Check collision between Ewer drag and Cup
  const handleDrag = (event: any, info: any) => {
    if (isFinished || completeCalled.current) return;
    
    const cupRect = document.getElementById('target-cup-8')?.getBoundingClientRect();
    if (cupRect) {
      // Use client coordinates from pointer to check if inside cup area
      const point = { x: info.point.x, y: info.point.y };
      const hitPadding = 40;
      
      const isOver = 
        point.x > cupRect.left - hitPadding &&
        point.x < cupRect.right + hitPadding &&
        point.y > cupRect.top - hitPadding &&
        point.y < cupRect.bottom + hitPadding;

      if (isOver) {
        setIsPouring(true);
        setIsFinished(true);
        completeCalled.current = true;
        setTimeout(onComplete, 2000);
      }
    }
  };

  return (
    <div className="flex flex-col items-center gap-12 w-full h-full justify-center">
      {/* Layout: Desktop row, Mobile col */}
      <div className="flex flex-col md:flex-row items-center md:items-end gap-16 md:gap-16">
        
        {/* Target Cup */}
        <div 
          id="target-cup-8"
          // Mobile: Larger cup for better visibility w-48 h-32. Desktop kept same.
          className="relative w-48 h-32 md:w-48 md:h-32 bg-stone-900 rounded-b-full shadow-2xl border-t-[8px] md:border-t-[10px] border-stone-950 transition-all duration-300"
        >
          <div className="absolute bottom-4 left-1/2 -translate-x-1/2 w-24 h-6 bg-green-950 rounded-full blur-sm" />
          <AnimatePresence>
            {isPouring && (
              <motion.div
                initial={{ opacity: 0, scaleY: 0 }}
                animate={{ opacity: 1, scaleY: 1 }}
                className="absolute top-4 left-1/2 -translate-x-1/2 w-32 md:w-40 h-10 md:h-12 bg-green-900/40 rounded-full blur-md origin-top"
              />
            )}
          </AnimatePresence>
        </div>

        {/* Draggable Ewer */}
        <motion.div
          drag
          dragSnapToOrigin
          dragMomentum={false}
          dragTransition={{ bounceStiffness: 600, bounceDamping: 20 }}
          style={{ touchAction: 'none' }}
          whileTap={{ scale: 0.95 }}
          onDrag={handleDrag}
          className="cursor-grab active:cursor-grabbing relative"
        >
          <CeladonEwerVisual isPouring={isPouring} />
          {isPouring && (
            <motion.div initial={{ height: 0 }} animate={{ height: 100 }} className="absolute top-[40%] left-[-10px] w-1 bg-blue-100/40 blur-[1px] origin-top rotate-[-15deg]" />
          )}
          <div className="absolute -bottom-8 left-1/2 -translate-x-1/2 text-[10px] text-stone-500 font-bold tracking-widest uppercase whitespace-nowrap">青瓷茶瓶</div>
        </motion.div>
      </div>

      <div className="text-center space-y-2 px-4">
        <p className="text-stone-500 italic tracking-widest uppercase text-[11px] font-bold">
          {isFinished ? "首注调膏成功" : "向茶盏移动茶瓶，进行首注注汤"}
        </p>
        <p className="text-[10px] text-stone-400 uppercase tracking-[0.2em]">“水少许，调如膏状”</p>
      </div>
    </div>
  );
};

export default Step8;
