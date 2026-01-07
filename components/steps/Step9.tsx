
import React, { useState, useRef, useMemo } from 'react';
import { motion, AnimatePresence } from 'framer-motion';

// 写实风格的紫竹茶筅组件 (性能优化版)
const AuthenticBambooWhisk: React.FC = () => {
  // 使用 useMemo 缓存竹丝路径，减少渲染开销
  const tines = useMemo(() => {
    return [...Array(60)].map((_, i) => { // 稍微减少数量以提高稳定性
      const angle = (i / 60) * Math.PI - Math.PI;
      const spread = 95; // 膨胀宽度
      const xControl = 120 + Math.cos(angle) * spread * 1.2;
      const xEnd = 120 + Math.cos(angle * 0.9) * (spread * 0.85);
      const yTop = 40 + Math.sin(Math.abs(angle)) * 15;
      return {
        id: i,
        d: `M120,205 Q${xControl},110 ${xEnd},${yTop}`,
        opacity: 0.6 + Math.random() * 0.4
      };
    });
  }, []);

  const coreLines = useMemo(() => [...Array(12)].map((_, i) => ({
      id: i,
      d: `M${95 + i * 4},200 L${120},60`
  })), []);

  return (
    <div className="relative w-40 h-72 md:w-48 md:h-80 flex flex-col items-center pointer-events-none">
      <svg viewBox="0 0 240 400" className="w-full h-full drop-shadow-2xl overflow-visible">
        <defs>
          <linearGradient id="purpleBambooGrad9" x1="0%" y1="0%" x2="100%" y2="0%">
            <stop offset="0%" stopColor="#2a1b12" />
            <stop offset="50%" stopColor="#3d2b1f" />
            <stop offset="100%" stopColor="#1a110a" />
          </linearGradient>
          <linearGradient id="tineGrad9" x1="0%" y1="0%" x2="0%" y2="100%">
            <stop offset="0%" stopColor="#efd5a0" />
            <stop offset="50%" stopColor="#d4a373" />
            <stop offset="100%" stopColor="#b58d53" />
          </linearGradient>
        </defs>

        {/* 1. 外层细密竹丝 */}
        <g id="outer-tines-detailed">
          {tines.map((tine) => (
            <path
              key={`tine-${tine.id}`}
              d={tine.d}
              fill="none"
              stroke="url(#tineGrad9)"
              strokeWidth="0.5"
              opacity={tine.opacity}
            />
          ))}
        </g>

        {/* 2. 内芯部分 */}
        <g id="inner-core-detailed">
          <path d="M85,205 Q85,80 120,50 Q155,80 155,205 Z" fill="url(#tineGrad9)" opacity="0.9" />
          {coreLines.map(line => (
             <path
              key={`core-${line.id}`}
              d={line.d}
              stroke="#8c6239"
              strokeWidth="0.4"
              opacity="0.3"
            />
          ))}
          <path d="M110,60 Q120,45 130,60" fill="none" stroke="#78350f" strokeWidth="1.2" strokeLinecap="round" />
        </g>

        {/* 3. 束腰绑线 */}
        <g id="waist-binding">
          <rect x="85" y="200" width="70" height="10" rx="1" fill="#111" />
          <path d="M85,203 H155 M85,207 H155" stroke="#222" strokeWidth="0.5" />
          <path d="M120,200 V210" stroke="#333" strokeWidth="1.5" />
        </g>

        {/* 4. 紫竹手柄 */}
        <g id="handle-detailed">
          <path d="M90,210 L90,360 Q90,385 120,385 Q150,385 150,360 L150,210 Z" fill="url(#purpleBambooGrad9)" />
          {/* 竹节 */}
          <path d="M90,285 Q120,278 150,285" fill="none" stroke="#1a110a" strokeWidth="2.5" />
          <path d="M90,287 Q120,282 150,287" fill="none" stroke="#4d3b2f" strokeWidth="1" opacity="0.4" />
          {/* 高光 */}
          <rect x="98" y="220" width="6" height="140" rx="3" fill="#fff" opacity="0.06" />
        </g>
      </svg>
    </div>
  );
};

