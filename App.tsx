
import React, { useState, useCallback } from 'react';
import { Step, STEP_DATA, AppMode, StepInfo } from './types';
import Step1 from './components/steps/Step1';
import Step2 from './components/steps/Step2';
import Step3 from './components/steps/Step3';
import Step4 from './components/steps/Step4';
import Step5 from './components/steps/Step5';
import Step6 from './components/steps/Step6';
import Step7 from './components/steps/Step7';
import Step8 from './components/steps/Step8';
import Step9 from './components/steps/Step9';
import Step10 from './components/steps/Step10';
import HistorySection from './components/HistorySection';
import ChallengeMode from './components/ChallengeMode';
import { motion, AnimatePresence } from 'framer-motion';

const RedSeal: React.FC<{ className?: string; text: string }> = ({ className = "", text }) => (
  <div className={`w-12 h-12 border-2 border-red-800/60 flex items-center justify-center p-1 opacity-40 select-none ${className}`}>
    <div className="w-full h-full border border-red-800/40 flex items-center justify-center">
      <span className="text-red-900/70 text-[10px] font-serif leading-none text-center font-bold tracking-tighter" style={{ writingMode: 'vertical-rl' }}>
        {text}
      </span>
    </div>
  </div>
);

const App: React.FC = () => {
  const [mode, setMode] = useState<AppMode>(AppMode.Experience);
  const [currentStep, setCurrentStep] = useState<Step>(Step.Roasting);
  const [isCompleted, setIsCompleted] = useState(false);

  const nextStep = useCallback(() => {
    setCurrentStep(prev => {
      if (prev < Step.Final) {
        return (prev + 1) as Step;
      } else {
        setIsCompleted(true);
        return prev;
      }
    });
  }, []);

  const reset = useCallback(() => {
    setCurrentStep(Step.Roasting);
    setIsCompleted(false);
  }, []);

  const renderExperienceStep = () => {
    switch (currentStep) {
      case Step.Roasting: return <Step1 onComplete={nextStep} />;
      case Step.Grinding: return <Step2 onComplete={nextStep} />;
      case Step.Milling: return <Step3 onComplete={nextStep} />;
      case Step.Boxing: return <Step4 onComplete={nextStep} />;
      case Step.Boiling: return <Step5 onComplete={nextStep} />;
      case Step.Warming: return <Step6 onComplete={nextStep} />;
      case Step.Scooping: return <Step7 onComplete={nextStep} />;
      case Step.Pouring: return <Step8 onComplete={nextStep} />;
      case Step.Whisking: return <Step9 onComplete={nextStep} />;
      case Step.Final: return <Step10 onComplete={reset} />;
      default: return null;
    }
  };

  // Safe access to step data with a fallback object to prevent "Cannot read properties of undefined"
  const stepInfo: StepInfo = STEP_DATA[currentStep] || {
    id: currentStep,
    title: "宋代点茶",
    description: "领略中华茶道之美",
    history: "",
    toolInfo: ""
  };

  return (
    <div className="h-screen w-screen flex flex-col items-center justify-center bg-parchment p-4 overflow-hidden relative">
      <div className="absolute inset-0 opacity-[0.03] pointer-events-none mix-blend-multiply bg-[url('https://www.transparenttextures.com/patterns/natural-paper.png')]" />
      
      <RedSeal text="宣和年製" className="absolute top-10 right-10 rotate-3" />
      <RedSeal text="大宋御製" className="absolute bottom-12 left-10 -rotate-2" />
      <div className="absolute top-20 left-10 text-8xl cursive transform -rotate-12 opacity-[0.04] select-none">禅</div>
      <div className="absolute bottom-24 right-24 text-8xl cursive transform rotate-6 opacity-[0.04] select-none">茶</div>

      <nav className="absolute top-6 flex gap-2 z-50 bg-stone-100/40 backdrop-blur-md p-1 rounded-full border border-stone-300/50 shadow-sm">
        {[
          { id: AppMode.Experience, label: '沉浸体验' },
          { id: AppMode.History, label: '点茶史话' },
          { id: AppMode.Challenge, label: '御前挑战' }
        ].map(tab => (
          <button
            key={tab.id}
            onClick={() => setMode(tab.id)}
            className={`px-6 py-2 rounded-full text-xs font-bold tracking-widest transition-all ${
              mode === tab.id 
                ? 'bg-stone-800 text-white shadow-md' 
                : 'text-stone-500 hover:text-stone-800'
            }`}
          >
            {tab.label}
          </button>
        ))}
      </nav>

      <main className="w-full max-w-5xl h-[78vh] mt-12 flex flex-col items-center justify-center relative bg-white/30 backdrop-blur-[2px] rounded-2xl shadow-[0_30px_100px_rgba(0,0,0,0.1)] p-12 border border-white/40 overflow-hidden">
        <div className="absolute inset-0 opacity-[0.02] bg-[url('https://www.transparenttextures.com/patterns/silk.png')] pointer-events-none" />

        <AnimatePresence mode="wait">
          {mode === AppMode.Experience && (
            <motion.div 
              key="exp"
              initial={{ opacity: 0, y: 10 }}
              animate={{ opacity: 1, y: 0 }}
              exit={{ opacity: 0, y: -10 }}
              className="w-full h-full relative"
            >
              <div className="absolute top-0 left-0 max-w-xs z-10 border-l-2 border-stone-300 pl-4 py-1">
                <h2 className="text-xl font-bold text-stone-700 mb-1">{stepInfo.title}</h2>
                <p className="text-[11px] text-stone-500 leading-relaxed italic tracking-wider">{stepInfo.description}</p>
              </div>
              
              <div className="w-full h-full flex flex-col items-center justify-center">
                {renderExperienceStep()}
              </div>

              <div className="absolute bottom-0 left-1/2 -translate-x-1/2 w-48 h-[1px] bg-stone-200 overflow-hidden">
                <motion.div 
                  className="h-full bg-stone-500"
                  animate={{ width: `${(currentStep / 10) * 100}%` }}
                />
              </div>
            </motion.div>
          )}

          {mode === AppMode.History && (
            <motion.div 
              key="hist"
              initial={{ opacity: 0, y: 10 }}
              animate={{ opacity: 1, y: 0 }}
              exit={{ opacity: 0, y: -10 }}
              className="w-full h-full"
            >
              <HistorySection />
            </motion.div>
          )}

          {mode === AppMode.Challenge && (
            <motion.div 
              key="chall"
              initial={{ opacity: 0, y: 10 }}
              animate={{ opacity: 1, y: 0 }}
              exit={{ opacity: 0, y: -10 }}
              className="w-full h-full"
            >
              <ChallengeMode onExit={() => setMode(AppMode.Experience)} />
            </motion.div>
          )}
        </AnimatePresence>
      </main>

      <footer className="mt-8 text-stone-400 text-[10px] tracking-[0.3em] flex flex-col items-center gap-1 font-serif">
        <span className="opacity-80">宋韵千年 · 点茶文化传承</span>
        <div className="flex gap-6 opacity-40 mt-1">
          <span>《大观茶论》</span>
          <span>《茶录》</span>
          <span>《茶经》</span>
        </div>
      </footer>
    </div>
  );
};

export default App;
