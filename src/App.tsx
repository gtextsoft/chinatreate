/**
 * @license
 * SPDX-License-Identifier: Apache-2.0
 */

import React, { useState, useEffect } from 'react';
import { motion, AnimatePresence } from 'motion/react';
import { 
  ChevronDown, 
  ChevronUp, 
  Check, 
  X, 
  Calendar, 
  MapPin, 
  Users, 
  ArrowRight, 
  Star, 
  Factory, 
  Building2, 
  TrendingUp, 
  ShieldCheck,
  Plane,
  Clock,
  HelpCircle
} from 'lucide-react';
import { AssessmentLanding } from './components/AssessmentLanding';
import { QuizEngine } from './components/QuizEngine';
import { WaitlistPage, ConditionalPage } from './components/ResultPages';
import { QualifiedResultPage } from './components/QualifiedResultPage';
import ThankYouPage from './components/ThankYouPage';

// --- Components ---

const CountdownTimer = () => {
  const [timeLeft, setTimeLeft] = useState({
    days: 0,
    hours: 0,
    minutes: 0,
    seconds: 0,
  });

  useEffect(() => {
    // Target date: September 28, 2026
    const targetDate = new Date('2026-09-28T09:00:00').getTime();

    const timer = setInterval(() => {
      const now = new Date().getTime();
      const distance = targetDate - now;

      if (distance < 0) {
        clearInterval(timer);
        return;
      }

      setTimeLeft({
        days: Math.floor(distance / (1000 * 60 * 60 * 24)),
        hours: Math.floor((distance % (1000 * 60 * 60 * 24)) / (1000 * 60 * 60)),
        minutes: Math.floor((distance % (1000 * 60 * 60)) / (1000 * 60)),
        seconds: Math.floor((distance % (1000 * 60)) / 1000),
      });
    }, 1000);

    return () => clearInterval(timer);
  }, []);

  return (
    <div className="bg-brand-primary text-white py-2 px-4 sticky top-0 z-50 overflow-hidden">
      <div className="max-w-7xl mx-auto flex flex-col md:flex-row items-center justify-center gap-4 text-sm font-medium">
        <span className="flex items-center gap-2 uppercase tracking-widest text-[10px] opacity-80">
          <Clock className="w-4 h-4" /> Applications closing soon
        </span>
        <div className="flex items-baseline gap-4 font-display">
          <div className="flex flex-col items-center">
            <span className="text-lg leading-none">{timeLeft.days}</span>
            <span className="text-[10px] uppercase opacity-70">Days</span>
          </div>
          <span className="opacity-50">:</span>
          <div className="flex flex-col items-center">
            <span className="text-lg leading-none">{timeLeft.hours}</span>
            <span className="text-[10px] uppercase opacity-70">Hrs</span>
          </div>
          <span className="opacity-50">:</span>
          <div className="flex flex-col items-center">
            <span className="text-lg leading-none">{timeLeft.minutes}</span>
            <span className="text-[10px] uppercase opacity-70">Min</span>
          </div>
          <span className="opacity-50">:</span>
          <div className="flex flex-col items-center">
            <span className="text-lg leading-none text-brand-accent">{timeLeft.seconds}</span>
            <span className="text-[10px] uppercase opacity-70">Sec</span>
          </div>
        </div>
        <div className="hidden lg:block h-4 w-px bg-white/20 mx-2" />
        <span className="hidden lg:block text-white/90">Join the 2026 cohort before seats vanish.</span>
      </div>
    </div>
  );
};

const FAQItem = ({ question, answer }: { question: string; answer: string }) => {
  const [isOpen, setIsOpen] = useState(false);

  return (
    <div className="border-b border-slate-200">
      <button 
        id={`faq-${question.slice(0, 10)}`}
        className="w-full py-6 flex items-center justify-between text-left hover:text-brand-accent transition-colors"
        onClick={() => setIsOpen(!isOpen)}
      >
        <span className="text-lg font-semibold font-display pr-8">{question}</span>
        {isOpen ? <ChevronUp className="w-5 h-5 flex-shrink-0" /> : <ChevronDown className="w-5 h-5 flex-shrink-0" />}
      </button>
      <AnimatePresence>
        {isOpen && (
          <motion.div 
            initial={{ height: 0, opacity: 0 }}
            animate={{ height: 'auto', opacity: 1 }}
            exit={{ height: 0, opacity: 0 }}
            className="overflow-hidden"
          >
            <p className="pb-6 text-slate-600 leading-relaxed tabular-nums">
              {answer}
            </p>
          </motion.div>
        )}
      </AnimatePresence>
    </div>
  );
};

const CTAButton = ({ children, className = "", deposit = "Refundable Deposit: $97", onClick }: { children: React.ReactNode, className?: string, deposit?: string, onClick?: () => void }) => (
  <motion.button
    whileHover={{ scale: 1.02 }}
    whileTap={{ scale: 0.98 }}
    onClick={onClick}
    className={`bg-brand-accent hover:bg-brand-accent-hover text-white px-8 py-5 rounded-full font-display font-bold text-lg shadow-xl shadow-brand-accent/20 flex flex-col items-center group transition-all duration-300 cursor-pointer ${className}`}
  >
    <span className="flex items-center gap-2">
      {children} 
      <ArrowRight className="w-5 h-5 group-hover:translate-x-1 transition-transform" />
    </span>
    {deposit && deposit !== "none" && (
      <span className="text-xs opacity-80 font-normal mt-1 uppercase tracking-wider">
        {deposit}
      </span>
    )}
  </motion.button>
);

