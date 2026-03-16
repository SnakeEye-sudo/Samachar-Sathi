import { DailyAnalysis, DailyQuiz, QuizResult } from '@/types/news';

const STORAGE_KEYS = {
  ANALYSES: 'pragya-analyses',
  QUIZZES: 'pragya-quizzes',
  QUIZ_RESULTS: 'pragya-quiz-results',
};

export const saveAnalysis = (analysis: DailyAnalysis) => {
  const all = getAllAnalyses();
  const idx = all.findIndex(a => a.date === analysis.date);
  if (idx >= 0) all[idx] = analysis;
  else all.push(analysis);
  localStorage.setItem(STORAGE_KEYS.ANALYSES, JSON.stringify(all));
};

export const getAllAnalyses = (): DailyAnalysis[] => {
  try {
    return JSON.parse(localStorage.getItem(STORAGE_KEYS.ANALYSES) || '[]');
  } catch { return []; }
};

export const getAnalysisByDate = (date: string): DailyAnalysis | undefined => {
  return getAllAnalyses().find(a => a.date === date);
};

export const getAnalysesForMonth = (year: number, month: number): DailyAnalysis[] => {
  const prefix = `${year}-${String(month).padStart(2, '0')}`;
  return getAllAnalyses().filter(a => a.date.startsWith(prefix));
};

export const saveQuiz = (quiz: DailyQuiz) => {
  const all = getAllQuizzes();
  const idx = all.findIndex(q => q.date === quiz.date);
  if (idx >= 0) all[idx] = quiz;
  else all.push(quiz);
  localStorage.setItem(STORAGE_KEYS.QUIZZES, JSON.stringify(all));
};

export const getAllQuizzes = (): DailyQuiz[] => {
  try {
    return JSON.parse(localStorage.getItem(STORAGE_KEYS.QUIZZES) || '[]');
  } catch { return []; }
};

export const getQuizByDate = (date: string): DailyQuiz | undefined => {
  return getAllQuizzes().find(q => q.date === date);
};

export const saveQuizResult = (result: QuizResult) => {
  const all = getAllQuizResults();
  const idx = all.findIndex(r => r.date === result.date);
  if (idx >= 0) all[idx] = result;
  else all.push(result);
  localStorage.setItem(STORAGE_KEYS.QUIZ_RESULTS, JSON.stringify(all));
};

export const getAllQuizResults = (): QuizResult[] => {
  try {
    return JSON.parse(localStorage.getItem(STORAGE_KEYS.QUIZ_RESULTS) || '[]');
  } catch { return []; }
};

export const getQuizResultByDate = (date: string): QuizResult | undefined => {
  return getAllQuizResults().find(r => r.date === date);
};
