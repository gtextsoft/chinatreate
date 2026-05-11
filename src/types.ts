export type QuestionType = 'single' | 'multi' | 'text';

export interface Option {
  label: string;
  value: string;
  score: number;
  tag: string;
  notes?: string;
}

export interface Question {
  id: string;
  text: string;
  type: QuestionType;
  options: Option[];
  required: boolean;
  purpose: string;
  maxSelections?: number;
  conditionalTrack?: 'REAL_ESTATE' | 'INVESTOR' | 'STANDARD';
}

export interface QuizState {
  currentStep: number;
  responses: Record<string, any>;
  userData: {
    name: string;
    email: string;
    phone: string;
  };
  score: {
    readiness: number;
    fit: number;
    commitment: number;
    total: number;
  };
  routing: {
    status: 'QUALIFIED' | 'UNQUALIFIED' | 'CONDITIONAL' | null;
    destination: string | null;
    reason: string | null;
    message: string | null;
    tags: string[];
    personalization?: {
      headline: string;
    };
  };
}