const SectionHeading = ({ subtitle, title, alignment = "center", light = false }: { subtitle: string, title: string, alignment?: "center" | "left", light?: boolean }) => (
  <div className={`mb-16 ${alignment === "center" ? "text-center" : "text-left"}`}>
    <span className={`text-brand-accent uppercase tracking-widest text-xs font-bold mb-4 block`}>
      {subtitle}
    </span>
    <h2 className={`text-3xl md:text-5xl font-display font-bold leading-tight ${light ? "text-white" : "text-brand-primary"}`}>
      {title}
    </h2>
  </div>
);

const VideoGallery = () => {
  const videos = [
    { id: "jGZCM2hZ7Wk", title: "Strategic Expansion", desc: "How to scale your operations through direct factory access." },
    { id: "PPj17YtqteM", title: "Cohort Experience", desc: "A deep dive into the 7-day business immersion." },
    { id: "fF0pQ_1ro5I", title: "Doha Business Summit", desc: "Insights from our exclusive past retreat in Qatar." },
    { id: "1VdiIviM60I", title: "Investment Realities", desc: "Understanding the capital flow between Africa and global markets." },
    { id: "GI_aOx6EMTA", title: "Relationship Capital", desc: "Building 'Guanxi' that transcends borders." },
  ];

  return (
    <section className="bg-slate-50 py-24 overflow-hidden">
      <div className="section-padding">
        <SectionHeading subtitle="Watch the Impact" title="Global Retreat Highlights & Case Studies" />
        <div className="grid md:grid-cols-2 lg:grid-cols-3 gap-8">
          {videos.map((video, i) => (
            <motion.div 
              key={video.id}
              initial={{ opacity: 0, y: 20 }}
              whileInView={{ opacity: 1, y: 0 }}
              viewport={{ once: true }}
              transition={{ delay: i * 0.1 }}
              className="bg-white rounded-3xl overflow-hidden shadow-xl shadow-slate-200/50 group border border-slate-100"
            >
              <div className="aspect-video relative overflow-hidden bg-slate-200">
                <iframe
                  className="absolute inset-0 w-full h-full"
                  src={`https://www.youtube.com/embed/${video.id}`}
                  title={video.title}
                  allow="accelerometer; autoplay; clipboard-write; encrypted-media; gyroscope; picture-in-picture"
                  allowFullScreen
                />
              </div>
              <div className="p-6">
                <h4 className="font-display font-bold text-lg text-brand-primary mb-2 group-hover:text-brand-accent transition-colors">
                  {video.title}
                </h4>
                <p className="text-xs sm:text-sm text-slate-500 leading-relaxed font-medium">
                  {video.desc}
                </p>
              </div>
            </motion.div>
          ))}
        </div>
      </div>
    </section>
  );
};

// --- Checkout Page ---

