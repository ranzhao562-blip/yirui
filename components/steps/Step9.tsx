
import React, { useState, useRef } from 'react';
import { motion, AnimatePresence } from 'framer-motion';

const Step9: React.FC<{ onComplete: () => void }> = ({ onComplete }) => {
  const [foamLevel, setFoamLevel] = useState(0);
  const [isFinished, setIsFinished] = useState(false);
  const completeCalled = useRef(false);

  return (
    <div className="flex flex-col items-center gap-12 w-full h-full justify-center">
      {/* Celadon Cup Style (Updated from Black) */}
      <div className="relative w-72 h-52 bg-[#d4dcc6] rounded-b-[120px] shadow-2xl border-x-8 border-[#b8c2a8] overflow-hidden">
        <div className="absolute top-0 w-full h-8 bg-[#b8c2a8] rounded-full z-10 border-b border-[#8a9678]" />
        <div className="absolute bottom-0 w-full h-1/2 bg-[#2d4a1a] opacity-80" />
        <AnimatePresence>
          {foamLevel > 0 && (
            <motion.div
              initial={{ height: 0 }}
              animate={{ height: `${20 + (foamLevel * 0.7)}%` }}
              className="absolute bottom-0 w-full bg-white/90 blur-md rounded-full flex items-center justify-center"
            >
              <div className="text-[14px] text-stone-400 font-bold tracking-[0.8em] uppercase opacity-40 select-none">
                沫饽稠叠
              </div>
            </motion.div>
          )}
        </AnimatePresence>
      </div>

      <motion.div
        drag
        dragSnapToOrigin
        dragMomentum={false}
        dragTransition={{ bounceStiffness: 500, bounceDamping: 30 }}
        style={{ touchAction: 'none' }}
        whileTap={{ scale: 1.1 }}
        onDrag={(e, info) => {
          if (!isFinished && !completeCalled.current && (Math.abs(info.delta.x) > 2 || Math.abs(info.delta.y) > 2)) {
            setFoamLevel(prev => {
              const next = prev + 0.6;
              if (next >= 100 && !completeCalled.current) {
                completeCalled.current = true;
                setIsFinished(true);
                setTimeout(onComplete, 1200);
                return 100;
              }
              return next;
            });
          }
        }}
        className="w-16 h-44 bg-orange-100 rounded-full shadow-lg border-2 border-orange-200 flex flex-col items-center cursor-grab active:cursor-grabbing z-50 group"
      >
        <div className="w-full h-28 border-b-2 border-orange-300 opacity-60 flex flex-wrap justify-center overflow-hidden">
          {[...Array(20)].map((_, i) => (
            <div key={i} className="w-0.5 h-full bg-orange-400 mx-0.5 group-active:animate-pulse" />
          ))}
        </div>
        <div className="text-[10px] text-orange-900 mt-2 font-bold uppercase rotate-90 select-none">
          茶筅
        </div>
      </motion.div>
      
      <div className="flex flex-col items-center gap-3">
        <div className="w-64 h-2 bg-stone-200 rounded-full overflow-hidden border border-stone-300 shadow-inner">
          <motion.div 
            className="h-full bg-stone-600" 
            animate={{ width: `${foamLevel}%` }} 
          />
        </div>
        <p className="text-stone-500 italic text-[11px] font-bold tracking-widest uppercase">
          {isFinished ? "大功告成，咬盏持久" : `快速击拂产生茶沫 (${Math.floor(foamLevel)}%)`}
        </p>
      </div>
    </div>
  );
};

export default Step9;
