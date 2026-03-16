const { GoogleGenerativeAI } = require("@google/generative-ai");
const fs = require("fs");
const path = require("path");
const Parser = require("rss-parser");
require("dotenv").config();

const genAI = new GoogleGenerativeAI(process.env.GEMINI_API_KEY);
const parser = new Parser();

async function fetchNews() {
  try {
    // PIB English News Feed
    const feed = await parser.parseURL("https://pib.gov.in/RssFull.aspx?LangId=1");
    // Filter top 5 news items
    return feed.items.slice(0, 8).map(item => ({
      title: item.title,
      link: item.link,
      content: item.contentSnippet || item.content
    }));
  } catch (error) {
    console.error("Error fetching news:", error);
    return [];
  }
}

async function generateAnalysis(newsItems) {
  const model = genAI.getGenerativeModel({ model: "gemini-1.5-flash" });

  const prompt = `
    You are Samachar-Sathi AI, an expert UPSC & BPSC mentor.
    Based on the following news items from PIB, create a comprehensive daily analysis and a quiz.
    
    NEWS ITEMS:
    ${JSON.stringify(newsItems)}

    OUTPUT FORMAT:
    Produce a JSON object matching these TypeScript types:
    
    interface Topic {
      id: string;
      title: { hi: string; en: string };
      category: { hi: string; en: string };
      categoryKey: string; // use kebab-case like 'international-relations', 'polity', 'economy', etc.
      subtopics: {
        title: { hi: string; en: string };
        content: { hi: string; en: string };
        keyPoints: { hi: string; en: string }[];
        examRelevance: { hi: string; en: string };
      }[];
      summary: { hi: string; en: string };
      source: string;
    }

    interface DailyAnalysis {
      date: string; // YYYY-MM-DD
      topics: Topic[];
    }

    interface DailyQuiz {
      date: string;
      questions: {
        id: string;
        question: { hi: string; en: string };
        options: { hi: string; en: string }[];
        correctIndex: number;
        explanation: { hi: string; en: string };
        topicRef: string; // id of the topic
      }[];
    }

    Return a combined object: { analysis: DailyAnalysis, quiz: DailyQuiz }
    
    CRITICAL RULES:
    1. Language: Provide content in both Hindi (hi) and English (en).
    2. Quality: Content must be highly relevant for UPSC/BPSC GS papers.
    3. Quiz: Create 5 challenging MCQs based on the topics.
    4. Date: Use today's date (${new Date().toISOString().split('T')[0]}).
    5. ONLY return the JSON object, no Markdown wrapping or extra text.
  `;

  const result = await model.generateContent(prompt);
  const response = await result.response;
  let text = response.text();
  
  // Clean potential markdown wrapping
  text = text.replace(/```json/g, "").replace(/```/g, "").trim();
  
  return JSON.parse(text);
}

async function run() {
  console.log("Fetching news...");
  const news = await fetchNews();
  if (news.length === 0) {
    console.log("No news found.");
    return;
  }

  console.log("Generating analysis with Gemini...");
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

  console.log(`Successfully generated analysis for ${date}`);
}

run().catch(console.error);