const CheckoutPage = ({ onBack }: { onBack: () => void }) => {
  return (
    <motion.div 
      initial={{ opacity: 0, x: 20 }}
      animate={{ opacity: 1, x: 0 }}
      exit={{ opacity: 0, x: -20 }}
      className="min-h-screen bg-slate-50 pt-32 pb-24"
    >
      <div className="section-padding">
        <button 
          onClick={onBack}
          className="flex items-center gap-2 text-slate-500 hover:text-brand-primary transition-colors mb-8 font-medium cursor-pointer"
        >
          <X className="w-4 h-4" /> Back to details
        </button>

        <div className="grid lg:grid-cols-3 gap-8 md:gap-12 items-start">
          {/* Main Form Area */}
          <div className="lg:col-span-2 space-y-8 md:space-y-12">
            <div className="bg-white rounded-2xl md:rounded-3xl p-6 md:p-12 shadow-xl shadow-slate-200/50 border border-slate-100">
              <div className="flex flex-col md:flex-row md:items-end justify-between gap-6 mb-8 md:mb-12 pb-8 md:pb-12 border-b border-slate-100">
                <div>
                  <h2 className="text-2xl md:text-3xl font-display font-bold text-brand-primary mb-2 md:mb-4">Securing Your Slot</h2>
                  <p className="text-sm md:text-base text-slate-500 font-medium">China Business Retreat Cohort</p>
                </div>
                <div className="md:text-right border-t md:border-t-0 pt-4 md:pt-0">
                  <div className="text-[10px] md:text-sm font-bold text-brand-accent uppercase tracking-widest mb-1">Total investment</div>
                  <div className="text-3xl md:text-4xl font-display font-bold text-brand-primary">$12,500.00</div>
                  <div className="text-[10px] text-slate-400 mt-1 font-medium italic">Refundable deposit applies to final fee</div>
                </div>
              </div>

              <div className="space-y-6 md:space-y-8">
                <h3 className="text-lg md:text-xl font-display font-bold flex items-center gap-3">
                  <span className="w-7 h-7 md:w-8 md:h-8 rounded-full bg-brand-primary text-white flex items-center justify-center text-xs md:text-sm font-bold">1</span>
                  Select Payment Method
                </h3>
                
                <div className="grid gap-4">
                  <div className="group relative">
                    <button 
                      onClick={() => window.location.href = 'https://buy.stripe.com/cNi8wQdRi8PJ7cG2oQew800'}
                      className="w-full bg-brand-primary hover:bg-slate-800 text-white p-5 md:p-6 rounded-xl md:rounded-2xl flex flex-col sm:flex-row sm:items-center justify-between gap-4 transition-all duration-300 shadow-xl shadow-brand-primary/20 cursor-pointer text-left"
                    >
                      <div className="flex items-center gap-4 md:gap-6">
                        <div className="w-10 h-10 md:w-12 md:h-12 bg-white/10 rounded-full flex items-center justify-center flex-shrink-0">
                          <Check className="w-5 h-5 md:w-6 md:h-6 text-brand-accent" />
                        </div>
                        <div>
                          <p className="font-display font-bold text-base md:text-lg">Pay with Card / USSD</p>
                          <p className="text-[10px] text-slate-400 font-medium uppercase tracking-wider">Fast & Secure Processing</p>
                        </div>
                      </div>
                      <div className="flex gap-2 self-end sm:self-auto">
                        <div className="w-8 h-5 md:w-10 md:h-6 bg-white/10 rounded flex items-center justify-center text-[7px] md:text-[8px] font-bold text-white/40">VISA</div>
                        <div className="w-8 h-5 md:w-10 md:h-6 bg-white/10 rounded flex items-center justify-center text-[7px] md:text-[8px] font-bold text-white/40">MC</div>
                        <div className="w-8 h-5 md:w-10 md:h-6 bg-white/10 rounded flex items-center justify-center text-[7px] md:text-[8px] font-bold text-white/40">VERVE</div>
                      </div>
                    </button>
                    <div className="absolute -top-2 -right-2 bg-brand-accent text-white px-3 py-0.5 rounded-full text-[9px] font-bold uppercase tracking-widest">Recommended</div>
                  </div>
                </div>

                <div className="pt-6">
                  <div className="flex items-center gap-4 md:gap-8 justify-center opacity-40 grayscale overflow-hidden">
                    <img src="https://upload.wikimedia.org/wikipedia/commons/5/5e/Visa_Inc._logo.svg" alt="Visa" className="h-3 md:h-4" />
                    <img src="https://upload.wikimedia.org/wikipedia/commons/2/2a/Mastercard-logo.svg" alt="Mastercard" className="h-5 md:h-6" />
                    <span className="text-[10px] md:text-sm font-bold tracking-widest">VERVE</span>
                  </div>
                </div>
              </div>
            </div>

            {/* Guarantee Section */}
            <div className="bg-emerald-50 rounded-2xl md:rounded-3xl p-6 md:p-8 border border-emerald-100 flex flex-col sm:flex-row items-center sm:items-start gap-4 md:gap-8">
              <div className="w-16 h-16 md:w-20 md:h-20 rounded-full bg-white flex items-center justify-center shadow-lg shadow-emerald-200/50 flex-shrink-0">
                <ShieldCheck className="w-8 h-8 md:w-10 md:h-10 text-emerald-500" />
              </div>
              <div className="text-center sm:text-left">
                <h4 className="font-display font-bold text-emerald-900 text-base md:text-lg mb-1 md:mb-2">100% Risk-Free Guarantee</h4>
                <p className="text-emerald-700/80 leading-relaxed text-xs md:text-sm">
                  Your $97 deposit is fully refundable if your application is not accepted. Once enrolled, you are protected by our full-refund policy within 7 days of enrollment. No questions asked.
                </p>
              </div>
            </div>
          </div>

          {/* Sidebar Area */}
          <div className="space-y-6 md:space-y-8">
            <div className="bg-brand-primary rounded-2xl md:rounded-3xl p-6 md:p-8 text-white shadow-2xl shadow-brand-primary/30">
              <h3 className="font-display font-bold text-lg md:text-xl mb-6 flex items-center gap-3">
                <Clock className="w-5 h-5 text-brand-accent ml-[-2px]" /> Order Summary
              </h3>
              
              <div className="space-y-6">
                <div className="space-y-4">
                  <div className="flex items-start gap-3 bg-white/5 p-3 md:p-4 rounded-xl">
                    <Check className="w-4 h-4 text-brand-accent mt-0.5 flex-shrink-0" />
                    <div className="text-xs md:text-sm">
                      <p className="font-bold">China Business Retreat</p>
                      <p className="text-white/40 text-[10px] mt-1 uppercase tracking-wider">Full 7-Day Cohort Access</p>
                    </div>
                  </div>
                  <ul className="space-y-2.5 px-3 md:px-4 text-[11px] md:text-sm text-white/50">
                    <li className="flex items-center gap-2 tracking-tight">• Full Retreat Access & Core Sessions</li>
                    <li className="flex items-center gap-2 tracking-tight">• Luxury Accommodation (Single Occupancy)</li>
                    <li className="flex items-center gap-2 tracking-tight">• Domestic Transfers (Between Cities)</li>
                    <li className="flex items-center gap-2 tracking-tight">• Factory & Innovation Hub Access</li>
                    <li className="flex items-center gap-2 tracking-tight">• Curated Networking & Deal Rooms</li>
                  </ul>
                </div>

                <div className="h-px bg-white/10" />

                <div className="space-y-4">
                  <div className="flex justify-between text-[11px] md:text-sm font-bold text-brand-accent uppercase tracking-widest pt-4 border-t border-white/10">
                    <span>Total Retreat Fee</span>
                    <span>$12,500.00</span>
                  </div>
                  <div className="flex justify-between items-baseline pt-4 border-t border-white/10">
                    <span className="text-brand-accent font-bold text-[10px] md:text-xs uppercase tracking-widest">Application Fee Due Today</span>
                    <span className="text-2xl md:text-3xl font-display font-bold text-brand-accent tracking-tighter">$97.00</span>
                  </div>
                </div>
              </div>
            </div>

            <div className="text-center p-4 md:p-6 space-y-4">
              <div className="flex items-center justify-center gap-3 text-slate-400">
                <ShieldCheck className="w-4 h-4 md:w-5 md:h-5" />
                <span className="text-[10px] font-bold uppercase tracking-[0.15em]">Secure Checkout</span>
              </div>
              <p className="text-[10px] md:text-xs text-slate-400 leading-relaxed max-w-[240px] mx-auto">
                Your payment is processed through industry-standard encryption. We never store your card details.
              </p>
              <div className="pt-4 border-t border-slate-200/50">
                <p className="text-[9px] text-slate-400 font-medium uppercase tracking-wider mb-1">Questions? Contact Support</p>
                <p className="text-[11px] md:text-xs font-bold font-display text-brand-primary">retreats@stephenakintayo.com</p>
              </div>
            </div>
          </div>
        </div>
      </div>
    </motion.div>
  );
};

