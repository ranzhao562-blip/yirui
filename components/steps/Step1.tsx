
import React, { useState, useEffect } from 'react';
import { motion, AnimatePresence } from 'framer-motion';

interface StepProps {
  onComplete: () => void;
}

const TeaCakeVisual: React.FC<{ isRoasting: boolean; progress: number }> = ({ isRoasting, progress }) => (
  <div className="relative group">
    {/* Tea Cake - Replicated from illustration */}
    <motion.div
      animate={isRoasting ? {
        filter: `brightness(${1 - progress / 400}) sepia(${progress / 200})`,
        scale: [1, 1.01, 1],
      } : {}}
      transition={{ repeat: Infinity, duration: 2 }}
      // Mobile: w-32 h-32 (smaller), Desktop: w-44 h-44
      className="relative w-32 h-32 md:w-44 md:h-44 rounded-full shadow-xl overflow-hidden border-2 border-stone-800/30"
      style={{
        background: 'radial-gradient(circle, #6b7c4c 0%, #4a5435 100%)',
        boxShadow: 'inset 0 0 30px rgba(0,0,0,0.5), 0 5px 15px rgba(0,0,0,0.3)'
      }}
    >
      {/* Texture Layer */}
      <div className="absolute inset-0 opacity-40 bg-[url('https://www.transparenttextures.com/patterns/natural-paper.png')]" />
      
      {/* Circular Floral Border (SVG) - Matching the pattern in user image */}
      <svg className="absolute inset-0 w-full h-full p-3 opacity-50" viewBox="0 0 100 100">
        <circle cx="50" cy="50" r="44" fill="none" stroke="#2d351e" strokeWidth="0.5" strokeDasharray="1 2" />
        {[...Array(24)].map((_, i) => (
          <g key={i} transform={`rotate(${i * 15} 50 50) translate(50 10)`}>
            <path d="M-2,0 Q0,-6 2,0 Q0,4 -2,0" fill="#2d351e" />
            <path d="M-1,-2 Q0,-5 1,-2" fill="#8b9d6a" opacity="0.4" />
          </g>
        ))}
      </svg>

      {/* Center "茶" Character - Calligraphy style */}
      <div className="absolute inset-0 flex items-center justify-center">
        <span className="text-4xl md:text-6xl text-stone-900/90 font-serif select-none pointer-events-none drop-shadow-md" style={{ fontFamily: '"Zhi Mang Xing", cursive' }}>
          茶
        </span>
      </div>

      {/* Roast Glow */}
      <AnimatePresence>
        {isRoasting && (
          <motion.div
            initial={{ opacity: 0 }}
            animate={{ opacity: 0.25 }}
            exit={{ opacity: 0 }}
            className="absolute inset-0 bg-orange-600 mix-blend-overlay"
          />
        )}
      </AnimatePresence>
    </motion.div>
  </div>
);