const WhiskingBowl: React.FC<{ foamLevel: number }> = ({ foamLevel }) => {
  // 缓存泡沫微粒配置
  const particles = useMemo(() => [...Array(20)].map((_, i) => ({
      id: i,
      cx: 80 + Math.random() * 240,
      cy: -15 + Math.random() * 30,
      r: 1 + Math.random() * 4
  })), []);

  return (
    <div className="relative w-80 h-56 md:w-[450px] md:h-72 flex items-center justify-center pointer-events-none">
      <svg viewBox="0 0 400 300" className="w-full h-full drop-shadow-2xl overflow-visible">
        <ellipse cx="200" cy="255" rx="100" ry="12" fill="#c4a47c" opacity="0.7" />
        <path d="M60,40 Q70,240 200,240 Q330,240 340,40 Z" fill="#141414" stroke="#000" strokeWidth="2" />
        
        <mask id="bowlMask9">
          <path d="M60,40 Q70,240 200,240 Q330,240 340,40 Z" fill="white" />
        </mask>
        
        <g mask="url(#bowlMask9)">
          <rect x="0" y="0" width="400" height="300" fill="#2d4a1a" />
          <AnimatePresence>
            {foamLevel > 0 && (
              <motion.g
                initial={{ y: 200, opacity: 0 }}
                animate={{ y: 220 - (foamLevel * 1.7), opacity: 1 }}
              >
                <ellipse cx="200" cy="0" rx="160" ry="45" fill="#fff" className="blur-[5px]" opacity="0.95" />
                <ellipse cx="200" cy="-5" rx="140" ry="40" fill="#f8f8f8" className="blur-[2px]" />
                {particles.map((p) => (
                  <circle 
                    key={p.id} 
                    cx={p.cx} 
                    cy={p.cy} 
                    r={p.r} 
                    fill="#fff" 
                    opacity="0.7" 
                  />
                ))}
              </motion.g>
            )}
          </AnimatePresence>
        </g>
        <ellipse cx="200" cy="50" rx="140" ry="25" fill="none" stroke="rgba(255,255,255,0.15)" strokeWidth="1.5" />
      </svg>
      
      <div className="absolute inset-0 flex items-center justify-center">
         <AnimatePresence>
           {foamLevel > 85 && (
             <motion.span 
               initial={{ opacity: 0, scale: 0.8 }} 
               animate={{ opacity: 0.25, scale: 1.1 }} 
               className="text-5xl font-serif text-stone-900 tracking-[1.2em] font-bold"
             >
               雪花涌起
             </motion.span>
           )}
         </AnimatePresence>
      </div>
    </div>
  );
};

const Step9: React.FC<{ onComplete: () => void }> = ({ onComplete }) => {
  const [foamLevel, setFoamLevel] = useState(0);
  const [isFinished, setIsFinished] = useState(false);
  const completeCalled = useRef(false);

  const handleDrag = (event: any, info: any) => {
    if (isFinished || completeCalled.current) return;

    const movement = Math.sqrt(info.delta.x ** 2 + info.delta.y ** 2);
    if (movement > 0.3) {
      setFoamLevel(prev => {
        const next = prev + movement * 0.18;
        if (next >= 100 && !completeCalled.current) {
          completeCalled.current = true;
          setIsFinished(true);
          setTimeout(onComplete, 1800);
          return 100;
        }
        return next;
      });
    }
  };

  return (
    <div className="flex flex-col items-center w-full h-full justify-center gap-6 md:gap-10 overflow-hidden px-4">
      <div className="relative w-full max-w-xl flex flex-col items-center">
        <WhiskingBowl foamLevel={foamLevel} />
        {!isFinished && foamLevel < 10 && (
          <motion.div 
            animate={{ scale: [0.9, 1.1, 0.9], opacity: [0.1, 0.3, 0.1] }}
            transition={{ repeat: Infinity, duration: 3 }}
            className="absolute top-1/2 left-1/2 -translate-x-1/2 -translate-y-1/2 w-64 h-64 bg-stone-100 rounded-full blur-[60px] pointer-events-none"
          />
        )}
      </div>

      <div className="relative h-72 md:h-80 flex flex-col items-center justify-center">
        <motion.div
          drag
          dragSnapToOrigin
          dragMomentum={false}
          dragTransition={{ bounceStiffness: 500, bounceDamping: 25 }}
          style={{ touchAction: 'none' }}
          onDrag={handleDrag}
          whileTap={{ scale: 1.02 }}
          className="cursor-grab active:cursor-grabbing z-50 flex flex-col items-center"
        >
          <AuthenticBambooWhisk />
          
          <div className="text-center mt-4">
            <AnimatePresence mode="wait">
              {isFinished ? (
                <motion.p 
                  key="done"
                  initial={{ opacity: 0, y: 5 }}
                  animate={{ opacity: 1, y: 0 }}
                  className="text-xs text-green-900 font-bold tracking-[0.4em] uppercase bg-white/40 px-6 py-1.5 rounded-full border border-stone-200"
                >
                  击拂功成 · 咬盏持久
                </motion.p>
              ) : (
                <motion.p 
                  key="hint"
                  initial={{ opacity: 0 }}
                  animate={{ opacity: 1 }}
                  className="text-[10px] md:text-[11px] text-stone-500 font-bold tracking-[0.3em] uppercase bg-white/70 backdrop-blur-sm px-6 py-2 rounded-full border border-stone-200/60 shadow-sm"
                >
                  左右快速摆动茶筅 ({Math.floor(foamLevel)}%)
                </motion.p>
              )}
            </AnimatePresence>
          </div>
        </motion.div>
      </div>
      
      <div className="h-10 flex items-center justify-center">
        <p className="text-stone-400 italic text-[11px] md:text-xs tracking-[0.4em] font-serif text-center opacity-80">
          “春云生于盏中，雪沫咬住盏缘。”
        </p>
      </div>
    </div>
  );
};

export default Step9;
