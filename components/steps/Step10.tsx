
import React, { useState } from 'react';
import { motion, AnimatePresence } from 'framer-motion';

const FinishedTeaVisual: React.FC = () => (
  // Mobile: w-56 h-56 (Reduced from w-64), Desktop: w-96 h-96. Responsive sizing.
  <div className="relative w-56 h-56 md:w-96 md:h-96 flex items-center justify-center">
    {/* Wooden Saucer (Matches reference) */}
    <div className="absolute bottom-[20%] w-[80%] h-[45%] flex items-center justify-center pointer-events-none">
      <svg viewBox="0 0 300 150" className="w-full h-full drop-shadow-lg">
        <ellipse cx="150" cy="75" rx="140" ry="70" fill="#c4a47c" stroke="#a68a64" strokeWidth="1" />
        <ellipse cx="150" cy="75" rx="135" ry="65" fill="none" stroke="#8c7355" strokeWidth="0.5" opacity="0.3" />
        {/* Wood Grain */}
        <path d="M40,75 Q150,95 260,75" fill="none" stroke="#8c7355" strokeWidth="0.5" opacity="0.2" />
        <path d="M60,95 Q150,115 240,95" fill="none" stroke="#8c7355" strokeWidth="0.5" opacity="0.1" />
      </svg>
    </div>

    {/* The Black Jian Zhan (Matches reference) */}
    <div className="relative z-10 w-[90%] h-[75%] flex items-center justify-center pointer-events-none">
      <svg viewBox="0 0 320 280" className="w-full h-full drop-shadow-2xl overflow-visible">
        {/* Cup Exterior */}
        <path 
          d="M20,60 Q20,20 160,20 Q300,20 300,60 L200,240 L120,240 Z" 
          fill="#1e1e1e" 
          stroke="#000" 
          strokeWidth="2" 
        />
        <path d="M30,65 Q160,85 290,65" fill="none" stroke="#333" strokeWidth="1" opacity="0.5" />
        
        {/* Foot of the cup */}
        <path d="M125,240 L195,240 Q195,255 160,255 Q125,255 125,240 Z" fill="#2a2a2a" />

        {/* Thick White Foam (Mo Bo) */}
        <ellipse cx="160" cy="65" rx="125" ry="60" fill="#ffffff" />
        <ellipse cx="160" cy="65" rx="120" ry="55" fill="#fcfcfc" />
        
        {/* Foam bubbles texture at the edge */}
        {[...Array(20)].map((_, i) => (
          <circle 
            key={i} 
            cx={160 + 115 * Math.cos(i * (Math.PI / 10))} 
            cy={65 + 50 * Math.sin(i * (Math.PI / 10))} 
            r={1.5 + Math.random() * 2} 
            fill="#eee" 
            opacity="0.8"
          />
        ))}

        {/* Cha Bai Xi - Orchid Pattern (Exactly as in reference) */}
        <g transform="translate(100, 45) scale(0.85)">
          {/* Main green orchid leaves */}
          <motion.path 
            initial={{ pathLength: 0, opacity: 0 }}
            animate={{ pathLength: 1, opacity: 1 }}
            transition={{ duration: 2, delay: 0.5 }}
            d="M60,90 Q55,40 10,65" 
            fill="none" stroke="#4d7c2c" strokeWidth="3" strokeLinecap="round" 
          />
          <motion.path 
            initial={{ pathLength: 0, opacity: 0 }}
            animate={{ pathLength: 1, opacity: 1 }}
            transition={{ duration: 1.8, delay: 0.7 }}
            d="M65,95 Q70,20 120,70" 
            fill="none" stroke="#3a5a1f" strokeWidth="2.5" strokeLinecap="round" 
          />
          <motion.path 
            initial={{ pathLength: 0, opacity: 0 }}
            animate={{ pathLength: 1, opacity: 1 }}
            transition={{ duration: 2.2, delay: 0.6 }}
            d="M70,100 Q100,50 145,90" 
            fill="none" stroke="#5a8b38" strokeWidth="2" strokeLinecap="round" 
          />
          <motion.path 
            initial={{ pathLength: 0, opacity: 0 }}
            animate={{ pathLength: 1, opacity: 1 }}
            transition={{ duration: 1.5, delay: 1.0 }}
            d="M75,98 Q85,60 70,30" 
            fill="none" stroke="#4d7c2c" strokeWidth="1.5" strokeLinecap="round" 
          />
          
          {/* Small orchid buds/flowers */}
          <motion.circle 
            initial={{ scale: 0 }} animate={{ scale: 1 }} transition={{ delay: 1.5 }}
            cx="25" cy="55" r="2.5" fill="#2d4a1a" 
          />
          <motion.circle 
            initial={{ scale: 0 }} animate={{ scale: 1 }} transition={{ delay: 1.7 }}
            cx="15" cy="62" r="2" fill="#2d4a1a" 
          />
          <motion.circle 
            initial={{ scale: 0 }} animate={{ scale: 1 }} transition={{ delay: 1.9 }}
            cx="115" cy="65" r="2.5" fill="#2d4a1a" 
          />
          
          {/* Mossy base at the bottom of the leaves */}
          <motion.path 
            initial={{ opacity: 0 }} animate={{ opacity: 0.6 }} transition={{ delay: 1.2 }}
            d="M50,95 Q70,110 110,95" 
            fill="none" stroke="#4d7c2c" strokeWidth="8" strokeLinecap="round" className="blur-[2px]" 
          />
          {[...Array(6)].map((_, i) => (
            <motion.circle 
              key={i}
              initial={{ opacity: 0 }} animate={{ opacity: 0.5 }} transition={{ delay: 1.3 + i * 0.1 }}
              cx={60 + i * 8} cy={102 - (i % 2) * 2} r="2.5" fill="#2d4a1a" 
            />
          ))}
        </g>
      </svg>
    </div>
  </div>
);

