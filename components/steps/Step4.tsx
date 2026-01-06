
import React, { useState, useRef } from 'react';
import { motion, AnimatePresence } from 'framer-motion';

const TeaBoxVisual: React.FC<{ scoopCount: number }> = ({ scoopCount }) => (
  // Mobile: w-56 h-56, Desktop: w-72 h-72. Scale removed for better mobile control.
  <div className="relative w-56 h-56 md:w-72 md:h-72 flex items-center justify-center">
    <motion.div initial={{ x: 60, y: -40, rotate: 25 }} className="absolute z-0 opacity-90">
      <svg width="200" height="140" viewBox="0 0 200 140" className="scale-75 md:scale-100">
        <ellipse cx="100" cy="70" rx="90" ry="40" fill="#141414" stroke="#222" strokeWidth="1" />
        <path d="M10,70 L10,85 Q10,125 100,125 Q190,125 190,85 L190,70" fill="#141414" stroke="#000" strokeWidth="1" />
        <g opacity="0.6">
          <path d="M60,50 Q100,20 140,50" stroke="#b8860b" strokeWidth="1.5" fill="none" />
          <circle cx="100" cy="70" r="4" fill="#d4af37" />
        </g>
      </svg>
    </motion.div>
    <div className="relative z-10">
      <svg width="240" height="200" viewBox="0 0 240 200" className="scale-75 md:scale-100">
        <ellipse cx="120" cy="155" rx="110" ry="35" fill="rgba(0,0,0,0.15)" />
        <path d="M15,90 L15,140 Q15,180 120,180 Q225,180 225,140 L225,90 Z" fill="#141414" stroke="#000" strokeWidth="1.5" />
        <ellipse cx="120" cy="90" rx="105" ry="42" fill="#141414" />
        <ellipse cx="120" cy="90" rx="102" ry="40" fill="#a52a2a" stroke="#800" strokeWidth="2" />
        <ellipse cx="120" cy="95" rx="95" ry="34" fill="#700" />
        <AnimatePresence>
          {scoopCount > 0 && (
            <motion.g
              initial={{ opacity: 0, scale: 0.8 }}
              animate={{ opacity: 1, scale: 0.9 + (scoopCount * 0.033), y: -scoopCount * 1 }}
            >
              <ellipse cx="120" cy="98" rx="88" ry="30" fill="#4d7c2c" className="blur-[1.5px]" />
              {[...Array(Math.min(20, 5 + scoopCount * 5))].map((_, i) => (
                <circle key={i} cx={120 + (Math.random() - 0.5) * 120} cy={98 + (Math.random() - 0.5) * 40} r={1 + Math.random() * 2} fill="#2d4a1a" opacity="0.6" />
              ))}
            </motion.g>
          )}
        </AnimatePresence>
      </svg>
    </div>
  </div>
);

const TeaSpoonVisual: React.FC<{ hasTea: boolean }> = ({ hasTea }) => (
  <div className="relative w-48 h-12 md:w-64 md:h-16 flex items-center">
    <svg viewBox="0 0 240 60" className="w-full h-full drop-shadow-xl overflow-visible">
      <path d="M10,28 L190,30 L190,34 L10,32 Z" fill="#b59469" stroke="#8c7355" strokeWidth="0.5" />
      <circle cx="210" cy="32" r="18" fill="#c4a47c" stroke="#8c7355" strokeWidth="1" />
      <AnimatePresence>
        {hasTea && (
          <motion.g initial={{ opacity: 0, scale: 0 }} animate={{ opacity: 1, scale: 1 }} exit={{ opacity: 0 }}>
            <circle cx="210" cy="32" r="12" fill="#4d7c2c" className="blur-[1px]" />
          </motion.g>
        )}
      </AnimatePresence>
    </svg>
  </div>
);