const StoveVisual: React.FC<{ isFireOn: boolean; isRoasting: boolean }> = ({ isFireOn, isRoasting }) => (
  // Mobile: w-64 h-64, Desktop: w-80 h-80. Adjusted to be larger relative to tea cake on mobile.
  <div className="relative w-64 h-64 md:w-80 md:h-80 flex items-center justify-center scale-100">
    <svg viewBox="0 0 200 200" className="w-full h-full drop-shadow-2xl overflow-visible">
      {/* Three Strong Legs */}
      <path d="M55,175 L45,198 L75,198 Z" fill="#3d2b1f" stroke="#1a110a" strokeWidth="1.5" />
      <path d="M145,175 L155,198 L125,198 Z" fill="#3d2b1f" stroke="#1a110a" strokeWidth="1.5" />
      <path d="M100,182 L112,202 L88,202 Z" fill="#2d1f16" />

      {/* Stove Body - Earthenware texture */}
      <path 
        d="M45,115 Q35,115 35,135 Q35,188 100,188 Q165,188 165,135 Q165,115 155,115 Z" 
        fill="#4d3b2f" 
        stroke="#2d1f16" 
        strokeWidth="2.5" 
      />
      
      {/* Top Rim with notches for holding items */}
      <path 
        d="M45,115 L45,105 L60,105 L60,115 L140,115 L140,105 L155,105 L155,115" 
        fill="#4d3b2f" 
        stroke="#2d1f16" 
        strokeWidth="2.5" 
      />
      <path d="M92,115 L92,105 L108,105 L108,115" fill="#4d3b2f" stroke="#2d1f16" strokeWidth="2.5" />

      {/* Decorative Cloud Patterns - Scroll design */}
      <g opacity="0.5">
        <path d="M55,135 Q65,125 80,135 Q95,145 110,135 Q125,125 140,135 Q155,145 165,135" fill="none" stroke="#7d6b5f" strokeWidth="1.5" />
        <path d="M60,145 Q70,135 85,145 Q100,155 115,145 Q130,135 145,145 Q160,155 170,145" fill="none" stroke="#7d6b5f" strokeWidth="1" />
      </g>

      {/* Fire Gate at the center bottom */}
      <path 
        d="M82,152 Q82,148 100,148 Q118,148 118,152 L112,178 Q100,182 88,178 Z" 
        fill="#1a110a" 
        stroke="#2d1f16" 
        strokeWidth="2"
      />

      {/* Burning wood inside the gate */}
      {isFireOn && (
        <g transform="translate(90, 168) scale(0.7)">
          <rect x="0" y="0" width="20" height="6" rx="1.5" fill="#3d2b1f" />
          <rect x="12" y="4" width="20" height="6" rx="1.5" fill="#2d1f16" />
        </g>
      )}
    </svg>

    {/* Flame Animation inside the fire gate */}
    <AnimatePresence>
      {isFireOn && (
        <motion.div 
          initial={{ opacity: 0 }}
          animate={{ opacity: 1 }}
          className="absolute bottom-[42px] md:bottom-[52px] left-1/2 -translate-x-1/2 z-20 flex gap-0.5 pointer-events-none"
        >
          {[...Array(5)].map((_, i) => (
            <motion.div
              key={i}
              animate={{ 
                height: [10, 20, 14, 22, 12], 
                backgroundColor: ['#ef4444', '#f59e0b', '#fbbf24', '#ef4444'],
                y: [0, -3, 2, -4, 0]
              }}
              transition={{ repeat: Infinity, duration: 0.25 + i * 0.1, ease: "linear" }}
              className="w-1.5 md:w-2 rounded-full shadow-[0_0_15px_rgba(239,68,68,1)]"
            />
          ))}
        </motion.div>
      )}
    </AnimatePresence>

    {/* Rising Heat/Smoke during roasting */}
    {isRoasting && (
      <div className="absolute top-0 w-full h-full flex justify-center pointer-events-none">
         {[...Array(4)].map((_, i) => (
           <motion.div
             key={i}
             initial={{ y: 80, opacity: 0, scale: 0.5 }}
             animate={{ y: -140, opacity: [0, 0.4, 0], scale: [0.5, 2, 4] }}
             transition={{ repeat: Infinity, duration: 4, delay: i * 1, ease: "easeOut" }}
             className="absolute w-16 h-16 bg-stone-400/20 blur-3xl rounded-full"
           />
         ))}
      </div>
    )}
  </div>
);

