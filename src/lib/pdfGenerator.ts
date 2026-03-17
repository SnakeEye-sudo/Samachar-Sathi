import { jsPDF } from 'jspdf';
import { DailyNews, Language, Category, NewsUnit } from '@/types/news';

const addWatermark = (doc: jsPDF) => {
  const pageCount = doc.getNumberOfPages();
  for (let i = 1; i <= pageCount; i++) {
    doc.setPage(i);
    doc.setFontSize(12);
    doc.setTextColor(200, 180, 140);
    doc.setFont('helvetica', 'italic');
    
    // Diagonal watermark
    doc.saveGraphicsState();
    const pageWidth = doc.internal.pageSize.getWidth();
    const pageHeight = doc.internal.pageSize.getHeight();
    
    // Center watermark text
    doc.setFontSize(40);
    doc.setTextColor(230, 215, 190);
    const text1 = 'Er. Sangam Krishna';
    const text2 = 'Samachar-Sathi';
    
    // Rotate and place watermarks
    for (let y = 50; y < pageHeight; y += 150) {
      for (let x = -50; x < pageWidth + 50; x += 250) {
        doc.saveGraphicsState();
        doc.setFontSize(28);
        doc.setTextColor(220, 200, 170);
        doc.text(text1, x, y, { angle: -35 });
        doc.text(text2, x + 30, y + 40, { angle: -35 });
        doc.restoreGraphicsState();
      }
    }
    doc.restoreGraphicsState();
    
    // Footer
    doc.setFontSize(8);
    doc.setTextColor(150, 130, 100);
    doc.text(`Samachar-Sathi | Er. Sangam Krishna | Page ${i} of ${pageCount}`, pageWidth / 2, pageHeight - 10, { align: 'center' });
  }
};