const Step4: React.FC<{ onComplete: () => void }> = ({ onComplete }) => {
  const [scooped, setScooped] = useState(false);
  const [scoopCount, setScoopCount] = useState(0);
  const [isFinished, setIsFinished] = useState(false);
  const completeCalled = useRef(false);
  const TARGET_SCOOPS = 3;

  const handleDragEnd = (event: any, info: any) => {
    if (isFinished) return;
    const screenWidth = window.innerWidth;
    if (!scooped && info.point.x < screenWidth * 0.4) {
      setScooped(true);
    } else if (scooped && info.point.x > screenWidth * 0.5) {
      const nextCount = scoopCount + 1;
      setScoopCount(nextCount);
      setScooped(false);
      if (nextCount >= TARGET_SCOOPS) {
        setIsFinished(true);
      }
    }
  };

  const handleComplete = () => {
    if (completeCalled.current) return;
    completeCalled.current = true;
    onComplete();
  };

  return (
    <div className="flex flex-col items-center justify-between w-full h-full py-6 md:py-10">
      {/* Container for Saucer and Box */}
      <div className="flex-1 flex flex-row items-center justify-center gap-4 md:gap-16 w-full px-4 md:px-10">
        <div className="flex flex-col items-center gap-6">
          <div className="relative w-32 h-24 md:w-44 md:h-32 flex items-center justify-center">
            <svg width="100%" height="100%" viewBox="0 0 160 100">
              <ellipse cx="80" cy="50" rx="70" ry="35" fill="#e5e5e5" stroke="#ccc" strokeWidth="1" />
              <ellipse cx="80" cy="50" rx="65" ry="30" fill="#fff" />
              <motion.path animate={!scooped ? { scale: 1, opacity: 1 } : { scale: 0.9, opacity: 0.6 }} d="M40,50 Q80,75 120,50 Q80,25 40,50" fill="#4d7c2c" className="blur-[2px]" />
            </svg>
          </div>
          <span className="text-[10px] text-stone-400 font-bold tracking-[0.3em] uppercase">研磨茶碟</span>
        </div>
        <div className="flex flex-col items-center">
          <TeaBoxVisual scoopCount={scoopCount} />
          <span className="text-[10px] text-stone-400 font-bold tracking-[0.3em] uppercase -mt-4">黑漆描金茶盒</span>
        </div>
      </div>
      <div className="h-40 flex flex-col items-center justify-center gap-6">
        <AnimatePresence mode="wait">
          {!isFinished ? (
            <motion.div 
              key="drag-area"
              drag 
              dragSnapToOrigin 
              dragMomentum={false}
              dragTransition={{ bounceStiffness: 600, bounceDamping: 20 }}
              onDragEnd={handleDragEnd} 
              style={{ touchAction: 'none' }}
              whileTap={{ scale: 0.95 }}
              className="cursor-grab active:cursor-grabbing z-50 p-4"
            >
              <TeaSpoonVisual hasTea={scooped} />
              <div className="text-center mt-6">
                <p className="text-[11px] text-stone-600 font-bold tracking-[0.2em] uppercase">
                  {scooped ? "将茶末置入盒中" : `舀取细末 (${scoopCount}/${TARGET_SCOOPS})`}
                </p>
              </div>
            </motion.div>
          ) : (
            <motion.div 
              key="complete-area"
              initial={{ opacity: 0, y: 20 }} 
              animate={{ opacity: 1, y: 0 }} 
              className="flex flex-col items-center gap-4"
            >
              <p className="text-xs text-green-700 font-bold tracking-widest uppercase animate-pulse">茶粉入盒，细腻均匀</p>
              <button 
                onClick={handleComplete} 
                className="px-14 py-4 bg-stone-800 text-white rounded-full text-xs font-bold tracking-[0.5em] shadow-2xl hover:bg-stone-700 transition-all"
              >
                置盒完毕，进入候汤
              </button>
            </motion.div>
          )}
        </AnimatePresence>
      </div>
    </div>
  );
};

export default Step4;
