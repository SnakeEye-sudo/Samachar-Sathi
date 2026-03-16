#!/usr/bin/env node
/**
 * COMPREHENSIVE NEWS SCRAPER FOR UPSC/BPSC
 * Scrapes news from 20+ sources and generates detailed analysis
 * Author: Er. Sangam Krishna
 */

import { GoogleGenerativeAI } from '@google/generative-ai';
import Parser from 'rss-parser';
import fs from 'fs';
import path from 'path';
import { fileURLToPath } from 'url';
import dotenv from 'dotenv';

dotenv.config();

const __filename = fileURLToPath(import.meta.url);
const __dirname = path.dirname(__filename);
const genAI = new GoogleGenerativeAI(process.env.GEMINI_API_KEY);
const parser = new Parser();

// COMPREHENSIVE NEWS SOURCES - 25+ RSS FEEDS
const NEWS_SOURCES = [
  // Government & Official
  { name: 'PIB India', url: 'https://pib.gov.in/RssFull.aspx?LangId=1', category: 'GOVT' },
  
  // National News
  { name: 'The Hindu - National', url: 'https://www.thehindu.com/news/national/feeder/default.rss', category: 'NATIONAL' },
  { name: 'Times of India', url: 'https://timesofindia.indiatimes.com/rssfeedstopstories.cms', category: 'NATIONAL' },
  { name: 'Indian Express', url: 'https://indianexpress.com/section/india/feed/', category: 'NATIONAL' },
  { name: 'NDTV India', url: 'https://feeds.feedburner.com/ndtv/Ljqd', category: 'NATIONAL' },
  
  // International
  { name: 'The Hindu - World', url: 'https://www.thehindu.com/news/international/feeder/default.rss', category: 'INTERNATIONAL' },
  { name: 'BBC News - World', url: 'http://feeds.bbci.co.uk/news/world/rss.xml', category: 'INTERNATIONAL' },
  { name: 'Reuters', url: 'https://www.reutersagency.com/feed/', category: 'INTERNATIONAL' },
  { name: 'Al Jazeera', url: 'https://www.aljazeera.com/xml/rss/all.xml', category: 'INTERNATIONAL' },
  
  // Economy & Business
  { name: 'Economic Times', url: 'https://economictimes.indiatimes.com/news/economy/rssfeedmsid-12865516.cms', category: 'ECONOMY' },
  { name: 'Business Standard', url: 'https://www.business-standard.com/rss/home_page_top_stories.rss', category: 'ECONOMY' },
  { name: 'Mint', url: 'https://www.livemint.com/rss/news', category: 'ECONOMY' },
  
  // Science & Technology  
  { name: 'The Hindu - Sci-Tech', url: 'https://www.thehindu.com/sci-tech/science/feeder/default.rss', category: 'SCIENCE' },
  { name: 'ISRO', url: 'https://www.isro.gov.in/rss.xml', category: 'SCIENCE' },
  
  // Environment
  { name: 'Down To Earth', url: 'https://www.downtoearth.org.in/rss', category: 'ENVIRONMENT' },
  { name: 'The Hindu - Environment', url: 'https://www.thehindu.com/sci-tech/energy-and-environment/feeder/default.rss', category: 'ENVIRONMENT' },
  
  // Governance & Polity
  { name: 'Live Law', url: 'https://www.livelaw.in/xml/lawfirm.xml', category: 'POLITY' },
  { name: 'The Wire', url: 'https://thewire.in/feed', category: 'POLITY' },
  
  // Security & Defense
  { name: 'The Hindu - Defence', url: 'https://www.thehindu.com/news/national/feeder/default.rss', category: 'SECURITY' },
];

console.log('\n🚀 COMPREHENSIVE NEWS ANALYSIS SYSTEM FOR UPSC/BPSC');
console.log('📅 Date:', new Date().toISOString().split('T')[0]);
console.log('━'.repeat(60));

async function fetchAllNews() {
  console.log('\n📰 Fetching news from 20+ sources...');
  const allArticles = [];
  let successCount = 0;
  
  for (const source of NEWS_SOURCES) {
    try {
      console.log(`   Fetching: ${source.name}...`);
      const feed = await parser.parseURL(source.url);
      
      const articles = feed.items.slice(0, 10).map(item => ({
        title: item.title?.trim(),
        content: (item.contentSnippet || item.content || item.description || '').substring(0, 500),
        link: item.link,
        pubDate: item.pubDate || item.isoDate,
        source: source.name,
        category: source.category
      })).filter(a => a.title && a.content);
      
      allArticles.push(...articles);
      successCount++;
      console.log(`   ✓ ${source.name}: ${articles.length} articles`);
      
    } catch (error) {
      console.log(`   ✗ ${source.name}: Failed`);
    }
  }
  
  console.log(`\n✅ Successfully fetched from ${successCount}/${NEWS_SOURCES.length} sources`);
  console.log(`📊 Total articles collected: ${allArticles.length}`);
  
  // Remove duplicates by title
  const unique = Array.from(new Map(allArticles.map(a => [a.title, a])).values());
  console.log(`🔍 Unique articles after deduplication: ${unique.length}`);
  
  return unique;
}

