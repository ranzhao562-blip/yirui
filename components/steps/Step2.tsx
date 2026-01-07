
import React, { useState, useRef } from 'react';
import { motion, AnimatePresence, useMotionValue } from 'framer-motion';

// 炙烤好的茶饼（小图标）
const RoastedTeaCakeVisual: React.FC = () => (
  <div className="relative w-20 h-20 rounded-full shadow-lg border border-stone-700 overflow-hidden" 
       style={{ background: 'radial-gradient(circle, #8c7355 0%, #5d4a35 100%)' }}>
    <div className="absolute inset-0 opacity-30 bg-[url('https://www.transparenttextures.com/patterns/natural-paper.png')]" />
    <svg viewBox="0 0 100 100" className="w-full h-full p-2 opacity-60">
       <circle cx="50" cy="50" r="44" fill="none" stroke="#2d1f16" strokeWidth="1" strokeDasharray="2 1" />
    </svg>
    <div className="absolute inset-0 flex items-center justify-center">
       <span className="text-2xl text-stone-900/60 font-serif" style={{ fontFamily: '"Zhi Mang Xing", cursive' }}>茶</span>
    </div>
  </div>
);

// 新版茶碾组件 - 严格对齐木杆与碾轮
const TeaRollerVisual: React.FC<{ 
  grindCount: number; 
  isPlotted: boolean;
  onGrind: () => void;
}> = ({ grindCount, isPlotted, onGrind }) => {
  const x = useMotionValue(0);
  
  // 移除旋转逻辑，仅保留x轴拖动
  const lastX = useRef(0);

  const handleDrag = (event: any, info: any) => {
    const currentX = info.offset.x;
    // 检测往复运动
    if (Math.abs(currentX - lastX.current) > 20) {
      onGrind();
      lastX.current = currentX;
    }
  };

  return (
    <div className="relative w-full h-full flex items-center justify-center">
      <svg viewBox="0 0 400 300" className="w-full h-full drop-shadow-2xl overflow-visible">
        <defs>
          <linearGradient id="stoneBaseGrad" x1="0" y1="0" x2="0" y2="1">
             <stop offset="0%" stopColor="#d6d3c9" />
             <stop offset="100%" stopColor="#b5b0a1" />
          </linearGradient>
          <linearGradient id="woodStickGrad" x1="0" y1="0" x2="0" y2="1">
             <stop offset="0%" stopColor="#d4a373" />
             <stop offset="50%" stopColor="#c4a47c" />
             <stop offset="100%" stopColor="#a88b68" />
          </linearGradient>
          <filter id="noise">
            <feTurbulence type="fractalNoise" baseFrequency="0.8" numOctaves="3" stitchTiles="stitch" />
            <feColorMatrix type="saturate" values="0" />
            <feComposite operator="in" in2="SourceGraphic" result="monoNoise"/>
            <feBlend in="SourceGraphic" in2="monoNoise" mode="multiply" />
          </filter>
        </defs>

        {/* --- 1. 石座底座 (Base Block) --- */}
        <g filter="url(#noise)">
          {/* Top Face (Trapezoid) */}
          <path d="M40,200 L120,120 L380,120 L300,200 Z" fill="url(#stoneBaseGrad)" stroke="#8c877a" strokeWidth="1" />
          {/* Front Face */}
          <path d="M40,200 L300,200 L300,260 L40,260 Z" fill="#8c877a" stroke="#4a463c" strokeWidth="1" />
          {/* Side Face (Right) */}
          <path d="M300,200 L380,120 L380,180 L300,260 Z" fill="#757065" stroke="#4a463c" strokeWidth="1" />
        </g>

        {/* --- 2. 碾槽 (Trough) --- */}
        {/* Boat shape depression in the center of Top Face */}
        {/* Adjusted coordinates to match the new perspective */}
        <path d="M100,160 Q210,210 320,160 Q210,110 100,160" fill="#4a463c" stroke="#3a362e" strokeWidth="2" opacity="0.8"/>
        
        {/* 茶末 (Residue in trough) */}
        <AnimatePresence>
          {isPlotted && (
            <motion.path
              initial={{ opacity: 0 }}
              animate={{ opacity: 0.8 }}
              d="M130,160 Q210,180 290,160"
              stroke="#2d4a1a"
              strokeWidth={4 + grindCount * 1.5}
              strokeLinecap="round"
              fill="none"
              className="blur-[1px]"
            />
          )}
        </AnimatePresence>

        {/* --- 3. 移动组件: 木杆 + 石轮 (Moving Assembly) --- */}
        <motion.g 
          drag={isPlotted ? "x" : false}
          dragConstraints={{ left: -90, right: 90 }}
          dragElastic={0.1}
          onDrag={handleDrag}
          style={{ x, cursor: isPlotted ? 'grab' : 'default' }}
          whileTap={{ cursor: 'grabbing' }}
        >
            {/* 3.1 木杆 (Axle Stick) */}
            {/* 绝对水平，居中穿过 (y=150) */}
            <rect 
                x="20" y="144" width="360" height="12" rx="4" 
                fill="url(#woodStickGrad)" stroke="#78350f" strokeWidth="1" 
                filter="url(#noise)"
            />
            {/* 杆头装饰 */}
            <circle cx="30" cy="150" r="3" fill="#5d4037" />
            <circle cx="370" cy="150" r="3" fill="#5d4037" />

            {/* 3.2 石碾轮 (Stone Wheel) */}
            {/* 轮子中心位于 (200, 150)，与木杆中心完全重合。不随移动旋转。 */}
            <g>
                {/* 轮身 */}
                <circle cx="200" cy="150" r="55" fill="#a8a394" stroke="#4a463c" strokeWidth="2" filter="url(#noise)" />
                
                {/* 侧面光影，增加立体感 */}
                <circle cx="200" cy="150" r="50" fill="none" stroke="#fff" strokeWidth="2" opacity="0.1" />
                <circle cx="200" cy="150" r="50" fill="none" stroke="#000" strokeWidth="2" opacity="0.1" transform="translate(1,1)" />
                
                {/* 轮缘刻度 (Visual texture) */}
                <circle cx="200" cy="150" r="44" fill="none" stroke="#6b6659" strokeWidth="8" strokeDasharray="4 6" opacity="0.3" />
                
                {/* 中心孔毂 (Hub) */}
                <circle cx="200" cy="150" r="16" fill="#5c584d" stroke="#4a463c" strokeWidth="1" />
            </g>

            {/* 3.3 木杆中心点 (覆盖在轮子上，保持视觉静止，显示木杆穿过去) */}
            <circle cx="200" cy="150" r="8" fill="#8c6239" stroke="#5d4037" strokeWidth="1" />
            <circle cx="200" cy="150" r="4" fill="#5d4037" opacity="0.5" />

        </motion.g>
      </svg>
      
      {/* 交互提示 */}
      {isPlotted && (
        <div className="absolute top-24 left-1/2 -translate-x-1/2 pointer-events-none z-10">
          <motion.div 
             initial={{ opacity: 0 }}
             animate={{ x: [-40, 40, -40], opacity: [0, 1, 0] }}
             transition={{ duration: 2, repeat: Infinity }}
             className="text-stone-500/50 text-4xl font-bold"
          >
             ↔
          </motion.div>
        </div>
      )}
    </div>
  );
};

