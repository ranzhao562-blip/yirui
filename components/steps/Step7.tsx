
import React, { useState, useRef } from 'react';
import { motion, AnimatePresence } from 'framer-motion';

// 将茶粉直接集成到 SVG 组件中，确保坐标绝对准确
const SimpleCeladonCup: React.FC<{ showPowder: boolean }> = ({ showPowder }) => (
  <div className="relative w-48 h-32 flex items-center justify-center pointer-events-none">
    <svg viewBox="0 0 200 150" className="w-full h-full drop-shadow-xl overflow-visible">
      {/* 1. Cup Body (Back/Bottom) */}
      <path d="M20,40 Q25,100 100,100 Q175,100 180,40 Q180,30 100,25 Q20,30 20,40" fill="#d4dcc6" stroke="#8a9678" strokeWidth="1.5" />
      
      {/* 2. Inner Rim / Cavity Background */}
      <ellipse cx="100" cy="40" rx="80" ry="15" fill="#d4dcc6" stroke="#8a9678" strokeWidth="1" />
      
      {/* 3. The Tea Powder (Integrated inside SVG for perfect positioning) */}
      {/* 坐标 cx=100 是水平中心，cy=85 位于碗底上方 (碗底是 y=100，杯口是 y=40)，视觉上刚好在碗底深处 */}
      <AnimatePresence>
        {showPowder && (
          <motion.g 
            initial={{ opacity: 0, scale: 0 }} 
            animate={{ opacity: 1, scale: 1 }}
            style={{ transformOrigin: "100px 85px" }} // 确保从中心放大
          >
             {/* Main Powder Pile */}
             <ellipse cx="100" cy="85" rx="25" ry="8" fill="#3f6212" className="blur-[1px]" />
             {/* Texture dots */}
             <circle cx="95" cy="86" r="2" fill="#1a2e05" opacity="0.5" />
             <circle cx="105" cy="84" r="2" fill="#1a2e05" opacity="0.5" />
             <circle cx="100" cy="88" r="1.5" fill="#1a2e05" opacity="0.5" />
          </motion.g>
        )}
      </AnimatePresence>

      {/* 4. Front Highlights / Rim Shine (To simulate depth over the powder if needed, usually rim is above) */}
      <ellipse cx="100" cy="40" rx="75" ry="12" fill="none" stroke="#fff" strokeWidth="1" opacity="0.3" />
      
      {/* 5. Foot/Base */}
      <path d="M70,100 L70,115 L130,115 L130,100" fill="#d4dcc6" stroke="#8a9678" strokeWidth="1" />
    </svg>
  </div>
);

const Step7: React.FC<{ onComplete: () => void }> = ({ onComplete }) => {
  const [hasTea, setHasTea] = useState(false);
  const [isDone, setIsDone] = useState(false);
  const completeCalled = useRef(false);

  const handleDragEnd = (event: any, info: any) => {
    if (isDone || completeCalled.current) return;
    const screenWidth = window.innerWidth;
    
    // 1. Picking up tea from box
    if (!hasTea && info.point.x > screenWidth * 0.5) {
      setHasTea(true);
    } 
    // 2. Dropping tea into cup
    else if (hasTea) {
      const cupElement = document.getElementById('step7-cup-target');
      if (cupElement) {
        const rect = cupElement.getBoundingClientRect();
        // Hit area padding
        const hitMargin = 50;
        const isOverCup = 
          info.point.x >= rect.left - hitMargin &&
          info.point.x <= rect.right + hitMargin &&
          info.point.y >= rect.top - hitMargin &&
          info.point.y <= rect.bottom + hitMargin;

        if (isOverCup) {
          setHasTea(false);
          if (!completeCalled.current) {
            completeCalled.current = true;
            setIsDone(true);
            setTimeout(onComplete, 1500);
          }
        }
      }
    }
  };

  return (
    <div className="flex flex-col items-center w-full h-full justify-center gap-12">
      <div className="flex justify-around items-end w-full max-w-4xl h-[300px]">
        
        {/* The Cup Area */}
        <div className="flex flex-col items-center gap-4">
          <div id="step7-cup-target" className="relative">
            {/* Pass state directly to SVG component */}
            <SimpleCeladonCup showPowder={isDone} />
          </div>
          <span className="text-[10px] text-stone-400 font-bold tracking-widest uppercase">温热茶盏</span>
        </div>

        {/* The Box Area */}
        <div className="flex flex-col items-center gap-4">
          <div className="w-40 h-32 bg-stone-950 rounded-lg relative shadow-xl border border-stone-800">
            <div className="absolute inset-4 bg-green-900/40 rounded blur-sm" />
          </div>
          <span className="text-[10px] text-stone-400 font-bold tracking-widest uppercase">茶盒</span>
        </div>
      </div>

      {/* Draggable Spoon */}
      <motion.div 
        drag 
        dragSnapToOrigin 
        dragMomentum={false}
        dragTransition={{ bounceStiffness: 600, bounceDamping: 20 }}
        style={{ touchAction: 'none' }}
        onDragEnd={handleDragEnd} 
        whileTap={{ scale: 0.95 }}
        className="cursor-grab active:cursor-grabbing flex flex-col items-center gap-2 z-50"
      >
        <div className="w-64 h-12 bg-orange-200 border-2 border-orange-300 rounded-full flex items-center justify-center relative shadow-lg">
          <AnimatePresence>
            {hasTea && (
              <motion.div initial={{ scale: 0 }} animate={{ scale: 1 }} className="absolute right-4 w-10 h-6 bg-green-800 rounded-full blur-[2px]" />
            )}
          </AnimatePresence>
          <span className="text-xs text-orange-900 font-bold uppercase tracking-widest">茶勺</span>
        </div>
        <p className="text-[10px] text-stone-500 font-bold tracking-widest uppercase mt-4">
          {hasTea ? "将茶末移入茶盏" : "移至茶盒舀取茶粉"}
        </p>
      </motion.div>
    </div>
  );
};

export default Step7;
