import React, { useState, useEffect } from 'react';
import { motion, AnimatePresence } from 'motion/react';
import { ChevronLeft, ArrowRight, CheckCircle2, Loader2, Factory, TrendingUp, Globe, ShieldCheck } from 'lucide-react';
import { QUESTIONS, Q8_STANDARD, Q8_INVESTOR } from '../quizData';
import { calculateScore, routeUser } from '../quizLogic';

interface QuizEngineProps {
  onComplete: (result: any) => void;
}

export const QuizEngine: React.FC<QuizEngineProps> = ({ onComplete }) => {
  const [step, setStep] = useState(0);
  const [responses, setResponses] = useState<Record<string, any>>({});
  const [isSubmitting, setIsSubmitting] = useState(false);

  const currentQuestion = QUESTIONS[step];

  const handleSelect = (value: string) => {
    if (currentQuestion.type === 'single') {
      const nextResponses = { ...responses, [currentQuestion.id]: value };
      setResponses(nextResponses);

      // Hard Gate Check for r1
      if (currentQuestion.id === 'q3' && value === 'r1') {
        handleSubmit(nextResponses);
        return;
      }

      // Step forward
      if (step < QUESTIONS.length - 1) {
        setStep(step + 1);
      } else {
        handleSubmit(nextResponses);
      }
    } else if (currentQuestion.type === 'multi') {
      const current = (responses[currentQuestion.id] || []) as string[];
      let next: string[];
      if (current.includes(value)) {
        next = current.filter(v => v !== value);
      } else {
        if (currentQuestion.maxSelections && current.length >= currentQuestion.maxSelections) {
          return;
        }
        next = [...current, value];
      }
      const updatedResponses = { ...responses, [currentQuestion.id]: next };
      setResponses(updatedResponses);

      // Auto-advance if max selections reached
      if (currentQuestion.maxSelections && next.length === currentQuestion.maxSelections) {
        setTimeout(() => {
          if (step < QUESTIONS.length - 1) {
            setStep(s => s + 1);
          } else {
            handleSubmit(updatedResponses);
          }
        }, 600); // Small delay so user sees their selection
      }
    }
  };

  const handleSubmit = async (finalResponses: Record<string, any>) => {
    setIsSubmitting(true);
    // Simulate scoring calculation
    setTimeout(() => {
      const scores = calculateScore(finalResponses);
      const routing = routeUser(finalResponses, scores);
      onComplete({ scores, routing, responses: finalResponses });
    }, 1500);
  };

  const getDynamicOptions = () => {
    if (currentQuestion.id === 'q8') {
      const isInvestor = responses.q1 === 're_investor' || responses.q7 === 'invest_china';
      return isInvestor ? Q8_INVESTOR : Q8_STANDARD;
    }
    return currentQuestion.options;
  };

  if (isSubmitting) {
    return (
      <div className="min-h-[60vh] flex flex-col items-center justify-center text-center p-8">
        <motion.div
          animate={{ rotate: 360 }}
          transition={{ repeat: Infinity, duration: 2, ease: "linear" }}
        >
          <Loader2 className="w-12 h-12 text-brand-accent" />
        </motion.div>
        <h2 className="text-2xl font-display font-bold mt-8 text-brand-primary">Calculating your China Readiness...</h2>
        <p className="text-slate-500 mt-2">Analyzing your profile across 12 strategic dimensions.</p>
      </div>
    );
  }

  const options = getDynamicOptions();

  return (
    <div className="max-w-3xl mx-auto py-12 px-4 min-h-[70vh] flex flex-col">
      {/* Progress Bar */}
      <div className="mb-12">
        <div className="flex justify-between items-center mb-4">
          <span className="text-xs font-bold uppercase tracking-widest text-slate-400">Step {step + 1} of 10</span>
          <span className="text-xs font-bold text-brand-accent uppercase tracking-widest">{Math.round(((step + 1) / 10) * 100)}% Complete</span>
        </div>
        <div className="h-1.5 w-full bg-slate-100 rounded-full overflow-hidden">
          <motion.div 
            initial={{ width: 0 }}
            animate={{ width: `${((step + 1) / 10) * 100}%` }}
            className="h-full bg-brand-accent"
          />
        </div>
      </div>

      <AnimatePresence mode="wait">
        <motion.div
          key={step}
          initial={{ opacity: 0, x: 20 }}
          animate={{ opacity: 1, x: 0 }}
          exit={{ opacity: 0, x: -20 }}
          className="flex-grow flex flex-col"
        >
          <h2 className="text-2xl md:text-3xl font-display font-bold text-brand-primary text-center mb-12">
            {currentQuestion.text}
          </h2>

          <div className="grid gap-4">
            {options.map((option) => {
              const isSelected = Array.isArray(responses[currentQuestion.id]) 
                ? responses[currentQuestion.id]?.includes(option.value)
                : responses[currentQuestion.id] === option.value;

              return (
                <button
                  key={option.value}
                  onClick={() => handleSelect(option.value)}
                  className={`quiz-card text-left flex items-center justify-between group ${isSelected ? 'quiz-card-selected' : ''}`}
                >
                  <span className={`text-base font-medium transition-colors ${isSelected ? 'text-brand-accent' : 'text-slate-700'}`}>
                    {option.label}
                  </span>
                  <div className={`w-6 h-6 rounded-full border-2 flex items-center justify-center transition-all ${isSelected ? 'border-brand-accent bg-brand-accent' : 'border-slate-200 group-hover:border-slate-300'}`}>
                    {isSelected && <div className="w-2 h-2 bg-white rounded-full" />}
                  </div>
                </button>
              );
            })}
          </div>

          {currentQuestion.type === 'multi' && (
            <div className="mt-12 flex justify-center">
              <button
                disabled={!(responses[currentQuestion.id]?.length > 0)}
                onClick={() => setStep(step + 1)}
                className="bg-brand-primary text-white px-12 py-4 rounded-full font-display font-bold disabled:opacity-30 disabled:cursor-not-allowed group flex items-center gap-2 hover:bg-brand-secondary transition-all"
              >
                Continue <ArrowRight className="w-5 h-5 group-hover:translate-x-1 transition-transform" />
              </button>
            </div>
          )}
        </motion.div>
      </AnimatePresence>

      <div className="mt-12 flex justify-between items-center text-slate-400">
        <button 
          disabled={step === 0}
          onClick={() => setStep(step - 1)}
          className="flex items-center gap-2 text-xs font-bold uppercase tracking-widest hover:text-brand-primary disabled:opacity-0 transition-opacity"
        >
          <ChevronLeft className="w-4 h-4" /> Back
        </button>
        <span className="text-[10px] uppercase font-bold tracking-[0.2em] opacity-40">China Readiness Assessment</span>
      </div>
    </div>
  );
};
