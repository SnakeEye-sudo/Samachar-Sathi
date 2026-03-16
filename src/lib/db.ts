
import { openDB, DBSchema, IDBPDatabase } from 'idb';
import { DailyAnalysis, DailyQuiz, QuizResult } from '@/types/news';

interface SamacharSathiDB extends DBSchema {
  analyses: {
    key: string;
    value: DailyAnalysis;
    indexes: { 'by-date': string };
  };
  quizzes: {
    key: string;
    value: DailyQuiz;
    indexes: { 'by-date': string };
  };
  results: {
    key: string;
    value: QuizResult;
    indexes: { 'by-date': string };
  };
}

let dbPromise: Promise<IDBPDatabase<SamacharSathiDB>> | null = null;

export const getDB = () => {
  if (!dbPromise) {
    dbPromise = openDB<SamacharSathiDB>('samachar-sathi-vault', 1, {
      upgrade(db) {
        const analysisStore = db.createObjectStore('analyses', { keyPath: 'date' });
        analysisStore.createIndex('by-date', 'date');
        
        const quizStore = db.createObjectStore('quizzes', { keyPath: 'date' });
        quizStore.createIndex('by-date', 'date');

        const resultStore = db.createObjectStore('results', { keyPath: 'date' });
        resultStore.createIndex('by-date', 'date');
      },
    });
  }
  return dbPromise;
};

export const saveAnalysis = async (analysis: DailyAnalysis) => {
  const db = await getDB();
  await db.put('analyses', analysis);
};

export const getAnalysisByDate = async (date: string): Promise<DailyAnalysis | undefined> => {
  const db = await getDB();
  return db.get('analyses', date);
};

export const getAllAnalyses = async (): Promise<DailyAnalysis[]> => {
  const db = await getDB();
  return db.getAll('analyses');
};

export const getAnalysesForMonth = async (year: number, month: number): Promise<DailyAnalysis[]> => {
  const all = await getAllAnalyses();
  const prefix = `${year}-${String(month).padStart(2, '0')}`;
  return all.filter(a => a.date.startsWith(prefix));
};

export const saveQuiz = async (quiz: DailyQuiz) => {
  const db = await getDB();
  await db.put('quizzes', quiz);
};

export const getQuizByDate = async (date: string): Promise<DailyQuiz | undefined> => {
  const db = await getDB();
  return db.get('quizzes', date);
};

export const saveQuizResult = async (result: QuizResult) => {
  const db = await getDB();
  await db.put('results', result);
};

export const getQuizResultByDate = async (date: string): Promise<QuizResult | undefined> => {
  const db = await getDB();
  return db.get('results', date);
};

export const getAllQuizResults = async (): Promise<QuizResult[]> => {
  const db = await getDB();
  return db.getAll('results');
};

export const clearAllData = async (): Promise<void> => {
  const db = await getDB();
  const tx = db.transaction(['analyses', 'quizzes', 'results'], 'readwrite');
  await Promise.all([
    tx.objectStore('analyses').clear(),
    tx.objectStore('quizzes').clear(),
    tx.objectStore('results').clear(),
  ]);
};
