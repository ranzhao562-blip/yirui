
import React, { useState, useEffect, useRef } from 'react';
import { motion, AnimatePresence } from 'framer-motion';

const CeladonEwerVisual: React.FC<{ isBoiling: boolean; progress: number }> = ({ isBoiling, progress }) => (
  // Mobile: w-48 h-60, Desktop: w-64 h-80
  <div className="relative w-48 h-60 md:w-64 md:h-80 flex items-center justify-center">
    <svg viewBox="0 0 200 300" className="w-full h-full drop-shadow-2xl overflow-visible">
      <defs>
        <linearGradient id="celadonGradStove" x1="0%" y1="0%" x2="100%" y2="100%">
          <stop offset="0%" stopColor="#e1e8d5" />
          <stop offset="50%" stopColor="#d4dcc6" />
          <stop offset="100%" stopColor="#b8c2a8" />
        </linearGradient>
      </defs>
      <path d="M65,165 Q10,155 35,90 L50,95 Q30,140 75,160 Z" fill="url(#celadonGradStove)" stroke="#8a9678" strokeWidth="1" />
      <path d="M60,160 Q60,135 100,135 Q140,135 140,160 L145,240 Q145,275 100,275 Q55,275 55,240 Z" fill="url(#celadonGradStove)" stroke="#8a9678" strokeWidth="1.5" />
      <path d="M75,140 Q75,40 60,35 L140,35 Q125,40 125,140 Z" fill="url(#celadonGradStove)" stroke="#8a9678" strokeWidth="1.5" />
      <ellipse cx="100" cy="35" rx="40" ry="8" fill="#d4dcc6" stroke="#8a9678" strokeWidth="1" />
      <path d="M135,65 Q175,65 165,160 Q160,195 140,195" fill="none" stroke="url(#celadonGradStove)" strokeWidth="10" strokeLinecap="round" />
      <path d="M135,65 Q175,65 165,160 Q160,195 140,195" fill="none" stroke="#8a9678" strokeWidth="1" strokeLinecap="round" />
      <ellipse cx="100" cy="275" rx="35" ry="6" fill="#d4dcc6" stroke="#8a9678" strokeWidth="1" />
      <AnimatePresence>
        {isBoiling && progress > 30 && (
          <motion.g initial={{ opacity: 0 }} animate={{ opacity: 1 }}>
            {[...Array(6)].map((_, i) => (
              <motion.circle 
                key={i} cx={35} cy={90} initial={{ scale: 0.5, y: 0, x: 0, opacity: 0.8 }} 
                animate={{ scale: [0.5, 2.5, 4], y: [-10, -100], x: [-5, -40], opacity: [0, 0.4, 0] }} 
                transition={{ repeat: Infinity, duration: 2.5, delay: i * 0.4 }} 
                r="3" fill="#fff" className="blur-xl" 
              />
            ))}
          </motion.g>
        )}
      </AnimatePresence>
    </svg>
  </div>
);

const StoveVisual: React.FC<{ isFireOn: boolean }> = ({ isFireOn }) => (
  // Mobile: w-72 h-72, Desktop: w-80 h-80. Scale adjusted for mobile presence.
  <div className="relative w-72 h-72 md:w-80 md:h-80 flex items-center justify-center scale-100 md:scale-95">
    <svg viewBox="0 0 200 200" className="w-full h-full drop-shadow-2xl overflow-visible">
      <path d="M65,182 L55,200 L85,200 Z" fill="#3d2b1f" stroke="#1a110a" strokeWidth="1" />
      <path d="M135,182 L145,200 L115,200 Z" fill="#3d2b1f" stroke="#1a110a" strokeWidth="1" />
      <path d="M100,188 L110,205 L90,205 Z" fill="#2d1f16" />
      <path d="M45,115 Q35,115 35,145 Q35,190 100,190 Q165,190 165,145 Q165,115 155,115 Z" fill="#4d3b2f" stroke="#2d1f16" strokeWidth="2.5" />
      <path d="M45,115 L45,100 L65,100 L65,115 L135,115 L135,100 L155,100 L155,115" fill="#4d3b2f" stroke="#2d1f16" strokeWidth="2.5" />
      <path d="M80,158 Q80,152 100,152 Q120,152 120,158 L115,185 Q100,188 85,185 Z" fill="#1a110a" stroke="#2d1f16" strokeWidth="2" />
      {isFireOn && (
        <motion.g initial={{ opacity: 0 }} animate={{ opacity: 1 }}>
          <foreignObject x="85" y="155" width="30" height="30">
            <div className="flex gap-0.5 items-end justify-center h-full">
              {[...Array(4)].map((_, i) => (
                <motion.div key={i} animate={{ height: [8, 16, 12, 18, 10], backgroundColor: ['#ef4444', '#f59e0b', '#fbbf24', '#ef4444'] }} transition={{ repeat: Infinity, duration: 0.3 + i * 0.1 }} className="w-1.5 rounded-full shadow-[0_0_10px_rgba(239,68,68,0.8)]" />
              ))}
            </div>
          </foreignObject>
        </motion.g>
      )}
    </svg>
  </div>
);

