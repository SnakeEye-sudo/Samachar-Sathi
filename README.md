# समाचार साथी (Samachar-Sathi) 📰

## Complete Daily News Analysis Platform for UPSC & BPSC Preparation

Developed by **Er. Sangam Krishna**

---

## 🎯 Overview

Samachar-Sathi is an advanced news analysis platform designed specifically for UPSC and BPSC exam preparation. The application aggregates news from multiple trusted sources across India and the world, provides detailed point-by-point analysis, and generates practice tests to help aspirants stay updated with current affairs.

## ✨ Key Features

### 1. **Comprehensive Daily News Analysis**
- Aggregates news from 50+ national and international sources
- Categories: Politics, Business, Science, Technology, Environment, Sports, International, National
- Detailed analysis with main points, subtopics, context, and impact
- Organized by importance levels (HIGH, MEDIUM, LOW)
- Complete coverage regardless of length (10-50+ pages)

### 2. **30 Daily MCQ Tests**
- Auto-generated questions based on daily news
- Mixed difficulty levels (Easy, Medium, Hard)
- Instant scoring with detailed explanations
- Track performance over time
- Stored locally in browser (IndexedDB)

### 3. **PDF Download with Watermark**
- Download daily analysis as PDF
- Automatically watermarked with:
  - "Er. Sangam Krishna"
  - "Samachar-Sathi"
- Professional formatting
- Printer-friendly layout

### 4. **Monthly Magazine Generation**
- Auto-generates monthly magazine on 30th/31st
- Comprehensive compilation of month's news
- Magazine-style cover page
- Table of contents
- Downloadable PDF format
- Archive of previous months

### 5. **Bilingual Support**
- Full Hindi and English interface
- Switch languages seamlessly
- Content available in both languages

### 6. **Local Data Storage**
- All analysis saved in browser
- No internet required after initial load
- Access past analyses anytime
- Performance tracking

## 🏗️ Architecture

### Tech Stack
- **Frontend**: React + TypeScript + Vite
- **UI Components**: shadcn/ui + Tailwind CSS
- **State Management**: React Query
- **Storage**: IndexedDB (via Dexie.js)
- **PDF Generation**: jsPDF + html2canvas
- **Routing**: React Router DOM

### Project Structure
```
src/
├── lib/
│   ├── newsService.ts          # News aggregation from multiple sources
│   ├── analysisEngine.ts       # Detailed analysis generator
│   ├── mcqGenerator.ts         # 30 MCQ generation per day
│   ├── pdfGenerator.ts         # PDF export with watermarks
│   ├── magazineGenerator.ts    # Monthly magazine compiler
│   ├── storage.ts              # IndexedDB management
│   ├── smartParser.ts          # Content extraction
│   └── todayNewsData.ts        # Sample/demo data
├── pages/
│   ├── Index.tsx               # Daily analysis page
│   ├── QuizPage.tsx            # MCQ test interface
│   ├── ArchivePage.tsx         # Past analyses
│   ├── MagazinePage.tsx        # Monthly magazines
│   └── AdminPage.tsx           # Admin controls
├── components/
│   ├── AppHeader.tsx           # Navigation header
│   ├── AppLayout.tsx           # Layout wrapper
│   └── ui/                     # shadcn components
└── context/
    ├── LanguageContext.tsx     # Hindi/English switching
    └── theme-provider.tsx      # Dark/Light mode
```

## 🚀 Getting Started

### Prerequisites
```bash
Node.js >= 18.0.0
npm or yarn
```

### Installation

1. Clone the repository:
```bash
git clone https://github.com/SnakeEye-sudo/Samachar-Sathi.git
cd Samachar-Sathi
```

2. Install dependencies:
```bash
npm install
```

3. Run development server:
```bash
npm run dev
```

4. Build for production:
```bash
npm run build
```

5. Deploy to GitHub Pages:
```bash
npm run deploy
```

## 📖 Usage Guide

### Daily News Analysis
1. Visit the home page
2. See today's date analysis automatically loaded
3. Read detailed point-by-point breakdown
4. Download PDF if needed
5. Content includes:
   - Main headlines
   - Detailed points
   - Subtopics
   - Context
   - Impact analysis
   - Related topics

### Taking MCQ Tests
1. Navigate to Quiz page
2. Start daily test (30 questions)
3. Answer all questions
4. Submit for instant results
5. Review explanations
6. Track scores in browser

### Accessing Archives
1. Go to Archive page
2. Browse past dates
3. Read previous analyses
4. Download any day's PDF

### Monthly Magazines
1. Visit Magazine page
2. See current month's compilation
3. Download magazine PDF
4. Access previous months

### Language Switching
1. Click language toggle
2. Choose Hindi or English
3. Interface updates instantly

## 📚 Data Sources

News aggregated from:
- The Hindu
- India Today
- Times of India
- Economic Times
- Hindustan Times
- Indian Express
- BBC News
- Reuters
- DW (Deutsche Welle)
- NDTV
- The Wire
- Live Law
- And 40+ more sources

## 🎨 Features in Detail

### Analysis Quality
- **Comprehensive**: Every detail covered
- **Structured**: Points, subpoints, topics
- **Contextual**: Background information included
- **Impact-focused**: Relevance to exams highlighted
- **UPSC-oriented**: Syllabus-aligned content

### MCQ Quality
- **Current**: Based on same day's news
- **Varied**: Multiple question types
- **Explained**: Detailed answer explanations
- **Exam-pattern**: Similar to actual exams
- **Performance-tracked**: See improvement over time

### PDF Features
- **Professional**: Clean formatting
- **Watermarked**: Author and app name
- **Printable**: Optimized for printing
- **Organized**: Table of contents
- **Complete**: All content included

## 🔒 Privacy & Storage

- All data stored locally in browser
- No external servers
- No tracking or analytics
- Complete privacy
- Data persists until manually cleared

## 🤝 Contributing

Contributions welcome! Please:
1. Fork the repository
2. Create feature branch
3. Commit changes
4. Push to branch
5. Open Pull Request

## 📝 License

MIT License - See LICENSE file

## 👤 Author

**Er. Sangam Krishna**
- GitHub: [@SnakeEye-sudo](https://github.com/SnakeEye-sudo)
- Project Link: [Samachar-Sathi](https://github.com/SnakeEye-sudo/Samachar-Sathi)

## 🙏 Acknowledgments

- All news sources for reliable journalism
- UPSC/BPSC aspirants for inspiration
- Open source community for tools

## 📞 Support

For issues or questions:
- Open GitHub Issue
- Contact via GitHub profile

---

**Made with ❤️ for UPSC/BPSC aspirants**

**Last Updated**: March 17, 2026
