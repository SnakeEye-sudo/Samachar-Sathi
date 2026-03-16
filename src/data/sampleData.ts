import { DailyAnalysis, DailyQuiz } from '@/types/news';

const today = new Date().toISOString().split('T')[0];

export const getSampleAnalysis = (date: string): DailyAnalysis => ({
  date,
  topics: [
    {
      id: '1',
      title: { hi: 'भारत-चीन सीमा विवाद: नई वार्ता और रणनीतिक स्थिति', en: 'India-China Border Dispute: New Talks and Strategic Position' },
      category: { hi: 'अंतर्राष्ट्रीय संबंध', en: 'International Relations' },
      categoryKey: 'international',
      summary: { hi: 'भारत और चीन के बीच LAC पर तनाव कम करने के लिए नई राजनयिक वार्ता शुरू हुई। दोनों देशों ने शांतिपूर्ण समाधान पर सहमति जताई।', en: 'New diplomatic talks initiated between India and China to de-escalate tensions along the LAC. Both nations agreed on peaceful resolution.' },
      source: 'The Hindu, Indian Express',
      subtopics: [
        {
          title: { hi: 'वार्ता की पृष्ठभूमि', en: 'Background of the Talks' },
          content: { hi: 'LAC पर 2020 से जारी गतिरोध के बाद, दोनों देशों ने कूटनीतिक और सैन्य स्तर पर कई दौर की बातचीत की है। इस बार की वार्ता विशेष रूप से महत्वपूर्ण है क्योंकि यह उच्चतम राजनयिक स्तर पर हो रही है। गलवान घाटी, पैंगोंग त्सो, और देपसांग मैदान जैसे संवेदनशील क्षेत्रों में सैनिकों की वापसी पर चर्चा जारी है।', en: 'After the standoff on LAC since 2020, both countries have held multiple rounds of talks at diplomatic and military levels. This round is particularly significant as it is happening at the highest diplomatic level. Discussions continue on troop withdrawal from sensitive areas like Galwan Valley, Pangong Tso, and Depsang Plains.' },
          keyPoints: [
            { hi: '2020 से LAC पर गतिरोध जारी', en: 'Standoff on LAC continuing since 2020' },
            { hi: 'उच्चतम राजनयिक स्तर पर वार्ता', en: 'Talks at highest diplomatic level' },
            { hi: 'गलवान, पैंगोंग, देपसांग पर फोकस', en: 'Focus on Galwan, Pangong, Depsang' },
          ],
          examRelevance: { hi: 'UPSC Prelims & Mains: GS-II (अंतर्राष्ट्रीय संबंध, भारत और पड़ोसी देश)', en: 'UPSC Prelims & Mains: GS-II (International Relations, India and Neighbors)' },
        },
        {
          title: { hi: 'रणनीतिक महत्व', en: 'Strategic Significance' },
          content: { hi: 'इस वार्ता का रणनीतिक महत्व कई स्तरों पर है। पहला, यह QUAD और अन्य बहुपक्षीय मंचों पर भारत की स्थिति को मजबूत करती है। दूसरा, यह हिंद-प्रशांत क्षेत्र में शक्ति संतुलन को प्रभावित करती है। तीसरा, यह द्विपक्षीय व्यापार और आर्थिक संबंधों पर सीधा असर डालती है।', en: 'This dialogue holds strategic significance at multiple levels. First, it strengthens India\'s position on QUAD and other multilateral platforms. Second, it affects the power balance in the Indo-Pacific region. Third, it directly impacts bilateral trade and economic relations.' },
          keyPoints: [
            { hi: 'QUAD में भारत की स्थिति मजबूत', en: 'India\'s position strengthened in QUAD' },
            { hi: 'हिंद-प्रशांत शक्ति संतुलन पर प्रभाव', en: 'Impact on Indo-Pacific power balance' },
            { hi: 'व्यापार और आर्थिक संबंधों पर असर', en: 'Effect on trade and economic relations' },
          ],
          examRelevance: { hi: 'UPSC Mains: GS-II & GS-III (सुरक्षा, भारत की विदेश नीति)', en: 'UPSC Mains: GS-II & GS-III (Security, India\'s Foreign Policy)' },
        },
      ],
    },
    {
      id: '2',
      title: { hi: 'नई शिक्षा नीति 2020: कार्यान्वयन की प्रगति रिपोर्ट', en: 'NEP 2020: Implementation Progress Report' },
      category: { hi: 'शिक्षा एवं सामाजिक मुद्दे', en: 'Education & Social Issues' },
      categoryKey: 'education',
      summary: { hi: 'शिक्षा मंत्रालय ने NEP 2020 के कार्यान्वयन पर नई प्रगति रिपोर्ट जारी की। मातृभाषा में शिक्षा और बहु-विषयक दृष्टिकोण पर जोर।', en: 'Ministry of Education released new progress report on NEP 2020 implementation. Emphasis on mother tongue education and multidisciplinary approach.' },
      source: 'PIB, Hindustan Times',
      subtopics: [
        {
          title: { hi: 'प्रमुख बदलाव और सुधार', en: 'Key Changes and Reforms' },
          content: { hi: '5+3+3+4 संरचना के अनुसार पाठ्यक्रम में बदलाव किए जा रहे हैं। फाउंडेशन स्तर (3-8 वर्ष) पर खेल-आधारित और गतिविधि-आधारित शिक्षा को बढ़ावा दिया जा रहा है। माध्यमिक स्तर पर विषय चयन में लचीलापन लाया गया है। उच्च शिक्षा में अकादमिक बैंक ऑफ क्रेडिट (ABC) की शुरुआत हो चुकी है।', en: 'Curriculum changes being implemented as per 5+3+3+4 structure. Play-based and activity-based learning promoted at Foundation level (3-8 years). Flexibility introduced in subject selection at secondary level. Academic Bank of Credits (ABC) launched in higher education.' },
          keyPoints: [
            { hi: '5+3+3+4 संरचना का कार्यान्वयन', en: '5+3+3+4 structure implementation' },
            { hi: 'खेल-आधारित शिक्षा पर जोर', en: 'Emphasis on play-based learning' },
            { hi: 'अकादमिक बैंक ऑफ क्रेडिट (ABC) लॉन्च', en: 'Academic Bank of Credits (ABC) launched' },
          ],
          examRelevance: { hi: 'UPSC & BPSC: GS-II (शासन, शिक्षा नीति)', en: 'UPSC & BPSC: GS-II (Governance, Education Policy)' },
        },
        {
          title: { hi: 'चुनौतियाँ और समाधान', en: 'Challenges and Solutions' },
          content: { hi: 'ग्रामीण क्षेत्रों में डिजिटल इंफ्रास्ट्रक्चर की कमी एक बड़ी चुनौती है। शिक्षकों के प्रशिक्षण और क्षमता निर्माण पर भी ध्यान देने की जरूरत है। राज्यों के बीच कार्यान्वयन की गति में असमानता दिखाई दे रही है। PM eVidya और DIKSHA जैसे डिजिटल प्लेटफॉर्म इन चुनौतियों को कम करने में सहायक हो रहे हैं।', en: 'Lack of digital infrastructure in rural areas is a major challenge. Teacher training and capacity building also needs attention. Disparity in implementation speed among states is visible. Digital platforms like PM eVidya and DIKSHA are helping address these challenges.' },
          keyPoints: [
            { hi: 'ग्रामीण डिजिटल इंफ्रास्ट्रक्चर की कमी', en: 'Lack of rural digital infrastructure' },
            { hi: 'शिक्षक प्रशिक्षण की आवश्यकता', en: 'Need for teacher training' },
            { hi: 'PM eVidya और DIKSHA की भूमिका', en: 'Role of PM eVidya and DIKSHA' },
          ],
          examRelevance: { hi: 'BPSC: बिहार में शिक्षा सुधार, डिजिटल डिवाइड', en: 'BPSC: Education reforms in Bihar, Digital Divide' },
        },
      ],
    },
    {
      id: '3',
      title: { hi: 'भारतीय अर्थव्यवस्था: GDP वृद्धि दर और मुद्रास्फीति पर अपडेट', en: 'Indian Economy: GDP Growth Rate and Inflation Update' },
      category: { hi: 'अर्थव्यवस्था', en: 'Economy' },
      categoryKey: 'economy',
      summary: { hi: 'RBI ने तिमाही GDP अनुमान जारी किए। मुद्रास्फीति नियंत्रण और विकास दर के बीच संतुलन बनाने की चुनौती।', en: 'RBI released quarterly GDP estimates. Challenge of balancing inflation control with growth rate.' },
      source: 'Economic Times, Mint',
      subtopics: [
        {
          title: { hi: 'GDP वृद्धि दर का विश्लेषण', en: 'GDP Growth Rate Analysis' },
          content: { hi: 'भारत की GDP वृद्धि दर मजबूत बनी हुई है। कृषि, सेवा और विनिर्माण क्षेत्रों के योगदान में बदलाव देखा जा रहा है। सरकार के पूंजीगत व्यय में वृद्धि ने अवसंरचना विकास को गति दी है। PLI योजनाओं का प्रभाव विनिर्माण क्षेत्र पर दिखने लगा है। सेवा क्षेत्र GDP में सबसे बड़ा योगदानकर्ता बना हुआ है।', en: 'India\'s GDP growth rate remains robust. Changes observed in contributions from agriculture, services, and manufacturing sectors. Government\'s increased capital expenditure has accelerated infrastructure development. PLI schemes\' impact is becoming visible in manufacturing sector. Services sector remains the largest contributor to GDP.' },
          keyPoints: [
            { hi: 'मजबूत GDP वृद्धि दर', en: 'Robust GDP growth rate' },
            { hi: 'PLI योजनाओं का सकारात्मक प्रभाव', en: 'Positive impact of PLI schemes' },
            { hi: 'पूंजीगत व्यय में वृद्धि', en: 'Increase in capital expenditure' },
          ],
          examRelevance: { hi: 'UPSC Prelims & Mains: GS-III (भारतीय अर्थव्यवस्था)', en: 'UPSC Prelims & Mains: GS-III (Indian Economy)' },
        },
        {
          title: { hi: 'मुद्रास्फीति और मौद्रिक नीति', en: 'Inflation and Monetary Policy' },
          content: { hi: 'CPI मुद्रास्फीति RBI के लक्ष्य सीमा के भीतर बनी हुई है। खाद्य मुद्रास्फीति में मौसमी उतार-चढ़ाव देखे जा रहे हैं। RBI ने repo rate को स्थिर रखने का निर्णय लिया है। वैश्विक कच्चे तेल की कीमतों का प्रभाव आयातित मुद्रास्फीति पर पड़ रहा है।', en: 'CPI inflation remains within RBI\'s target range. Seasonal fluctuations observed in food inflation. RBI decided to keep repo rate stable. Global crude oil prices affecting imported inflation.' },
          keyPoints: [
            { hi: 'CPI मुद्रास्फीति लक्ष्य सीमा में', en: 'CPI inflation within target range' },
            { hi: 'Repo rate स्थिर', en: 'Repo rate stable' },
            { hi: 'खाद्य मुद्रास्फीति में उतार-चढ़ाव', en: 'Fluctuations in food inflation' },
          ],
          examRelevance: { hi: 'UPSC & BPSC: GS-III (मौद्रिक नीति, RBI)', en: 'UPSC & BPSC: GS-III (Monetary Policy, RBI)' },
        },
      ],
    },
    {
      id: '4',
      title: { hi: 'सर्वोच्च न्यायालय के महत्वपूर्ण निर्णय', en: 'Important Supreme Court Decisions' },
      category: { hi: 'राजव्यवस्था एवं शासन', en: 'Polity & Governance' },
      categoryKey: 'polity',
      summary: { hi: 'सर्वोच्च न्यायालय ने मूल अधिकारों और संवैधानिक प्रावधानों पर कई ऐतिहासिक निर्णय दिए।', en: 'Supreme Court delivered several landmark judgments on fundamental rights and constitutional provisions.' },
      source: 'LiveLaw, Bar and Bench',
      subtopics: [
        {
          title: { hi: 'मूल अधिकारों पर निर्णय', en: 'Judgment on Fundamental Rights' },
          content: { hi: 'सर्वोच्च न्यायालय ने अनुच्छेद 21 के तहत निजता के अधिकार की व्याख्या को और विस्तारित किया है। डिजिटल युग में व्यक्तिगत डेटा संरक्षण को मूल अधिकार का हिस्सा माना गया। यह निर्णय डिजिटल व्यक्तिगत डेटा संरक्षण अधिनियम 2023 के संदर्भ में महत्वपूर्ण है।', en: 'Supreme Court has further expanded the interpretation of Right to Privacy under Article 21. Personal data protection in the digital age recognized as part of fundamental rights. This judgment is significant in context of Digital Personal Data Protection Act 2023.' },
          keyPoints: [
            { hi: 'अनुच्छेद 21 की विस्तारित व्याख्या', en: 'Expanded interpretation of Article 21' },
            { hi: 'डिजिटल डेटा संरक्षण मूल अधिकार', en: 'Digital data protection as fundamental right' },
            { hi: 'DPDP Act 2023 से संबंध', en: 'Connection with DPDP Act 2023' },
          ],
          examRelevance: { hi: 'UPSC Mains: GS-II (संविधान, मूल अधिकार, न्यायपालिका)', en: 'UPSC Mains: GS-II (Constitution, Fundamental Rights, Judiciary)' },
        },
      ],
    },
    {
      id: '5',
      title: { hi: 'जलवायु परिवर्तन: भारत की हरित ऊर्जा पहल', en: 'Climate Change: India\'s Green Energy Initiatives' },
      category: { hi: 'पर्यावरण एवं पारिस्थितिकी', en: 'Environment & Ecology' },
      categoryKey: 'environment',
      summary: { hi: 'भारत ने 2030 तक 500 GW नवीकरणीय ऊर्जा क्षमता के लक्ष्य की ओर प्रगति रिपोर्ट जारी की।', en: 'India released progress report towards 500 GW renewable energy capacity target by 2030.' },
      source: 'Down to Earth, The Hindu',
      subtopics: [
        {
          title: { hi: 'सौर ऊर्जा की प्रगति', en: 'Solar Energy Progress' },
          content: { hi: 'राष्ट्रीय सौर मिशन के तहत सौर ऊर्जा क्षमता में उल्लेखनीय वृद्धि हुई है। PM-KUSUM योजना के माध्यम से कृषि क्षेत्र में सौर ऊर्जा के उपयोग को बढ़ावा दिया जा रहा है। रूफटॉप सोलर प्रोग्राम ने शहरी क्षेत्रों में विकेंद्रीकृत ऊर्जा उत्पादन को गति दी है। अंतर्राष्ट्रीय सौर गठबंधन (ISA) में भारत की अग्रणी भूमिका जारी है।', en: 'Notable increase in solar energy capacity under National Solar Mission. PM-KUSUM scheme promoting solar energy use in agriculture sector. Rooftop Solar Program has accelerated decentralized energy production in urban areas. India\'s leading role in International Solar Alliance (ISA) continues.' },
          keyPoints: [
            { hi: 'राष्ट्रीय सौर मिशन की प्रगति', en: 'National Solar Mission progress' },
            { hi: 'PM-KUSUM योजना का विस्तार', en: 'PM-KUSUM scheme expansion' },
            { hi: 'ISA में भारत की भूमिका', en: 'India\'s role in ISA' },
          ],
          examRelevance: { hi: 'UPSC & BPSC: GS-III (पर्यावरण, ऊर्जा सुरक्षा)', en: 'UPSC & BPSC: GS-III (Environment, Energy Security)' },
        },
        {
          title: { hi: 'हरित हाइड्रोजन मिशन', en: 'Green Hydrogen Mission' },
          content: { hi: 'राष्ट्रीय हरित हाइड्रोजन मिशन के तहत भारत हरित हाइड्रोजन उत्पादन का वैश्विक केंद्र बनने की दिशा में आगे बढ़ रहा है। ₹19,744 करोड़ के बजट आवंटन के साथ, यह मिशन 2030 तक 5 मिलियन टन वार्षिक हरित हाइड्रोजन उत्पादन का लक्ष्य रखता है।', en: 'Under the National Green Hydrogen Mission, India is moving towards becoming a global hub for green hydrogen production. With a budget allocation of ₹19,744 crore, the mission targets 5 million tonnes annual green hydrogen production by 2030.' },
          keyPoints: [
            { hi: '₹19,744 करोड़ का बजट आवंटन', en: '₹19,744 crore budget allocation' },
            { hi: '2030 तक 5 MT उत्पादन लक्ष्य', en: '5 MT production target by 2030' },
            { hi: 'वैश्विक हरित हाइड्रोजन हब', en: 'Global green hydrogen hub' },
          ],
          examRelevance: { hi: 'UPSC Mains: GS-III (विज्ञान-तकनीक, पर्यावरण)', en: 'UPSC Mains: GS-III (Science-Technology, Environment)' },
        },
      ],
    },
    {
      id: '6',
      title: { hi: 'बिहार में विकास योजनाएँ और प्रगति', en: 'Development Schemes and Progress in Bihar' },
      category: { hi: 'बिहार विशेष (BPSC)', en: 'Bihar Special (BPSC)' },
      categoryKey: 'bihar',
      summary: { hi: 'बिहार सरकार ने कई नई विकास योजनाओं की घोषणा की। शिक्षा, स्वास्थ्य और बुनियादी ढाँचे पर विशेष ध्यान।', en: 'Bihar government announced several new development schemes. Special focus on education, health, and infrastructure.' },
      source: 'Dainik Jagran, Prabhat Khabar',
      subtopics: [
        {
          title: { hi: 'शिक्षा और कौशल विकास', en: 'Education and Skill Development' },
          content: { hi: 'बिहार सरकार ने राज्य में शिक्षा की गुणवत्ता सुधारने के लिए नई पहल शुरू की है। मेधा वृत्ति योजना के तहत मेधावी छात्रों को छात्रवृत्ति दी जा रही है। कौशल विकास केंद्रों की संख्या बढ़ाई जा रही है। बिहार स्टूडेंट क्रेडिट कार्ड योजना के तहत उच्च शिक्षा के लिए ऋण प्रदान किया जा रहा है।', en: 'Bihar government has launched new initiatives to improve education quality in the state. Scholarships being provided to meritorious students under Medha Vritti Yojana. Number of skill development centers being increased. Loans provided for higher education under Bihar Student Credit Card scheme.' },
          keyPoints: [
            { hi: 'मेधा वृत्ति योजना', en: 'Medha Vritti Yojana' },
            { hi: 'कौशल विकास केंद्रों का विस्तार', en: 'Expansion of skill development centers' },
            { hi: 'स्टूडेंट क्रेडिट कार्ड योजना', en: 'Student Credit Card scheme' },
          ],
          examRelevance: { hi: 'BPSC: बिहार की सरकारी योजनाएँ, शिक्षा नीति', en: 'BPSC: Bihar government schemes, Education policy' },
        },
      ],
    },
    {
      id: '7',
      title: { hi: 'ISRO का नया अंतरिक्ष मिशन', en: 'ISRO\'s New Space Mission' },
      category: { hi: 'विज्ञान एवं प्रौद्योगिकी', en: 'Science & Technology' },
      categoryKey: 'science',
      summary: { hi: 'ISRO ने अगले चंद्र मिशन और अंतरिक्ष स्टेशन के लिए नई योजनाओं की घोषणा की।', en: 'ISRO announced plans for next lunar mission and space station.' },
      source: 'ISRO, The Hindu',
      subtopics: [
        {
          title: { hi: 'चंद्रयान-4 की तैयारी', en: 'Chandrayaan-4 Preparation' },
          content: { hi: 'ISRO ने चंद्रयान-4 मिशन की योजना की घोषणा की है जिसमें चंद्रमा से नमूने लाने का लक्ष्य रखा गया है। यह मिशन भारत को चंद्रमा से नमूने लाने वाले देशों के विशिष्ट समूह में शामिल करेगा। मिशन में दो मॉड्यूल होंगे - एक ऑर्बिटर और एक लैंडर-एसेंडर।', en: 'ISRO has announced plans for Chandrayaan-4 mission with the goal of bringing samples from the Moon. This mission will place India in the exclusive group of nations that have brought back lunar samples. The mission will have two modules - an orbiter and a lander-ascender.' },
          keyPoints: [
            { hi: 'चंद्रमा से नमूना वापसी मिशन', en: 'Lunar sample return mission' },
            { hi: 'दो मॉड्यूल: ऑर्बिटर और लैंडर-एसेंडर', en: 'Two modules: orbiter and lander-ascender' },
            { hi: 'वैश्विक अंतरिक्ष क्लब में प्रवेश', en: 'Entry into global space club' },
          ],
          examRelevance: { hi: 'UPSC Prelims: विज्ञान-तकनीक (अंतरिक्ष कार्यक्रम)', en: 'UPSC Prelims: Science-Tech (Space Program)' },
        },
      ],
    },
  ],
});

