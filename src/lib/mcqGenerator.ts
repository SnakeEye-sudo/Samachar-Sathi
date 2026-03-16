// MCQ Generator for Daily News Tests
// Generates 30 multiple choice questions from daily news

import { NewsArticle, MCQQuestion } from './newsService';

export interface DailyMCQTest {
  date: string;
  questions: MCQQuestion[];
  totalQuestions: number;
  difficulty: 'MIXED' | 'EASY' | 'MEDIUM' | 'HARD';
  passingScore: number;
  categories: string[];
}

export class MCQGenerator {
  // Generate 30 MCQ questions from news articles
  static generate30MCQs(articles: NewsArticle[]): MCQQuestion[] {
    const questions: MCQQuestion[] = [];
    const questionPool: MCQQuestion[] = [];

    // Generate multiple questions per article
    articles.forEach((article, articleIndex) => {
      const articleQuestions = this.generateQuestionsFromArticle(article, articleIndex);
      questionPool.push(...articleQuestions);
    });

    // Shuffle and select 30 questions
    return this.selectAndShuffleQuestions(questionPool, 30);
  }

  // Generate questions from a single article
  private static generateQuestionsFromArticle(article: NewsArticle, articleIndex: number): MCQQuestion[] {
    const questions: MCQQuestion[] = [];
    const titleWords = article.title.split(' ');
    const contentSentences = article.content.split('. ');

    // Question Type 1: Main Topic
    questions.push({
      id: `q_${articleIndex}_1`,
      question: `What is the primary subject matter of the news article "${article.title}"?`,
      options: [
        titleWords.slice(0, 4).join(' '),
        `A completely unrelated topic`,
        `Historical background information`,
        `Future predictions and forecasts`
      ],
      correctAnswer: 0,
      explanation: `The article focuses on ${titleWords.slice(0, 5).join(' ')}.`,
      difficulty: 'EASY'
    });

    // Question Type 2: Category Classification
    questions.push({
      id: `q_${articleIndex}_2`,
      question: `Under which category should this news be classified?`,
      options: [
        article.category,
        this.getAlternateCategory(article.category),
        'ENTERTAINMENT',
        'LIFESTYLE'
      ],
      correctAnswer: 0,
      explanation: `This article belongs to the ${article.category} category based on its content and relevance.`,
      difficulty: 'EASY'
    });

    // Question Type 3: Source and Publication
    questions.push({
      id: `q_${articleIndex}_3`,
      question: `Which news organization published this article?`,
      options: [
        article.source,
        'BBC World News',
        'Reuters News Agency',
        'Associated Press'
      ],
      correctAnswer: 0,
      explanation: `The article was published by ${article.source}.`,
      difficulty: 'EASY'
    });

    // Question Type 4: Content Understanding
    if (contentSentences.length > 0) {
      questions.push({
        id: `q_${articleIndex}_4`,
        question: `What key detail is mentioned in the article?`,
        options: [
          contentSentences[0].trim().substring(0, 100),
          `Information about a different event`,
          `Irrelevant historical facts`,
          `Personal opinions unrelated to the news`
        ],
        correctAnswer: 0,
        explanation: `The article mentions: ${contentSentences[0].trim()}`,
        difficulty: 'MEDIUM'
      });
    }

    // Question Type 5: Impact Analysis
    questions.push({
      id: `q_${articleIndex}_5`,
      question: `What would be a likely impact or consequence of this news?`,
      options: [
        this.generateImpactStatement(article),
        `No significant changes expected`,
        `Negative impact on all sectors`,
        `Only affects international relations`
      ],
      correctAnswer: 0,
      explanation: `Based on the article's context, this impact is likely.`,
      difficulty: 'MEDIUM'
    });

    return questions;
  }

  // Generate impact statement based on category
  private static generateImpactStatement(article: NewsArticle): string {
    const impacts: { [key: string]: string } = {
      'POLITICS': `Changes in governance policies and political landscape`,
      'BUSINESS': `Effects on market conditions and economic indicators`,
      'TECHNOLOGY': `Advancement in technological capabilities and innovation`,
      'SCIENCE': `Progress in scientific understanding and research`,
      'ENVIRONMENT': `Implications for environmental protection and climate`,
      'SPORTS': `Impact on athletic performance and sports industry`,
      'INTERNATIONAL': `Influence on global relations and international diplomacy`,
      'NATIONAL': `Effects on national development and domestic affairs`
    };
    return impacts[article.category] || `Significant impact on related sectors`;
  }

  // Get alternative category
  private static getAlternateCategory(currentCategory: string): string {
    const categories = ['POLITICS', 'BUSINESS', 'TECHNOLOGY', 'SCIENCE', 'ENVIRONMENT', 'SPORTS', 'INTERNATIONAL', 'NATIONAL'];
    return categories.find(c => c !== currentCategory) || 'OTHER';
  }

  // Select and shuffle questions to reach target count
  private static selectAndShuffleQuestions(pool: MCQQuestion[], targetCount: number): MCQQuestion[] {
    const shuffled = [...pool].sort(() => Math.random() - 0.5);
    return shuffled.slice(0, Math.min(targetCount, shuffled.length));
  }

  // Create a daily MCQ test
  static createDailyTest(articles: NewsArticle[]): DailyMCQTest {
    const questions = this.generate30MCQs(articles);
    const today = new Date().toISOString().split('T')[0];

    const categories = Array.from(
      new Set(articles.map(a => a.category))
    );

    return {
      date: today,
      questions,
      totalQuestions: questions.length,
      difficulty: 'MIXED',
      passingScore: 60,
      categories
    };
  }

  // Score the test
  static scoreTest(answers: { questionId: string; selectedAnswer: number }[], questions: MCQQuestion[]): { score: number; percentage: number; passed: boolean; details: any[] } {
    let correctCount = 0;
    const details: any[] = [];

    answers.forEach(answer => {
      const question = questions.find(q => q.id === answer.questionId);
      if (question) {
        const isCorrect = answer.selectedAnswer === question.correctAnswer;
        if (isCorrect) correctCount++;
        details.push({
          questionId: answer.questionId,
          isCorrect,
          userAnswer: answer.selectedAnswer,
          correctAnswer: question.correctAnswer,
          explanation: question.explanation
        });
      }
    });

    const percentage = Math.round((correctCount / answers.length) * 100);
    return {
      score: correctCount,
      percentage,
      passed: percentage >= 60,
      details
    };
  }
}

export default MCQGenerator;
