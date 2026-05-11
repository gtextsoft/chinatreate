import React from 'react';
import { motion } from 'motion/react';
import { Check, ShieldCheck, Clock, ArrowRight, Star, HelpCircle } from 'lucide-react';

interface QualifiedResultProps {
  scores: any;
  responses: any;
  onApply: () => void;
}

export const QualifiedResultPage: React.FC<QualifiedResultProps> = ({ scores, responses, onApply }) => {
  // Simple personalization
  const industry = responses.q2 === 'ecommerce' ? 'e-commerce' : 
                   responses.q2 === 'manufacturing' ? 'manufacturing' : 
                   responses.q2 === 'real_estate' ? 'real estate' : 'business';
  
  const headline = `You're China-Ready. Your ${industry} brand is primed for direct factory access.`;

  return (
    <div className="bg-white min-h-screen">
      {/* Hero */}
      <section className="relative pt-24 pb-20 bg-slate-50 border-b border-slate-100 overflow-hidden">
        <div className="absolute inset-0 bg-cover bg-center opacity-10 grayscale mix-blend-multiply" style={{ backgroundImage: "url('https://i.ibb.co/9kf0JhsB/china-bg.jpg')" }} />
        <div className="section-padding text-center relative z-10">
          <motion.div
            initial={{ opacity: 0, y: 20 }}
            animate={{ opacity: 1, y: 0 }}
          >
            <div className="inline-flex items-center gap-2 bg-brand-success/10 text-brand-success px-4 py-1 rounded-full text-xs font-bold tracking-widest mb-6 uppercase">
              Assessment Result: Highly Qualified (Score: {scores.total}/100)
            </div>
            <h1 className="text-4xl md:text-6xl font-display font-bold text-brand-primary mb-8 max-w-4xl mx-auto leading-[1.1]">
              {headline}
            </h1>
            <p className="text-xl text-slate-500 max-w-2xl mx-auto mb-12">
              Shenzhen is waiting. You have passed the core readiness indicators for the China Business Retreat.
            </p>
          </motion.div>

          <div className="grid grid-cols-3 gap-4 max-w-2xl mx-auto">
            <div className="p-4 bg-white rounded-2xl shadow-sm border border-slate-100">
              <div className="text-2xl font-display font-bold text-brand-primary">{scores.readiness}/40</div>
              <div className="text-[10px] uppercase font-bold text-slate-400 tracking-widest mt-1">Readiness</div>
            </div>
            <div className="p-4 bg-white rounded-2xl shadow-sm border border-slate-100">
              <div className="text-2xl font-display font-bold text-brand-primary">{scores.fit}/35</div>
              <div className="text-[10px] uppercase font-bold text-slate-400 tracking-widest mt-1">Fit</div>
            </div>
            <div className="p-4 bg-white rounded-2xl shadow-sm border border-slate-100">
              <div className="text-2xl font-display font-bold text-brand-primary">{scores.commitment}/25</div>
              <div className="text-[10px] uppercase font-bold text-slate-400 tracking-widest mt-1">Commitment</div>
            </div>
          </div>
        </div>
      </section>

      {/* Value Prop & CTA */}
      <section className="py-24">
        <div className="section-padding">
          <div className="grid lg:grid-cols-2 gap-16 items-start">
            <div className="space-y-12">
              <div>
                <h2 className="text-3xl font-display font-bold text-brand-primary mb-6">Why you're a priority for the 2026 Cohort</h2>
                <div className="space-y-6">
                  <div className="flex gap-4">
                    <div className="w-10 h-10 rounded-full bg-brand-accent/10 flex items-center justify-center flex-shrink-0">
                      <Check className="w-5 h-5 text-brand-accent" />
                    </div>
                    <p className="text-slate-600 leading-relaxed">
                      Your revenue capacity indicates you're ready to absorb the scale of direct factory relationships without intermediate credit lines.
                    </p>
                  </div>
                  <div className="flex gap-4">
                    <div className="w-10 h-10 rounded-full bg-brand-accent/10 flex items-center justify-center flex-shrink-0">
                      <Check className="w-5 h-5 text-brand-accent" />
                    </div>
                    <p className="text-slate-600 leading-relaxed">
                      The {industry} sector is currently benefiting from new free-trade zones in Shenzhen, making your timing mathematically perfect.
                    </p>
                  </div>
                </div>
              </div>

              <div className="bg-slate-50 p-8 rounded-[2rem] border border-slate-100">
                <div className="flex items-center gap-4 mb-4">
                  <div className="flex text-amber-400">
                    {[1, 2, 3, 4, 5].map(i => <Star key={i} className="w-4 h-4 fill-current" />)}
                  </div>
                  <span className="text-xs font-bold text-slate-400 uppercase tracking-widest">Alumni Feedback</span>
                </div>
                <p className="text-slate-600 italic mb-4">
                  "I spent years paying 30% markups to local agents. 48 hours after landing in Guangzhou with Dr. Akintayo, I had secured a direct line that saved me $40k on my first shipment alone."
                </p>
                <div className="flex items-center gap-3">
                  <div className="w-10 h-10 rounded-full bg-slate-200" />
                  <p className="text-sm font-bold text-brand-primary">Oladapo Mensah — Direct Sourcing Master</p>
                </div>
              </div>

              <div className="pt-8">
                <h3 className="text-xl font-display font-bold text-brand-primary mb-6 flex items-center gap-2">
                  <Star className="w-5 h-5 text-brand-accent fill-brand-accent" /> Watch the Impact
                </h3>
                <div className="grid sm:grid-cols-2 gap-4">
                  {[
                    { id: "PPj17YtqteM", title: "Alumni Success" },
                    { id: "jGZCM2hZ7Wk", title: "Scale Strategy" }
                  ].map(v => (
                    <div key={v.id} className="aspect-video rounded-2xl overflow-hidden bg-slate-200 shadow-sm border border-slate-100">
                      <iframe
                        className="w-full h-full"
                        src={`https://www.youtube.com/embed/${v.id}`}
                        title={v.title}
                        allowFullScreen
                      />
                    </div>
                  ))}
                </div>
              </div>
            </div>

            <div className="lg:sticky lg:top-32 space-y-8">
              <div className="bg-brand-primary rounded-[2.5rem] p-10 text-white shadow-3xl shadow-brand-primary/30">
                <div className="flex justify-between items-center mb-6">
                  <h3 className="text-2xl font-display font-bold">Application Summary</h3>
                  <div className="bg-brand-accent/20 text-brand-accent px-3 py-1 rounded-full text-[10px] font-bold uppercase tracking-widest animate-pulse">
                    8 seats left
                  </div>
                </div>
                <div className="space-y-4 mb-8">
                  <div className="flex justify-between pb-4 border-b border-white/10">
                    <span className="text-white/60">Priority Status</span>
                    <span className="text-brand-accent font-bold">APPROVED</span>
                  </div>
                  <div className="flex justify-between pb-4 border-b border-white/10">
                    <span className="text-white/60">Application Fee</span>
                    <span className="font-bold">$97.00 Deposit</span>
                  </div>
                  <div className="flex justify-between">
                    <span className="text-white/60">Total Retreat Fee</span>
                    <span className="font-bold text-brand-accent">$12,500.00</span>
                  </div>
                </div>
                
                <button 
                  onClick={() => window.location.href = 'https://buy.stripe.com/bJe3cwcNe0jd54y1kMew806'}
                  className="w-full bg-brand-accent hover:opacity-90 text-white py-5 rounded-2xl font-display font-bold text-lg transition-all flex items-center justify-center gap-2 group cursor-pointer"
                >
                  PAY APPLICATION FEE — $97 <ArrowRight className="w-5 h-5 group-hover:translate-x-1 transition-transform" />
                </button>
                
                <p className="text-white/40 text-[10px] text-center mt-6 uppercase tracking-[0.2em] font-bold leading-relaxed">
                  Deposit is 100% refundable if not accepted. <br /> Applies to final retreat fee.
                </p>
              </div>

              <div className="flex items-center gap-4 justify-center py-4 bg-slate-50 rounded-2xl">
                <ShieldCheck className="w-5 h-5 text-brand-success" />
                <span className="text-xs font-bold text-slate-500 uppercase tracking-widest">Visa support & handling included</span>
              </div>
            </div>
          </div>
        </div>
      </section>

      {/* FAQ */}
      <section className="py-24 bg-brand-light">
        <div className="section-padding">
          <div className="max-w-3xl mx-auto">
            <h2 className="text-3xl font-display font-bold text-brand-primary mb-12 text-center">Frequently Requested Info</h2>
            <div className="space-y-6">
              {[
                { q: "What if I can't secure my visa?", a: "We have a dedicated logistics team in Beijing that handles visa facilitation letters and invitation processing. If for any reason your visa is denied, your retreat fee is fully protected." },
                { q: "Is the $97 application fee final?", a: "This is a non-committal application deposit. It secures your priority review and is 100% refundable if you're not accepted into the 2026 cohort. If you are accepted, the $97 is credited towards the final $12,500 retreat investment." }
              ].map((item, i) => (
                <div key={i} className="bg-white p-8 rounded-3xl border border-slate-200">
                  <h4 className="font-display font-bold text-lg text-brand-primary mb-3 flex items-center gap-2">
                    <HelpCircle className="w-5 h-5 text-brand-accent" /> {item.q}
                  </h4>
                  <p className="text-slate-500 leading-relaxed text-sm">{item.a}</p>
                </div>
              ))}
            </div>
          </div>
        </div>
      </section>
    </div>
  );
};
