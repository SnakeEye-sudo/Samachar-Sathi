export type Language = 'hi' | 'en';

export interface UPSCContext {
  relevance: { hi: string; en: string };
  staticLinkage?: { hi: string; en: string };
  concerns?: { hi: string; en: string };
}

export interface NewsUnit {
  title: { hi: string; en: string };
  link: string;
  source: string;
  upscContext: UPSCContext;
  analysis: { hi: string; en: string };
}

export interface Category {
  name: string;
  news: NewsUnit[];
  description?: string;
}

export interface NewsMetadata {
  date: string;
  totalArticlesAnalyzed: number;
  generatedAt: string;
  primaryLanguage: string;
}

export interface DailyNews {
  metadata: NewsMetadata;
  categories: Category[];
}

// Backward compatibility alias
export type DailyAnalysis = DailyNews;

export interface QuizResult {
  date: string;
  score: number;
  total: number;
  answers: number[];
  completedAt: string;
}
