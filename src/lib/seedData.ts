import { DailyAnalysis, DailyQuiz } from '@/types/news';

export const sampleAnalysis: DailyAnalysis = {
  date: new Date().toISOString().split('T')[0],
  topics: [
    {
      id: 'topic-1',
      title: { hi: 'भारत-मध्य पूर्व-यूरोप आर्थिक गलियारा (IMEC)', en: 'India-Middle East-Europe Economic Corridor (IMEC)' },
      category: { hi: 'अंतर्राष्ट्रीय संबंध', en: 'International Relations' },
      categoryKey: 'international-relations',
      summary: { 
        hi: 'G20 शिखर सम्मेलन के दौरान घोषित एक ऐतिहासिक कनेक्टिविटी परियोजना।', 
        en: 'A landmark connectivity project announced during the G20 Summit.' 
      },
      source: 'PIB & News',
      subtopics: [
        {
          title: { hi: 'परियोजना का महत्व', en: 'Significance of the Project' },
          content: { 
            hi: 'यह चीन के BRI का विकल्प प्रदान करेगा और व्यापार समय को 40% तक कम कर देगा।', 
            en: 'It will provide an alternative to China\'s BRI and reduce trade time by 40%.' 
          },
          keyPoints: [
            { hi: 'रेल और पोर्ट कनेक्टिविटी', en: 'Rail and Port connectivity' },
            { hi: 'ग्रीन हाइड्रोजन पाइपलाइन', en: 'Green hydrogen pipelines' }
          ],
          examRelevance: { hi: 'UPSC GS Paper 2 (IR)', en: 'UPSC GS Paper 2 (IR)' }
        }
      ]
    },
    {
      id: 'topic-2',
      title: { hi: 'बिहार जाति आधारित गणना 2023', en: 'Bihar Caste-based Survey 2023' },
      category: { hi: 'सामाजिक न्याय', en: 'Social Justice' },
      categoryKey: 'social-justice',
      summary: { 
        hi: 'बिहार सरकार द्वारा जारी किए गए आंकड़ों का विस्तृत विश्लेषण।', 
        en: 'Detailed analysis of metadata released by the Bihar government.' 
      },
      source: 'Patna Daily',
      subtopics: [
        {
          title: { hi: 'प्रमुख निष्कर्ष', en: 'Key Findings' },
          content: { 
            hi: 'अत्यंत पिछड़ा वर्ग (EBC) और अन्य पिछड़ा वर्ग (OBC) मिलकर राज्य की आबादी का 63% हिस्सा हैं।', 
            en: 'EBC and OBC combined make up 63% of the state\'s population.' 
          },
          keyPoints: [
            { hi: 'आरक्षण नीतियों पर प्रभाव', en: 'Impact on reservation policies' },
            { hi: 'EBC की 36% भागीदारी', en: '36% share of EBC' }
          ],
          examRelevance: { hi: 'BPSC GS Paper 1 & 2', en: 'BPSC GS Paper 1 & 2' }
        }
      ]
    }
  ]
};

export const sampleQuiz: DailyQuiz = {
  date: new Date().toISOString().split('T')[0],
  questions: [
    {
      id: 'q1',
      question: { hi: 'IMEC में कौन सा देश शामिल नहीं है?', en: 'Which country is not part of IMEC?' },
      options: [
        { hi: 'भारत', en: 'India' },
        { hi: 'सऊदी अरब', en: 'Saudi Arabia' },
        { hi: 'चीन', en: 'China' },
        { hi: 'अमेरिका', en: 'USA' }
      ],
      correctIndex: 2,
      explanation: { hi: 'चीन IMEC का हिस्सा नहीं है, यह परियोजना BRI के विकल्प के रूप में देखी जा रही है।', en: 'China is not part of IMEC; the project is seen as an alternative to BRI.' },
      topicRef: 'topic-1'
    }
  ]
};
