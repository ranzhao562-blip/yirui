
import React, { useState, useRef, useMemo } from 'react';
import { motion, AnimatePresence } from 'framer-motion';

// --- Constants & Helpers ---
const CENTER_X = 200;
const CENTER_Y = 160;
const RADIUS_X = 120; 
const RADIUS_Y = 40; 

const StoneTextureDefs = () => (
  <defs>
    <filter id="stoneRoughness" x="0%" y="0%" width="100%" height="100%">
      <feTurbulence type="fractalNoise" baseFrequency="0.65" numOctaves="3" result="noise" />
      <feDiffuseLighting in="noise" lightingColor="#fff" surfaceScale="1.5">
        <feDistantLight azimuth="45" elevation="50" />
      </feDiffuseLighting>
      <feComposite operator="in" in2="SourceGraphic" />
    </filter>
    <linearGradient id="stoneBodyGrad" x1="0" y1="0" x2="1" y2="0">
      <stop offset="0%" stopColor="#3f3f46" /> 
      <stop offset="50%" stopColor="#52525b" />
      <stop offset="100%" stopColor="#27272a" />
    </linearGradient>
    <linearGradient id="woodHandleGrad" x1="0" y1="0" x2="1" y2="0">
       <stop offset="0%" stopColor="#d4a373" /> 
       <stop offset="50%" stopColor="#e9c46a" />
       <stop offset="100%" stopColor="#bc6c25" />
    </linearGradient>
    <radialGradient id="holeGrad" cx="0.5" cy="0.5" r="0.5">
      <stop offset="40%" stopColor="#18181b" />
      <stop offset="100%" stopColor="#3f3f46" />
    </radialGradient>
  </defs>
);

const CoarsePowderGranules: React.FC = () => {
  const granules = useMemo(() => {
    const colors = ["#3f6212", "#4d7c2c", "#65a30d", "#2d4a1a", "#1a2e05"];
    return [...Array(60)].map((_, i) => ({
      id: i,
      cx: 60 + Math.cos(Math.random() * Math.PI * 2) * (Math.random() * 32),
      cy: 65 + Math.sin(Math.random() * Math.PI * 2) * (Math.random() * 32 * 0.45),
      r: 0.8 + Math.random() * 2.2,
      fill: colors[i % colors.length],
      opacity: 0.7 + Math.random() * 0.3
    }));
  }, []);

  return (
    <div className="relative w-32 h-28 flex flex-col items-center justify-center pointer-events-none">
      <svg viewBox="0 0 120 100" className="w-full h-full drop-shadow-xl overflow-visible">
        <path d="M20,75 Q60,90 100,75 Q60,60 20,75" fill="#fdfaf1" stroke="#e5e5e5" strokeWidth="0.5" opacity="0.8" />
        <g>
          <path d="M35,75 Q60,35 85,75" fill="#2d4a1a" opacity="0.85" />
          {granules.map(g => (
            <circle 
              key={g.id} 
              cx={g.cx} 
              cy={g.cy} 
              r={g.r} 
              fill={g.fill} 
              opacity={g.opacity}
            />
          ))}
        </g>
      </svg>
      <div className="absolute -bottom-1 text-[10px] text-stone-600 font-bold tracking-[0.3em] uppercase bg-white/90 px-4 py-1.5 rounded-full border border-stone-200 shadow-sm">
        粗茶末
      </div>
    </div>
  );
};

const BaseTray = ({ progress }: { progress: number }) => (
  <g transform="translate(0, 50)">
    <ellipse cx="200" cy="240" rx="170" ry="70" fill="#27272a" />
    <path d="M30,240 Q30,170 200,170 Q370,170 370,240 Q370,310 200,310 Q30,310 30,240" fill="#3f3f46" stroke="#18181b" strokeWidth="2" />
    <ellipse cx="200" cy="240" rx="140" ry="55" fill="#27272a" opacity="0.6" />
    <path d="M180,305 L180,330 L220,330 L220,305" fill="#3f3f46" stroke="#18181b" strokeWidth="2" />
    <path d="M180,330 Q200,340 220,330" fill="none" stroke="#18181b" strokeWidth="2" />
    <AnimatePresence>
      {progress > 2 && (
        <motion.g initial={{ opacity: 0 }} animate={{ opacity: Math.min(progress/60, 1) }}>
           <path 
             d="M60,240 Q60,190 200,190 Q340,190 340,240 Q340,290 200,290 Q60,290 60,240" 
             fill="none" stroke="#65a30d" strokeWidth={Math.min(progress/6, 16)} strokeDasharray="4 4" className="blur-[2px]" opacity="0.7"
           />
        </motion.g>
      )}
    </AnimatePresence>
  </g>
);

