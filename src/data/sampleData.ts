import { DailyAnalysis, DailyQuiz } from '@/types/news';
import { getMegaAnalysis, getMegaQuiz } from './megaSample';

export const getSampleAnalysis = (date: string): DailyAnalysis => {
  return getMegaAnalysis(date);
};

export const getSampleQuiz = (date: string): DailyQuiz => {
  return getMegaQuiz(date);
};