export const generateDailyPDF = (analysis: DailyNews, lang: Language) => {
  const doc = new jsPDF('p', 'mm', 'a4');
  const pageWidth = doc.internal.pageSize.getWidth();
  const margin = 20;
  const contentWidth = pageWidth - 2 * margin;
  let y = margin;

  const checkPageBreak = (needed: number) => {
    if (y + needed > doc.internal.pageSize.getHeight() - 25) {
      doc.addPage();
      y = margin;
    }
  };

  // Title page
  doc.setFillColor(30, 45, 70);
  doc.rect(0, 0, pageWidth, 80, 'F');
  
  doc.setFontSize(28);
  doc.setTextColor(220, 190, 120);
  doc.setFont('helvetica', 'bold');
  doc.text('SAMACHAR-SATHI', pageWidth / 2, 35, { align: 'center' });
  
  doc.setFontSize(12);
  doc.setTextColor(200, 200, 210);
  doc.text(lang === 'hi' ? 'UPSC दैनिक बुद्धिमत्ता (Intelligence) विश्लेषण' : 'UPSC Daily Intelligence Units', pageWidth / 2, 48, { align: 'center' });
  
  const dateStr = new Date(analysis.metadata.date).toLocaleDateString(lang === 'hi' ? 'hi-IN' : 'en-IN', { 
    weekday: 'long', year: 'numeric', month: 'long', day: 'numeric' 
  });
  doc.setFontSize(11);
  doc.text(dateStr, pageWidth / 2, 60, { align: 'center' });
  
  doc.setFontSize(9);
  doc.setTextColor(180, 180, 190);
  doc.text('Er. Sangam Krishna', pageWidth / 2, 72, { align: 'center' });

  y = 95;

  // Table of contents
  doc.setFontSize(16);
  doc.setTextColor(30, 45, 70);
  doc.setFont('helvetica', 'bold');
  doc.text(lang === 'hi' ? 'विशेष सारांश' : 'Executive Summary', margin, y);
  y += 10;

  doc.setFontSize(9);
  doc.setFont('helvetica', 'normal');
  doc.setTextColor(60, 60, 60);
  
  analysis.categories.forEach((cat) => {
    if (cat.news.length > 0) {
      if (y > 270) { doc.addPage(); y = 20; }
      doc.setFont('helvetica', 'bold');
      doc.text(cat.name, margin, y);
      y += 6;
      doc.setFont('helvetica', 'normal');
      cat.news.forEach(n => {
        const titleLines = doc.splitTextToSize(`• ${n.title[lang]}`, contentWidth - 10);
        doc.text(titleLines, margin + 5, y);
        y += titleLines.length * 5;
        if (y > 270) { doc.addPage(); y = 20; }
      });
      y += 4;
    }
  });

  // Full Analysis
  analysis.categories.filter(c => c.news.length > 0).forEach((cat) => {
    doc.addPage();
    y = 25;
    
    doc.setFillColor(220, 190, 120);
    doc.rect(margin, y - 8, contentWidth, 12, 'F');
    doc.setFontSize(14);
    doc.setTextColor(30, 45, 70);
    doc.setFont('helvetica', 'bold');
    doc.text(cat.name, margin + 5, y);
    y += 15;

    cat.news.forEach((news, idx) => {
      checkPageBreak(40);
      
      // Title
      doc.setFontSize(12);
      doc.setTextColor(30, 45, 70);
      doc.setFont('helvetica', 'bold');
      const titleLines = doc.splitTextToSize(`${idx + 1}. ${news.title[lang]}`, contentWidth);
      doc.text(titleLines, margin, y);
      y += titleLines.length * 6 + 4;

      // Analysis
      doc.setFontSize(10);
      doc.setTextColor(60, 60, 60);
      doc.setFont('helvetica', 'normal');
      const analysisLines = doc.splitTextToSize(news.analysis[lang], contentWidth);
      analysisLines.forEach((line: string) => {
        checkPageBreak(6);
        doc.text(line, margin, y);
        y += 5;
      });
      y += 5;

      // UPSC Context Box
      checkPageBreak(30);
      const startBoxY = y;
      doc.setFillColor(245, 240, 230);
      
      // Calculate relevance height
      const relevanceLines = doc.splitTextToSize(`${lang === 'hi' ? 'प्रासंगिकता' : 'Relevance'}: ${news.upscContext.relevance[lang]}`, contentWidth - 10);
      const staticLines = news.upscContext.staticLinkage ? doc.splitTextToSize(`${lang === 'hi' ? 'स्थैतिक लिंक' : 'Static Link'}: ${news.upscContext.staticLinkage?.[lang]}`, contentWidth - 10) : [];
      
      const boxHeight = (relevanceLines.length + staticLines.length) * 5 + 10;
      doc.rect(margin, y - 4, contentWidth, boxHeight, 'F');
      
      doc.setFontSize(8);
      doc.setTextColor(130, 100, 50);
      doc.setFont('helvetica', 'bold');
      
      relevanceLines.forEach((line: string) => {
        doc.text(line, margin + 5, y);
        y += 5;
      });
      
      staticLines.forEach((line: string) => {
        doc.text(line, margin + 5, y);
        y += 5;
      });

      y += 10;
    });
  });

  addWatermark(doc);
  doc.save(`Samachar_Sathi_${analysis.metadata.date}.pdf`);
};

export const generateMagazinePDF = (analyses: DailyNews[], month: string, year: string, lang: Language) => {
  // Simpler monthly for now, or we can reuse logic
  const doc = new jsPDF('p', 'mm', 'a4');
  const pageWidth = doc.internal.pageSize.getWidth();
  const pageHeight = doc.internal.pageSize.getHeight();
  const margin = 20;
  const contentWidth = pageWidth - 2 * margin;

  // Cover page
  doc.setFillColor(30, 45, 70);
  doc.rect(0, 0, pageWidth, pageHeight, 'F');
  doc.setFontSize(36);
  doc.setTextColor(220, 190, 120);
  doc.setFont('helvetica', 'bold');
  doc.text('SAMACHAR SATHI', pageWidth / 2, 100, { align: 'center' });
  doc.setFontSize(18);
  doc.setTextColor(200, 200, 210);
  doc.text(`${month} ${year}`, pageWidth / 2, 120, { align: 'center' });
  doc.setFontSize(12);
  doc.setTextColor(160, 160, 170);
  doc.text('Monthly Intelligence Compilation', pageWidth / 2, 140, { align: 'center' });

  // Add pages for each analysis
  analyses.forEach(analysis => {
    doc.addPage();
    doc.setFontSize(14);
    doc.setTextColor(30, 45, 70);
    doc.text(analysis.metadata.date, margin, 20);
    // ... rest of logic simplified for brevity in this mock ...
  });

  addWatermark(doc);
  doc.save(`Samachar_Sathi_Monthly_${month}_${year}.pdf`);
};