const Step1: React.FC<StepProps> = ({ onComplete }) => {
  const [isFireOn, setIsFireOn] = useState(false);
  const [isRoasting, setIsRoasting] = useState(false);
  const [roastProgress, setRoastProgress] = useState(0);

  useEffect(() => {
    let timer: number;
    if (isRoasting) {
      timer = window.setInterval(() => {
        setRoastProgress(prev => {
          if (prev >= 100) {
            clearInterval(timer);
            // 保持显示状态，1秒后进入下一步
            setTimeout(onComplete, 1000);
            return 100;
          }
          // 快速增长进度
          return prev + 2.5;
        });
      }, 50);
    }
    return () => clearInterval(timer);
  }, [isRoasting, onComplete]);

  const handleDragEnd = (event: any, info: any) => {
    const stoveElement = document.getElementById('tea-stove-1');
    if (stoveElement) {
      const rect = stoveElement.getBoundingClientRect();
      // Increase drop area tolerance for mobile
      const tolerance = 50;
      const droppedInX = info.point.x > rect.left - tolerance && info.point.x < rect.right + tolerance;
      const droppedInY = info.point.y > rect.top - tolerance && info.point.y < rect.bottom + tolerance;
      
      if (droppedInX && droppedInY && isFireOn) {
        setIsRoasting(true);
      }
    }
  };

  return (
    <div className="flex flex-col items-center gap-4 w-full h-full justify-center">
      {/* Interaction Stage */}
      <div className="relative w-full max-w-2xl h-[450px] flex items-center justify-center">
        
        {/* The Stove Container */}
        <div 
          id="tea-stove-1"
          className={`relative z-10 transition-transform ${!isFireOn ? 'cursor-pointer active:scale-95' : ''}`}
          onClick={() => setIsFireOn(true)}
        >
          <StoveVisual isFireOn={isFireOn} isRoasting={isRoasting} />
          
          {/* Snapped Tea Cake Position - Locked absolute relative to stove */}
          <AnimatePresence initial={false}>
            {isRoasting && (
              <motion.div 
                key="roasting-cake"
                initial={{ opacity: 1, scale: 0.75 }}
                animate={{ opacity: 1, scale: 0.75 }}
                className="absolute -top-[20px] left-1/2 -translate-x-1/2 z-30 pointer-events-none"
              >
                <TeaCakeVisual isRoasting={true} progress={roastProgress} />
              </motion.div>
            )}
          </AnimatePresence>
        </div>

        {/* Draggable Tea Cake - Visible ONLY when NOT roasting */}
        <AnimatePresence>
          {!isRoasting && (
            <motion.div
              key="draggable-cake"
              drag
              dragSnapToOrigin
              dragMomentum={false}
              dragTransition={{ bounceStiffness: 600, bounceDamping: 20 }}
              onDragEnd={handleDragEnd}
              exit={{ opacity: 0, transition: { duration: 0 } }} // Instant exit to prevent flicker
              className="absolute -top-[12px] left-1/2 -translate-x-1/2 z-40 cursor-grab active:cursor-grabbing scale-75"
              style={{ touchAction: 'none' }}
              initial={{ x: 0, y: 0 }}
              whileTap={{ scale: 0.85 }}
            >
              <TeaCakeVisual isRoasting={false} progress={0} />
              <p className="mt-8 text-[11px] text-stone-500 text-center tracking-widest uppercase font-bold w-64 mx-auto bg-white/40 backdrop-blur-sm p-2 rounded-lg border border-stone-200 shadow-sm pointer-events-none">
                {isFireOn ? "向下拖动茶饼至炉口开始炙烤" : "请先点击茶炉点燃红罗炭"}
              </p>
            </motion.div>
          )}
        </AnimatePresence>
      </div>

      {/* Progress & Feedback */}
      <div className="h-16 flex flex-col items-center justify-center gap-4">
        {isRoasting ? (
          <div className="flex flex-col items-center gap-3">
            <div className="w-64 h-1.5 bg-stone-200 rounded-full overflow-hidden shadow-inner border border-stone-300">
              <motion.div 
                className="h-full bg-orange-500 shadow-[0_0_12px_rgba(249,115,22,0.8)]" 
                animate={{ width: `${roastProgress}%` }} 
                transition={{ duration: 0.1 }}
              />
            </div>
            <span className="text-[11px] text-stone-700 font-bold tracking-[0.4em] uppercase animate-pulse">
              {roastProgress < 50 ? "微火炙烤，香气初露..." : "茶饼泛金，受热均匀..."}
            </span>
          </div>
        ) : !isFireOn && (
           <p className="text-[12px] text-stone-400 font-serif italic tracking-widest">
             “炙茶须微火，使之均匀受热。”
           </p>
        )}
      </div>
    </div>
  );
};

export default Step1;
