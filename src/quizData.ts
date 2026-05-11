import { Question } from './types';

export const QUESTIONS: Question[] = [
  {
    id: 'q1',
    text: "What's your current role?",
    type: 'single',
    required: true,
    purpose: "Primary segmentation",
    options: [
      { label: "Founder & CEO", value: "founder_ceo", score: 10, tag: "POSITION_FOUNDER" },
      { label: "Entrepreneur / Business Owner", value: "entrepreneur", score: 10, tag: "POSITION_ENTREPRENEUR" },
      { label: "Investor (Angel, VC, PE)", value: "investor", score: 10, tag: "POSITION_INVESTOR" },
      { label: "Real Estate Investor / Developer", value: "re_investor", score: 10, tag: "POSITION_RE_INVESTOR" },
      { label: "Senior Executive (C-Suite, Director)", value: "senior_exec", score: 8, tag: "POSITION_EXECUTIVE" },
      { label: "Other", value: "other", score: 5, tag: "POSITION_OTHER" }
    ]
  },
  {
    id: 'q2',
    text: "What industry are you primarily in?",
    type: 'single',
    required: true,
    purpose: "Industry-specific talk track",
    options: [
      { label: "E-commerce & Retail", value: "ecommerce", score: 10, tag: "INDUSTRY_ECOM" },
      { label: "Manufacturing & Production", value: "manufacturing", score: 10, tag: "INDUSTRY_MANUFACTURING" },
      { label: "Real Estate & Construction", value: "real_estate", score: 10, tag: "INDUSTRY_REAL_ESTATE" },
      { label: "Agriculture & Agro-processing", value: "agriculture", score: 10, tag: "INDUSTRY_AGRO" },
      { label: "Technology & Hardware", value: "technology", score: 10, tag: "INDUSTRY_TECH" },
      { label: "Health, Wellness & Supplements", value: "wellness", score: 10, tag: "INDUSTRY_WELLNESS" },
      { label: "Fashion, Beauty & Lifestyle", value: "fashion", score: 10, tag: "INDUSTRY_FASHION" },
      { label: "Import/Export & Trade", value: "trade", score: 10, tag: "INDUSTRY_TRADE" },
      { label: "Energy & Infrastructure", value: "energy", score: 10, tag: "INDUSTRY_ENERGY" },
      { label: "Other", value: "other", score: 5, tag: "INDUSTRY_OTHER" }
    ]
  },
  {
    id: 'q3',
    text: "What's your current annual revenue or investment capacity?",
    type: 'single',
    required: true,
    purpose: "Price qualification (HARD GATE)",
    options: [
      { label: "Under ₦10M (~$6,500 USD)", value: "r1", score: 0, tag: "REVENUE_R1" },
      { label: "₦10M – ₦50M (~$6,500 – $32,500)", value: "r2", score: 8, tag: "REVENUE_R2" },
      { label: "₦50M – ₦200M (~$32,500 – $130,000)", value: "r3", score: 12, tag: "REVENUE_R3" },
      { label: "₦200M – ₦500M (~$130,000 – $325,000)", value: "r4", score: 15, tag: "REVENUE_R4" },
      { label: "Above ₦500M (~$325,000+ USD)", value: "r5", score: 15, tag: "REVENUE_R5" }
    ]
  },
  {
    id: 'q4',
    text: "How do you currently source products, materials, or investment opportunities?",
    type: 'single',
    required: true,
    purpose: "Pain identification",
    options: [
      { label: "Local suppliers / distributors", value: "local", score: 5, tag: "SOURCE_LOCAL" },
      { label: "Online platforms (Alibaba, etc.)", value: "online", score: 8, tag: "SOURCE_ONLINE" },
      { label: "Some direct factory contacts", value: "some_access", score: 12, tag: "SOURCE_SOME" },
      { label: "Agents or sourcing companies", value: "agent", score: 8, tag: "SOURCE_AGENT" },
      { label: "Don't source yet, want to start", value: "newbie", score: 10, tag: "SOURCE_NEWBIE" },
      { label: "I invest capital, look for deals", value: "capital", score: 12, tag: "SOURCE_CAPITAL" }
    ]
  },
  {
    id: 'q5',
    text: "What's your biggest frustration with your current approach? (Select up to 2)",
    type: 'multi',
    required: true,
    maxSelections: 2,
    purpose: "Emotional pain amplification",
    options: [
      { label: "Prices rising, margins shrinking", value: "margins", score: 8, tag: "PAIN_MARGINS" },
      { label: "Quality inconsistent/unreliable", value: "quality", score: 8, tag: "PAIN_QUALITY" },
      { label: "Delivery times unpredictable", value: "logistics", score: 6, tag: "PAIN_LOGISTICS" },
      { label: "No direct decision-maker relationships", value: "access", score: 10, tag: "PAIN_ACCESS" },
      { label: "Can't customize/differentiate products", value: "differentiation", score: 10, tag: "PAIN_DIFFERENTIATE" },
      { label: "Missing opportunities I can't reach", value: "fomo", score: 8, tag: "PAIN_FOMO" },
      { label: "Overwhelmed by China complexity", value: "overwhelm", score: 6, tag: "PAIN_OVERWHELM" }
    ]
  },
  {
    id: 'q6',
    text: "Have you ever traveled to China for business?",
    type: 'single',
    required: true,
    purpose: "Experience segmentation",
    options: [
      { label: "Yes, multiple times", value: "china_pro", score: 15, tag: "EXP_PRO" },
      { label: "Yes, once (overwhelming)", value: "china_once", score: 12, tag: "EXP_ONCE" },
      { label: "No, planned to go 1+ years", value: "china_planner", score: 10, tag: "EXP_PLANNER" },
      { label: "No, too complex/intimidating", value: "china_intimidated", score: 8, tag: "EXP_INTIMIDATED" },
      { label: "No, never considered until now", value: "china_new", score: 8, tag: "EXP_NEW" }
    ]
  },
  {
    id: 'q7',
    text: "If you had direct access to Chinese manufacturers and investors, what's the FIRST thing you would do?",
    type: 'single',
    required: true,
    purpose: "Immediate goal",
    options: [
      { label: "Negotiate better pricing/terms", value: "cost_cut", score: 10, tag: "GOAL_COST" },
      { label: "Develop custom/private-label products", value: "differentiate", score: 12, tag: "GOAL_DIFFERENTIATE" },
      { label: "Explore manufacturing partnerships/JVs", value: "partner", score: 12, tag: "GOAL_PARTNER" },
      { label: "Invest in Chinese real estate/projects", value: "invest_china", score: 12, tag: "GOAL_INVEST" },
      { label: "Build fully controlled supply chain", value: "control", score: 10, tag: "GOAL_CONTROL" },
      { label: "Understand market to teach others", value: "authority", score: 8, tag: "GOAL_AUTHORITY" }
    ]
  },
  {
    id: 'q8',
    text: "What's your vision for your business or portfolio in the next 3 years?",
    type: 'single',
    required: true,
    purpose: "Long-term desire",
    options: [] // Dynamic based on Q1/Q7
  },
  {
    id: 'q9',
    text: "What's held you back from building your China strategy until now?",
    type: 'single',
    required: true,
    purpose: "Obstacle identification",
    options: [
      { label: "Don't know who to trust or where to start", value: "trust", score: 10, tag: "OBSTACLE_TRUST" },
      { label: "Overwhelmed by logistics and complexity", value: "complexity", score: 8, tag: "OBSTACLE_COMPLEXITY" },
      { label: "Can't afford 7 days away from business", value: "time", score: 6, tag: "OBSTACLE_TIME" },
      { label: "Don't have capital to invest right now", value: "capital", score: 5, tag: "OBSTACLE_CAPITAL" },
      { label: "Burned by bad advice or scams before", value: "burned", score: 10, tag: "OBSTACLE_BURNED" },
      { label: "Keep saying 'next year' but never comes", value: "procrastination", score: 8, tag: "OBSTACLE_PROCRASTINATION" }
    ]
  },
  {
    id: 'q10',
    text: "If you were accepted into a curated 7-day China immersion with Dr. Stephen Akintayo, how ready are you to commit?",
    type: 'single',
    required: true,
    purpose: "Commitment thermometer (HARD GATE)",
    options: [
      { label: "Ready to apply today. Show me how.", value: "hot", score: 15, tag: "COMMIT_HOT" },
      { label: "Very interested, need to understand investment", value: "warm_price", score: 12, tag: "COMMIT_WARM_PRICE" },
      { label: "Interested, need to discuss with partner/board", value: "warm_spouse", score: 10, tag: "COMMIT_WARM_SPOUSE" },
      { label: "Curious, want to learn more before deciding", value: "cool", score: 6, tag: "COMMIT_COOL" },
      { label: "Not ready now, want future cohort info", value: "cold", score: 3, tag: "COMMIT_COLD" }
    ]
  }
];

export const Q8_STANDARD = [
  { label: "Scale to 8-9 figures in revenue", value: "scale", score: 10, tag: "VISION_SCALE" },
  { label: "Build recognizable brand across Africa", value: "brand", score: 8, tag: "VISION_BRAND" },
  { label: "Expand into multiple African markets", value: "expand", score: 8, tag: "VISION_EXPAND" },
  { label: "Create generational wealth and legacy", value: "legacy", score: 12, tag: "VISION_LEGACY" },
  { label: "Become thought leader and investor", value: "thought_leader", score: 8, tag: "VISION_AUTHORITY" }
];

export const Q8_INVESTOR = [
  { label: "Diversified portfolio across 3+ continents", value: "global_portfolio", score: 12, tag: "VISION_GLOBAL" },
  { label: "Develop large-scale projects with intl partners", value: "developer", score: 12, tag: "VISION_DEVELOPER" },
  { label: "Create family office with global deal flow", value: "family_office", score: 12, tag: "VISION_FAMILY_OFFICE" },
  { label: "Master cross-border investment strategies", value: "cross_border", score: 10, tag: "VISION_CROSS_BORDER" }
];