const Step2: React.FC<{ onComplete: () => void }> = ({ onComplete }) => {
  const [isPlotted, setIsPlotted] = useState(false);
  const [grindCount, setGrindCount] = useState(0);
  const completeTriggered = useRef(false);
  const REQUIRED_GRINDS = 40; 

  const handleGrind = () => {
    if (!isPlotted || completeTriggered.current) return;
    
    setGrindCount(prev => {
      const next = prev + 1;
      if (next >= REQUIRED_GRINDS && !completeTriggered.current) {
        completeTriggered.current = true;
        setTimeout(onComplete, 1200);
      }
      return next;
    });
  };

  return (
    <div className="flex flex-col items-center gap-8 w-full h-full justify-center">
      <div className="relative w-full max-w-2xl h-96">
        <TeaRollerVisual 
          grindCount={grindCount} 
          isPlotted={isPlotted} 
          onGrind={handleGrind}
        />
      </div>

      <div className="flex flex-col items-center gap-4">
        {!isPlotted ? (
          <motion.div
            drag
            dragSnapToOrigin
            dragMomentum={false}
            dragTransition={{ bounceStiffness: 600, bounceDamping: 20 }}
            onDragEnd={(e, info) => {
              if (info.point.y > 150) setIsPlotted(true);
            }}
            whileTap={{ scale: 0.9 }}
            style={{ touchAction: 'none' }}
            className="cursor-grab active:cursor-grabbing z-50"
          >
            <RoastedTeaCakeVisual />
          </motion.div>
        ) : (
          <div className="text-center space-y-2">
            <div className="w-64 h-2 bg-stone-200 rounded-full overflow-hidden border border-stone-300">
              <motion.div 
                className="h-full bg-green-700"
                initial={{ width: 0 }}
                animate={{ width: `${Math.min((grindCount / REQUIRED_GRINDS) * 100, 100)}%` }}
              />
            </div>
            <p className="text-[10px] text-stone-500 font-bold tracking-[0.3em] uppercase animate-pulse">
              {grindCount < REQUIRED_GRINDS 
                ? "左右拖动木杆碾茶" 
                : "碾茶完成"}
            </p>
          </div>
        )}
        
        {!isPlotted && (
          <p className="text-[10px] text-stone-400 font-bold tracking-[0.2em] uppercase">
            将炙烤好的茶饼投入碾槽
          </p>
        )}
      </div>
    </div>
  );
};

export default Step2;
