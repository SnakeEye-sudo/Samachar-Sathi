// Advanced News Analysis Engine
// Generates detailed point-by-point analysis with subtopics

import { NewsArticle, NewsAnalysis, Subtopic, MCQQuestion } from './newsService';

export class AnalysisEngine {
  // Generate detailed analysis for a news article
  static generateDetailedAnalysis(article: NewsArticle): NewsAnalysis {
    const mainPoints = this.extractMainPoints(article.content);
    const subtopics = this.extractSubtopics(article.content);
    const context = this.generateContext(article);
    const impact = this.analyzeImpact(article);
    const mcqQuestions = this.generateMCQs(article);
    const relatedNews = this.findRelatedTopics(article.title);

    return {
      articleId: article.id,
      title: article.title,
      mainPoints,
      subtopics,
      context,
      impact,
      relatedNews,
      mcqQuestions,
      importance: this.determineImportance(article),
    };
  }

  // Extract main points from content
  private static extractMainPoints(content: string): string[] {
    const sentences = content.split('. ');
    const importantSentences = sentences
      .filter(s => s.length > 50)
      .slice(0, 5);
    return importantSentences.map(s => s.trim());
  }

  // Extract subtopics with detailed information
  private static extractSubtopics(content: string): Subtopic[] {
    const subtopics: Subtopic[] = [];
    const keywords = ['impact', 'reason', 'background', 'consequence', 'analysis', 'detail'];

    keywords.forEach(keyword => {
      const regex = new RegExp(`${keyword}[^.]*\.`, 'gi');
      const matches = content.match(regex) || [];
      if (matches.length > 0) {
        subtopics.push({
          name: keyword.charAt(0).toUpperCase() + keyword.slice(1),
          details: matches.slice(0, 3).map(m => m.trim()),
        });
      }
    });

    return subtopics;
  }

  // Generate comprehensive context
  private static generateContext(article: NewsArticle): string {
    return `This news is categorized as ${article.category}. Published by ${article.source} on ${article.date}. The article discusses important developments related to ${article.title.split(' ').slice(0, 5).join(' ')}.`;
  }

  // Analyze impact and relevance
  private static analyzeImpact(article: NewsArticle): string {
    const category = article.category;
    const impacts: { [key: string]: string } = {
      'POLITICS': 'This news has implications for governance, policy-making, and political dynamics in the region.',
      'BUSINESS': 'This development affects market trends, economic indicators, and business sentiment.',
      'TECHNOLOGY': 'This breakthrough has potential applications in innovation and technological advancement.',
      'SCIENCE': 'This research contributes to scientific knowledge and understanding of the subject matter.',
      'ENVIRONMENT': 'This issue has environmental consequences and climate-related implications.',
      'SPORTS': 'This event impacts the sports industry and athletic excellence.',
      'INTERNATIONAL': 'This news has global implications and international relations impact.',
      'NATIONAL': 'This development affects national interests and domestic affairs.'
    };

    return impacts[category] || 'This news has significant relevance to current affairs.';
  }

  // Generate MCQ questions from article
  private static generateMCQs(article: NewsArticle): MCQQuestion[] {
    const questions: MCQQuestion[] = [];
    const titleWords = article.title.split(' ');

    // Question 1: About the main subject
    questions.push({
      id: `mcq_${article.id}_1`,
      question: `What is the main focus of the news about ${titleWords.slice(0, 3).join(' ')}?`,
      options: [
        `${titleWords.slice(0, 4).join(' ')}.`,
        `A different topic entirely.`,
        `Historical background only.`,
        `Future predictions only.`
      ],
      correctAnswer: 0,
      explanation: `The article primarily discusses ${article.title}.`,
      difficulty: 'EASY'
    });

    // Question 2: Category-based
    questions.push({
      id: `mcq_${article.id}_2`,
      question: `Under which category does this news fall?`,
      options: [
        article.category,
        'OTHER',
        'ENTERTAINMENT',
        'SPORTS'
      ],
      correctAnswer: 0,
      explanation: `This news belongs to the ${article.category} category.`,
      difficulty: 'EASY'
    });

    // Question 3: Context understanding
    questions.push({
      id: `mcq_${article.id}_3`,
      question: `Who is the publisher of this news?`,
      options: [
        article.source,
        'Other News Agency',
        'Unknown Source',
        'Social Media'
      ],
      correctAnswer: 0,
      explanation: `This article is published by ${article.source}.`,
      difficulty: 'EASY'
    });

    return questions.slice(0, 3);
  }

  // Find related topics
  private static findRelatedTopics(title: string): string[] {
    const words = title.split(' ').filter(w => w.length > 4);
    return words.slice(0, 5);
  }

  // Determine importance level
  private static determineImportance(article: NewsArticle): 'HIGH' | 'MEDIUM' | 'LOW' {
    const criticalCategories = ['POLITICS', 'INTERNATIONAL', 'BUSINESS'];
    if (criticalCategories.includes(article.category)) {
      return 'HIGH';
    }
    return article.content.length > 500 ? 'MEDIUM' : 'LOW';
  }

  // Generate daily analysis report
  static generateDailyReport(analyses: NewsAnalysis[]) {
    const today = new Date().toISOString().split('T')[0];
    const keyHighlights = analyses
      .filter(a => a.importance === 'HIGH')
      .map(a => a.title)
      .slice(0, 5);

    const topicsOfTheDay = Array.from(
      new Set(analyses.flatMap(a => a.mainPoints))
    ).slice(0, 10);

    return {
      date: today,
      articles: analyses,
      summary: `Daily analysis report with ${analyses.length} articles.`,
      keyHighlights,
      topicsOfTheDay,
    };
  }
}

export default AnalysisEngine;