const StoneCylinderBody = () => (
  <g transform="translate(0, -10)">
    <path d="M100,220 L100,160 Q100,120 200,120 Q300,120 300,160 L300,220 Q300,260 200,260 Q100,260 100,220" fill="url(#stoneBodyGrad)" stroke="#18181b" strokeWidth="1.5" />
    <path d="M105,220 L105,160 Q105,125 200,125 Q295,125 295,160 L295,220 Q295,255 200,255 Q105,255 105,220" fill="#000" opacity="0.1" filter="url(#stoneRoughness)"/>
  </g>
);

const TopFace = () => (
  <g transform="translate(0, -10)">
    <ellipse cx="200" cy="160" rx="100" ry="40" fill="#52525b" stroke="#27272a" strokeWidth="1.5" />
    <ellipse cx="200" cy="160" rx="98" ry="38" fill="url(#stoneRoughness)" opacity="0.3" style={{ mixBlendMode: 'multiply' }} />
    <circle cx="170" cy="150" r="12" fill="url(#holeGrad)" stroke="#18181b" strokeWidth="0.5" />
    <circle cx="230" cy="150" r="12" fill="url(#holeGrad)" stroke="#18181b" strokeWidth="0.5" />
    <circle cx="200" cy="160" r="3" fill="#18181b" opacity="0.5" />
  </g>
);

const Handle = ({ rotation, layer }: { rotation: number; layer: 'back' | 'front' }) => {
  const rad = (rotation * Math.PI) / 180;
  const x = CENTER_X + RADIUS_X * Math.cos(rad);
  const y = CENTER_Y + RADIUS_Y * Math.sin(rad) - 10; 
  const isFront = Math.sin(rad) >= 0;
  if (layer === 'front' && !isFront) return null;
  if (layer === 'back' && isFront) return null;

  return (
    <g transform={`translate(${x}, ${y})`}>
      <g transform="translate(-10, -50)"> 
         <path d="M5,10 Q-5,0 10,-5 Q25,0 15,10 L15,50 Q15,60 10,60 Q5,60 5,50 Z" fill="url(#woodHandleGrad)" stroke="#78350f" strokeWidth="1"/>
         <ellipse cx="10" cy="2" rx="8" ry="3" fill="#fcd34d" opacity="0.5" />
         <path d="M10,40 L-10,50 L-10,60 L10,50" fill="#92400e" opacity="0.8" />
      </g>
    </g>
  );
};

