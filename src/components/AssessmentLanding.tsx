import React from 'react';
import { motion } from 'motion/react';
import { ShieldCheck, Globe, TrendingUp, ArrowRight, PlayCircle, Users } from 'lucide-react';

interface AssessmentLandingProps {
  onStart: () => void;
}

export const AssessmentLanding: React.FC<AssessmentLandingProps> = ({ onStart }) => {
  return (
    <div className="relative bg-white pt-24 pb-32 overflow-hidden min-h-screen flex flex-col justify-center">
      {/* Background decoration */}
      <div className="absolute inset-0 bg-cover bg-center opacity-10 grayscale mix-blend-multiply" style={{ backgroundImage: "url('https://i.ibb.co/9kf0JhsB/china-bg.jpg')" }} />
      <div className="absolute top-0 right-0 w-[600px] h-[600px] bg-brand-primary/5 blur-[120px] rounded-full -mr-48 -mt-48" />
      <div className="absolute bottom-0 left-0 w-[400px] h-[400px] bg-brand-accent/5 blur-[100px] rounded-full -ml-24 -mb-24" />

      <div className="section-padding relative z-10 grid lg:grid-cols-2 gap-16 items-center">
        <motion.div
          initial={{ opacity: 0, x: -30 }}
          animate={{ opacity: 1, x: 0 }}
          transition={{ duration: 0.8 }}
        >
          <div className="inline-flex items-center gap-2 bg-brand-primary/5 border border-brand-primary/10 px-4 py-1.5 rounded-full text-brand-primary text-xs font-bold tracking-widest mb-8 uppercase">
             April 2026 Assessment
          </div>
          <h1 className="text-4xl md:text-6xl font-display font-bold text-brand-primary mb-8 leading-[1.1] tracking-tight">
            Is Your Business <br /> 
            <span className="text-brand-accent">Actually Ready</span> <br /> 
            for China?
          </h1>
          <p className="text-lg md:text-xl text-slate-500 mb-10 leading-relaxed font-light max-w-xl">
            Take the 2-minute assessment. Discover if direct factory access is your next move—or if you're still one step away.
          </p>

          <div className="flex flex-col sm:flex-row items-center gap-6">
            <button
              onClick={onStart}
              className="bg-brand-accent hover:bg-brand-accent/90 text-white px-10 py-5 rounded-full font-display font-bold text-lg shadow-2xl shadow-brand-accent/20 flex items-center gap-3 group transition-all cursor-pointer"
            >
              START ASSESSMENT — FREE
              <ArrowRight className="w-5 h-5 group-hover:translate-x-1 transition-transform" />
            </button>
            <div className="flex -space-x-3 items-center">
              {[1, 2, 3, 4].map(i => (
                <div key={i} className="w-10 h-10 rounded-full border-2 border-white bg-slate-100 overflow-hidden">
                  <img src={`https://i.pravatar.cc/100?u=${i}`} alt="User" />
                </div>
              ))}
              <span className="pl-6 text-[11px] font-bold text-slate-400 uppercase tracking-widest">
                Trusted by 200+ <br /> African entrepreneurs
              </span>
            </div>
          </div>
        </motion.div>

        <motion.div
          initial={{ opacity: 0, scale: 0.9 }}
          animate={{ opacity: 1, scale: 1 }}
          transition={{ duration: 0.8 }}
          className="relative"
        >
           <div className="bg-brand-primary rounded-[2.5rem] p-8 md:p-12 text-white shadow-3xl shadow-brand-primary/30 min-h-[400px] flex flex-col justify-center">
              <h3 className="text-2xl font-display font-bold mb-8">What this assessment reveals:</h3>
              <div className="space-y-6">
                {[
                  { icon: Globe, title: "Sourcing Maturity", desc: "Are you ready to skip the middlemen?" },
                  { icon: TrendingUp, title: "Investment Capacity", desc: "Scale potential vs available capital." },
                  { icon: ShieldCheck, title: "Risk Readiness", desc: "Understanding the complexity of China trade." }
                ].map((item, i) => (
                  <div key={i} className="flex gap-5">
                    <div className="w-12 h-12 bg-white/10 rounded-2xl flex items-center justify-center flex-shrink-0">
                      <item.icon className="w-6 h-6 text-brand-accent" />
                    </div>
                    <div>
                      <h4 className="font-display font-bold text-lg">{item.title}</h4>
                      <p className="text-white/40 text-sm">{item.desc}</p>
                    </div>
                  </div>
                ))}
              </div>
           </div>
        </motion.div>
      </div>
    </div>
  );
};