const Step5: React.FC<{ onComplete: () => void }> = ({ onComplete }) => {
  const [isFireOn, setIsFireOn] = useState(false);
  const [isKettleOn, setIsKettleOn] = useState(false);
  const [progress, setProgress] = useState(0);
  const [isDone, setIsDone] = useState(false);
  const completeCalled = useRef(false);

  useEffect(() => {
    let timer: number;
    if (isFireOn && isKettleOn && !isDone && !completeCalled.current) {
      timer = window.setInterval(() => {
        setProgress(p => {
          if (p >= 100) {
            clearInterval(timer);
            if (!completeCalled.current) {
              completeCalled.current = true;
              setIsDone(true);
              setTimeout(onComplete, 1500);
            }
            return 100;
          }
          return p + 2;
        });
      }, 100);
    }
    return () => clearInterval(timer);
  }, [isFireOn, isKettleOn, isDone, onComplete]);

  const handleDragEnd = (event: any, info: any) => {
    const stoveEl = document.getElementById('tea-stove-5');
    if (stoveEl) {
      const rect = stoveEl.getBoundingClientRect();
      if (info.point.x > rect.left && info.point.x < rect.right && info.point.y > rect.top && info.point.y < rect.bottom + 100) {
        setIsKettleOn(true);
      }
    }
  };

  return (
    <div className="flex flex-col items-center w-full h-full justify-center gap-2">
      <div className="relative w-full max-w-2xl h-[550px] flex flex-col items-center justify-between py-10">
        <div className="relative z-30 h-80 flex items-center justify-center w-full">
          {!isKettleOn ? (
            <motion.div 
              drag 
              dragSnapToOrigin 
              dragMomentum={false}
              dragTransition={{ bounceStiffness: 600, bounceDamping: 20 }}
              style={{ touchAction: 'none' }}
              onDragEnd={handleDragEnd} 
              whileTap={{ scale: 0.95 }}
              className="cursor-grab active:cursor-grabbing"
            >
              <CeladonEwerVisual isBoiling={false} progress={0} />
              <div className="mt-4 text-[10px] text-stone-400 font-bold tracking-[0.2em] uppercase text-center bg-white/40 backdrop-blur-sm p-1 rounded border border-stone-200">
                拖动茶瓶至茶炉
              </div>
            </motion.div>
          ) : <div className="h-full w-full" />}
        </div>
        <div id="tea-stove-5" className={`relative z-10 transition-transform ${!isFireOn ? 'cursor-pointer active:scale-95' : ''}`} onClick={() => setIsFireOn(true)}>
          <StoveVisual isFireOn={isFireOn} />
          <AnimatePresence>
            {isKettleOn && (
              <motion.div initial={{ y: -240, opacity: 0 }} animate={{ y: -80, opacity: 1 }} className="absolute top-0 left-1/2 -translate-x-1/2 pointer-events-none z-20">
                <CeladonEwerVisual isBoiling={isFireOn} progress={progress} />
              </motion.div>
            )}
          </AnimatePresence>
        </div>
      </div>
      <div className="h-24 flex items-center justify-center">
        {isFireOn && isKettleOn ? (
          <div className="flex flex-col items-center gap-3">
            <div className="w-64 h-1.5 bg-stone-200 rounded-full overflow-hidden border border-stone-300 shadow-inner">
              <motion.div className="h-full bg-blue-400" animate={{ width: `${progress}%` }} />
            </div>
            <p className="text-[11px] text-stone-600 font-bold tracking-[0.3em] uppercase">候汤中 ({Math.floor(progress)}%)</p>
          </div>
        ) : (
          <p className="text-[12px] text-stone-400 italic tracking-widest">{!isKettleOn ? "“凡点茶，候汤最难。”" : "点击茶炉，点燃炭火"}</p>
        )}
      </div>
    </div>
  );
};

export default Step5;
