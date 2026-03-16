// Today's News Data for March 17, 2026
// This will be replaced with real-time scraped data

import { NewsArticle } from './newsService';

export const getTodayNewsData = (): NewsArticle[] => {
  const today = '2026-03-17';
  
  return [
    {
      id: 'news_1_2026_03_17',
      title: 'India Launches Revolutionary Clean Energy Initiative Worth $50 Billion',
      content: 'In a landmark announcement, the Government of India today unveiled a comprehensive clean energy initiative valued at $50 billion. The program aims to achieve carbon neutrality by 2050 through massive investments in solar, wind, and green hydrogen technologies. Prime Minister addressed the nation emphasizing sustainable development. The initiative will create over 5 million jobs in the renewable energy sector. Key focus areas include solar panel manufacturing, wind energy infrastructure, and green hydrogen production facilities across the country. International experts have lauded this move as a significant step towards global climate goals.',
      summary: 'India announces $50B clean energy initiative for carbon neutrality by 2050, creating 5M jobs.',
      source: 'The Hindu',
      category: 'ENVIRONMENT',
      date: today,
      imageUrl: 'https://example.com/clean-energy.jpg',
      url: 'https://thehindu.com/clean-energy-initiative',
      author: 'Rajesh Kumar',
      language: 'en'
    },
    {
      id: 'news_2_2026_03_17',
      title: 'Supreme Court Delivers Historic Verdict on Electoral Reforms',
      content: 'The Supreme Court of India delivered a landmark judgment today mandating electoral reforms. The court ruled that all political parties must disclose complete funding sources within 30 days. This decision comes after years of debate on transparency in political funding. The verdict emphasizes strengthening democratic institutions and ensuring accountability. Legal experts consider this a watershed moment in Indian democracy. The judgment will impact how political parties manage finances and campaign expenditures. Opposition and ruling parties have welcomed the decision.',
      summary: 'Supreme Court mandates complete disclosure of political party funding sources within 30 days.',
      source: 'India Today',
      category: 'POLITICS',
      date: today,
      url: 'https://indiatoday.in/electoral-reforms',
      author: 'Priya Sharma',
      language: 'en'
    },
    {
      id: 'news_3_2026_03_17',
      title: 'Sensex Surges 1200 Points on Strong Economic Indicators',
      content: 'The BSE Sensex witnessed a massive rally today, surging 1200 points to close at an all-time high. Strong GDP growth projections and positive corporate earnings drove the market sentiment. Banking and IT stocks led the gains with significant buying from domestic institutional investors. Market analysts attribute the rally to improved macroeconomic fundamentals and foreign investment inflows. The Nifty 50 also gained 350 points. Experts suggest sustained growth momentum in coming quarters based on economic reforms and infrastructure spending.',
      summary: 'Sensex gains 1200 points to hit record high driven by strong economic indicators and corporate earnings.',
      source: 'Economic Times',
      category: 'BUSINESS',
      date: today,
      url: 'https://economictimes.com/sensex-surge',
      author: 'Amit Verma',
      language: 'en'
    },
    {
      id: 'news_4_2026_03_17',
      title: 'ISRO Successfully Tests Quantum Communication Satellite',
      content: 'Indian Space Research Organisation (ISRO) successfully tested quantum communication technology using its latest satellite. This breakthrough positions India among elite nations in quantum technology. The satellite demonstrated secure quantum key distribution over 2000 kilometers. Scientists achieved data transmission rates exceeding expectations. This technology will revolutionize secure communications for defense and civilian applications. ISRO plans to launch a dedicated quantum satellite constellation by 2028. International space agencies have expressed interest in collaboration.',
      summary: 'ISRO tests quantum communication satellite, positioning India as quantum technology leader.',
      source: 'The Times of India',
      category: 'SCIENCE',
      date: today,
      url: 'https://timesofindia.com/isro-quantum',
      author: 'Dr. Anjali Menon',
      language: 'en'
    },
    {
      id: 'news_5_2026_03_17',
      title: 'India Wins Cricket World Cup in Thrilling Final Against Australia',
      content: 'Team India clinched the Cricket World Cup title in a nail-biting final against Australia. Chasing a target of 320 runs, India won by 3 wickets with just 2 balls remaining. Captain Rohit Sharma scored a magnificent century while young sensation Shubman Gill contributed 85 runs. The victory marks India\'s third World Cup triumph. Celebrations erupted across the nation as millions watched the historic match. Cricket legends praised the team\'s performance and temperament under pressure. This win establishes India\'s dominance in world cricket.',
      summary: 'India defeats Australia in thrilling World Cup final, securing third title with 3-wicket victory.',
      source: 'ESPN Cricinfo',
      category: 'SPORTS',
      date: today,
      url: 'https://espncricinfo.com/world-cup-final',
      author: 'Sanjay Manjrekar',
      language: 'en'
    },
    {
      id: 'news_6_2026_03_17',
      title: 'UN Announces Major Climate Agreement at Global Summit',
      content: 'World leaders reached a comprehensive climate agreement at the United Nations Global Climate Summit. The pact includes binding commitments from 195 countries to reduce carbon emissions by 60% by 2040. Developed nations pledged $200 billion annually to support developing countries in climate adaptation. The agreement establishes stringent monitoring mechanisms and penalties for non-compliance. Environmental activists welcomed the deal as unprecedented. The summit addressed ocean conservation, deforestation, and renewable energy transition. Implementation begins immediately with quarterly progress reviews.',
      summary: 'UN secures historic climate agreement with 195 nations committing to 60% emission cuts by 2040.',
      source: 'Reuters',
      category: 'INTERNATIONAL',
      date: today,
      url: 'https://reuters.com/un-climate-agreement',
      author: 'Sarah Johnson',
      language: 'en'
    },
    {
      id: 'news_7_2026_03_17',
      title: 'Digital India Initiative Reaches 1 Billion Active Users',
      content: 'The Digital India initiative crossed a historic milestone with 1 billion active users across various government platforms. The achievement demonstrates India\'s digital transformation success. Key platforms include Aadhaar, UPI, DigiLocker, and e-governance portals. Digital transactions exceeded $2 trillion annually. Rural areas witnessed 400% growth in digital adoption over past three years. The government plans to enhance digital infrastructure in remote regions. Cybersecurity measures have been strengthened to protect user data. International organizations study India\'s digital public infrastructure model.',
      summary: 'Digital India hits 1 billion users milestone, showcasing successful digital transformation.',
      source: 'Hindustan Times',
      category: 'TECHNOLOGY',
      date: today,
      url: 'https://hindustantimes.com/digital-india',
      author: 'Kavita Reddy',
      language: 'en'
    },
    {
      id: 'news_8_2026_03_17',
      title: 'New Education Policy Shows 95% Enrollment in Higher Education',
      content: 'The National Education Policy 2020 has achieved remarkable success with 95% enrollment rate in higher education. The policy emphasized skill development, vocational training, and multidisciplinary learning. Over 50,000 new colleges and universities were established nationwide. Digital learning platforms reached 500 million students. The gross enrollment ratio improved significantly across all demographics. Research and innovation funding increased by 300%. International collaborations expanded with top global universities. Education quality indicators show substantial improvement in teaching standards.',
      summary: 'NEP 2020 achieves 95% higher education enrollment with 50,000 new institutions established.',
      source: 'Indian Express',
      category: 'NATIONAL',
      date: today,
      url: 'https://indianexpress.com/education-policy',
      author: 'Prof. Ramesh Iyer',
      language: 'en'
    }
  ];
};

export default getTodayNewsData;
