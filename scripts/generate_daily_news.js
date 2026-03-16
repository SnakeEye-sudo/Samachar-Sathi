import { GoogleGenerativeAI } from "@google/generative-ai";
import fs from "fs";
import path from "path";
import { fileURLToPath } from 'url';
import Parser from "rss-parser";
import dotenv from "dotenv";

dotenv.config();

const __filename = fileURLToPath(import.meta.url);
const __dirname = path.dirname(__filename);

const genAI = new GoogleGenerativeAI(process.env.GEMINI_API_KEY);
const parser = new Parser();

const RSS_FEEDS = [
  "https://pib.gov.in/RssFull.aspx?LangId=1",
  "https://www.thehindu.com/news/national/feeder/default.rss",
  "https://www.thehindu.com/news/international/feeder/default.rss",
  "https://economictimes.indiatimes.com/news/economy/rssfeedmsid-12865516.cms"
];

async function fetchNews() {
  const allNews = [];
  for (const url of RSS_FEEDS) {
    try {
      console.log(`Fetching from: ${url}`);
      const feed = await parser.parseURL(url);
      allNews.push(...feed.items.map(item => ({
        title: item.title,
        link: item.link,
        content: item.contentSnippet || item.content,
        source: url.includes("pib") ? "PIB" : "The Hindu/ET"
      })));
    } catch (error) {
      console.error(`Error fetching from ${url}:`, error);
    }
  }
  // Remove duplicates by title
  const uniqueNews = Array.from(new Map(allNews.map(item => [item.title, item])).values());
  return uniqueNews.slice(0, 15); // Top 15 items for context
}

async function generateAnalysis(newsItems) {
  const model = genAI.getGenerativeModel({ model: "gemini-2.0-flash" });

  const prompt = `
    You are Samachar-Sathi AI, an elite senior mentor for UPSC (Union Public Service Commission) and BPSC (Bihar Public Service Commission) aspirants.
    
    TASK:
    Based on the provided news items, create an extremely detailed daily news analysis and a 30-question bank.
    
    NEWS CONTEXT:
    ${JSON.stringify(newsItems)}

    ANALYSIS REQUIREMENTS:
    - Select 4-6 most important topics for Civil Services.
    - For each topic:
        1. Context: Why is it in the news?
        2. Detailed Analysis: Cover historical background, current issues, and forward-looking perspective.
        3. Key Points: Bulleted facts crucial for Prelims.
        4. GS Relevance: Mention specifically which GS Paper (I, II, III, IV) it relates to.
    - All content must be in both HINDI and ENGLISH.
    - Provide a "Magazine Level" depth in the analysis.

    MCQ REQUIREMENTS:
    - Exactly 30 high-quality MCQs.
    - Level: Challenging (Multi-statement questions, matching types).
    - Language: Bilingual (Hindi and English).
    - Source: Based strictly on the analysis provided.

    JSON SCHEMA:
    {
      "analysis": {
        "date": "YYYY-MM-DD",
        "topics": [
          {
            "id": "T1",
            "title": { "hi": "...", "en": "..." },
            "category": { "hi": "...", "en": "..." },
            "categoryKey": "polity | economy | international-relations | science-tech | environment | internal-security | social-issues",
            "summary": { "hi": "...", "en": "..." },
            "source": "...",
            "subtopics": [
              {
                "title": { "hi": "...", "en": "..." },
                "content": { "hi": "...", "en": "..." },
                "keyPoints": [ { "hi": "...", "en": "..." } ],
                "examRelevance": { "hi": "...", "en": "..." }
              }
            ]
          }
        ]
      },
      "mcqs": {
        "date": "YYYY-MM-DD",
        "questions": [
          {
            "id": "Q1",
            "question": { "hi": "...", "en": "..." },
            "options": [ { "hi": "...", "en": "..." } ],
            "correctIndex": number,
            "explanation": { "hi": "...", "en": "..." },
            "topicRef": "T1"
          }
        ]
      }
    }

    CRITICAL:
    1. ONLY return the final JSON. 
    2. No markdown decorators. 
    3. Use the date: ${new Date().toISOString().split('T')[0]}.
    4. Ensure the content is academically rigorous.
  `;

  const result = await model.generateContent(prompt);
  const response = await result.response;
  let text = response.text();
  
  text = text.replace(/```json/g, "").replace(/```/g, "").trim();
  
  try {
    return JSON.parse(text);
  } catch (e) {
    console.error("Failed to parse JSON. Raw text:", text);
    throw e;
  }
}

async function run() {
  console.log("Initializing News Intelligence Process...");
  const news = await fetchNews();
  if (news.length === 0) {
    console.log("No news found to analyze.");
    return;
  }

  console.log("Deep Research & Analysis with Gemini 2.0 Flash...");
  const data = await generateAnalysis(news);

  const date = data.analysis.date;
  const outputDir = path.join(__dirname, "../public/news");
  
  if (!fs.existsSync(outputDir)) {
    fs.mkdirSync(outputDir, { recursive: true });
  }

  fs.writeFileSync(
    path.join(outputDir, `${date}.json`),
    JSON.stringify(data, null, 2)
  );

  console.log(`[SUCCESS] Intelligence Dossier Generated: public/news/${date}.json`);
}

run().catch(console.error);

