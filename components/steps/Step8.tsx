
import React, { useState, useRef } from 'react';
import { motion, AnimatePresence } from 'framer-motion';

// 青瓷汤瓶组件
const CeladonEwerVisual: React.FC<{ isPouring: boolean }> = ({ isPouring }) => (
  <div className="relative w-36 h-48 md:w-44 md:h-60 flex items-center justify-center transition-all duration-300 pointer-events-none">
    <svg viewBox="0 0 200 300" className="w-full h-full overflow-visible drop-shadow-xl">
      <defs>
        <linearGradient id="ewerGrad8" x1="0%" y1="0%" x2="100%" y2="100%">
          <stop offset="0%" stopColor="#e1e8d5" />
          <stop offset="50%" stopColor="#d4dcc6" />
          <stop offset="100%" stopColor="#b8c2a8" />
        </linearGradient>
      </defs>
      
      {/* 瓶身与水流组 */}
      <motion.g 
        // 关键修复：使用固定的旋转中心 (100px 150px)，避免因水流路径(path)的出现改变SVG包围盒中心，导致旋转轴心偏移。
        // 同时移除 className 中的 origin-[center_center]
        style={{ transformOrigin: "100px 150px" }}
        // 旋转 -45 度。配合水流路径向量 (-1, 1)，在屏幕坐标系中合成为垂直向下 (0, 1)。
        animate={isPouring ? { rotate: -45, x: 20, y: -20 } : { rotate: 0, x: 0, y: 0 }} 
        transition={{ type: "spring", stiffness: 60, damping: 15 }}
      >
        {/* 水流 - 位于瓶口下方 */}
        <AnimatePresence>
            {isPouring && (
                <motion.path
                    initial={{ pathLength: 0, opacity: 0 }}
                    animate={{ pathLength: 1, opacity: 0.8 }}
                    exit={{ opacity: 0 }}
                    transition={{ duration: 0.4 }}
                    // 几何计算：
                    // 瓶身旋转 -45度 (逆时针)。
                    // 要画出全局垂直线，局部向量需为 (-1, 1) 方向 (即指向左下)。
                    // 起点 M35,90 (壶嘴)。
                    // 终点需为 x = 35 - 300 = -265, y = 90 + 300 = 390。
                    // 这样 Delta = (-300, 300)，正是 (-1, 1) 方向。
                    d="M35,90 L-265,390" 
                    fill="none" 
                    stroke="#e0f2fe" 
                    strokeWidth="5" 
                    strokeLinecap="round"
                    className="blur-[2px]"
                />
            )}
        </AnimatePresence>

        {/* 瓶身 */}
        <path d="M65,165 Q10,155 35,90 L50,95 Q30,140 75,160 Z" fill="url(#ewerGrad8)" stroke="#8a9678" strokeWidth="1" />
        <path d="M60,160 Q60,135 100,135 Q140,135 140,160 L145,240 Q145,275 100,275 Q55,275 55,240 Z" fill="url(#ewerGrad8)" stroke="#8a9678" strokeWidth="1" />
        <path d="M75,140 Q75,40 60,35 L140,35 Q125,40 125,140 Z" fill="url(#ewerGrad8)" stroke="#8a9678" strokeWidth="1.5" />
        <path d="M135,65 Q175,65 165,160 Q160,195 140,195" fill="none" stroke="url(#ewerGrad8)" strokeWidth="8" strokeLinecap="round" />
        <path d="M135,65 Q175,65 165,160 Q160,195 140,195" fill="none" stroke="#8a9678" strokeWidth="0.5" strokeLinecap="round" />
      </motion.g>
    </svg>
  </div>
);

// 此时的茶盏组件 (建盏风格)
const JianZhanCup: React.FC<{ isPouring: boolean }> = ({ isPouring }) => (
  <div className="relative w-44 h-28 md:w-56 md:h-36 flex items-center justify-center pointer-events-none">
    <svg viewBox="0 0 200 120" className="w-full h-full drop-shadow-2xl overflow-visible">
      {/* 盏托 */}
      <ellipse cx="100" cy="110" rx="80" ry="15" fill="#c4a47c" opacity="0.8" />
      {/* 建盏身 */}
      <path d="M20,20 Q25,100 100,100 Q175,100 180,20 Z" fill="#1a1a1a" stroke="#000" strokeWidth="2" />
      <ellipse cx="100" cy="25" rx="78" ry="12" fill="#2a2a2a" />
      
      {/* 盏内茶粉 */}
      <ellipse cx="100" cy="85" rx="20" ry="8" fill="#3f6212" className="blur-[1px]" />

      <AnimatePresence>
        {isPouring && (
          <motion.g initial={{ opacity: 0 }} animate={{ opacity: 1 }} exit={{ opacity: 0 }} transition={{ delay: 0.2 }}>
             {/* 承接水流的涟漪 */}
             <motion.ellipse 
                initial={{ scale: 0, opacity: 0 }}
                animate={{ scale: [0.5, 1.2, 1], opacity: [0, 0.8, 0.6] }}
                transition={{ duration: 1, repeat: Infinity }}
                cx="100" cy="85" rx="15" ry="5"
                fill="#e0f2fe"
                className="blur-[2px]"
             />
             {/* 调和中的茶膏效果 */}
             <motion.ellipse 
                initial={{ scale: 0.5 }}
                animate={{ scale: 1.5, opacity: 0.8 }}
                transition={{ duration: 2 }}
                cx="100" cy="85" rx="25" ry="10" 
                fill="#4d7c2c" 
                className="blur-[2px]" 
             />
          </motion.g>
        )}
      </AnimatePresence>
    </svg>
  </div>
);