export const getSampleQuiz = (date: string): DailyQuiz => ({
  date,
  questions: [
    {
      id: 'q1', question: { hi: 'LAC का पूर्ण रूप क्या है?', en: 'What is the full form of LAC?' },
      options: [
        { hi: 'लाइन ऑफ एक्चुअल कंट्रोल', en: 'Line of Actual Control' },
        { hi: 'लाइन ऑफ एक्चुअल कमांड', en: 'Line of Actual Command' },
        { hi: 'लिमिट ऑफ एक्चुअल कंट्रोल', en: 'Limit of Actual Control' },
        { hi: 'लाइन ऑफ आर्म्ड कंट्रोल', en: 'Line of Armed Control' },
      ],
      correctIndex: 0, explanation: { hi: 'LAC (Line of Actual Control) भारत और चीन के बीच वास्तविक नियंत्रण रेखा है।', en: 'LAC (Line of Actual Control) is the de-facto border between India and China.' }, topicRef: '1',
    },
    {
      id: 'q2', question: { hi: 'NEP 2020 में स्कूली शिक्षा की नई संरचना क्या है?', en: 'What is the new school structure under NEP 2020?' },
      options: [
        { hi: '10+2', en: '10+2' },
        { hi: '5+3+3+4', en: '5+3+3+4' },
        { hi: '6+3+3+4', en: '6+3+3+4' },
        { hi: '5+4+3+4', en: '5+4+3+4' },
      ],
      correctIndex: 1, explanation: { hi: 'NEP 2020 में 5+3+3+4 संरचना प्रस्तावित है: Foundational (5), Preparatory (3), Middle (3), Secondary (4)।', en: 'NEP 2020 proposes 5+3+3+4 structure: Foundational (5), Preparatory (3), Middle (3), Secondary (4).' }, topicRef: '2',
    },
    {
      id: 'q3', question: { hi: 'अकादमिक बैंक ऑफ क्रेडिट (ABC) किससे संबंधित है?', en: 'Academic Bank of Credits (ABC) is related to?' },
      options: [
        { hi: 'बैंकिंग सुधार', en: 'Banking reforms' },
        { hi: 'उच्च शिक्षा सुधार', en: 'Higher education reforms' },
        { hi: 'कृषि ऋण', en: 'Agricultural credit' },
        { hi: 'विदेशी मुद्रा भंडार', en: 'Foreign exchange reserves' },
      ],
      correctIndex: 1, explanation: { hi: 'ABC उच्च शिक्षा में क्रेडिट ट्रांसफर और मल्टीपल एंट्री-एग्जिट सिस्टम को सुगम बनाता है।', en: 'ABC facilitates credit transfer and multiple entry-exit system in higher education.' }, topicRef: '2',
    },
    {
      id: 'q4', question: { hi: 'PLI योजना का मुख्य उद्देश्य क्या है?', en: 'What is the main objective of PLI scheme?' },
      options: [
        { hi: 'कृषि उत्पादन बढ़ाना', en: 'Increase agricultural production' },
        { hi: 'विनिर्माण क्षेत्र को बढ़ावा देना', en: 'Boost manufacturing sector' },
        { hi: 'शिक्षा में सुधार', en: 'Improve education' },
        { hi: 'स्वास्थ्य सेवा विस्तार', en: 'Expand healthcare' },
      ],
      correctIndex: 1, explanation: { hi: 'Production Linked Incentive (PLI) योजना का उद्देश्य भारत में विनिर्माण को बढ़ावा देना और Make in India को सफल बनाना है।', en: 'Production Linked Incentive (PLI) scheme aims to boost manufacturing in India and make Make in India successful.' }, topicRef: '3',
    },
    {
      id: 'q5', question: { hi: 'RBI की मौद्रिक नीति का प्रमुख उपकरण कौन सा है?', en: 'What is the primary tool of RBI\'s monetary policy?' },
      options: [
        { hi: 'राजकोषीय घाटा', en: 'Fiscal deficit' },
        { hi: 'रेपो रेट', en: 'Repo rate' },
        { hi: 'GST दर', en: 'GST rate' },
        { hi: 'आयकर दर', en: 'Income tax rate' },
      ],
      correctIndex: 1, explanation: { hi: 'रेपो रेट RBI का प्रमुख मौद्रिक नीति उपकरण है जिसके माध्यम से वह मुद्रास्फीति और तरलता को नियंत्रित करता है।', en: 'Repo rate is RBI\'s primary monetary policy tool through which it controls inflation and liquidity.' }, topicRef: '3',
    },
    {
      id: 'q6', question: { hi: 'डिजिटल व्यक्तिगत डेटा संरक्षण अधिनियम किस वर्ष पारित हुआ?', en: 'In which year was the Digital Personal Data Protection Act passed?' },
      options: [
        { hi: '2021', en: '2021' },
        { hi: '2022', en: '2022' },
        { hi: '2023', en: '2023' },
        { hi: '2024', en: '2024' },
      ],
      correctIndex: 2, explanation: { hi: 'DPDP अधिनियम 2023 में पारित हुआ। यह भारत का पहला व्यापक डेटा संरक्षण कानून है।', en: 'DPDP Act was passed in 2023. It is India\'s first comprehensive data protection law.' }, topicRef: '4',
    },
    {
      id: 'q7', question: { hi: 'अनुच्छेद 21 किससे संबंधित है?', en: 'Article 21 is related to?' },
      options: [
        { hi: 'समानता का अधिकार', en: 'Right to Equality' },
        { hi: 'स्वतंत्रता का अधिकार', en: 'Right to Freedom' },
        { hi: 'प्राण और दैहिक स्वतंत्रता', en: 'Right to Life and Personal Liberty' },
        { hi: 'शिक्षा का अधिकार', en: 'Right to Education' },
      ],
      correctIndex: 2, explanation: { hi: 'अनुच्छेद 21 प्राण और दैहिक स्वतंत्रता का अधिकार प्रदान करता है। निजता का अधिकार भी इसी के तहत आता है।', en: 'Article 21 provides Right to Life and Personal Liberty. Right to Privacy also falls under this.' }, topicRef: '4',
    },
    {
      id: 'q8', question: { hi: 'अंतर्राष्ट्रीय सौर गठबंधन (ISA) का मुख्यालय कहाँ है?', en: 'Where is the headquarters of International Solar Alliance (ISA)?' },
      options: [
        { hi: 'नई दिल्ली', en: 'New Delhi' },
        { hi: 'गुरुग्राम', en: 'Gurugram' },
        { hi: 'पेरिस', en: 'Paris' },
        { hi: 'जिनेवा', en: 'Geneva' },
      ],
      correctIndex: 1, explanation: { hi: 'ISA का मुख्यालय गुरुग्राम, हरियाणा (भारत) में है। इसकी स्थापना 2015 में भारत और फ्रांस की पहल पर हुई।', en: 'ISA headquarters is in Gurugram, Haryana (India). It was established in 2015 on the initiative of India and France.' }, topicRef: '5',
    },
    {
      id: 'q9', question: { hi: 'राष्ट्रीय हरित हाइड्रोजन मिशन का 2030 तक उत्पादन लक्ष्य क्या है?', en: 'What is the production target of National Green Hydrogen Mission by 2030?' },
      options: [
        { hi: '1 मिलियन टन', en: '1 million tonnes' },
        { hi: '3 मिलियन टन', en: '3 million tonnes' },
        { hi: '5 मिलियन टन', en: '5 million tonnes' },
        { hi: '10 मिलियन टन', en: '10 million tonnes' },
      ],
      correctIndex: 2, explanation: { hi: 'राष्ट्रीय हरित हाइड्रोजन मिशन का लक्ष्य 2030 तक 5 मिलियन टन वार्षिक हरित हाइड्रोजन उत्पादन है।', en: 'National Green Hydrogen Mission targets 5 million tonnes annual green hydrogen production by 2030.' }, topicRef: '5',
    },
    {
      id: 'q10', question: { hi: 'PM-KUSUM योजना किस क्षेत्र से संबंधित है?', en: 'PM-KUSUM scheme is related to which sector?' },
      options: [
        { hi: 'शिक्षा', en: 'Education' },
        { hi: 'कृषि में सौर ऊर्जा', en: 'Solar energy in agriculture' },
        { hi: 'शहरी विकास', en: 'Urban development' },
        { hi: 'रक्षा', en: 'Defence' },
      ],
      correctIndex: 1, explanation: { hi: 'PM-KUSUM (Kisan Urja Suraksha evam Utthaan Mahabhiyan) कृषि क्षेत्र में सौर ऊर्जा के उपयोग को बढ़ावा देती है।', en: 'PM-KUSUM (Kisan Urja Suraksha evam Utthaan Mahabhiyan) promotes solar energy use in agriculture sector.' }, topicRef: '5',
    },
    {
      id: 'q11', question: { hi: 'बिहार स्टूडेंट क्रेडिट कार्ड योजना का उद्देश्य क्या है?', en: 'What is the objective of Bihar Student Credit Card scheme?' },
      options: [
        { hi: 'किसानों को ऋण', en: 'Loans to farmers' },
        { hi: 'उच्च शिक्षा के लिए ऋण', en: 'Loans for higher education' },
        { hi: 'व्यापार ऋण', en: 'Business loans' },
        { hi: 'गृह ऋण', en: 'Home loans' },
      ],
      correctIndex: 1, explanation: { hi: 'बिहार स्टूडेंट क्रेडिट कार्ड योजना छात्रों को उच्च शिक्षा के लिए 4 लाख तक का ऋण प्रदान करती है।', en: 'Bihar Student Credit Card scheme provides loans up to 4 lakh to students for higher education.' }, topicRef: '6',
    },
    {
      id: 'q12', question: { hi: 'चंद्रयान-4 का प्रमुख लक्ष्य क्या है?', en: 'What is the main goal of Chandrayaan-4?' },
      options: [
        { hi: 'चंद्रमा की कक्षा में उपग्रह स्थापित करना', en: 'Place satellite in Moon orbit' },
        { hi: 'चंद्रमा से नमूने लाना', en: 'Bring samples from Moon' },
        { hi: 'मंगल ग्रह पर लैंडिंग', en: 'Landing on Mars' },
        { hi: 'अंतरिक्ष स्टेशन निर्माण', en: 'Space station construction' },
      ],
      correctIndex: 1, explanation: { hi: 'चंद्रयान-4 का प्रमुख लक्ष्य चंद्रमा से नमूने एकत्र कर पृथ्वी पर लाना है।', en: 'Chandrayaan-4\'s main goal is to collect samples from Moon and bring them to Earth.' }, topicRef: '7',
    },
    {
      id: 'q13', question: { hi: 'QUAD में कौन से देश शामिल हैं?', en: 'Which countries are part of QUAD?' },
      options: [
        { hi: 'भारत, अमेरिका, जापान, ऑस्ट्रेलिया', en: 'India, USA, Japan, Australia' },
        { hi: 'भारत, चीन, जापान, रूस', en: 'India, China, Japan, Russia' },
        { hi: 'भारत, अमेरिका, ब्रिटेन, फ्रांस', en: 'India, USA, UK, France' },
        { hi: 'भारत, जापान, दक्षिण कोरिया, ऑस्ट्रेलिया', en: 'India, Japan, South Korea, Australia' },
      ],
      correctIndex: 0, explanation: { hi: 'QUAD (Quadrilateral Security Dialogue) में भारत, अमेरिका, जापान और ऑस्ट्रेलिया शामिल हैं।', en: 'QUAD (Quadrilateral Security Dialogue) includes India, USA, Japan and Australia.' }, topicRef: '1',
    },
    {
      id: 'q14', question: { hi: 'CPI मुद्रास्फीति को मापने का आधार वर्ष क्या है?', en: 'What is the base year for measuring CPI inflation?' },
      options: [
        { hi: '2010', en: '2010' },
        { hi: '2011-12', en: '2011-12' },
        { hi: '2012', en: '2012' },
        { hi: '2015-16', en: '2015-16' },
      ],
      correctIndex: 1, explanation: { hi: 'CPI (उपभोक्ता मूल्य सूचकांक) का वर्तमान आधार वर्ष 2011-12 है।', en: 'Current base year for CPI (Consumer Price Index) is 2011-12.' }, topicRef: '3',
    },
    {
      id: 'q15', question: { hi: 'गलवान घाटी किस राज्य/केंद्र शासित प्रदेश में स्थित है?', en: 'Galwan Valley is located in which State/UT?' },
      options: [
        { hi: 'जम्मू-कश्मीर', en: 'Jammu & Kashmir' },
        { hi: 'लद्दाख', en: 'Ladakh' },
        { hi: 'हिमाचल प्रदेश', en: 'Himachal Pradesh' },
        { hi: 'अरुणाचल प्रदेश', en: 'Arunachal Pradesh' },
      ],
      correctIndex: 1, explanation: { hi: 'गलवान घाटी लद्दाख केंद्र शासित प्रदेश में स्थित है।', en: 'Galwan Valley is located in the Union Territory of Ladakh.' }, topicRef: '1',
    },
    {
      id: 'q16', question: { hi: 'DIKSHA प्लेटफॉर्म किसके लिए है?', en: 'DIKSHA platform is for?' },
      options: [
        { hi: 'डिजिटल भुगतान', en: 'Digital payments' },
        { hi: 'शिक्षकों और छात्रों के लिए डिजिटल शिक्षा', en: 'Digital education for teachers and students' },
        { hi: 'कृषि जानकारी', en: 'Agricultural information' },
        { hi: 'स्वास्थ्य सेवा', en: 'Healthcare' },
      ],
      correctIndex: 1, explanation: { hi: 'DIKSHA (Digital Infrastructure for Knowledge Sharing) शिक्षकों और छात्रों के लिए डिजिटल शिक्षण सामग्री प्रदान करता है।', en: 'DIKSHA (Digital Infrastructure for Knowledge Sharing) provides digital learning content for teachers and students.' }, topicRef: '2',
    },
    {
      id: 'q17', question: { hi: 'भारत का 2030 तक नवीकरणीय ऊर्जा क्षमता लक्ष्य क्या है?', en: 'What is India\'s renewable energy capacity target by 2030?' },
      options: [
        { hi: '175 GW', en: '175 GW' },
        { hi: '300 GW', en: '300 GW' },
        { hi: '450 GW', en: '450 GW' },
        { hi: '500 GW', en: '500 GW' },
      ],
      correctIndex: 3, explanation: { hi: 'भारत ने 2030 तक 500 GW नवीकरणीय ऊर्जा क्षमता का लक्ष्य रखा है।', en: 'India has set a target of 500 GW renewable energy capacity by 2030.' }, topicRef: '5',
    },
    {
      id: 'q18', question: { hi: 'RBI का मुद्रास्फीति लक्ष्य क्या है?', en: 'What is RBI\'s inflation target?' },
      options: [
        { hi: '2% ± 1%', en: '2% ± 1%' },
        { hi: '4% ± 2%', en: '4% ± 2%' },
        { hi: '5% ± 2%', en: '5% ± 2%' },
        { hi: '6% ± 1%', en: '6% ± 1%' },
      ],
      correctIndex: 1, explanation: { hi: 'RBI का मुद्रास्फीति लक्ष्य 4% है जिसमें ±2% की सहनशीलता सीमा है (2%-6%)।', en: 'RBI\'s inflation target is 4% with a tolerance band of ±2% (2%-6%).' }, topicRef: '3',
    },
    {
      id: 'q19', question: { hi: 'निजता का अधिकार किस केस में मूल अधिकार घोषित किया गया?', en: 'In which case was Right to Privacy declared a fundamental right?' },
      options: [
        { hi: 'केशवानंद भारती केस', en: 'Kesavananda Bharati case' },
        { hi: 'पुट्टस्वामी केस', en: 'Puttaswamy case' },
        { hi: 'गोलकनाथ केस', en: 'Golak Nath case' },
        { hi: 'मिनर्वा मिल्स केस', en: 'Minerva Mills case' },
      ],
      correctIndex: 1, explanation: { hi: 'K.S. पुट्टस्वामी बनाम भारत संघ (2017) में सर्वोच्च न्यायालय ने निजता को मूल अधिकार घोषित किया।', en: 'In K.S. Puttaswamy vs Union of India (2017), Supreme Court declared privacy as a fundamental right.' }, topicRef: '4',
    },
    {
      id: 'q20', question: { hi: 'मेधा वृत्ति योजना किस राज्य की है?', en: 'Medha Vritti Yojana belongs to which state?' },
      options: [
        { hi: 'उत्तर प्रदेश', en: 'Uttar Pradesh' },
        { hi: 'मध्य प्रदेश', en: 'Madhya Pradesh' },
        { hi: 'बिहार', en: 'Bihar' },
        { hi: 'झारखंड', en: 'Jharkhand' },
      ],
      correctIndex: 2, explanation: { hi: 'मेधा वृत्ति योजना बिहार सरकार की योजना है जो मेधावी छात्रों को छात्रवृत्ति प्रदान करती है।', en: 'Medha Vritti Yojana is a Bihar government scheme providing scholarships to meritorious students.' }, topicRef: '6',
    },
    {
      id: 'q21', question: { hi: 'हिंद-प्रशांत क्षेत्र (Indo-Pacific) किन दो महासागरों को जोड़ता है?', en: 'Indo-Pacific region connects which two oceans?' },
      options: [
        { hi: 'हिंद महासागर और अटलांटिक', en: 'Indian Ocean and Atlantic' },
        { hi: 'हिंद महासागर और प्रशांत महासागर', en: 'Indian Ocean and Pacific Ocean' },
        { hi: 'प्रशांत और अटलांटिक', en: 'Pacific and Atlantic' },
        { hi: 'आर्कटिक और हिंद महासागर', en: 'Arctic and Indian Ocean' },
      ],
      correctIndex: 1, explanation: { hi: 'हिंद-प्रशांत क्षेत्र हिंद महासागर और प्रशांत महासागर को जोड़ने वाला भौगोलिक-रणनीतिक क्षेत्र है।', en: 'Indo-Pacific region is a geo-strategic area connecting Indian Ocean and Pacific Ocean.' }, topicRef: '1',
    },
    {
      id: 'q22', question: { hi: 'भारत में GDP की गणना कौन सी संस्था करती है?', en: 'Which organization calculates GDP in India?' },
      options: [
        { hi: 'RBI', en: 'RBI' },
        { hi: 'NITI Aayog', en: 'NITI Aayog' },
        { hi: 'NSO (राष्ट्रीय सांख्यिकी कार्यालय)', en: 'NSO (National Statistical Office)' },
        { hi: 'वित्त मंत्रालय', en: 'Ministry of Finance' },
      ],
      correctIndex: 2, explanation: { hi: 'भारत में GDP की गणना NSO (National Statistical Office) करता है जो सांख्यिकी मंत्रालय के अधीन है।', en: 'GDP in India is calculated by NSO (National Statistical Office) under Ministry of Statistics.' }, topicRef: '3',
    },
    {
      id: 'q23', question: { hi: 'NEP 2020 में फाउंडेशन स्तर की आयु सीमा क्या है?', en: 'What is the age range for Foundation level in NEP 2020?' },
      options: [
        { hi: '2-6 वर्ष', en: '2-6 years' },
        { hi: '3-8 वर्ष', en: '3-8 years' },
        { hi: '4-9 वर्ष', en: '4-9 years' },
        { hi: '5-10 वर्ष', en: '5-10 years' },
      ],
      correctIndex: 1, explanation: { hi: 'NEP 2020 में फाउंडेशन स्तर 3-8 वर्ष (5 वर्ष) का है जिसमें 3 वर्ष प्री-स्कूल और 2 वर्ष कक्षा 1-2 शामिल हैं।', en: 'Foundation level in NEP 2020 is for ages 3-8 (5 years) including 3 years pre-school and 2 years of class 1-2.' }, topicRef: '2',
    },
    {
      id: 'q24', question: { hi: 'चंद्रयान-3 का सफल लैंडिंग किस वर्ष हुआ?', en: 'In which year did Chandrayaan-3 successfully land?' },
      options: [
        { hi: '2022', en: '2022' },
        { hi: '2023', en: '2023' },
        { hi: '2024', en: '2024' },
        { hi: '2021', en: '2021' },
      ],
      correctIndex: 1, explanation: { hi: 'चंद्रयान-3 ने 23 अगस्त 2023 को चंद्रमा के दक्षिणी ध्रुव पर सफल लैंडिंग की।', en: 'Chandrayaan-3 successfully landed on the Moon\'s South Pole on 23 August 2023.' }, topicRef: '7',
    },
    {
      id: 'q25', question: { hi: 'भारत में रेपो रेट किसके द्वारा निर्धारित होता है?', en: 'Repo rate in India is determined by?' },
      options: [
        { hi: 'वित्त मंत्रालय', en: 'Ministry of Finance' },
        { hi: 'SEBI', en: 'SEBI' },
        { hi: 'RBI की मौद्रिक नीति समिति (MPC)', en: 'RBI\'s Monetary Policy Committee (MPC)' },
        { hi: 'NITI Aayog', en: 'NITI Aayog' },
      ],
      correctIndex: 2, explanation: { hi: 'रेपो रेट RBI की मौद्रिक नीति समिति (MPC) द्वारा निर्धारित किया जाता है।', en: 'Repo rate is determined by RBI\'s Monetary Policy Committee (MPC).' }, topicRef: '3',
    },
    {
      id: 'q26', question: { hi: 'पैंगोंग त्सो क्या है?', en: 'What is Pangong Tso?' },
      options: [
        { hi: 'एक नदी', en: 'A river' },
        { hi: 'एक झील', en: 'A lake' },
        { hi: 'एक पर्वत शिखर', en: 'A mountain peak' },
        { hi: 'एक दर्रा', en: 'A pass' },
      ],
      correctIndex: 1, explanation: { hi: 'पैंगोंग त्सो लद्दाख में स्थित एक झील है जो भारत-चीन सीमा पर है। इसका लगभग 60% हिस्सा चीन में है।', en: 'Pangong Tso is a lake in Ladakh situated on India-China border. About 60% of it lies in China.' }, topicRef: '1',
    },
    {
      id: 'q27', question: { hi: 'Make in India अभियान कब शुरू हुआ?', en: 'When was Make in India campaign launched?' },
      options: [
        { hi: '2013', en: '2013' },
        { hi: '2014', en: '2014' },
        { hi: '2015', en: '2015' },
        { hi: '2016', en: '2016' },
      ],
      correctIndex: 1, explanation: { hi: 'Make in India अभियान 25 सितंबर 2014 को प्रधानमंत्री मोदी द्वारा शुरू किया गया।', en: 'Make in India campaign was launched by PM Modi on 25 September 2014.' }, topicRef: '3',
    },
    {
      id: 'q28', question: { hi: 'सर्वोच्च न्यायालय के न्यायाधीशों की अधिकतम संख्या (मुख्य न्यायाधीश सहित) कितनी है?', en: 'Maximum number of Supreme Court judges (including CJI)?' },
      options: [
        { hi: '31', en: '31' },
        { hi: '34', en: '34' },
        { hi: '26', en: '26' },
        { hi: '28', en: '28' },
      ],
      correctIndex: 1, explanation: { hi: 'वर्तमान में सर्वोच्च न्यायालय में मुख्य न्यायाधीश सहित अधिकतम 34 न्यायाधीश हो सकते हैं।', en: 'Currently Supreme Court can have maximum 34 judges including the Chief Justice of India.' }, topicRef: '4',
    },
    {
      id: 'q29', question: { hi: 'भारत का पहला अंतरिक्ष मिशन कौन सा था?', en: 'What was India\'s first space mission?' },
      options: [
        { hi: 'चंद्रयान-1', en: 'Chandrayaan-1' },
        { hi: 'मंगलयान', en: 'Mangalyaan' },
        { hi: 'आर्यभट्ट उपग्रह', en: 'Aryabhata satellite' },
        { hi: 'रोहिणी उपग्रह', en: 'Rohini satellite' },
      ],
      correctIndex: 2, explanation: { hi: 'आर्यभट्ट भारत का पहला उपग्रह था जिसे 19 अप्रैल 1975 को सोवियत रॉकेट से प्रक्षेपित किया गया।', en: 'Aryabhata was India\'s first satellite launched on 19 April 1975 using a Soviet rocket.' }, topicRef: '7',
    },
    {
      id: 'q30', question: { hi: 'बिहार की राजधानी और उच्च न्यायालय कहाँ स्थित है?', en: 'Where is Bihar\'s capital and High Court located?' },
      options: [
        { hi: 'पटना', en: 'Patna' },
        { hi: 'गया', en: 'Gaya' },
        { hi: 'मुजफ्फरपुर', en: 'Muzaffarpur' },
        { hi: 'भागलपुर', en: 'Bhagalpur' },
      ],
      correctIndex: 0, explanation: { hi: 'बिहार की राजधानी पटना है और पटना उच्च न्यायालय भी यहीं स्थित है।', en: 'Bihar\'s capital is Patna and Patna High Court is also located here.' }, topicRef: '6',
    },
  ],
});
