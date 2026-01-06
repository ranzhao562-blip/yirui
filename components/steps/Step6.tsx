
import React, { useState, useRef } from 'react';
import { motion, AnimatePresence } from 'framer-motion';

const CeladonCupVisual: React.FC<{ isFull: boolean; isWarmed: boolean }> = ({ isFull, isWarmed }) => (
  // Mobile: w-56 h-56, Desktop: w-80 h-80
  <div className="relative w-56 h-56 md:w-80 md:h-80 flex items-center justify-center transition-all duration-300">
    <svg viewBox="0 0 400 300" className="w-full h-full drop-shadow-2xl overflow-visible">
      <g id="pedestal">
        <path d="M140,280 L260,280 Q265,280 265,270 L255,230 L145,230 L135,270 Q135,280 140,280 Z" fill="#d4dcc6" stroke="#8a9678" strokeWidth="1.5" />
        <path d="M80,205 Q200,235 320,205 Q320,185 200,185 Q80,185 80,205 Z" fill="#d4dcc6" stroke="#8a9678" strokeWidth="1.5" />
        <path d="M175,200 Q175,150 160,140 L240,140 Q225,150 225,200 Z" fill="#d4dcc6" stroke="#8a9678" strokeWidth="1" />
      </g>
      <g id="tea-bowl" transform="translate(0, -10)">
        <path d="M100,60 Q105,150 200,150 Q295,150 300,60 Q300,50 285,45 Q270,55 255,45 Q240,55 225,45 Q210,55 200,50 Q190,55 175,45 Q160,55 145,45 Q130,55 115,45 Q100,50 100,60" fill="#d4dcc6" stroke="#8a9678" strokeWidth="2" />
        <ellipse cx="200" cy="70" rx="90" ry="20" fill="none" stroke="#fff" strokeWidth="0.5" opacity="0.3" />
        <AnimatePresence>
          {isFull && (
            <motion.g initial={{ opacity: 0 }} animate={{ opacity: 1 }} exit={{ opacity: 0 }}>
              <ellipse cx="200" cy="85" rx="80" ry="25" fill="#e0f2fe" opacity="0.5" className="blur-[3px]" />
              {isWarmed && (
                <motion.g animate={{ y: [-5, -20], opacity: [0, 0.4, 0] }} transition={{ repeat: Infinity, duration: 2.5 }}>
                  <path d="M150,60 Q170,40 190,60" fill="none" stroke="#fff" strokeWidth="1.5" opacity="0.4" />
                  <path d="M210,60 Q230,40 250,60" fill="none" stroke="#fff" strokeWidth="1.5" opacity="0.4" />
                </motion.g>
              )}
            </motion.g>
          )}
        </AnimatePresence>
      </g>
    </svg>
  </div>
);

const CeladonEwerVisual: React.FC<{ isPouring: boolean }> = ({ isPouring }) => (
  // Mobile: w-32 h-44, Desktop: w-48 h-64
  <div className="relative w-32 h-44 md:w-48 md:h-64 flex items-center justify-center transition-all duration-300">
    <svg viewBox="0 0 200 300" className="w-full h-full drop-shadow-xl overflow-visible">
      <defs>
        <linearGradient id="celadonGrad" x1="0%" y1="0%" x2="100%" y2="100%">
          <stop offset="0%" stopColor="#e1e8d5" />
          <stop offset="50%" stopColor="#d4dcc6" />
          <stop offset="100%" stopColor="#b8c2a8" />
        </linearGradient>
      </defs>
      <motion.path animate={isPouring ? { rotate: -15, x: -10 } : {}} d="M65,165 Q10,155 35,90 L50,95 Q30,140 75,160 Z" fill="url(#celadonGrad)" stroke="#8a9678" strokeWidth="1" />
      <path d="M60,160 Q60,135 100,135 Q140,135 140,160 L145,240 Q145,275 100,275 Q55,275 55,240 Z" fill="url(#celadonGrad)" stroke="#8a9678" strokeWidth="1.5" />
      <path d="M75,140 Q75,40 60,35 L140,35 Q125,40 125,140 Z" fill="url(#celadonGrad)" stroke="#8a9678" strokeWidth="1.5" />
      <ellipse cx="100" cy="35" rx="40" ry="8" fill="#d4dcc6" stroke="#8a9678" strokeWidth="1" />
      <path d="M135,65 Q175,65 165,160 Q160,195 140,195" fill="none" stroke="url(#celadonGrad)" strokeWidth="10" strokeLinecap="round" />
      <path d="M135,65 Q175,65 165,160 Q160,195 140,195" fill="none" stroke="#8a9678" strokeWidth="1" strokeLinecap="round" />
      <ellipse cx="100" cy="275" rx="35" ry="6" fill="#d4dcc6" stroke="#8a9678" strokeWidth="1" />
      {isPouring && (
        <motion.path initial={{ height: 0, opacity: 0 }} animate={{ height: 150, opacity: 0.6 }} d="M38,92 L20,240" fill="none" stroke="#e0f2fe" strokeWidth="3" strokeLinecap="round" className="blur-[1px]" />
      )}
    </svg>
  </div>
);