const Step8: React.FC<{ onComplete: () => void }> = ({ onComplete }) => {
  const [isPouring, setIsPouring] = useState(false);
  const [isFinished, setIsFinished] = useState(false);
  const completeCalled = useRef(false);

  // 碰撞检测逻辑
  const handleDrag = (event: any, info: any) => {
    if (isFinished || completeCalled.current) return;
    
    const cupElement = document.getElementById('target-cup-8');
    if (cupElement) {
      const rect = cupElement.getBoundingClientRect();
      const point = { x: info.point.x, y: info.point.y };
      const hitMargin = 80;
      
      const isOver = 
        point.x > rect.left - hitMargin &&
        point.x < rect.right + hitMargin &&
        point.y > rect.top - hitMargin &&
        point.y < rect.bottom + hitMargin;

      if (isOver) {
        setIsPouring(true);
        setIsFinished(true);
        completeCalled.current = true;
        setTimeout(onComplete, 3500);
      }
    }
  };

  return (
    <div className="flex flex-col items-center w-full h-full justify-center gap-4 md:gap-10">
      
      {/* 核心展示区：茶瓶在上，茶盏在下 */}
      <div className="relative flex flex-col items-center justify-center w-full max-w-lg h-[500px]">
        
        {/* 上方：可拖拽的茶瓶 */}
        <motion.div
          drag={!isPouring} // 禁止在注水时拖动
          dragSnapToOrigin={!isPouring} // 仅在未注水时回弹
          dragMomentum={false}
          dragTransition={{ bounceStiffness: 600, bounceDamping: 25 }}
          style={{ touchAction: 'none' }}
          whileTap={{ scale: 0.95 }}
          onDrag={handleDrag}
          // 当注水时，强制移动到指定位置
          // 微微调整偏移以对齐中心
          animate={isPouring ? { x: 50, y: -45 } : {}} 
          transition={{ type: "spring", stiffness: 50 }}
          className="absolute top-10 z-50 cursor-grab active:cursor-grabbing"
        >
          <CeladonEwerVisual isPouring={isPouring} />
          {!isPouring && (
             <div className="absolute -bottom-8 left-1/2 -translate-x-1/2 whitespace-nowrap">
                <p className="text-[10px] text-stone-500 font-bold tracking-[0.2em] uppercase bg-white/40 px-3 py-1 rounded-full border border-stone-200 shadow-sm pointer-events-none">
                向下拖动茶瓶注汤
                </p>
             </div>
          )}
        </motion.div>

        {/* 下方：目标茶盏 */}
        <div id="target-cup-8" className="absolute bottom-20 flex flex-col items-center">
          <JianZhanCup isPouring={isPouring} />
          <span className="text-[10px] text-stone-400 font-bold tracking-[0.4em] uppercase mt-4">温热茶盏</span>
          {!isPouring && !isFinished && (
            <div className="absolute -inset-8 border-2 border-stone-400/10 rounded-full animate-pulse pointer-events-none" />
          )}
        </div>
      </div>

      {/* 提示文本区 */}
      <div className="h-12 flex flex-col items-center justify-center text-center px-6 z-10">
        <AnimatePresence mode="wait">
          {isFinished ? (
            <motion.div 
              key="finished"
              initial={{ opacity: 0, y: 10 }}
              animate={{ opacity: 1, y: 0 }}
              className="flex flex-col items-center gap-2"
            >
              <p className="text-stone-700 font-bold text-xs tracking-[0.2em] uppercase">
                “水少许，调如膏状，谓之调膏。”
              </p>
              <div className="w-12 h-1 bg-stone-200 rounded-full overflow-hidden">
                 <motion.div 
                   className="h-full bg-blue-400" 
                   initial={{ width: 0 }} 
                   animate={{ width: "100%" }} 
                   transition={{ duration: 3 }} 
                 />
              </div>
            </motion.div>
          ) : (
            <motion.p 
              key="hint"
              initial={{ opacity: 0 }}
              animate={{ opacity: 1 }}
              className="text-stone-400 italic text-[11px] tracking-widest font-serif max-w-xs"
            >
              注汤需精准控制，首次注水不可过多，旨在将茶粉调和成均匀的茶膏。
            </motion.p>
          )}
        </AnimatePresence>
      </div>
    </div>
  );
};

export default Step8;
