import React from 'react';
import { motion } from 'motion/react';
import { 
  CheckCircle2, 
  Calendar, 
  Mail, 
  MessageSquare, 
  Phone, 
  Plane, 
  Clock, 
  ShieldCheck,
  ChevronRight,
  ArrowRight
} from 'lucide-react';

interface ThankYouPageProps {
  onBackToHome?: () => void;
}

const ThankYouPage: React.FC<ThankYouPageProps> = ({ onBackToHome }) => {
  // Generate a mock application ID
  const appId = `CRA-2026-${Math.random().toString(36).substring(2, 6).toUpperCase()}`;

  const steps = [
    {
      step: 1,
      title: "Application Submitted",
      desc: "Today — Deposit secured, application in queue",
      icon: <ShieldCheck className="w-5 h-5 text-green-500" />,
      status: "completed"
    },
    {
      step: 2,
      title: "Under Review",
      desc: "Within 48 hours — Our team reviews your profile",
      icon: <Clock className="w-5 h-5 text-brand-accent" />,
      status: "current"
    },
    {
      step: 3,
      title: "Decision Email",
      desc: "Within 48 hours — You'll receive acceptance or refund",
      icon: <Mail className="w-5 h-5 text-slate-400" />,
      status: "upcoming"
    },
    {
      step: 4,
      title: "Strategy Alignment Call",
      desc: "Within 72 hours — 15-min call to confirm fit & close",
      icon: <Phone className="w-5 h-5 text-slate-400" />,
      status: "upcoming"
    },
    {
      step: 5,
      title: "Enrollment Complete",
      desc: "Choose payment plan, receive onboarding packet",
      icon: <Plane className="w-5 h-5 text-slate-400" />,
      status: "upcoming"
    },
    {
      step: 6,
      title: "China Business Retreat",
      desc: "October 28 — November 7, 2026 (Shanghai · Shenzhen · Guangzhou · Beijing)",
      icon: <Calendar className="w-5 h-5 text-slate-400" />,
      status: "upcoming"
    }
  ];

  return (
    <div className="min-h-screen bg-slate-50 font-sans selection:bg-brand-accent/30">
      {/* Hero Section */}
      <section className="bg-brand-primary text-white py-20 px-6 overflow-hidden relative">
        <div className="absolute top-0 right-0 w-96 h-96 bg-brand-accent/10 rounded-full blur-3xl -translate-y-1/2 translate-x-1/2" />
        
        <div className="max-w-4xl mx-auto text-center relative z-10">
          <motion.div
            initial={{ scale: 0, rotate: -45 }}
            animate={{ scale: 1, rotate: 0 }}
            transition={{ type: "spring", damping: 12, stiffness: 100 }}
            className="w-24 h-24 bg-white/10 rounded-full flex items-center justify-center mx-auto mb-8 border-4 border-brand-accent/30"
          >
            <CheckCircle2 className="w-12 h-12 text-brand-accent" />
          </motion.div>

          <motion.p
            initial={{ opacity: 0, y: 10 }}
            animate={{ opacity: 1, y: 0 }}
            className="text-brand-accent font-display font-bold uppercase tracking-[0.3em] text-sm mb-4"
          >
            Application Received
          </motion.p>
          
          <motion.h1
            initial={{ opacity: 0, y: 20 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ delay: 0.1 }}
            className="text-4xl md:text-6xl font-display font-bold mb-6 leading-tight"
          >
            You're one step closer <br className="hidden md:block" /> to China.
          </motion.h1>

          <motion.div
            initial={{ opacity: 0 }}
            animate={{ opacity: 1 }}
            transition={{ delay: 0.3 }}
            className="space-y-2 mb-10 text-lg text-white/70 font-light"
          >
            <p>Your refundable deposit has been successfully secured.</p>
            <p>Your application is now under review by our admissions board.</p>
          </motion.div>

          <motion.div
            initial={{ opacity: 0, scale: 0.95 }}
            animate={{ opacity: 1, scale: 1 }}
            transition={{ delay: 0.4 }}
            className="inline-flex flex-col md:flex-row items-center gap-4 bg-white/5 backdrop-blur-sm border border-white/10 p-4 rounded-2xl"
          >
            <div className="flex items-center gap-3 px-4">
              <span className="text-white/40 text-xs font-bold uppercase tracking-widest">Application ID</span>
              <span className="font-mono font-bold text-brand-accent text-lg">#{appId}</span>
            </div>
            <div className="w-px h-10 bg-white/10 hidden md:block" />
            <button className="bg-white text-brand-primary px-6 py-3 rounded-xl font-bold flex items-center gap-2 hover:bg-slate-100 transition-colors">
              View Application Status <ChevronRight className="w-4 h-4" />
            </button>
          </motion.div>
        </div>
      </section>

      {/* Timeline Section */}
      <section className="py-24 px-6">
        <div className="max-w-4xl mx-auto">
          <div className="mb-16 text-center">
            <h2 className="text-brand-accent font-display font-bold text-sm uppercase tracking-[0.2em] mb-2">What Happens Next</h2>
            <h3 className="text-3xl font-display font-bold text-brand-primary">Your Journey Map</h3>
          </div>

          <div className="space-y-4">
            {steps.map((item, idx) => (
              <motion.div
                key={idx}
                initial={{ opacity: 0, x: -20 }}
                whileInView={{ opacity: 1, x: 0 }}
                viewport={{ once: true }}
                transition={{ delay: idx * 0.1 }}
                className={`relative flex items-start gap-6 p-6 rounded-3xl border transition-all ${
                  item.status === 'completed' 
                    ? 'bg-green-50/50 border-green-100 shadow-sm' 
                    : item.status === 'current'
                    ? 'bg-white border-brand-accent shadow-xl shadow-brand-primary/5 ring-4 ring-brand-accent/5'
                    : 'bg-white border-slate-100'
                }`}
              >
                <div className={`w-12 h-12 rounded-2xl flex items-center justify-center flex-shrink-0 mb-4 sm:mb-0 ${
                  item.status === 'completed' ? 'bg-green-100' : 
                  item.status === 'current' ? 'bg-brand-accent text-white' : 'bg-slate-100'
                }`}>
                  {item.icon}
                </div>
                
                <div className="flex-1">
                  <div className="flex items-center gap-2 mb-1">
                    <span className="text-[10px] font-bold uppercase tracking-widest text-slate-400">Step {item.step}</span>
                    {item.status === 'completed' && <span className="bg-green-100 text-green-700 text-[9px] px-2 py-0.5 rounded-full font-bold uppercase">Done</span>}
                    {item.status === 'current' && <span className="bg-brand-accent/10 text-brand-accent text-[9px] px-2 py-0.5 rounded-full font-bold uppercase animate-pulse">Now</span>}
                  </div>
                  <h4 className={`font-display font-bold text-lg ${item.status === 'upcoming' ? 'text-slate-400' : 'text-brand-primary'}`}>
                    {item.title}
                  </h4>
                  <p className="text-sm text-slate-500 leading-relaxed">{item.desc}</p>
                </div>

                {idx < steps.length - 1 && (
                  <div className="absolute left-12 top-full h-4 w-px bg-slate-200 ml-[23px] hidden sm:block" />
                )}
              </motion.div>
            ))}
          </div>
        </div>
      </section>

      {/* Contact Section */}
      <section className="bg-white border-t border-slate-100 py-20 px-6">
        <div className="max-w-4xl mx-auto">
          <div className="bg-slate-900 rounded-[3rem] p-8 md:p-16 text-white text-center relative overflow-hidden">
            <div className="absolute bottom-0 left-0 w-full h-1 bg-gradient-to-r from-brand-accent via-white/20 to-brand-accent opacity-50" />
            
            <h2 className="text-brand-accent font-display font-bold text-sm uppercase tracking-[0.2em] mb-4">Questions? We're here.</h2>
            <h3 className="text-3xl md:text-4xl font-display font-bold mb-12">Talk to Support</h3>

            <div className="grid md:grid-cols-2 gap-8 mb-12">
              <div className="bg-white/5 border border-white/10 p-8 rounded-3xl hover:bg-white/10 transition-colors">
                <div className="w-12 h-12 bg-white/10 rounded-2xl flex items-center justify-center mx-auto mb-6 text-brand-accent">
                  <Mail className="w-6 h-6" />
                </div>
                <p className="text-white/40 text-xs font-bold uppercase tracking-widest mb-2">Email Us</p>
                <p className="text-lg font-medium break-all">applications@stephenakintayofoundation.org</p>
              </div>

              <div className="bg-white/5 border border-white/10 p-8 rounded-3xl hover:bg-white/10 transition-colors">
                <div className="w-12 h-12 bg-white/10 rounded-2xl flex items-center justify-center mx-auto mb-6 text-brand-accent">
                  <MessageSquare className="w-6 h-6" />
                </div>
                <p className="text-white/40 text-xs font-bold uppercase tracking-widest mb-2">WhatsApp Support</p>
                <p className="text-lg font-medium">+234 81 8000 0618</p>
              </div>
            </div>

            <div className="flex flex-col items-center gap-2 text-white/50 text-sm italic">
              <div className="flex items-center gap-2">
                <Clock className="w-4 h-4" />
                <span>Response time: Within 4 hours during business hours (WAT)</span>
              </div>
            </div>
          </div>

          <div className="mt-16 text-center">
             <button 
              onClick={onBackToHome}
              className="group text-brand-primary font-bold flex items-center gap-2 mx-auto hover:text-brand-accent transition-colors"
            >
              Back to Main Website <ArrowRight className="w-4 h-4 group-hover:translate-x-1 transition-transform" />
            </button>
          </div>
        </div>
      </section>

      {/* Footer */}
      <footer className="py-12 bg-slate-50 border-t border-slate-200">
        <div className="max-w-4xl mx-auto px-6 text-center">
          <p className="text-slate-400 text-sm mb-4">
            © 2026 Dr. Stephen Akintayo Foundation. All rights reserved.
          </p>
          <div className="flex justify-center gap-6 text-xs font-bold uppercase tracking-widest text-slate-500">
            <a href="#" className="hover:text-brand-accent transition-colors">Privacy Policy</a>
            <a href="#" className="hover:text-brand-accent transition-colors">Terms of Service</a>
            <a href="#" className="hover:text-brand-accent transition-colors">Refund Policy</a>
          </div>
        </div>
      </footer>
    </div>
  );
};

export default ThankYouPage;
