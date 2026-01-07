
import React, { useState, useRef } from 'react';
import { motion, AnimatePresence } from 'framer-motion';

// 茶盏组件
const SimpleCeladonCup: React.FC<{ showPowder: boolean }> = ({ showPowder }) => (
  <div className="relative w-36 h-28 md:w-48 md:h-32 flex items-center justify-center pointer-events-none">
    <svg viewBox="0 0 200 150" className="w-full h-full drop-shadow-xl overflow-visible">
      <path d="M20,40 Q25,100 100,100 Q175,100 180,40 Q180,30 100,25 Q20,30 20,40" fill="#d4dcc6" stroke="#8a9678" strokeWidth="1.5" />
      <ellipse cx="100" cy="40" rx="80" ry="15" fill="#d4dcc6" stroke="#8a9678" strokeWidth="1" />
      <AnimatePresence>
        {showPowder && (
          <motion.g 
            initial={{ opacity: 0, scale: 0 }} 
            animate={{ opacity: 1, scale: 1 }}
            style={{ transformOrigin: "100px 85px" }}
          >
             <ellipse cx="100" cy="85" rx="25" ry="8" fill="#3f6212" className="blur-[1px]" />
             <circle cx="95" cy="86" r="2" fill="#1a2e05" opacity="0.5" />
             <circle cx="105" cy="84" r="2" fill="#1a2e05" opacity="0.5" />
             <circle cx="100" cy="88" r="1.5" fill="#1a2e05" opacity="0.5" />
          </motion.g>
        )}
      </AnimatePresence>
      <ellipse cx="100" cy="40" rx="75" ry="12" fill="none" stroke="#fff" strokeWidth="1" opacity="0.3" />
      <path d="M70,100 L70,115 L130,115 L130,100" fill="#d4dcc6" stroke="#8a9678" strokeWidth="1" />
    </svg>
  </div>
);

// 参考图1：黑漆描金茶盒
const LacquerTeaBox: React.FC = () => (
  <div className="relative w-32 h-32 md:w-40 md:h-40 flex items-center justify-center">
    <svg viewBox="0 0 200 200" className="w-full h-full drop-shadow-2xl overflow-visible">
      <circle cx="100" cy="110" r="85" fill="#1a1a1a" />
      <path d="M15,110 L15,135 Q15,185 100,185 Q185,185 185,135 L185,110" fill="#1a1a1a" />
      <g opacity="0.6">
        <path d="M40,140 Q60,130 80,150" stroke="#b8860b" fill="none" strokeWidth="2" strokeLinecap="round" />
        <path d="M120,160 Q140,150 160,165" stroke="#8b0000" fill="none" strokeWidth="2" strokeLinecap="round" />
        <circle cx="100" cy="165" r="3" fill="#b8860b" />
        <path d="M30,120 Q50,115 60,130" stroke="#b8860b" fill="none" strokeWidth="1" />
      </g>
      <ellipse cx="100" cy="110" rx="85" ry="35" fill="#1a1a1a" stroke="#000" strokeWidth="1" />
      <ellipse cx="100" cy="110" rx="80" ry="32" fill="#800000" />
      <ellipse cx="100" cy="115" rx="70" ry="25" fill="#4d7c2c" className="blur-[1.5px]" />
      <ellipse cx="100" cy="113" rx="65" ry="22" fill="#65a30d" opacity="0.4" className="blur-[2px]" />
      <ellipse cx="100" cy="110" rx="82" ry="33" fill="none" stroke="rgba(255,255,255,0.15)" strokeWidth="1.5" />
    </svg>
  </div>
);

// 参考图2：长柄木茶勺
const WoodenSpoon: React.FC<{ hasTea: boolean }> = ({ hasTea }) => (
  <div className="relative w-56 h-12 md:w-72 md:h-16 flex items-center justify-center rotate-[-5deg]">
    <svg viewBox="0 0 300 80" className="w-full h-full drop-shadow-lg overflow-visible">
      <defs>
        <linearGradient id="woodGrad" x1="0%" y1="0%" x2="100%" y2="0%">
          <stop offset="0%" stopColor="#b58d53" />
          <stop offset="50%" stopColor="#d4a373" />
          <stop offset="100%" stopColor="#8c6239" />
        </linearGradient>
      </defs>
      <path d="M20,38 L250,34 Q260,34 260,40 Q260,46 250,46 L20,42 Z" fill="url(#woodGrad)" stroke="#78350f" strokeWidth="0.5" />
      <circle cx="20" cy="40" r="18" fill="url(#woodGrad)" stroke="#78350f" strokeWidth="0.8" />
      <circle cx="20" cy="40" r="15" fill="#8c6239" opacity="0.2" />
      <AnimatePresence>
        {hasTea && (
          <motion.g initial={{ scale: 0, opacity: 0 }} animate={{ scale: 1, opacity: 1 }} exit={{ scale: 0, opacity: 0 }}>
            <circle cx="20" cy="40" r="12" fill="#3f6212" className="blur-[1px]" />
            <circle cx="20" cy="38" r="6" fill="#65a30d" opacity="0.6" className="blur-[2px]" />
          </motion.g>
        )}
      </AnimatePresence>
      <circle cx="252" cy="40" r="1.5" fill="#3d2b1f" />
    </svg>
  </div>
);