// --- Main Page ---

export default function App() {
  const [view, setView] = useState<any>('sales');
  const [quizResult, setQuizResult] = useState<any>(null);

  useEffect(() => {
    // Check for success status in URL for payment gateway redirect
    const urlParams = new URLSearchParams(window.location.search);
    if (urlParams.get('status') === 'success') {
      setView('thank-you');
    }
  }, []);

  useEffect(() => {
    window.scrollTo(0, 0);
  }, [view]);

  const handleQuizComplete = (result: any) => {
    setQuizResult(result);
    setView('result');
  };

  const renderResultPage = () => {
    if (!quizResult) return null;
    const { routing, scores, responses } = quizResult;
    
    if (routing.status === 'QUALIFIED') {
      return (
        <QualifiedResultPage 
          scores={scores} 
          responses={responses} 
          onApply={() => setView('checkout')} 
        />
      );
    }
    
    if (routing.status === 'CONDITIONAL') {
      return <ConditionalPage scores={scores} routing={routing} responses={responses} onReset={() => setView('sales')} />;
    }
    
    return <WaitlistPage scores={scores} routing={routing} responses={responses} onReset={() => setView('sales')} />;
  };

  if (view === 'assessment-landing') {
    return <AssessmentLanding onStart={() => setView('quiz')} />;
  }

  if (view === 'quiz') {
    return <QuizEngine onComplete={handleQuizComplete} />;
  }

  if (view === 'thank-you') {
    return <ThankYouPage onBackToHome={() => setView('sales')} />;
  }

  if (view === 'result') {
    return (
      <div className="min-h-screen">
        <button 
          onClick={() => setView('sales')}
          className="fixed top-8 left-8 z-50 flex items-center gap-2 text-slate-400 hover:text-brand-primary transition-colors text-xs font-bold uppercase tracking-widest"
        >
          <X className="w-4 h-4" /> Exit Result
        </button>
        <AnimatePresence mode="wait">
          {renderResultPage()}
        </AnimatePresence>
      </div>
    );
  }

  if (view === 'checkout') {
    return (
      <div className="min-h-screen selection:bg-brand-accent selection:text-white">
        <CountdownTimer />
        <AnimatePresence mode="wait">
          <CheckoutPage onBack={() => setView('sales')} />
        </AnimatePresence>
      </div>
    );
  }

  return (
    <div className="min-h-screen selection:bg-brand-accent selection:text-white">
      <CountdownTimer />

      {/* Hero Section */}
      <header className="relative bg-brand-primary pt-24 pb-32 overflow-hidden border-b border-white/5">
        <div className="absolute inset-0 z-0">
          <div 
            className="absolute inset-0 bg-cover bg-center opacity-30 grayscale hover:grayscale-0 transition-all duration-2000 ease-in-out scale-105" 
            style={{ backgroundImage: "url('https://i.ibb.co/9kf0JhsB/china-bg.jpg')" }} 
          />
          <div className="absolute top-0 right-0 w-[600px] h-[600px] bg-brand-accent/15 blur-[120px] rounded-full -mr-48 -mt-48" />
          <div className="absolute bottom-0 left-0 w-[800px] h-[800px] bg-blue-500/10 blur-[150px] rounded-full -ml-48 -mb-48" />
          <div className="absolute inset-0 bg-linear-to-b from-brand-primary/40 via-brand-primary/70 to-brand-primary" />
        </div>

        <div className="relative z-10 section-padding text-center">
          <motion.div
            initial={{ opacity: 0, y: 20 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.6 }}
          >
            <span className="inline-flex items-center gap-2 bg-white/5 border border-white/10 px-4 py-1.5 rounded-full text-brand-accent text-xs font-bold tracking-widest mb-8 uppercase">
              <Calendar className="w-3.5 h-3.5" /> 28 October – 7 November 2026
            </span>
            <h1 className="text-4xl sm:text-6xl md:text-7xl lg:text-8xl font-display font-bold text-white mb-8 tracking-tight uppercase leading-[0.9]">
              CHINA <br className="hidden sm:block" />
              <span className="text-brand-accent">BUSINESS RETREAT</span>
            </h1>
            <p className="text-slate-400 text-[10px] sm:text-xs md:text-sm lg:text-lg tracking-[0.2em] sm:tracking-widest uppercase mb-12 flex flex-wrap justify-center gap-x-2 sm:gap-x-4 gap-y-2">
              <span>Shanghai</span>
              <span className="text-white/20">•</span>
              <span>Shenzhen</span>
              <span className="text-white/20">•</span>
              <span>Guangzhou</span>
              <span className="text-white/20">•</span>
              <span>Beijing</span>
            </p>
            
            <div className="max-w-3xl mx-auto space-y-6 mb-16">
              <p className="text-xl md:text-2xl text-slate-200 font-light leading-relaxed">
                This is not a conference. This is not tourism.
              </p>
              <p className="text-lg md:text-xl text-slate-400 leading-relaxed italic">
                "This is a private, 7-day business immersion into the engine that builds the world's products."
              </p>
              <p className="text-2xl font-display font-medium text-white pt-4">
                25 seats. One cohort. Zero tourists.
              </p>
            </div>

            <div className="flex flex-col items-center gap-6">
              <CTAButton onClick={() => document.getElementById('investment')?.scrollIntoView({ behavior: 'smooth' })}>APPLY FOR COHORT ACCESS</CTAButton>
              <div className="flex items-center gap-8 text-white/40 text-xs uppercase tracking-widest">
                <span className="flex items-center gap-2"><ShieldCheck className="w-4 h-4" /> Verified Operators</span>
                <span className="flex items-center gap-2"><MapPin className="w-4 h-4" /> 4 Economic Hubs</span>
              </div>
            </div>
          </motion.div>
        </div>
      </header>

      {/* Built For Section */}
      <section className="bg-white py-24">
        <div className="section-padding grid md:grid-cols-2 gap-12 lg:gap-20">
          {/* Who It's For */}
          <motion.div 
            initial={{ opacity: 0, x: -20 }}
            whileInView={{ opacity: 1, x: 0 }}
            viewport={{ once: true }}
            className="space-y-8"
          >
            <div className="p-4 bg-slate-50 w-fit rounded-2xl">
              <TrendingUp className="w-8 h-8 text-brand-accent" />
            </div>
            <h3 className="text-3xl font-display font-bold">Built for serious operators only:</h3>
            <ul className="space-y-5">
              {[
                "Founders ready to source directly from factories, not Alibaba middlemen",
                "Investors exploring manufacturing, trade, and real estate plays in the world's fastest-scaling market",
                "Business owners who've outgrown \"online research\" and need boots-on-the-ground relationships",
                "Leaders who understand that guanxi (relationship capital) isn't built over Zoom"
              ].map((text, i) => (
                <li key={i} className="flex gap-4">
                  <div className="mt-1.5 flex-shrink-0 bg-brand-accent/10 p-1 rounded-full">
                    <Check className="w-4 h-4 text-brand-accent" />
                  </div>
                  <span className="text-slate-700 leading-relaxed">{text}</span>
                </li>
              ))}
            </ul>
          </motion.div>

          {/* Who It's NOT For */}
          <motion.div 
            initial={{ opacity: 0, x: 20 }}
            whileInView={{ opacity: 1, x: 0 }}
            viewport={{ once: true }}
            className="space-y-8"
          >
            <div className="p-4 bg-red-50 w-fit rounded-2xl">
              <X className="w-8 h-8 text-red-500" />
            </div>
            <h3 className="text-3xl font-display font-bold">This is NOT for you if:</h3>
            <ul className="space-y-5">
              {[
                "You're looking for a vacation with business networking sprinkled on top",
                "You're not prepared to walk factory floors at 8 AM",
                "You need hand-holding through basic business decisions",
                "You're price-shopping instead of opportunity-hunting"
              ].map((text, i) => (
                <li key={i} className="flex gap-4">
                  <div className="mt-1.5 flex-shrink-0 bg-red-50 p-1 rounded-full">
                    <X className="w-4 h-4 text-red-400" />
                  </div>
                  <span className="text-slate-600 leading-relaxed opacity-80">{text}</span>
                </li>
              ))}
            </ul>
          </motion.div>
        </div>
      </section>

      {/* Experience / Itinerary */}
      <section className="bg-slate-50 py-24">
        <div className="section-padding">
          <SectionHeading subtitle="The Experience" title="What You're Buying" />
          
          <div className="bg-white rounded-3xl shadow-2xl shadow-slate-200/50 overflow-hidden border border-slate-100">
            <div className="overflow-x-auto">
              <table className="w-full border-collapse">
                <thead className="bg-brand-primary text-white">
                  <tr>
                    <th className="px-8 py-6 text-left font-display text-sm tracking-widest uppercase opacity-70">Day / City</th>
                    <th className="px-8 py-6 text-left font-display text-sm tracking-widest uppercase opacity-70">Focus</th>
                  </tr>
                </thead>
                <tbody className="divide-y divide-slate-100">
                  <tr className="hover:bg-slate-50 transition-colors">
                    <td className="px-6 sm:px-8 py-8 w-24 sm:w-48 align-top">
                      <span className="text-base sm:text-xl font-bold font-display text-brand-primary block">Shanghai</span>
                    </td>
                    <td className="px-6 sm:px-8 py-8">
                      <p className="text-base sm:text-lg text-slate-700 font-medium mb-1">Scale & Innovation Hubs</p>
                      <p className="text-sm sm:text-base text-slate-500">How Chinese companies move from idea to market dominance in 90 days</p>
                    </td>
                  </tr>
                  <tr className="hover:bg-slate-50 transition-colors">
                    <td className="px-6 sm:px-8 py-8 w-24 sm:w-48 align-top">
                      <span className="text-base sm:text-xl font-bold font-display text-brand-primary block">Shenzhen</span>
                    </td>
                    <td className="px-6 sm:px-8 py-8">
                      <p className="text-base sm:text-lg text-slate-700 font-medium mb-1">Manufacturing Deep-Dive</p>
                      <p className="text-sm sm:text-base text-slate-500">Factory floors, hardware ecosystems, direct supplier negotiations</p>
                    </td>
                  </tr>
                  <tr className="hover:bg-slate-50 transition-colors">
                    <td className="px-6 sm:px-8 py-8 w-24 sm:w-48 align-top">
                      <span className="text-base sm:text-xl font-bold font-display text-brand-primary block">Guangzhou</span>
                    </td>
                    <td className="px-6 sm:px-8 py-8">
                      <p className="text-base sm:text-lg text-slate-700 font-medium mb-1">Canton Fair Access</p>
                      <p className="text-sm sm:text-base text-slate-500">Live trade floor strategy, import/export logistics decoded</p>
                    </td>
                  </tr>
                  <tr className="hover:bg-slate-50 transition-colors">
                    <td className="px-6 sm:px-8 py-8 w-24 sm:w-48 align-top">
                      <span className="text-base sm:text-xl font-bold font-display text-brand-primary block">Beijing</span>
                    </td>
                    <td className="px-6 sm:px-8 py-8">
                      <p className="text-base sm:text-lg text-slate-700 font-medium mb-1">Investment & Real Estate</p>
                      <p className="text-sm sm:text-base text-slate-500">Property insights that travel beyond China; closing dinner</p>
                    </td>
                  </tr>
                </tbody>
              </table>
            </div>

            <div className="bg-brand-primary p-8 text-center text-white/80 text-sm">
              <div className="flex flex-col md:flex-row justify-center items-center gap-8 md:gap-16 text-left">
                <div className="flex items-center gap-4">
                  <div className="w-12 h-12 rounded-2xl bg-white/10 flex items-center justify-center flex-shrink-0">
                    <Check className="w-6 h-6 text-brand-accent" />
                  </div>
                  <span className="leading-tight">
                    <strong className="text-white block mb-1 uppercase tracking-wider text-[10px]">What's Included</strong>
                    $12,500 covers luxury accommodation, domestic transfers, <br className="hidden md:block" /> factory access, masterminds, and core programming.
                  </span>
                </div>
                <div className="flex items-center gap-4">
                  <div className="w-12 h-12 rounded-2xl bg-white/10 flex items-center justify-center flex-shrink-0">
                    <Plane className="w-6 h-6 text-slate-400" />
                  </div>
                  <span className="leading-tight">
                    <strong className="text-white block mb-1 uppercase tracking-wider text-[10px]">Not Included</strong>
                    International flights to/from China <br className="hidden md:block" /> (we take over the moment you land).
                  </span>
                </div>
              </div>
            </div>
          </div>
        </div>
      </section>

      {/* Host Section */}
      <section className="bg-white py-24">
        <div className="section-padding flex flex-col lg:flex-row gap-16 items-center">
          <motion.div 
            initial={{ opacity: 0, scale: 0.95 }}
            whileInView={{ opacity: 1, scale: 1 }}
            viewport={{ once: true }}
            className="w-full lg:w-1/2 aspect-[4/5] bg-slate-200 rounded-3xl relative overflow-hidden group shadow-2xl"
          >
            <div className="absolute inset-0 bg-linear-to-t from-brand-primary via-transparent to-transparent opacity-60 z-10" />
            <img 
              src="https://china.stephenakintayofoundation.org/images/stephen-akintayo.jpeg" 
              alt="Dr. Stephen Akintayo" 
              className="w-full h-full object-cover group-hover:scale-105 transition-transform duration-700" 
            />
            <div className="absolute bottom-8 left-8 z-20">
              <h4 className="text-white text-3xl font-display font-bold">Dr. Stephen Akintayo</h4>
              <p className="text-brand-accent text-sm font-bold tracking-widest uppercase">Global Business Strategist</p>
            </div>
          </motion.div>

          <div className="w-full lg:w-1/2 space-y-8">
            <SectionHeading subtitle="The Visionary" title="Your Host" alignment="left" />
            <p className="text-xl text-slate-700 leading-relaxed font-light">
              Global business strategist, investor, and transformational mentor with an international footprint across Africa, Europe, the Middle East, and North America.
            </p>
            
            <div className="grid sm:grid-cols-2 gap-x-8 gap-y-6">
              {[
                { icon: TrendingUp, text: "International speaker and business growth mentor" },
                { icon: Building2, text: "Real estate and business investor with global insights" },
                { icon: Users, text: "Trusted advisor to founders and executives" },
                { icon: Factory, text: "Builder of multi-sector ventures across continents" }
              ].map((item, i) => (
                <div key={i} className="flex gap-3">
                  <div className="mt-1 flex-shrink-0 text-brand-accent">
                    <item.icon className="w-5 h-5" />
                  </div>
                  <span className="text-slate-600 font-medium">{item.text}</span>
                </div>
              ))}
            </div>

            <div className="bg-slate-50 p-8 rounded-3xl border border-slate-100">
              <p className="text-slate-700 leading-relaxed italic">
                "This isn't his first China program. Past cohorts have closed manufacturing deals, secured supplier relationships, and expanded into markets they previously considered 'out of reach.'"
              </p>
            </div>
          </div>
        </div>
      </section>

      {/* Testimonials */}
      <section className="bg-brand-primary py-24 text-white overflow-hidden relative">
        <div className="absolute top-0 left-1/2 -translate-x-1/2 w-full h-full opacity-10 pointer-events-none">
          <div className="absolute top-20 left-10 text-9xl font-display font-bold select-none italic tracking-tighter">ROI</div>
          <div className="absolute bottom-20 right-10 text-9xl font-display font-bold select-none italic tracking-tighter text-brand-accent">GUANXI</div>
        </div>

        <div className="relative z-10 section-padding">
          <SectionHeading subtitle="Alumni Voices" title="Previous Retreat Experience" light />
          
          <div className="grid md:grid-cols-3 gap-8">
            {[
              {
                quote: "I walked into a Shenzhen factory on Day 2 and walked out with a supplier agreement that cut my production costs by 35%. That single meeting paid for the retreat 3x over.",
                author: "Chinedu O.",
                details: "Founder, Lagos (2024 Cohort)"
              },
              {
                quote: "The Canton Fair access alone was worth the investment. Dr. Akintayo's introductions opened doors I couldn't have touched as a first-time visitor.",
                author: "Amara K.",
                details: "E-commerce Operator, Abuja (2024 Cohort)"
              },
              {
                quote: "I came for sourcing. I left with a real estate investment strategy and two partners. The network is the real ROI.",
                author: "Tunde B.",
                details: "Investor, London (2024 Cohort)"
              }
            ].map((t, i) => (
              <motion.div 
                key={i}
                initial={{ opacity: 0, y: 20 }}
                whileInView={{ opacity: 1, y: 0 }}
                viewport={{ once: true }}
                transition={{ delay: i * 0.1 }}
                className="bg-white/5 border border-white/10 p-8 rounded-3xl relative"
              >
                <div className="flex gap-1 mb-6">
                  {[...Array(5)].map((_, j) => <Star key={j} className="w-4 h-4 fill-brand-accent text-brand-accent" />)}
                </div>
                <p className="text-slate-300 leading-relaxed mb-8 italic">"{t.quote}"</p>
                <div>
                  <p className="font-display font-bold text-white">— {t.author}</p>
                  <p className="text-slate-500 text-sm uppercase tracking-widest">{t.details}</p>
                </div>
                <div className="absolute top-6 right-8 text-6xl font-serif text-white/10 italic">"</div>
              </motion.div>
            ))}
          </div>
        </div>
      </section>

      <VideoGallery />

      {/* Investment Section */}
      <section id="investment" className="bg-white py-24">
        <div className="section-padding">
          <SectionHeading subtitle="Securing Your Seat" title="The Investment" />
          
          <div className="max-w-4xl mx-auto space-y-12">
            <div className="grid md:grid-cols-3 gap-8 text-center">
              {[
                { title: "7-Day Full Retreat", icon: Calendar, text: "Covers accommodation, on-ground logistics, business tours, and core retreat programming." },
                { title: "Core Programming", icon: ShieldCheck, text: "One all-inclusive investment for the full 7-day experience." },
                { title: "No Hidden Add-ons", icon: TrendingUp, text: "Comparable to a high-tier executive program — priced as one investment." }
              ].map((item, i) => (
                <div key={i} className="bg-slate-50 p-6 rounded-2xl border border-slate-100 flex flex-col items-center">
                  <div className="w-12 h-12 bg-white rounded-full flex items-center justify-center mb-4 text-brand-accent shadow-sm">
                    <item.icon className="w-6 h-6" />
                  </div>
                  <h4 className="font-display font-bold text-brand-primary mb-2">{item.title}</h4>
                  <p className="text-sm text-slate-500 leading-relaxed">{item.text}</p>
                </div>
              ))}
            </div>

            {/* Payment Options */}
            <div className="grid md:grid-cols-2 gap-8 max-w-4xl mx-auto">
              {/* Pay in Full */}
              <div className="relative p-8 rounded-3xl bg-white border-2 border-brand-accent shadow-2xl shadow-brand-accent/10 flex flex-col">
                <div className="absolute -top-4 left-1/2 -translate-x-1/2 bg-brand-accent text-white px-4 py-1 rounded-full text-xs font-bold uppercase tracking-widest">Best Value</div>
                <h4 className="font-display font-bold text-xl mb-1">Pay in Full</h4>
                <div className="text-3xl font-display font-bold text-brand-primary mb-4">$12,500</div>
                <p className="text-slate-600 text-sm mb-6 leading-relaxed">Secure your full spot today. All-inclusive luxury experience.</p>
                <div className="p-4 bg-brand-accent/5 rounded-2xl mb-8 mt-auto">
                  <p className="text-brand-accent text-xs font-bold uppercase mb-1">Bonus</p>
                  <p className="text-sm font-medium text-slate-700">Private 1:1 dinner with Dr. Akintayo in Shanghai</p>
                </div>
                <CTAButton onClick={() => window.location.href = 'https://buy.stripe.com/cNi8wQdRi8PJ7cG2oQew800'} className="w-full h-auto !py-3 !text-base" deposit="SECURE SLOT FOR $12,500">PAY FULL RETREAT FEE</CTAButton>
              </div>

              {/* Installments */}
              <div className="p-8 rounded-3xl bg-white border border-slate-200 flex flex-col">
                <h4 className="font-display font-bold text-xl mb-1">Payment Plan</h4>
                <div className="text-3xl font-display font-bold text-brand-primary mb-4">$4,500 <span className="text-xs text-slate-400 font-normal">/ month</span></div>
                <p className="text-slate-600 text-sm mb-6 leading-relaxed">Split the $12,500 investment across 3 manageable installments.</p>
                <div className="p-4 bg-slate-50 rounded-2xl mb-8 mt-auto">
                  <p className="text-slate-400 text-xs font-bold uppercase mb-1">Standard</p>
                  <p className="text-sm font-medium text-slate-500">Core programming and all cohort benefits.</p>
                </div>
                <CTAButton onClick={() => setView('assessment-landing')} className="w-full h-auto !py-3 !text-base !bg-slate-800" deposit="Refundable Deposit: $97">Start Plan</CTAButton>
              </div>
            </div>
          </div>
        </div>
      </section>

      {/* How To Join */}
      <section id="application" className="bg-slate-50 py-24">
        <div className="section-padding">
          <SectionHeading subtitle="The Process" title="How to Join" />
          
          <div className="max-w-4xl mx-auto">
            <div className="grid md:grid-cols-4 gap-8 mb-20 relative">
              <div className="hidden md:block absolute top-[44px] left-8 right-8 h-px bg-slate-300 z-0" />
              {[
                { step: "1", title: "Apply", text: "Submit application & $97 deposit" },
                { step: "2", title: "Review", text: "If accepted, deposit applies to fee" },
                { step: "3", title: "Verify", text: "If not accepted, 100% refund" },
                { step: "4", title: "Embark", text: "Final fee paid before departure" }
              ].map((item, i) => (
                <div key={i} className="relative z-10 flex flex-col items-center text-center">
                  <div className="w-11 h-11 rounded-full bg-brand-primary text-white flex items-center justify-center font-display font-bold mb-4 shadow-xl shadow-brand-primary/30 border-4 border-slate-50">
                    {item.step}
                  </div>
                  <h5 className="font-display font-bold text-brand-primary mb-2">{item.title}</h5>
                  <p className="text-xs text-slate-500 leading-relaxed px-4">{item.text}</p>
                </div>
              ))}
            </div>

            <div className="flex flex-col items-center gap-6 text-center">
              <CTAButton onClick={() => document.getElementById('investment')?.scrollIntoView({ behavior: 'smooth' })} className="!px-12 !py-6 !text-xl">START YOUR APPLICATION — $97 DEPOSIT</CTAButton>
              <p className="text-slate-500 text-sm font-medium animate-pulse">
                Applications reviewed on a rolling basis. <br className="md:hidden" /> Cohort closes when 25 seats are filled.
              </p>
            </div>
          </div>
        </div>
      </section>

      {/* FAQ */}
      <section className="bg-white py-24">
        <div className="section-padding max-w-3xl">
          <SectionHeading subtitle="Common Questions" title="FAQ" alignment="left" />
          
          <div className="mt-8">
            <FAQItem 
              question="What if I'm not accepted?" 
              answer="Your $97 deposit is fully refunded. No questions asked. The deposit exists to ensure we're speaking with serious applicants, not browsers." 
            />
            <FAQItem 
              question="Do I need a visa?" 
              answer="Yes, but our team handles visa guidance and support as part of your enrollment." 
            />
            <FAQItem 
              question="Is this safe for first-time visitors to China?" 
              answer="Absolutely. We handle all on-ground logistics, translations, and navigation. You focus on business; we handle the complexity." 
            />
            <FAQItem 
              question="What's the refund policy after enrollment?" 
              answer="Full refund within 7 days of enrollment. 50% refund up to 60 days before departure. No refunds within 60 days (we've already committed your accommodation and logistics)." 
            />
            <FAQItem 
              question="Can I bring my business partner?" 
              answer="Each application is reviewed individually. If accepted, you may enroll a partner at the same rate, pending availability." 
            />
          </div>
        </div>
      </section>

      {/* Final CTA Banner */}
      <section className="bg-brand-accent py-16">
        <div className="section-padding flex flex-col md:flex-row items-center justify-between gap-8 text-center md:text-left">
          <div className="space-y-2">
            <h3 className="text-white text-3xl font-display font-bold">Ready to scale at the source?</h3>
            <p className="text-white/80">Only 25 spots available for the 2026 cohort.</p>
          </div>
          <button 
            onClick={() => document.getElementById('investment')?.scrollIntoView({ behavior: 'smooth' })}
            className="bg-white text-brand-primary px-10 py-4 rounded-full font-display font-bold hover:bg-slate-100 transition-colors shadow-lg cursor-pointer"
          >
            Lock in your spot for $97
          </button>
        </div>
      </section>

      {/* Footer */}
      <footer className="bg-brand-primary py-20 text-white/60">
        <div className="section-padding flex flex-col md:flex-row justify-between items-center gap-12">
          <div className="space-y-4 text-center md:text-left">
            <h2 className="text-white font-display font-bold text-xl tracking-widest uppercase">China Business Retreat</h2>
            <p className="text-sm max-w-xs">Building global business bridges through direct relationship capital and manufacturing excellence.</p>
          </div>
          <div className="flex flex-col items-center md:items-end gap-6">
            <div className="flex gap-8 text-xs uppercase tracking-widest">
              <a href="#" className="hover:text-brand-accent transition-colors">Privacy</a>
              <a href="#" className="hover:text-brand-accent transition-colors">Terms</a>
              <a href="#" className="hover:text-brand-accent transition-colors">Contact</a>
            </div>
            <p className="text-[10px] text-white/30 uppercase tracking-[0.2em]">© 2026 Dr. Stephen Akintayo. All Rights Reserved.</p>
          </div>
        </div>
      </footer>
    </div>
  );
}
