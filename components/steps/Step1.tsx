
import React, { useState, useEffect, useRef } from 'react';
import { motion, AnimatePresence } from 'framer-motion';

interface StepProps {
  onComplete: () => void;
}

const TeaCakeVisual: React.FC<{ isRoasting: boolean; progress: number }> = ({ isRoasting, progress }) => (
  <div className="relative group">
    <motion.div
      animate={isRoasting ? {
        filter: `brightness(${1 - progress / 400}) sepia(${progress / 200})`,
        y: [0, -5, 0], 
      } : {}}
      transition={{ 
        y: { repeat: Infinity, duration: 2, ease: "easeInOut" }
      }}
      className="relative w-32 h-32 md:w-44 md:h-44 rounded-full shadow-xl overflow-hidden border-2 border-stone-800/30"
      style={{
        background: 'radial-gradient(circle, #6b7c4c 0%, #4a5435 100%)',
        boxShadow: 'inset 0 0 30px rgba(0,0,0,0.5), 0 5px 15px rgba(0,0,0,0.3)'
      }}
    >
      <div className="absolute inset-0 opacity-40 bg-[url('https://www.transparenttextures.com/patterns/natural-paper.png')]" />
      <svg className="absolute inset-0 w-full h-full p-3 opacity-50" viewBox="0 0 100 100">
        <circle cx="50" cy="50" r="44" fill="none" stroke="#2d351e" strokeWidth="0.5" strokeDasharray="1 2" />
        {[...Array(24)].map((_, i) => (
          <g key={i} transform={`rotate(${i * 15} 50 50) translate(50 10)`}>
            <path d="M-2,0 Q0,-6 2,0 Q0,4 -2,0" fill="#2d351e" />
          </g>
        ))}
      </svg>
      <div className="absolute inset-0 flex items-center justify-center">
        <span className="text-4xl md:text-6xl text-stone-900/90 font-serif select-none pointer-events-none drop-shadow-md" style={{ fontFamily: '"Zhi Mang Xing", cursive' }}>
          茶
        </span>
      </div>
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
  <div className="relative w-64 h-64 md:w-80 md:h-80 flex items-center justify-center">
    <svg viewBox="0 0 200 200" className="w-full h-full drop-shadow-2xl overflow-visible">
      <path d="M55,175 L45,198 L75,198 Z" fill="#3d2b1f" stroke="#1a110a" strokeWidth="1.5" />
      <path d="M145,175 L155,198 L125,198 Z" fill="#3d2b1f" stroke="#1a110a" strokeWidth="1.5" />
      <path d="M100,182 L112,202 L88,202 Z" fill="#2d1f16" />
      <path d="M45,115 Q35,115 35,135 Q35,188 100,188 Q165,188 165,135 Q165,115 155,115 Z" fill="#4d3b2f" stroke="#2d1f16" strokeWidth="2.5" />
      <path d="M45,115 L45,105 L60,105 L60,115 L140,115 L140,105 L155,105 L155,115" fill="#4d3b2f" stroke="#2d1f16" strokeWidth="2.5" />
      <path d="M92,115 L92,105 L108,105 L108,115" fill="#4d3b2f" stroke="#2d1f16" strokeWidth="2.5" />
      <path d="M82,152 Q82,148 100,148 Q118,148 118,152 L112,178 Q100,182 88,178 Z" fill="#1a110a" stroke="#2d1f16" strokeWidth="2" />
      {isFireOn && (
        <g transform="translate(90, 168) scale(0.7)">
          <rect x="0" y="0" width="20" height="6" rx="1.5" fill="#3d2b1f" />
          <rect x="12" y="4" width="20" height="6" rx="1.5" fill="#2d1f16" />
        </g>
      )}
    </svg>
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
            setTimeout(onComplete, 1200);
            return 100;
          }
          return prev + 2;
        });
      }, 50);
    }
    return () => clearInterval(timer);
  }, [isRoasting, onComplete]);

  const handleDragEnd = (event: any, info: any) => {
    const stoveElement = document.getElementById('tea-stove-1');
    if (stoveElement) {
      const rect = stoveElement.getBoundingClientRect();
      const tolerance = 60;
      const droppedInX = info.point.x > rect.left - tolerance && info.point.x < rect.right + tolerance;
      const droppedInY = info.point.y > rect.top - tolerance && info.point.y < rect.bottom + tolerance;
      
      if (droppedInX && droppedInY && isFireOn) {
        setIsRoasting(true);
      }
    }
  };

  return (
    <div className="flex flex-col items-center gap-4 w-full h-full justify-center">
      <div className="relative w-full max-w-2xl h-[450px] flex flex-col items-center justify-center">
        <div 
          id="tea-stove-1"
          className={`relative z-10 transition-transform ${!isFireOn ? 'cursor-pointer active:scale-95' : ''}`}
          onClick={() => setIsFireOn(true)}
        >
          <StoveVisual isFireOn={isFireOn} isRoasting={isRoasting} />
          
          <AnimatePresence>
            {isRoasting && (
              <motion.div 
                key="roasting-cake"
                initial={{ opacity: 0, scale: 0.6, y: -50 }}
                animate={{ opacity: 1, scale: 0.8, y: -100 }} 
                className="absolute top-1/2 left-1/2 -translate-x-1/2 z-30 pointer-events-none"
              >
                <TeaCakeVisual isRoasting={true} progress={roastProgress} />
              </motion.div>
            )}
          </AnimatePresence>
        </div>

        <AnimatePresence>
          {!isRoasting && (
            <motion.div
              key="draggable-cake"
              drag
              dragSnapToOrigin
              dragMomentum={false}
              dragTransition={{ bounceStiffness: 600, bounceDamping: 25 }}
              onDragEnd={handleDragEnd}
              exit={{ opacity: 0, scale: 0.5, transition: { duration: 0.2 } }}
              className="absolute top-12 left-1/2 -translate-x-1/2 z-40 cursor-grab active:cursor-grabbing scale-75"
              style={{ touchAction: 'none' }}
              initial={{ x: 0, y: 0 }}
              whileTap={{ scale: 0.85 }}
            >
              <TeaCakeVisual isRoasting={false} progress={0} />
              <div className="absolute -bottom-16 left-1/2 -translate-x-1/2 w-64 text-center pointer-events-none">
                <p className="text-[11px] text-stone-600 font-bold tracking-widest uppercase bg-white/60 backdrop-blur-sm px-4 py-2 rounded-full border border-stone-200 shadow-sm">
                  {isFireOn ? "将茶饼拖至炉火上方炙烤" : "点击茶炉，生起微火"}
                </p>
              </div>
            </motion.div>
          )}
        </AnimatePresence>
      </div>

      <div className="h-16 flex flex-col items-center justify-center">
        {isRoasting ? (
          <div className="flex flex-col items-center gap-3">
            <div className="w-64 h-1.5 bg-stone-200 rounded-full overflow-hidden shadow-inner border border-stone-300">
              <motion.div 
                className="h-full bg-orange-500 shadow-[0_0_12px_rgba(249,115,22,0.8)]" 
                animate={{ width: `${roastProgress}%` }} 
              />
            </div>
            <span className="text-[11px] text-stone-700 font-bold tracking-[0.4em] uppercase animate-pulse">
              {roastProgress < 40 ? "微火慢炙，唤醒茶香..." : roastProgress < 80 ? "茶色渐变，香气盈室..." : "炙烤功成，火候恰好"}
            </span>
          </div>
        ) : (
           <p className="text-[12px] text-stone-400 font-serif italic tracking-widest text-center max-w-xs">
             “炙茶须微火，使之均匀受热，唤醒陈年之鲜。”
           </p>
        )}
      </div>
    </div>
  );
};

export default Step1;
