
import React, { useState, useEffect, useCallback } from 'react';
import { motion, AnimatePresence } from 'framer-motion';
import { Step } from '../types';
import Step1 from './steps/Step1';
import Step2 from './steps/Step2';
import Step3 from './steps/Step3';
import Step4 from './steps/Step4';
import Step5 from './steps/Step5';
import Step6 from './steps/Step6';
import Step7 from './steps/Step7';
import Step8 from './steps/Step8';
import Step9 from './steps/Step9';
import Step10 from './steps/Step10';

interface ChallengeModeProps {
  onExit: () => void;
}

const ChallengeMode: React.FC<ChallengeModeProps> = ({ onExit }) => {
  const [currentStep, setCurrentStep] = useState<Step>(Step.Roasting);
  const [timeLeft, setTimeLeft] = useState(150); // 2.5 minutes total
  const [score, setScore] = useState(0);
  const [gameState, setGameState] = useState<'intro' | 'playing' | 'result'>('intro');

  useEffect(() => {
    let timer: number;
    if (gameState === 'playing' && timeLeft > 0) {
      timer = window.setInterval(() => {
        setTimeLeft(prev => {
          if (prev <= 1) {
            setGameState('result');
            return 0;
          }
          return prev - 1;
        });
      }, 1000);
    }
    return () => clearInterval(timer);
  }, [gameState, timeLeft]);

  const nextStep = useCallback(() => {
    const stepBonus = Math.floor(timeLeft / 10) * 10;
    setScore(prev => prev + 100 + stepBonus);
    
    if (currentStep < Step.Final) {
      setCurrentStep(prev => (prev + 1) as Step);
    } else {
      setGameState('result');
    }
  }, [currentStep, timeLeft]);

  const renderStep = () => {
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
      case Step.Final: return <Step10 onComplete={() => setGameState('result')} />;
      default: return null;
    }
  };

  const getRank = () => {
    if (score > 1800) return "茶仙 (Tea Immortal)";
    if (score > 1400) return "茶圣 (Tea Sage)";
    if (score > 1000) return "茶客 (Tea Master)";
    return "初学者 (Novice)";
  };

  return (
    <div className="w-full h-full flex flex-col">
      <AnimatePresence mode="wait">
        {gameState === 'intro' && (
          <motion.div 
            key="intro"
            initial={{ opacity: 0, scale: 0.9 }}
            animate={{ opacity: 1, scale: 1 }}
            exit={{ opacity: 0, scale: 1.1 }}
            className="flex-1 flex flex-col items-center justify-center text-center p-8"
          >
            <h2 className="text-4xl cursive text-stone-800 mb-6">御前斗茶挑战</h2>
            <div className="space-y-4 text-stone-600 mb-12 max-w-md">
              <p>● 挑战内容：在限定时间内完成全套点茶礼仪。</p>
              <p>● 计分规则：速度越快，得分越高。</p>
              <p>● 时间限制：150 秒。</p>
            </div>
            <button 
              onClick={() => setGameState('playing')}
              className="px-12 py-4 bg-stone-800 text-white rounded-full tracking-[0.4em] font-bold shadow-xl hover:bg-stone-700 transition-all"
            >
              开始斗茶
            </button>
          </motion.div>
        )}

        {gameState === 'playing' && (
          <motion.div key="playing" className="flex-1 flex flex-col relative h-full">
            <div className="absolute top-0 right-0 p-4 bg-white/60 backdrop-blur-md rounded-bl-3xl border-b border-l border-stone-200 z-50 flex gap-8 shadow-sm">
              <div className="text-center">
                <div className="text-[10px] uppercase text-stone-400 font-bold">Time Left</div>
                <div className={`text-2xl font-mono ${timeLeft < 20 ? 'text-red-500 animate-pulse' : 'text-stone-800'}`}>
                  {Math.floor(timeLeft / 60)}:{(timeLeft % 60).toString().padStart(2, '0')}
                </div>
              </div>
              <div className="text-center">
                <div className="text-[10px] uppercase text-stone-400 font-bold">Total Score</div>
                <div className="text-2xl font-mono text-stone-800">{score}</div>
              </div>
            </div>
            <div className="flex-1 overflow-hidden">
              {renderStep()}
            </div>
          </motion.div>
        )}

        {gameState === 'result' && (
          <motion.div 
            key="result"
            initial={{ opacity: 0 }}
            animate={{ opacity: 1 }}
            className="flex-1 flex flex-col items-center justify-center text-center p-8"
          >
            <div className="w-64 h-64 bg-stone-800 rounded-full flex flex-col items-center justify-center text-white mb-8 border-8 border-stone-600 shadow-2xl">
              <span className="text-stone-400 text-xs uppercase mb-1">Final Score</span>
              <span className="text-5xl font-mono font-bold mb-2">{score}</span>
              <span className="text-sm italic opacity-70">Rank: {getRank()}</span>
            </div>
            <h2 className="text-3xl font-bold text-stone-800 mb-8">
              {currentStep === Step.Final ? "斗茶大捷！" : "挑战结束"}
            </h2>
            <div className="flex gap-4">
              <button 
                onClick={() => {
                  setGameState('intro');
                  setCurrentStep(Step.Roasting);
                  setTimeLeft(150);
                  setScore(0);
                }}
                className="px-8 py-3 bg-stone-800 text-white rounded-full text-sm font-bold shadow-lg"
              >
                再战一局
              </button>
              <button 
                onClick={onExit}
                className="px-8 py-3 border-2 border-stone-400 text-stone-600 rounded-full text-sm font-bold shadow-lg"
              >
                返回首页
              </button>
            </div>
          </motion.div>
        )}
      </AnimatePresence>
    </div>
  );
};

export default ChallengeMode;