const Step3: React.FC<{ onComplete: () => void }> = ({ onComplete }) => {
  const [isLoaded, setIsLoaded] = useState(false);
  const [rotation, setRotation] = useState(0); 
  const [progress, setProgress] = useState(0);
  const [isFinished, setIsFinished] = useState(false);
  const containerRef = useRef<HTMLDivElement>(null);
  const lastAngleRef = useRef<number | null>(null);
  const completeCalled = useRef(false);
  const TARGET_TRAVEL = 720; 

  const handleDragUpdate = (info: any) => {
    if (!isLoaded || isFinished || !containerRef.current || completeCalled.current) return;
    const rect = containerRef.current.getBoundingClientRect();
    const centerX = rect.left + rect.width / 2;
    const centerY = rect.top + rect.height / 2;
    const currentAngle = Math.atan2(info.point.y - centerY, info.point.x - centerX) * (180 / Math.PI);

    if (lastAngleRef.current !== null) {
      let delta = currentAngle - lastAngleRef.current;
      if (delta > 180) delta -= 360;
      if (delta < -180) delta += 360;
      if (delta > 0) {
        const newRot = rotation + delta;
        setRotation(newRot);
        setProgress(prev => {
           const currentTravel = (prev / 100) * TARGET_TRAVEL;
           const nextTravel = currentTravel + delta;
           const nextProgress = Math.min(100, (nextTravel / TARGET_TRAVEL) * 100);
           if (nextTravel >= TARGET_TRAVEL && !completeCalled.current) {
             completeCalled.current = true;
             setIsFinished(true);
             setTimeout(onComplete, 1200);
           }
           return nextProgress;
        });
      }
    }
    lastAngleRef.current = currentAngle;
  };

  const handleInitialDrop = (event: any, info: any) => {
    const rect = containerRef.current?.getBoundingClientRect();
    if(rect) {
       const hitPadding = 50;
       const isInside = 
         info.point.x > rect.left - hitPadding && 
         info.point.x < rect.right + hitPadding && 
         info.point.y > rect.top - hitPadding && 
         info.point.y < rect.bottom + hitPadding;
       if (isInside) setIsLoaded(true);
    }
  };

  return (
    <div className="flex flex-col items-center gap-6 w-full h-full justify-center">
      <div ref={containerRef} id="stone-mill-container" className="relative w-full max-w-2xl h-[450px]">
        <div className="w-full h-full flex items-center justify-center pointer-events-none select-none">
          <svg viewBox="0 0 400 350" className="w-full h-full drop-shadow-2xl overflow-visible">
            <StoneTextureDefs />
            <BaseTray progress={progress} />
            <Handle rotation={rotation} layer="back" />
            <StoneCylinderBody />
            <TopFace />
            <Handle rotation={rotation} layer="front" />
          </svg>
        </div>
        
        {isLoaded && !isFinished && (
          <motion.div
            drag
            dragConstraints={containerRef}
            dragElastic={0}
            dragMomentum={false}
            onDrag={(e, info) => handleDragUpdate(info)}
            onDragEnd={() => { lastAngleRef.current = null; }}
            className="absolute top-1/2 left-1/2 -translate-x-1/2 -translate-y-1/2 w-64 h-64 z-50 cursor-grab active:cursor-grabbing rounded-full"
            style={{ touchAction: 'none' }}
          >
             <div className="absolute inset-0 flex items-center justify-center pointer-events-none">
                 <svg viewBox="0 0 200 200" className="w-full h-full opacity-40 animate-pulse">
                    <defs>
                        <marker id="arrowhead" markerWidth="10" markerHeight="7" refX="0" refY="3.5" orient="auto"><polygon points="0 0, 10 3.5, 0 7" fill="#fff" /></marker>
                    </defs>
                    <path d="M 100,20 A 80,80 0 0,1 180,100" fill="none" stroke="#fff" strokeWidth="2" markerEnd="url(#arrowhead)" />
                    <path d="M 180,100 A 80,80 0 0,1 100,180" fill="none" stroke="#fff" strokeWidth="2" strokeDasharray="4 4" />
                    <path d="M 100,180 A 80,80 0 0,1 20,100" fill="none" stroke="#fff" strokeWidth="2" strokeDasharray="4 4" />
                    <path d="M 20,100 A 80,80 0 0,1 100,20" fill="none" stroke="#fff" strokeWidth="2" strokeDasharray="4 4" />
                 </svg>
             </div>
          </motion.div>
        )}
      </div>

      <div className="flex flex-col items-center gap-4">
        {!isLoaded ? (
          <motion.div
            drag
            dragSnapToOrigin
            dragMomentum={false}
            dragTransition={{ bounceStiffness: 600, bounceDamping: 25 }}
            style={{ touchAction: 'none' }}
            onDragEnd={handleInitialDrop}
            whileTap={{ scale: 1.05 }}
            className="z-50 cursor-grab active:cursor-grabbing"
          >
            <CoarsePowderGranules />
            <p className="absolute -bottom-10 left-1/2 -translate-x-1/2 w-48 text-center text-[10px] text-stone-400 font-bold tracking-[0.2em] uppercase pointer-events-none">
              将粗末投入磨孔中
            </p>
          </motion.div>
        ) : (
          <div className="text-center space-y-3">
             <div className="w-64 h-1.5 bg-stone-200 rounded-full overflow-hidden shadow-inner border border-stone-300">
              <motion.div 
                className="h-full bg-green-800 shadow-[0_0_10px_rgba(21,128,61,0.5)]" 
                animate={{ width: `${progress}%` }} 
                transition={{ duration: 0.2 }}
              />
            </div>
            <p className="text-[11px] text-stone-700 font-bold tracking-[0.4em] uppercase">
              {isFinished ? "研磨已成，细腻如尘" : `顺时针旋转手柄 (${Math.floor(progress)}%)`}
            </p>
          </div>
        )}
      </div>
    </div>
  );
};

export default Step3;
