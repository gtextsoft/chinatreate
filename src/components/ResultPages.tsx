import React from 'react';
import { motion } from 'motion/react';
import { ArrowRight, Mail, Calendar, MessageCircle, FileText, CheckCircle2, ChevronRight, Users } from 'lucide-react';

interface ResultProps {
  scores: any;
  routing: any;
  responses: any;
  onReset: () => void;
}

export const WaitlistPage: React.FC<ResultProps> = ({ routing, scores, onReset }) => {
  return (
    <div className="section-padding py-24 min-h-screen flex flex-col items-center">
      <div className="max-w-2xl text-center">
        <motion.div
           initial={{ scale: 0.9, opacity: 0 }}
           animate={{ scale: 1, opacity: 1 }}
           className="w-20 h-20 bg-brand-primary/5 rounded-full flex items-center justify-center mx-auto mb-8"
        >
          <Calendar className="w-10 h-10 text-brand-primary" />
        </motion.div>
        <h1 className="text-4xl md:text-5xl font-display font-bold text-brand-primary mb-6">
          {routing.message || "You're closer than you think"}
        </h1>
        <p className="text-lg text-slate-500 mb-12 leading-relaxed">
          Based on your current readiness score ({scores.total}/100), we recommend a tailored roadmap before you join a high-intensity immersion.
        </p>

        <div className="bg-slate-50 rounded-3xl p-8 border border-slate-100 text-left mb-12">
          <div className="flex items-center gap-4 mb-6">
            <div className="w-12 h-12 bg-white rounded-2xl flex items-center justify-center text-brand-accent shadow-sm">
              <FileText className="w-6 h-6" />
            </div>
            <div>
              <p className="text-brand-primary font-display font-bold text-lg">Your Free Resource</p>
              <p className="text-xs text-slate-400 uppercase tracking-widest font-bold">China Sourcing Roadmap PDF</p>
            </div>
          </div>
          <p className="text-slate-600 text-sm leading-relaxed mb-6">
            Discover the 5 specific markers you need to hit before sourcing directly from factories.
          </p>
          <button className="w-full bg-brand-primary text-white py-4 rounded-xl font-display font-bold flex items-center justify-center gap-2 hover:bg-brand-secondary transition-all">
            Download Roadmap <ArrowRight className="w-4 h-4" />
          </button>
        </div>

        <div className="space-y-6">
          <div className="flex items-center gap-2 justify-center text-slate-400 mb-6">
            <div className="w-24 h-px bg-slate-200" />
            <span className="text-[10px] font-bold uppercase tracking-widest">Stay Connected</span>
            <div className="w-24 h-px bg-slate-200" />
          </div>
          <div className="grid sm:grid-cols-2 gap-4">
            <button className="px-6 py-4 rounded-2xl border border-slate-200 flex items-center gap-3 hover:border-brand-primary transition-colors text-left group">
              <MessageCircle className="w-5 h-5 text-brand-success" />
              <div>
                <p className="font-bold text-sm text-brand-primary">WhatsApp Group</p>
                <p className="text-[10px] text-slate-400 font-bold uppercase tracking-widest group-hover:text-brand-primary">Join Community</p>
              </div>
            </button>
            <button className="px-6 py-4 rounded-2xl border border-slate-200 flex items-center gap-3 hover:border-brand-primary transition-colors text-left group">
              <Mail className="w-5 h-5 text-brand-accent" />
              <div>
                <p className="font-bold text-sm text-brand-primary">Weekly Newsletter</p>
                <p className="text-[10px] text-slate-400 font-bold uppercase tracking-widest group-hover:text-brand-primary">Future Cohorts</p>
              </div>
            </button>
          </div>
        </div>
      </div>
    </div>
  );
};

export const ConditionalPage: React.FC<ResultProps> = ({ scores, onReset }) => {
  return (
    <div className="section-padding py-24 min-h-screen">
      <div className="max-w-4xl mx-auto">
        <div className="text-center mb-16">
          <span className="text-xs font-bold text-brand-success bg-brand-success/10 px-4 py-1 rounded-full uppercase tracking-widest mb-6 inline-block">Score: {scores.total}/100</span>
          <h1 className="text-4xl md:text-5xl font-display font-bold text-brand-primary mb-6">You're China-Ready. Let's close the gap.</h1>
          <p className="text-xl text-slate-500 font-light max-w-2xl mx-auto">
            You have the business structure for direct sourcing, but we need to ensure your commitment matches the intensity of the retreat.
          </p>
        </div>

        <div className="grid md:grid-cols-3 gap-8 mb-16">
          <div className="bg-slate-50 p-6 rounded-3xl text-center">
            <div className="text-3xl font-display font-bold text-brand-primary mb-1">Readiness</div>
            <div className="w-full bg-slate-200 h-1.5 rounded-full mb-3">
              <div className="bg-brand-primary h-full rounded-full" style={{ width: `${(scores.readiness/40)*100}%` }} />
            </div>
            <div className="text-xs text-slate-400 font-bold uppercase tracking-widest">{scores.readiness}/40</div>
          </div>
          <div className="bg-slate-50 p-6 rounded-3xl text-center">
            <div className="text-3xl font-display font-bold text-brand-primary mb-1">Fit</div>
            <div className="w-full bg-slate-200 h-1.5 rounded-full mb-3">
              <div className="bg-brand-primary h-full rounded-full" style={{ width: `${(scores.fit/35)*100}%` }} />
            </div>
            <div className="text-xs text-slate-400 font-bold uppercase tracking-widest">{scores.fit}/35</div>
          </div>
          <div className="bg-slate-50 p-6 rounded-3xl text-center">
             <div className="text-3xl font-display font-bold text-brand-warning mb-1">Commitment</div>
            <div className="w-full bg-slate-200 h-1.5 rounded-full mb-3">
              <div className="bg-brand-warning h-full rounded-full" style={{ width: `${(scores.commitment/25)*100}%` }} />
            </div>
            <div className="text-xs text-slate-400 font-bold uppercase tracking-widest">{scores.commitment}/25</div>
          </div>
        </div>

        <div className="bg-brand-primary rounded-[2.5rem] p-8 md:p-12 text-white shadow-3xl shadow-brand-primary/30 flex flex-col md:flex-row items-center gap-12">
          <div className="flex-grow space-y-6">
            <h3 className="text-2xl md:text-3xl font-display font-bold">Schedule a No-Pressure Strategy Call</h3>
            <p className="text-white/60 leading-relaxed max-w-lg">
              Let's spend 15 minutes discussing your specific obstacles and determine if the 2026 cohort is actually the right timing for you.
            </p>
            <div className="flex flex-wrap gap-4">
              <div className="flex items-center gap-2 bg-white/5 py-1 px-3 rounded-full text-xs">
                 <CheckCircle2 className="w-3 h-3 text-brand-accent" /> Personalized Score Breakdown
              </div>
              <div className="flex items-center gap-2 bg-white/5 py-1 px-3 rounded-full text-xs">
                 <CheckCircle2 className="w-3 h-3 text-brand-accent" /> Timeline Clarification
              </div>
            </div>
          </div>
          <button className="bg-white text-brand-primary px-8 py-5 rounded-2xl font-display font-bold hover:bg-brand-accent hover:text-white transition-all flex items-center gap-2 group flex-shrink-0">
            Book Call <ArrowRight className="w-5 h-5 group-hover:translate-x-1 transition-transform" />
          </button>
        </div>
      </div>
    </div>
  );
};