const Step7: React.FC<{ onComplete: () => void }> = ({ onComplete }) => {
  const [hasTea, setHasTea] = useState(false);
  const [isDone, setIsDone] = useState(false);
  const completeCalled = useRef(false);

  const handleDragEnd = (event: any, info: any) => {
    if (isDone || completeCalled.current) return;
    
    const point = { x: info.point.x, y: info.point.y };
    
    // 1. 舀取检测 (Tea Box)
    if (!hasTea) {
      const boxElement = document.getElementById('step7-box-target');
      if (boxElement) {
        const rect = boxElement.getBoundingClientRect();
        const hitMargin = 40;
        if (
          point.x >= rect.left - hitMargin && point.x <= rect.right + hitMargin &&
          point.y >= rect.top - hitMargin && point.y <= rect.bottom + hitMargin
        ) {
          setHasTea(true);
        }
      }
    } 
    // 2. 置粉检测 (Tea Cup)
    else {
      const cupElement = document.getElementById('step7-cup-target');
      if (cupElement) {
        const rect = cupElement.getBoundingClientRect();
        const hitMargin = 50;
        if (
          point.x >= rect.left - hitMargin && point.x <= rect.right + hitMargin &&
          point.y >= rect.top - hitMargin && point.y <= rect.bottom + hitMargin
        ) {
          setHasTea(false);
          if (!completeCalled.current) {
            completeCalled.current = true;
            setIsDone(true);
            setTimeout(onComplete, 1800);
          }
        }
      }
    }
  };

  return (
    <div className="flex flex-col items-center w-full h-full justify-center gap-2 md:gap-4 overflow-hidden">
      {/* 核心展示区：手机端改用 flex-col 以节省横向空间，或者保持横向但缩小比例 */}
      <div className="flex flex-row md:flex-row justify-around items-center w-full max-w-5xl h-[280px] md:h-[350px] px-4 md:px-10">
        
        {/* 茶盏区域 */}
        <div className="flex flex-col items-center gap-3 md:gap-6">
          <div id="step7-cup-target" className="relative transition-transform duration-300">
            <SimpleCeladonCup showPowder={isDone} />
            {hasTea && (
              <div className="absolute -inset-4 border-2 border-stone-400/20 rounded-full animate-pulse pointer-events-none" />
            )}
          </div>
          <span className="text-[9px] md:text-[10px] text-stone-400 font-bold tracking-[0.2em] md:tracking-[0.4em] uppercase">温热建盏</span>
        </div>

        {/* 装饰物：仅在宽屏显示 */}
        <div className="hidden lg:block w-[1px] h-32 bg-stone-200/50" />

        {/* 茶盒区域 */}
        <div className="flex flex-col items-center gap-3 md:gap-6">
          <div id="step7-box-target" className="relative transition-transform duration-300">
            <LacquerTeaBox />
            {!hasTea && !isDone && (
              <div className="absolute -inset-4 border-2 border-stone-400/20 rounded-full animate-pulse pointer-events-none" />
            )}
          </div>
          <span className="text-[9px] md:text-[10px] text-stone-400 font-bold tracking-[0.2em] md:tracking-[0.4em] uppercase">描金茶盒</span>
        </div>
      </div>

      {/* 底部交互区：手机端稍微调低高度 */}
      <div className="h-32 md:h-40 flex flex-col items-center justify-center">
        <motion.div 
          drag 
          dragSnapToOrigin 
          dragMomentum={false}
          dragTransition={{ bounceStiffness: 600, bounceDamping: 25 }}
          style={{ touchAction: 'none' }}
          onDragEnd={handleDragEnd} 
          whileTap={{ scale: 0.9 }}
          className="cursor-grab active:cursor-grabbing z-50 p-2 md:p-4"
        >
          <WoodenSpoon hasTea={hasTea} />
          
          <div className="text-center mt-2">
            <AnimatePresence mode="wait">
              <motion.p 
                key={hasTea ? "to-cup" : isDone ? "done" : "to-box"}
                initial={{ opacity: 0, y: 5 }}
                animate={{ opacity: 1, y: 0 }}
                exit={{ opacity: 0, y: -5 }}
                className="text-[10px] md:text-[11px] text-stone-600 font-bold tracking-[0.1em] md:tracking-[0.2em] uppercase bg-white/70 backdrop-blur-sm px-4 py-1.5 rounded-full border border-stone-200/60 shadow-sm"
              >
                {isDone ? "取粉完成" : hasTea ? "将茶末移入茶盏" : "移至茶盒舀取茶粉"}
              </motion.p>
            </AnimatePresence>
          </div>
        </motion.div>
      </div>
    </div>
  );
};

export default Step7;
