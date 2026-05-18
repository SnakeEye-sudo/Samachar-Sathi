#!/usr/bin/env node
/**
 * COMPREHENSIVE NEWS SCRAPER - KEYWORD ENGINE MODE (NO-API)
 * Aligned with 14 GS-Segments for UPSC
 */

import Parser from 'rss-parser';
import fs from 'fs';
import path from 'path';
import { fileURLToPath } from 'url';

const __filename = fileURLToPath(import.meta.url);
const __dirname = path.dirname(__filename);
const parser = new Parser();

// 14 UPSC CATEGORY MAPPING WITH KEYWORDS
const CATEGORY_MAP = [
  { id: 'polity', name: 'GS-II: Constitution & Polity', keys: ['bill', 'act', 'supreme court', 'election', 'parliament', 'judiciary', 'article', 'census', 'governor', 'rajya sabha'] },
  { id: 'ir', name: 'GS-II: International Relations', keys: ['g7', 'g20', 'unsc', 'treaty', 'border', 'diplomacy', 'ambassador', 'indo-pak', 'quad', 'summit', 'israel', 'ukraine'] },
  { id: 'ir', name: 'GS-II: Governance & Social Justice', keys: ['scheme', 'yojana', 'poverty', 'health', 'education', 'csr', 'manual scavenging', 'tribal', 'women safety'] },
  { id: 'economy', name: 'GS-III: Economy', keys: ['gdp', 'rbi', 'inflation', 'budget', 'fiscal', 'monetary', 'stock', 'banking', 'trade', 'msme', 'sebi', 'gst'] },
  { id: 'science', name: 'GS-III: Science & Tech', keys: ['isro', 'nasa', 'satellite', 'ai', '5g', 'biotech', 'robotics', 'cyber', 'missile', 'gslv', 'semiconductor'] },
  { id: 'environment', name: 'GS-III: Environment & Disaster Mgmt', keys: ['climate', 'pollution', 'wildlife', 'cyclone', 'earthquake', 'flood', 'cop28', 'carbon', 'net zero', 'plastic'] },
  { id: 'security', name: 'GS-III: Internal Security', keys: ['insurgency', 'nxal', 'terrorism', 'border security', 'nia', 'drug trafficking', 'cyber attack'] },
  { id: 'history', name: 'GS-I: History & Art Culture', keys: ['museum', 'excavation', 'heritage', 'temple', 'festival', 'history', 'monument', 'indus valley', 'renaissance'] },
  { id: 'geography', name: 'GS-I: Geography', keys: ['monsoon', 'volcano', 'river', 'mineral', 'ocean', 'glacier', 'mountain', 'lithosphere'] },
  { id: 'society', name: 'GS-I: Society', keys: ['caste', 'communal', 'secularism', 'globalization', 'urbanization', 'demography'] },
  { id: 'ethics', name: 'GS-IV: Ethics & Integrity', keys: ['corruption', 'transparency', 'human rights', 'ethics', 'integrity', 'empathy', 'civil services'] },
  { id: 'econ_opt', name: 'Economics Optional Segment', keys: ['macroeconomics', 'keynesian', 'trade theory', 'balance of payments'] },
  { id: 'geo_opt', name: 'Geography Optional Segment', keys: ['geomorphology', 'climatology', 'oceanography', 'biogeography'] },
  { id: 'psir_opt', name: 'PSIR Optional Segment', keys: ['political theory', 'feminism', 'marxism', 'idealism', 'political thinkers'] }
];

const SOURCES = [
  { name: 'PIB (Govt)', url: 'https://pib.gov.in/RssFull.aspx?LangId=1', lang: 'en' },
  { name: 'PIB (Hindi)', url: 'https://pib.gov.in/RssFull.aspx?LangId=2', lang: 'hi' },
  { name: 'The Hindu', url: 'https://www.thehindu.com/news/national/feeder/default.rss', lang: 'en' },
  { name: 'Indian Express', url: 'https://indianexpress.com/section/india/feed/', lang: 'en' },
  { name: 'DownToEarth', url: 'https://www.downtoearth.org.in/rss', lang: 'en' },
  { name: 'ScienceDaily', url: 'https://www.sciencedaily.com/rss/all.xml', lang: 'en' }
];

async function runScraper() {
  console.log('🚀 Starting Samachar-Sathi Smart Keyword Scraper (No-API)...');
  
  const dailyNews = {
    metadata: {
      date: new Date().toISOString().split('T')[0],
      totalArticlesAnalyzed: 0,
      generatedAt: new Date().toISOString(),
      primaryLanguage: 'mixed'
    },
    categories: CATEGORY_MAP.map(c => ({ name: c.name, news: [] }))
  };

  for (const source of SOURCES) {
    try {
      console.log(`📡 Fetching from: ${source.name}...`);
      const feed = await parser.parseURL(source.url);
      
      feed.items.forEach(item => {
        const fullText = (item.title + ' ' + (item.contentSnippet || '')).toLowerCase();
        
        // Find matching UPSC category
        const match = CATEGORY_MAP.find(cat => 
          cat.keys.some(key => fullText.includes(key))
        );

        if (match) {
          const categoryIndex = dailyNews.categories.findIndex(c => c.name === match.name);
          
          const newsUnit = {
            title: source.lang === 'hi' ? { hi: item.title, en: item.title } : { en: item.title, hi: item.title },
            link: item.link,
            source: source.name,
            analysis: {
              en: item.contentSnippet || 'Comprehensive news analysis related to ' + match.name,
              hi: source.lang === 'hi' ? item.contentSnippet : 'UPSC GS-Segment के तहत विस्तृत विश्लेषण।'
            },
            upscContext: {
              relevance: { 
                en: `Relevant for UPSC Mains ${match.name.split(':')[0]} and Prelims.`, 
                hi: `UPSC मुख्य परीक्षा ${match.name.split(':')[0]} और प्रारंभिक परीक्षा के लिए महत्वपूर्ण।`
              },
              staticLinkage: { 
                en: 'Link this news with basic static concepts of ' + match.id.toUpperCase(), 
                hi: 'इस समाचार को ' + match.id.toUpperCase() + ' के बुनियादी वैधानिक अवधारणाओं से जोड़ें।'
              }
            }
          };

          // Limit to 5 high quality items per category to keep it concise
          if (dailyNews.categories[categoryIndex].news.length < 5) {
            dailyNews.categories[categoryIndex].news.push(newsUnit);
            dailyNews.metadata.totalArticlesAnalyzed++;
          }
        }
      });
    } catch (e) {
      console.error(`✗ Error on ${source.name}:`, e.message);
    }
  }

  // Save the output
  const outputDir = path.join(__dirname, '../public/news');
  if (!fs.existsSync(outputDir)) fs.mkdirSync(outputDir, { recursive: true });
  
  const outputPath = path.join(outputDir, `${dailyNews.metadata.date}.json`);
  fs.writeFileSync(outputPath, JSON.stringify(dailyNews, null, 2));
  
  console.log(`\n✅ Mission Accomplished! Data saved to: public/news/${dailyNews.metadata.date}.json`);
}

runScraper();
