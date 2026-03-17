import { DailyNews } from '@/types/news';

export const sampleAnalysis: DailyNews = {
  metadata: {
    date: new Date().toISOString().split('T')[0],
    totalArticlesAnalyzed: 25,
    generatedAt: new Date().toISOString(),
    primaryLanguage: 'en'
  },
  categories: [
    {
      name: 'GS-II: International Relations',
      description: 'Bilateral treaties, international organizations, and diplomatic shifts.',
      news: [
        {
          title: {
            hi: 'भारत-फ्रांस रक्षा सहयोग में विस्तार',
            en: 'India-France Defense Cooperation Expansion'
          },
          link: 'https://pib.gov.in',
          source: 'PIB India',
          analysis: {
            hi: 'भारत और फ्रांस ने अपने रणनीतिक रक्षा साझेदारी को मजबूत करने के लिए नए समझौतों पर हस्ताक्षर किए हैं। इसमें लड़ाकू इंजनों के सह-विकास और हिंद महासागर में समुद्री सहयोग पर ध्यान केंद्रित किया गया है।',
            en: 'India and France have solidified their strategic defense partnership through new agreements focusing on co-development of fighter engine technology and enhanced maritime cooperation in the Indian Ocean region.'
          },
          upscContext: {
            relevance: {
              hi: 'GS-II: द्विपक्षीय संबंधों और रक्षा कूटनीति के लिए महत्वपूर्ण।',
              en: 'GS-II: Bilateral relations, strategic autonomy and defense diplomacy.'
            },
            staticLinkage: {
              hi: 'भारत-फ्रांस रणनीतिक साझेदारी (1998), स्कॉर्पीन पनडुब्बी कार्यक्रम।',
              en: 'India-France Strategic Partnership (1998), Scorpene Submarine program, Rafale deal context.'
            },
            concerns: {
              hi: 'टेक्नोलॉजी ट्रांसफर की चुनौतियां और रक्षा बजट की सीमाएं।',
              en: 'Challenges in high-end tech transfer and defense budget constraints.'
            }
          }
        }
      ]
    },
    {
      name: 'GS-III: Economy',
      description: 'Infrastructure, energy, investment, and planning.',
      news: [
        {
          title: {
            hi: 'भारतीय अर्थव्यवस्था की विकास दर 7% से ऊपर रहने का अनुमान',
            en: 'Indian Economy Projected to Maintain Over 7% Growth'
          },
          link: 'https://www.rbi.org.in',
          source: 'RBI Bulletin',
          analysis: {
            hi: 'आरबीआई के हालिया बुलेटिन के अनुसार, घरेलू मांग और सरकारी बुनियादी ढांचे के खर्च के कारण भारतीय अर्थव्यवस्था वैश्विक चुनौतियों के बावजूद मजबूत बनी हुई है।',
            en: 'According to the latest RBI bulletin, robust domestic demand and government infrastructure spending are driving India\'s economy despite global headwinds.'
          },
          upscContext: {
            relevance: {
              hi: 'GS-III: समावेशी विकास और आर्थिक नियोजन।',
              en: 'GS-III: Inclusive growth and economic planning issues.'
            },
            staticLinkage: {
              hi: 'मौद्रिक नीति, जीडीपी गणना के तरीके, खुदरा मुद्रास्फीति।',
              en: 'Monetary Policy Committee, GDP calculation methods, CPI vs WPI.'
            }
          }
        }
      ]
    },
    { name: 'GS-II: Governance & Social Justice', news: [] },
    { name: 'GS-II: Constitution & Polity', news: [] },
    { name: 'GS-III: Science & Tech', news: [] },
    { name: 'GS-III: Environment & Disaster Mgmt', news: [] },
    { name: 'GS-III: Internal Security', news: [] },
    { name: 'GS-I: History & Art Culture', news: [] },
    { name: 'GS-I: Geography', news: [] },
    { name: 'GS-I: Society', news: [] },
    { name: 'GS-IV: Ethics & Integrity', news: [] },
    { name: 'Economics Optional Segment', news: [] },
    { name: 'Geography Optional Segment', news: [] },
    { name: 'PSIR Optional Segment', news: [] }
  ]
};
