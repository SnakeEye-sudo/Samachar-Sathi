
import { DailyAnalysis, DailyQuiz } from '@/types/news';

export const getMegaAnalysis = (date: string): DailyAnalysis => ({
  date,
  topics: [
    {
      id: 'fed-001',
      category: { hi: 'सामान्य अध्ययन-II (प्रशासन और राजनीति)', en: 'General Studies-II (Governance & Polity)' },
      categoryKey: 'GS2',
      title: { 
        hi: 'भारत में सहकारी संघवाद: चुनौतियां और भविष्य की राह', 
        en: 'Cooperative Federalism in India: Challenges and the Path Ahead' 
      },
      summary: {
        hi: 'यह लेख भारत के संघीय ढांचे के बदलते स्वरूप का विश्लेषण करता है, जिसमें नीति आयोग की भूमिका और अंतर-राज्यीय विवादों पर विशेष जोर दिया गया है।',
        en: 'This article analyzes the evolving nature of Indias federal structure, emphasizing the role of NITI Aayog and inter-state disputes.'
      },
      source: 'The Hindu & Indian Express Editorial',
      subtopics: [
        {
          title: { hi: 'ऐतिहासिक पृष्ठभूमि और संवैधानिक प्रावधान', en: 'Historical Background and Constitutional Provisions' },
          content: {
            hi: 'भारतीय संविधान का अनुच्छेद 1 भारत को "राज्यों का संघ" घोषित करता है। भारतीय संघवाद "विनाशकारी राज्यों के अविनाशी संघ" के रूप में जाना जाता है। सातवीं अनुसूची शक्तियों के पृथक्करण का मूल आधार है।',
            en: 'Article 1 of the Indian Constitution declares India as a "Union of States". Indian federalism is known as an "Indestructible Union of destructible states". The Seventh Schedule is the core basis for the separation of powers.'
          },
          keyPoints: [
            { hi: 'अनुच्छेद 263: अंतर-राज्य परिषद।', en: 'Article 263: Inter-State Council.' },
            { hi: 'अवशिष्ट शक्तियाँ केंद्र के पास हैं।', en: 'Residuary powers rest with the Centre.' }
          ],
          examRelevance: { 
            hi: 'UPSC Mains GS-II: संघीय ढांचा और संघवाद।', 
            en: 'UPSC Mains GS-II: Federal Structure and Federalism.' 
          }
        },
        {
          title: { hi: 'सहकारी बनाम प्रतिस्पर्धी संघवाद', en: 'Cooperative vs. Competitive Federalism' },
          content: {
            hi: 'सहकारी संघवाद में केंद्र और राज्य मिलकर राष्ट्रीय लक्ष्यों को प्राप्त करते हैं, जबकि प्रतिस्पर्धी संघवाद में राज्य निवेश और विकास के लिए एक-दूसरे से प्रतिस्पर्धा करते हैं।',
            en: 'In Cooperative Federalism, the Centre and States work together to achieve national goals, whereas in Competitive Federalism, states compete with each other for investment and development.'
          },
          keyPoints: [
            { hi: 'नीति आयोग (NITI Aayog) दोनों को बढ़ावा देता है।', en: 'NITI Aayog promotes both.' },
            { hi: 'GST परिषद सहकारी संघवाद का बेहतरीन उदाहरण है।', en: 'GST Council is a prime example of cooperative federalism.' }
          ],
          examRelevance: { hi: 'UPSC Prelims & Mains GS-II।', en: 'UPSC Prelims & Mains GS-II.' }
        }
      ]
    },
    {
      id: 'eco-002',
      category: { hi: 'सामान्य अध्ययन-III (अर्थव्यवस्था)', en: 'General Studies-III (Economy)' },
      categoryKey: 'GS3',
      title: { 
        hi: 'भारत में डिजिटल मुद्रा (e-Rupee): क्रांति की ओर कदम', 
        en: 'Central Bank Digital Currency (CBDC) in India: A Step Towards Revolution' 
      },
      summary: {
        hi: 'RBI द्वारा शुरू की गई डिजिटल मुद्रा (e-Rupee) भारत की वित्तीय प्रणाली को कैसे प्रभावित करेगी, इसका विस्तृत विश्लेषण।',
        en: 'Detailed analysis of how the Central Bank Digital Currency (CBDC) introduced by RBI will impact Indias financial system.'
      },
      source: 'RBI Annual Report & Business Standard',
      subtopics: [
        {
          title: { hi: 'CBDC क्या है?', en: 'What is CBDC?' },
          content: {
            hi: 'सेंट्रल बैंक डिजिटल करेंसी (CBDC) एक डिजिटल टोकन है जो देश की आधिकारिक मुद्रा का डिजिटल रूप है। यह क्रिप्टोकरेंसी से अलग है क्योंकि यह RBI द्वारा विनियमित है।',
            en: 'Central Bank Digital Currency (CBDC) is a digital token that represents the digital form of a countrys official currency. It differs from cryptocurrency as it is regulated by the RBI.'
          },
          keyPoints: [
            { hi: 'Phased implementation: Retail and Wholesale.', en: 'Phased implementation: Retail and Wholesale.' },
            { hi: 'नोडल बैंक सुरक्षित लेनदेन सुनिश्चित करते हैं।', en: 'Nodal banks ensure secure transactions.' }
          ],
          examRelevance: { hi: 'GS-III: समावेशी विकास और बैंकिंग।', en: 'GS-III: Inclusive Growth and Banking.' }
        }
      ]
    }
  ]
});

export const getMegaQuiz = (date: string): DailyQuiz => ({
  date,
  questions: Array.from({ length: 30 }, (_, i) => ({
    id: `q-${i + 1}`,
    question: { 
      hi: `${i + 1}. भारतीय संविधान का कौन सा अनुच्छेद भारत को "राज्यों का संघ" कहता है?`, 
      en: `${i + 1}. Which Article of the Indian Constitution calls India a "Union of States"?` 
    },
    options: [
      { hi: 'अनुच्छेद 1', en: 'Article 1' },
      { hi: 'अनुच्छेद 2', en: 'Article 2' },
      { hi: 'अनुच्छेद 3', en: 'Article 3' },
      { hi: 'अनुच्छेद 4', en: 'Article 4' }
    ],
    correctIndex: 0,
    explanation: {
      hi: 'अनुच्छेद 1 स्पष्ट रूप से कहता है कि भारत, जो कि इंडिया है, राज्यों का एक संघ होगा।',
      en: 'Article 1 clearly states that India, which is Bharat, shall be a Union of States.'
    },
    topicRef: 'fed-001'
  }))
});
