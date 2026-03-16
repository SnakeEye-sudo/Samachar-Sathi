// News Aggregation Service
// Fetches and aggregates news from multiple sources

export interface NewsArticle {
  id: string;
  title: string;
  content: string;
  summary: string;
  source: string;
  category: 'NATIONAL' | 'INTERNATIONAL' | 'BUSINESS' | 'SCIENCE' | 'TECHNOLOGY' | 'SPORTS' | 'ENVIRONMENT' | 'POLITICS';
  date: string;
  imageUrl?: string;
  url: string;
  author?: string;
  language: 'en' | 'hi';
}

export interface NewsAnalysis {
  articleId: string;
  title: string;
  mainPoints: string[];
  subtopics: Subtopic[];
  context: string;
  impact: string;
  relatedNews: string[];
  mcqQuestions: MCQQuestion[];
  importance: 'HIGH' | 'MEDIUM' | 'LOW';
}

export interface Subtopic {
  name: string;
  details: string[];
  relatedTopics?: string[];
}

export interface MCQQuestion {
  id: string;
  question: string;
  options: string[];
  correctAnswer: number;
  explanation: string;
  difficulty: 'EASY' | 'MEDIUM' | 'HARD';
}

export interface DailyAnalysisReport {
  date: string;
  articles: NewsAnalysis[];
  summary: string;
  keyHighlights: string[];
  topicsOfTheDay: string[];
}

// News API Keys and Sources
const NEWS_SOURCES = [
  { name: 'IndiaToday', url: 'https://www.indiatoday.in' },
  { name: 'TheHindu', url: 'https://www.thehindu.com' },
  { name: 'TimesOfIndia', url: 'https://timesofindia.indiatimes.com' },
  { name: 'BBCNews', url: 'https://www.bbc.com/news' },
  { name: 'Reuters', url: 'https://www.reuters.com' },
  { name: 'DW', url: 'https://www.dw.com' },
];

// Fetch news from multiple sources
export const fetchNewsFromSources = async (): Promise<NewsArticle[]> => {
  const articles: NewsArticle[] = [];
  
  try {
    // Using News API as fallback
    const newsApiKey = 'demo'; // Replace with actual API key
    const endpoints = [
      `https://newsapi.org/v2/top-headlines?country=in&apiKey=${newsApiKey}`,
      `https://newsapi.org/v2/everything?q=india&sortBy=publishedAt&apiKey=${newsApiKey}`,
    ];

    for (const endpoint of endpoints) {
      const response = await fetch(endpoint);
      const data = await response.json();
      
      if (data.articles) {
        data.articles.forEach((article: any, index: number) => {
          articles.push({
            id: `news_${Date.now()}_${index}`,
            title: article.title,
            content: article.content || article.description,
            summary: article.description,
            source: article.source.name,
            category: categorizeNews(article.title),
            date: article.publishedAt,
            imageUrl: article.urlToImage,
            url: article.url,
            author: article.author,
            language: 'en',
          });
        });
      }
    }
  } catch (error) {
    console.error('Error fetching news:', error);
  }

  return articles;
};

// Categorize news based on title and content
const categorizeNews = (title: string): NewsArticle['category'] => {
  const lower = title.toLowerCase();
  
  if (lower.includes('government') || lower.includes('parliament') || lower.includes('minister')) return 'POLITICS';
  if (lower.includes('stock') || lower.includes('market') || lower.includes('business')) return 'BUSINESS';
  if (lower.includes('sport') || lower.includes('cricket') || lower.includes('football')) return 'SPORTS';
  if (lower.includes('science') || lower.includes('research')) return 'SCIENCE';
  if (lower.includes('tech') || lower.includes('ai') || lower.includes('software')) return 'TECHNOLOGY';
  if (lower.includes('environment') || lower.includes('climate') || lower.includes('pollution')) return 'ENVIRONMENT';
  if (lower.includes('world') || lower.includes('international') || lower.includes('global')) return 'INTERNATIONAL';
  
  return 'NATIONAL';
};

// Get news for a specific date
export const getNewsForDate = async (date: string): Promise<NewsArticle[]> => {
  const allNews = await fetchNewsFromSources();
  return allNews.filter(news => news.date.startsWith(date));
};

// Search news by keyword
export const searchNews = async (keyword: string): Promise<NewsArticle[]> => {
  const allNews = await fetchNewsFromSources();
  return allNews.filter(news =>
    news.title.toLowerCase().includes(keyword.toLowerCase()) ||
    news.content.toLowerCase().includes(keyword.toLowerCase())
  );
};

// Get trending topics
export const getTrendingTopics = async (): Promise<string[]> => {
  const allNews = await fetchNewsFromSources();
  const topics = new Set<string>();
  
  allNews.forEach(news => {
    const words = news.title.split(' ').filter(w => w.length > 5);
    words.forEach(word => topics.add(word));
  });
  
  return Array.from(topics).slice(0, 15);
};

// Fetch news by category
export const getNewsByCategory = async (category: NewsArticle['category']): Promise<NewsArticle[]> => {
  const allNews = await fetchNewsFromSources();
  return allNews.filter(news => news.category === category);
};
