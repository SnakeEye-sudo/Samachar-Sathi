import { DailyAnalysis, Topic, SubTopic } from '@/types/news';

/**
 * Smart Parser to convert raw news text into structured Samachar-Sathi topics.
 * This works locally without any API.
 */
export const parseRawNewsText = (text: string, date: string): DailyAnalysis => {
  const lines = text.split('\n').filter(l => l.trim().length > 0);
  const topics: Topic[] = [];
  
  let currentTopic: Partial<Topic> | null = null;
  let currentSubtopics: SubTopic[] = [];

  const createEmptySubtitle = (title: string): SubTopic => ({
    title: { hi: title, en: title },
    content: { hi: '', en: '' },
    keyPoints: [],
    examRelevance: { hi: 'उच्च', en: 'High' }
  });

  lines.forEach((line) => {
    // Detect main topic header (e.g., "1. Topic Name" or "TOPIC: ...")
    if (line.match(/^\d+\.|\bTOPIC:|\bSUBJECT:/i) || (line.length < 80 && line.toUpperCase() === line && line.length > 5)) {
      if (currentTopic) {
        currentTopic.subtopics = currentSubtopics;
        topics.push(currentTopic as Topic);
      }
      
      const cleanTitle = line.replace(/^\d+\.|\bTOPIC:|\bSUBJECT:/i, '').trim();
      currentTopic = {
        id: `topic-${Date.now()}-${topics.length}`,
        title: { hi: cleanTitle, en: cleanTitle },
        category: { hi: 'करेंट अफेयर्स', en: 'Current Affairs' },
        categoryKey: 'current-affairs',
        summary: { hi: 'यह टॉपिक न्यूज़ से ऑटो-पार्स्ड है।', en: 'This topic is auto-parsed from news.' },
        source: 'Auto-Parsed',
      };
      currentSubtopics = [];
    } else if (currentTopic) {
      if (line.length < 120 && !line.includes('.')) {
        currentSubtopics.push(createEmptySubtitle(line));
      } else if (currentSubtopics.length > 0) {
        const last = currentSubtopics[currentSubtopics.length - 1];
        last.content.hi += (last.content.hi ? '\n' : '') + line;
        last.content.en += (last.content.en ? '\n' : '') + line;
      } else {
        currentSubtopics.push(createEmptySubtitle('Details'));
        currentSubtopics[0].content.hi = line;
        currentSubtopics[0].content.en = line;
      }
    }
  });

  if (currentTopic) {
    currentTopic.subtopics = currentSubtopics;
    topics.push(currentTopic as Topic);
  }

  return {
    date,
    topics: topics.length > 0 ? topics : [
      {
        id: 'no-topics',
        title: { hi: 'कोई विषय नहीं मिला', en: 'No topics found' },
        category: { hi: 'त्रुटि', en: 'Error' },
        categoryKey: 'error',
        summary: { hi: 'टेक्स्ट को पार्स नहीं किया जा सका।', en: 'Could not parse text.' },
        source: 'Parser',
        subtopics: [createEmptySubtitle('Help')]
      }
    ]
  };
};
