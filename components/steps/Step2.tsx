
import React, { useState, useRef } from 'react';
import { motion, AnimatePresence } from 'framer-motion';

// Mini visual of the roasted tea cake for Step 2
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

const TeaRollerVisual: React.FC<{ grindCount: number; isPlotted: boolean }> = ({ grindCount, isPlotted }) => {
  // Movement logic for the roller and handle
  const xOffset = grindCount % 2 === 0 ? -60 : 60;

  return (
    <div className="relative w-full h-full flex items-center justify-center">
      <svg viewBox="0 0 400 300" className="w-full h-full drop-shadow-2xl">
        {/* Trough Base (Stone block with carvings) */}
        <g id="trough">
          {/* Main Stone Body */}
          <path 
            d="M80,220 L120,130 L350,180 L320,270 Z" 
            fill="#b5b0a1" 
            stroke="#4a463c" 
            strokeWidth="2" 
          />
          <path 
            d="M80,220 L80,260 L320,310 L320,270 Z" 
            fill="#8c877a" 
            stroke="#4a463c" 
            strokeWidth="2" 
          />
          
          {/* Side Cloud Carvings (Yunwen) */}
          <path 
            d="M90,235 Q100,225 115,235 Q130,245 145,235 M160,245 Q175,235 190,245" 
            fill="none" 
            stroke="#5c584d" 
            strokeWidth="1" 
            opacity="0.6"
          />
          <path 
            d="M220,260 Q235,250 250,260 Q265,270 280,260" 
            fill="none" 
            stroke="#5c584d" 
            strokeWidth="1" 
            opacity="0.6"
          />
          <path 
            d="M100,250 Q110,245 120,250 Q130,255 140,250" 
            fill="none" 
            stroke="#5c584d" 
            strokeWidth="1" 
            opacity="0.4"
          />

          {/* Oval Trough Opening */}
          <ellipse 
            cx="225" cy="195" rx="100" ry="45" 
            transform="rotate(-15 225 195)"
            fill="#4a463c" 
            opacity="0.3"
          />
          <path 
            d="M135,175 Q225,130 315,185 Q225,240 135,175" 
            fill="#6b6659" 
            stroke="#4a463c" 
            strokeWidth="1" 
          />

          {/* Tea Residue (Appears inside trough) */}
          <AnimatePresence>
            {isPlotted && (
              <motion.path
                initial={{ opacity: 0, scale: 0.8 }}
                animate={{ opacity: 0.8, scale: 1 }}
                d="M180,195 Q200,185 220,205 Q240,215 260,195"
                stroke="#2d4a1a"
                strokeWidth={5 + grindCount * 2}
                strokeLinecap="round"
                fill="none"
                className="blur-[1px]"
              />
            )}
          </AnimatePresence>
        </g>

        {/* The Moving Parts (Roller + Handle) */}
        <motion.g 
          animate={{ x: xOffset, y: xOffset * -0.2 }}
          transition={{ type: 'spring', damping: 15, stiffness: 100 }}
        >
          {/* Wooden Handle/Axle */}
          <path 
            d="M80,110 L350,220 L350,230 L80,120 Z" 
            fill="#c4a47c" 
            stroke="#7d603c" 
            strokeWidth="1.5"
          />
          <ellipse cx="350" cy="225" rx="4" ry="7" transform="rotate(22 350 225)" fill="#7d603c" />
          
          {/* Stone Roller Wheel */}
          <g transform="translate(210, 165)">
            {/* Main Wheel Face */}
            <circle cx="0" cy="0" r="45" fill="#a8a394" stroke="#4a463c" strokeWidth="2" />
            {/* Rim Pattern */}
            <circle cx="0" cy="0" r="38" fill="none" stroke="#6b6659" strokeWidth="6" strokeDasharray="4 2" opacity="0.4" />
            {/* Center Axle Hole */}
            <circle cx="0" cy="0" r="10" fill="#6b6659" stroke="#4a463c" strokeWidth="1" />
            {/* Axle Connection */}
            <circle cx="0" cy="0" r="6" fill="#7d603c" />
            
            {/* Stone Texture on Wheel */}
            <circle cx="-15" cy="-10" r="1" fill="#4a463c" opacity="0.3" />
            <circle cx="10" cy="20" r="1.5" fill="#4a463c" opacity="0.2" />
            <circle cx="20" cy="-5" r="1" fill="#4a463c" opacity="0.3" />
          </g>
        </motion.g>
      </svg>
    </div>
  );
};

const Step2: React.FC<{ onComplete: () => void }> = ({ onComplete }) => {
  const [isPlotted, setIsPlotted] = useState(false);
  const [grindCount, setGrindCount] = useState(0);
  const completeTriggered = useRef(false);
  const REQUIRED_GRINDS = 6;

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
      <div 
        className="relative w-full max-w-2xl h-96 cursor-pointer tap-highlight-transparent"
        onClick={handleGrind}
        style={{ WebkitTapHighlightColor: 'transparent' }}
      >
        <TeaRollerVisual grindCount={grindCount} isPlotted={isPlotted} />
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
            <div className="flex gap-2 justify-center">
              {[...Array(REQUIRED_GRINDS)].map((_, i) => (
                <div 
                  key={i} 
                  className={`w-3 h-3 rounded-full border border-stone-300 transition-colors duration-300 ${i < grindCount ? 'bg-green-700 shadow-[0_0_5px_rgba(21,128,61,0.5)]' : 'bg-stone-200'}`} 
                />
              ))}
            </div>
            <p className="text-[10px] text-stone-500 font-bold tracking-[0.3em] uppercase animate-pulse">
              点击碾轴来回滚动以碎茶 ({Math.min(grindCount, REQUIRED_GRINDS)}/{REQUIRED_GRINDS})
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
