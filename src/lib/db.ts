import { openDB, DBSchema, IDBPDatabase } from 'idb';
import { DailyNews } from '@/types/news';

interface SamacharSathiDB extends DBSchema {
  analyses: {
    key: string;
    value: DailyNews;
    indexes: { 'by-date': string };
  };
}

let dbPromise: Promise<IDBPDatabase<SamacharSathiDB>> | null = null;

export const getDB = () => {
  if (!dbPromise) {
    dbPromise = openDB<SamacharSathiDB>('samachar-sathi-vault', 2, {
      upgrade(db, oldVersion, newVersion, transaction) {
        if (oldVersion < 1) {
          const analysisStore = db.createObjectStore('analyses', { keyPath: 'metadata.date' });
          analysisStore.createIndex('by-date', 'metadata.date');
        }
        
        // Cleanup old stores if they exist (quizzes, results)
        if (db.objectStoreNames.contains('quizzes')) {
          db.deleteObjectStore('quizzes');
        }
        if (db.objectStoreNames.contains('results')) {
          db.deleteObjectStore('results');
        }

        // Migration logic if schema changes for analyses
        if (oldVersion === 1) {
           // We changed keyPath from 'date' to 'metadata.date' possibly or just need to handle the structure.
           // In fact, let's keep it simple for this prototype and just recreate if needed or handle keys.
        }
      },
    });
  }
  return dbPromise;
};

export const saveAnalysis = async (analysis: DailyNews) => {
  const db = await getDB();
  await db.put('analyses', analysis);
};

export const getAnalysisByDate = async (date: string): Promise<DailyNews | undefined> => {
  const db = await getDB();
  return db.get('analyses', date);
};

export const getAllAnalyses = async (): Promise<DailyNews[]> => {
  const db = await getDB();
  return db.getAll('analyses');
};

export const getAnalysesForMonth = async (year: number, month: number): Promise<DailyNews[]> => {
  const all = await getAllAnalyses();
  const prefix = `${year}-${String(month).padStart(2, '0')}`;
  return all.filter(a => a.metadata.date.startsWith(prefix));
};

export const clearAllData = async (): Promise<void> => {
  const db = await getDB();
  const tx = db.transaction(['analyses'], 'readwrite');
  await tx.objectStore('analyses').clear();
};
