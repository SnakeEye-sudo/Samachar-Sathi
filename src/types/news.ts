export type Language = 'hi' | 'en';

export interface SubTopic {
  title: { hi: string; en: string };
  content: { hi: string; en: string };
  keyPoints: { hi: string; en: string }[];
  examRelevance: { hi: string; en: string };
}

export interface Topic {
  id: string;
  title: { hi: string; en: string };
  category: { hi: string; en: string };
  categoryKey: string;
  subtopics: SubTopic[];
  summary: { hi: string; en: string };
  source: string;
}

export interface DailyAnalysis {
  date: string; // YYYY-MM-DD
  topics: Topic[];
}

export interface MCQQuestion {
  id: string;
  question: { hi: string; en: string };
  options: { hi: string; en: string }[];
  correctIndex: number;
  explanation: { hi: string; en: string };
  topicRef: string;
}

export interface DailyQuiz {
  date: string;
  questions: MCQQuestion[];
}

export interface QuizResult {
  date: string;
  score: number;
  total: number;
  answers: number[];
  completedAt: string;
}
