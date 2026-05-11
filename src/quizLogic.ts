import { QuizState } from './types';
import { QUESTIONS, Q8_STANDARD, Q8_INVESTOR } from './quizData';

export function calculateScore(responses: Record<string, any>) {
  let readiness = 0;
  let fit = 0;
  let commitment = 0;
  let tags: string[] = [];

  // Readiness (max 40)
  const q3 = responses.q3;
  if (q3 === 'r2') readiness += 8;
  else if (q3 === 'r3') readiness += 12;
  else if (q3 === 'r4' || q3 === 'r5') readiness += 15;

  const q6 = responses.q6;
  if (q6 === 'china_pro') readiness += 15;
  else if (q6 === 'china_once') readiness += 12;
  else if (q6 === 'china_planner') readiness += 10;
  else readiness += 8;

  const q9 = responses.q9;
  if (['trust', 'burned'].includes(q9)) readiness += 10;
  else if (['complexity', 'procrastination'].includes(q9)) readiness += 8;
  else if (q9 === 'time') readiness += 6;
  else readiness += 5;

  // Fit (max 35)
  const q1 = responses.q1;
  if (["founder_ceo", "entrepreneur", "investor", "re_investor"].includes(q1)) fit += 10;
  else if (q1 === "senior_exec") fit += 8;
  else fit += 5;

  const q2 = responses.q2;
  fit += (q2 !== "other" ? 10 : 5);

  const q7 = responses.q7;
  if (["differentiate", "partner", "invest_china"].includes(q7)) fit += 12;
  else if (["cost_cut", "control"].includes(q7)) fit += 10;
  else fit += 8;

  // Commitment (max 25)
  const q10 = responses.q10;
  if (q10 === 'hot') commitment += 15;
  else if (q10 === 'warm_price') commitment += 12;
  else if (q10 === 'warm_spouse') commitment += 10;
  else if (q10 === 'cool') commitment += 6;
  else commitment += 3;

  const q5 = (responses.q5 || []) as string[];
  const painScores: any = { margins:4, quality:4, logistics:3, access:5, differentiation:5, fomo:4, overwhelm:3 };
  commitment += Math.max(0, ...q5.map(v => painScores[v] || 0));

  const q8 = responses.q8;
  commitment += (["scale", "legacy", "global_portfolio", "developer", "family_office"].includes(q8) ? 5 : 4);

  const total = readiness + fit + commitment;
  return { readiness, fit, commitment, total };
}

export function routeUser(responses: Record<string, any>, scores: any) {
  if (responses.q3 === 'r1') return { status: 'UNQUALIFIED', destination: '/waitlist/building-toward-china', reason: 'REVENUE_GATE' };
  if (responses.q10 === 'cold') return { status: 'UNQUALIFIED', destination: '/waitlist/future-cohorts', reason: 'COMMITMENT_GATE' };
  if (responses.q1 === 'other' && responses.q2 === 'other') return { status: 'UNQUALIFIED', destination: '/waitlist/custom-path', reason: 'FIT_GATE' };

  if (scores.total >= 75) {
    if (['hot', 'warm_price', 'warm_spouse'].includes(responses.q10)) 
      return { status: 'QUALIFIED', destination: '/apply/china-retreat-2026' };
    return { status: 'CONDITIONAL', destination: '/conditional/china-ready-nurture' };
  }
  if (scores.total >= 50) return { status: 'UNQUALIFIED', destination: '/waitlist/building-toward-china' };
  return { status: 'UNQUALIFIED', destination: '/waitlist/china-curious' };
}
