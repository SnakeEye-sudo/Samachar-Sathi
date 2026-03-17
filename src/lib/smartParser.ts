import { DailyNews, Category, NewsUnit } from '@/types/news';

/**
 * Smart Parser to convert raw news text into structured Samachar-Sathi categories.
 * Updated for the 14-category UPSC structure.
 */
export const parseRawNewsText = (text: string, date: string): DailyNews => {
  const lines = text.split('\n').filter(l => l.trim().length > 0);
  
  // Initialize categories
  const categories: Category[] = [
    { name: 'GS-II: International Relations', news: [] },
    { name: 'GS-III: Economy', news: [] },
    { name: 'GS-II: Governance & Social Justice', news: [] },
    { name: 'GS-II: Constitution & Polity', news: [] },
    { name: 'GS-III: Science & Tech', news: [] },
    { name: 'GS-III: Environment & Disaster Mgmt', news: [] },
    { name: 'GS-III: Internal Security', news: [] },
    { name: 'GS-I: History & Art Culture', news: [] },
    { name: 'GS-I: Geography', news: [] },
    { name: 'GS-I: Society', news: [] },
    { name: 'GS-IV: Ethics & Integrity', news: [] },
    { name: 'Economics Optional Segment', news: [] },
    { name: 'Geography Optional Segment', news: [] },
    { name: 'PSIR Optional Segment', news: [] }
  ];

  let currentCategory = categories[0];
  let currentNews: Partial<NewsUnit> | null = null;

  lines.forEach((line) => {
    const trimmed = line.trim();
    
    // Check if line matches a category name
    const categoryMatch = categories.find(c => trimmed.toUpperCase().includes(c.name.toUpperCase()));
    if (categoryMatch) {
      currentCategory = categoryMatch;
      return;
    }

    // Detect a news title (usually starts with number or bullet or is short and bold-like)
    if (trimmed.match(/^\d+\.|\bTOPIC:|\bSUBJECT:|^[•*-]/i) || (trimmed.length < 100 && trimmed.toUpperCase() === trimmed && trimmed.length > 10)) {
      if (currentNews && currentNews.title) {
        currentCategory.news.push(currentNews as NewsUnit);
      }
      
      const cleanTitle = trimmed.replace(/^\d+\.|\bTOPIC:|\bSUBJECT:|^[•*-]/i, '').trim();
      currentNews = {
        title: { hi: cleanTitle, en: cleanTitle },
        link: '#',
        source: 'Auto-Parsed',
        analysis: { hi: '', en: '' },
        upscContext: {
          relevance: { hi: 'UPSC Relevance', en: 'UPSC Relevance' },
          staticLinkage: { hi: 'Static Linkage', en: 'Static Linkage' }
        }
      };
    } else if (currentNews) {
      // Append to analysis
      if (currentNews.analysis) {
        currentNews.analysis.hi += (currentNews.analysis.hi ? '\n' : '') + trimmed;
        currentNews.analysis.en += (currentNews.analysis.en ? '\n' : '') + trimmed;
      }
    }
  });

  if (currentNews && currentNews.title) {
    currentCategory.news.push(currentNews as NewsUnit);
  }

  return {
    metadata: {
      date,
      totalArticlesAnalyzed: categories.reduce((acc, cat) => acc + cat.news.length, 0),
      generatedAt: new Date().toISOString(),
      primaryLanguage: 'hi'
    },
    categories
  };
};
