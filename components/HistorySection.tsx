
import React from 'react';
import { motion } from 'framer-motion';
import { STEP_DATA, Step } from '../types';

const HistorySection: React.FC = () => {
  return (
    <div className="w-full h-full overflow-y-auto pr-4 custom-scrollbar">
      <div className="space-y-12 py-8">
        <header className="text-center mb-16">
          <h2 className="text-4xl cursive text-stone-800 mb-4">大宋风华：点茶史话</h2>
          <p className="text-stone-600 max-w-lg mx-auto leading-relaxed">
            宋代是中国茶文化的巅峰。点茶不仅是饮茶方式，更是一种集修身、赏器、斗茶于一体的综合艺术。
          </p>
        </header>

        {Object.values(STEP_DATA).map((step, idx) => (
          <motion.div
            key={step.id}
            initial={{ opacity: 0, x: idx % 2 === 0 ? -50 : 50 }}
            whileInView={{ opacity: 1, x: 0 }}
            viewport={{ once: true }}
            className={`flex flex-col md:flex-row gap-8 items-center ${idx % 2 !== 0 ? 'md:flex-row-reverse' : ''}`}
          >
            <div className="w-full md:w-1/2">
              <div className="bg-white/60 p-6 rounded-2xl shadow-sm border border-stone-200">
                <span className="text-stone-400 text-xs font-bold uppercase tracking-widest block mb-2">Stage {step.id}</span>
                <h3 className="text-xl font-bold text-stone-800 mb-3">{step.title}</h3>
                <p className="text-stone-600 mb-4 leading-relaxed">{step.history}</p>
                <div className="bg-stone-100 p-3 rounded-lg border-l-4 border-stone-400">
                  <p className="text-xs text-stone-500 font-medium italic">{step.toolInfo}</p>
                </div>
              </div>
            </div>
            <div className="w-full md:w-1/2 flex justify-center">
              <div className="w-48 h-48 bg-stone-200 rounded-full flex items-center justify-center border-8 border-white shadow-xl relative overflow-hidden">
                <div className="absolute inset-0 bg-[url('https://www.transparenttextures.com/patterns/natural-paper.png')] opacity-50" />
                <span className="cursive text-6xl text-stone-300 select-none">{step.title.slice(-2)}</span>
              </div>
            </div>
          </motion.div>
        ))}

        <footer className="text-center py-12 text-stone-400 text-sm italic">
          — 参考文献：蔡襄《茶录》、徽宗赵佶《大观茶论》 —
        </footer>
      </div>
    </div>
  );
};

export default HistorySection;