async function generateComprehensiveAnalysis(articles) {
  console.log('\n🤖 Generating COMPREHENSIVE analysis with Gemini 2.0 Flash...');
  
  const model = genAI.getGenerativeModel({ 
    model: 'gemini-2.0-flash-exp',
    generationConfig: {
      temperature: 0.3,
      topK: 40,
      topP: 0.95,
    }
  });
  
  const prompt = `
You are an EXPERT UPSC/BPSC MENTOR creating COMPREHENSIVE daily news analysis.

📰 TODAY'S NEWS DATA (${articles.length} articles from 20+ sources):
${JSON.stringify(articles, null, 2)}

🎯 YOUR TASK:
Create an EXHAUSTIVE daily news analysis covering ALL important topics. DO NOT limit to just 2-3 topics.

📋 REQUIREMENTS:

1. TOPIC SELECTION:
   - Select 10-15 MOST IMPORTANT topics (not just 2-3!)
   - Cover ALL categories: Polity, Economy, International Relations, Science-Tech, Environment, Security, Social Issues
   - Each topic MUST be exam-relevant

2. FOR EACH TOPIC:
   ✅ Title (Hindi + English)
   ✅ Category classification
   ✅ Detailed Summary (200-300 words)
   ✅ 5-8 Subtopics with:
      - Title
      - Content (150-200 words each)
      - Key Points (5-7 bullet points)
      - Exam Relevance (which GS paper, prelims/mains)
   ✅ Source attribution

3. MCQ GENERATION:
   - Create exactly 30 HIGH-QUALITY MCQs
   - Mix of factual, analytical, and application-based questions
   - Difficulty: 40% easy, 40% medium, 20% hard
   - Each MCQ MUST have:
     * Question (Hindi + English)
     * 4 options (Hindi + English)
     * Correct answer index
     * Detailed explanation (Hindi + English)
     * Topic reference

4. BILINGUAL:
   - ALL content in BOTH Hindi AND English
   - Professional academic language

⚠️ CRITICAL INSTRUCTIONS:
- ANALYZE ALL ${articles.length} articles thoroughly
- Cover MINIMUM 10 topics, MAXIMUM 15
- Each topic = 1000+ words of detailed analysis
- NO generic content - use SPECIFIC facts from today's news
- DO NOT stop at 2-3 topics!

📤 OUTPUT FORMAT (STRICT JSON):
{
  "metadata": {
    "date": "${new Date().toISOString().split('T')[0]}",
    "totalTopics": number,
    "totalArticlesAnalyzed": ${articles.length},
    "categories": ["POLITY", "ECONOMY", ...]
  },
  "analysis": {
    "topics": [
      {
        "id": "T1",
        "title": { "hi": "...", "en": "..." },
        "category": "POLITY|ECONOMY|INTERNATIONAL|SCIENCE|ENVIRONMENT|SECURITY|SOCIAL",
        "summary": { "hi": "...", "en": "..." },
        "source": "The Hindu",
        "importance": "HIGH|MEDIUM|LOW",
        "subtopics": [
          {
            "title": { "hi": "...", "en": "..." },
            "content": { "hi": "...", "en": "..." },
            "keyPoints": [
              { "hi": "...", "en": "..." }
            ],
            "examRelevance": { 
              "hi": "...", 
              "en": "...",
              "gsPaper": "GS1|GS2|GS3|GS4",
              "examType": "PRELIMS|MAINS|BOTH"
            }
          }
        ]
      }
    ]
  },
  "mcqs": {
    "questions": [
      {
        "id": "Q1",
        "question": { "hi": "...", "en": "..." },
        "options": [
          { "hi": "...", "en": "..." }
        ],
        "correctIndex": 0,
        "explanation": { "hi": "...", "en": "..." },
        "difficulty": "EASY|MEDIUM|HARD",
        "topicRef": "T1"
      }
    ]
  }
}

⚠️ RETURN ONLY VALID JSON. NO MARKDOWN. NO BACKTICKS.
`;

  console.log('   Requesting comprehensive analysis from Gemini...');
  const result = await model.generateContent(prompt);
  const response = await result.response;
  let text = response.text();
  
  // Clean markdown if present
  text = text.replace(/```json/g, '').replace(/```/g, '').trim();
  
  try {
    const data = JSON.parse(text);
    console.log(`\n✅ Analysis generated successfully!`);
    console.log(`   📑 Topics covered: ${data.analysis.topics.length}`);
    console.log(`   ❓ MCQs generated: ${data.mcqs.questions.length}`);
    return data;
  } catch (e) {
    console.error('❌ JSON parsing failed!');
    console.error('Raw response:', text.substring(0, 500));
    throw e;
  }
}

async function saveAnalysis(data) {
  const date = data.metadata.date;
  const outputDir = path.join(__dirname, '../public/news');
  
  if (!fs.existsSync(outputDir)) {
    fs.mkdirSync(outputDir, { recursive: true });
  }
  
  const filepath = path.join(outputDir, `${date}.json`);
  fs.writeFileSync(filepath, JSON.stringify(data, null, 2), 'utf8');
  
  console.log(`\n💾 Analysis saved: public/news/${date}.json`);
  console.log(`📊 File size: ${(fs.statSync(filepath).size / 1024).toFixed(2)} KB`);
  
  return filepath;
}

async function main() {
  try {
    const startTime = Date.now();
    
    // Step 1: Fetch news
    const articles = await fetchAllNews();
    
    if (articles.length === 0) {
      console.log('\n⚠️  No articles found. Exiting.');
      return;
    }
    
    // Step 2: Generate analysis
    const analysis = await generateComprehensiveAnalysis(articles);
    
    // Step 3: Save to file
    await saveAnalysis(analysis);
    
    const duration = ((Date.now() - startTime) / 1000).toFixed(2);
    console.log(`\n${'━'.repeat(60)}`);
    console.log(`✅ PROCESS COMPLETE IN ${duration}s`);
    console.log(`📚 Topics: ${analysis.analysis.topics.length}`);
    console.log(`❓ MCQs: ${analysis.mcqs.questions.length}`);
    console.log(`🎯 Ready for UPSC/BPSC aspirants!`);
    console.log('━'.repeat(60) + '\n');
    
  } catch (error) {
    console.error('\n❌ ERROR:', error.message);
    console.error(error.stack);
    process.exit(1);
  }
}

main();