const Step10: React.FC<{ onComplete: () => void }> = ({ onComplete }) => {
  const [tasted, setTasted] = useState(false);

  return (
    <div className="flex flex-col items-center gap-6 w-full h-full justify-center">
      <motion.div
        initial={{ scale: 0.9, opacity: 0 }}
        animate={{ scale: 1, opacity: 1 }}
        transition={{ duration: 0.8 }}
        className="w-full flex items-center justify-center"
      >
        <FinishedTeaVisual />
      </motion.div>

      <div className="text-center space-y-4 z-20">
        <h3 className="text-2xl font-bold text-stone-700 tracking-[0.3em] uppercase">
          点茶功成
        </h3>
        
        <AnimatePresence mode="wait">
          {!tasted ? (
            <motion.button
              key="taste"
              whileHover={{ scale: 1.05, backgroundColor: "#292524" }}
              whileTap={{ scale: 0.95 }}
              onClick={() => setTasted(true)}
              className="px-14 py-4 bg-stone-800 text-white rounded-full text-sm font-bold tracking-[0.5em] shadow-2xl transition-all"
            >
              品尝香茗
            </motion.button>
          ) : (
            <motion.div
              key="feedback"
              initial={{ y: 20, opacity: 0 }}
              animate={{ y: 0, opacity: 1 }}
              className="space-y-6 flex flex-col items-center"
            >
              <p className="text-stone-600 italic leading-loose text-sm tracking-widest px-10 max-w-lg">
                “如雪沫、若兰香。盏中真趣，尽在其中。”
              </p>
              <button
                onClick={onComplete}
                className="px-8 py-2 border border-stone-300 text-stone-500 rounded-full text-xs font-bold tracking-widest hover:bg-white hover:text-stone-800 transition-all uppercase"
              >
                再次研习
              </button>
            </motion.div>
          )}
        </AnimatePresence>
      </div>
    </div>
  );
};

export default Step10;