const Step6: React.FC<{ onComplete: () => void }> = ({ onComplete }) => {
  const [isFull, setIsFull] = useState(false);
  const [isWarmed, setIsWarmed] = useState(false);
  const [isDone, setIsDone] = useState(false);
  const completeCalled = useRef(false);

  const handleDragUpdate = (event: any, info: any) => {
    if (isWarmed || isFull) return;
    const cupRect = document.getElementById('warm-cup-6')?.getBoundingClientRect();
    
    // Increased hit area detection for mobile ease of use
    if (cupRect) {
      const hitPadding = 50; // Extra padding for easier dropping
      const isOver = 
        info.point.x > cupRect.left - hitPadding && 
        info.point.x < cupRect.right + hitPadding && 
        info.point.y > cupRect.top - hitPadding && 
        info.point.y < cupRect.bottom + hitPadding;

      if (isOver) {
        setIsFull(true);
        setTimeout(() => setIsWarmed(true), 2500);
      }
    }
  };

  const handleEmpty = () => {
    if (isWarmed && isFull && !isDone && !completeCalled.current) {
      completeCalled.current = true;
      setIsDone(true);
      setIsFull(false);
      setTimeout(onComplete, 1500);
    }
  };

  return (
    <div className="flex flex-col items-center w-full h-full justify-center gap-4">
      {/* 
        Responsive Container:
        Mobile: Flex-Col (Cup Top, Ewer Bottom), Height auto/full
        Desktop: Flex-Row (Cup Left, Ewer Right), Height 450px
      */}
      <div className="relative w-full max-w-5xl h-full md:h-[450px] flex flex-col md:flex-row items-center justify-center md:justify-around gap-12 md:gap-0 px-4 md:px-10 py-6 md:py-0">
        
        {/* Tea Cup Target */}
        <div 
          id="warm-cup-6" 
          className={`transition-all duration-500 order-1 md:order-1 ${isWarmed && !isDone ? 'cursor-pointer hover:scale-105 active:scale-95' : ''}`} 
          onClick={handleEmpty}
        >
          <CeladonCupVisual isFull={isFull} isWarmed={isWarmed} />
          <AnimatePresence>
            {isWarmed && !isDone && (
              <motion.p initial={{ opacity: 0, y: 10 }} animate={{ opacity: 1, y: 0 }} className="text-center text-[10px] text-stone-500 font-bold tracking-[0.3em] uppercase mt-2 bg-white/60 px-4 py-2 rounded-full border border-stone-200">
                盏已温热，点击倒掉余水
              </motion.p>
            )}
          </AnimatePresence>
        </div>

        {/* Draggable Ewer */}
        <AnimatePresence>
          {!isFull && (
            <motion.div 
              drag 
              dragSnapToOrigin 
              dragMomentum={false}
              dragTransition={{ bounceStiffness: 600, bounceDamping: 20 }}
              style={{ touchAction: 'none' }} // Critical for mobile
              onDragEnd={handleDragUpdate} 
              whileTap={{ scale: 1.1 }}
              className="cursor-grab active:cursor-grabbing flex flex-col items-center gap-4 z-50 order-2 md:order-2"
            >
              <CeladonEwerVisual isPouring={false} />
              <div className="flex flex-col items-center gap-1">
                <p className="text-[10px] text-stone-400 font-bold tracking-[0.2em] uppercase">青瓷茶瓶</p>
                <p className="text-[9px] text-stone-300 italic">拖动至茶盏上方注水</p>
              </div>
            </motion.div>
          )}
        </AnimatePresence>

        {/* Animation Only Ewer (Visible when pouring) */}
        {isFull && !isWarmed && (
           <div className="absolute top-1/2 left-1/2 -translate-x-1/2 -translate-y-1/2 pointer-events-none opacity-50 z-40">
              <CeladonEwerVisual isPouring={true} />
           </div>
        )}
      </div>
      
      {/* Footer Text */}
      <div className="h-16 flex items-center justify-center px-4">
        <p className="text-stone-500 italic text-xs md:text-sm tracking-[0.2em] font-serif max-w-lg text-center leading-relaxed">
          {isWarmed ? "“盏已温，气自和。”" : "“盏冷则茶沉，使茶沫持久不散，必先烫盏。”"}
        </p>
      </div>
    </div>
  );
};

export default Step6;
