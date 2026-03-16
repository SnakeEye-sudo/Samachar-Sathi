import { jsPDF } from 'jspdf';
import { DailyAnalysis, Language } from '@/types/news';

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

export const generateDailyPDF = (analysis: DailyAnalysis, lang: Language) => {
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
  doc.text(lang === 'hi' ? 'UPSC & BPSC दैनिक समाचार विश्लेषण' : 'UPSC & BPSC Daily News Analysis', pageWidth / 2, 48, { align: 'center' });
  
  const dateStr = new Date(analysis.date).toLocaleDateString(lang === 'hi' ? 'hi-IN' : 'en-IN', { 
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
  doc.text(lang === 'hi' ? 'विषय सूची' : 'Table of Contents', margin, y);
  y += 10;

  doc.setFontSize(10);
  doc.setFont('helvetica', 'normal');
  doc.setTextColor(60, 60, 60);
  analysis.topics.forEach((topic, i) => {
    const title = topic.title[lang];
    const cat = topic.category[lang];
    doc.text(`${i + 1}. [${cat}] ${title}`, margin + 5, y);
    y += 7;
  });

  y += 10;

  // Topics
  analysis.topics.forEach((topic, topicIdx) => {
    checkPageBreak(40);
    
    // Category badge
    doc.setFillColor(220, 190, 120);
    const catText = topic.category[lang];
    doc.roundedRect(margin, y - 4, doc.getTextWidth(catText) * 0.35 + 12, 7, 2, 2, 'F');
    doc.setFontSize(8);
    doc.setTextColor(30, 45, 70);
    doc.setFont('helvetica', 'bold');
    doc.text(catText, margin + 4, y);
    y += 12;

    // Topic title
    doc.setFontSize(14);
    doc.setTextColor(30, 45, 70);
    doc.setFont('helvetica', 'bold');
    const titleLines = doc.splitTextToSize(`${topicIdx + 1}. ${topic.title[lang]}`, contentWidth);
    doc.text(titleLines, margin, y);
    y += titleLines.length * 7 + 3;

    // Summary
    doc.setFontSize(10);
    doc.setTextColor(80, 80, 80);
    doc.setFont('helvetica', 'italic');
    const summaryLines = doc.splitTextToSize(topic.summary[lang], contentWidth);
    doc.text(summaryLines, margin, y);
    y += summaryLines.length * 5 + 3;

    // Source
    doc.setFontSize(8);
    doc.setTextColor(140, 140, 140);
    doc.setFont('helvetica', 'normal');
    doc.text(`${lang === 'hi' ? 'स्रोत' : 'Source'}: ${topic.source}`, margin, y);
    y += 8;

    // Subtopics
    topic.subtopics.forEach((sub) => {
      checkPageBreak(30);

      doc.setFontSize(11);
      doc.setTextColor(50, 50, 50);
      doc.setFont('helvetica', 'bold');
      doc.text(sub.title[lang], margin + 5, y);
      y += 7;

      doc.setFontSize(9);
      doc.setTextColor(60, 60, 60);
      doc.setFont('helvetica', 'normal');
      const contentLines = doc.splitTextToSize(sub.content[lang], contentWidth - 10);
      contentLines.forEach((line: string) => {
        checkPageBreak(6);
        doc.text(line, margin + 5, y);
        y += 5;
      });
      y += 3;

      // Key points
      doc.setFontSize(9);
      doc.setFont('helvetica', 'bold');
      doc.setTextColor(30, 45, 70);
      doc.text(lang === 'hi' ? 'मुख्य बिंदु:' : 'Key Points:', margin + 5, y);
      y += 5;
      
      doc.setFont('helvetica', 'normal');
      sub.keyPoints.forEach(kp => {
        checkPageBreak(6);
        doc.text(`• ${kp[lang]}`, margin + 10, y);
        y += 5;
      });
      y += 3;

      // Exam relevance
      checkPageBreak(10);
      doc.setFillColor(245, 240, 230);
      doc.roundedRect(margin + 5, y - 4, contentWidth - 10, 9, 2, 2, 'F');
      doc.setFontSize(8);
      doc.setTextColor(130, 100, 50);
      doc.setFont('helvetica', 'bold');
      doc.text(`${lang === 'hi' ? 'परीक्षा प्रासंगिकता' : 'Exam Relevance'}: ${sub.examRelevance[lang]}`, margin + 8, y);
      y += 12;
    });

    // Divider
    checkPageBreak(10);
    doc.setDrawColor(200, 180, 140);
    doc.setLineWidth(0.5);
    doc.line(margin + 20, y, pageWidth - margin - 20, y);
    y += 10;
  });

  addWatermark(doc);
  doc.save(`Pragya_Daily_${analysis.date}.pdf`);
};

export const generateMagazinePDF = (analyses: DailyAnalysis[], month: string, year: string, lang: Language) => {
  const doc = new jsPDF('p', 'mm', 'a4');
  const pageWidth = doc.internal.pageSize.getWidth();
  const pageHeight = doc.internal.pageSize.getHeight();
  const margin = 20;
  const contentWidth = pageWidth - 2 * margin;

  // Cover page
  doc.setFillColor(30, 45, 70);
  doc.rect(0, 0, pageWidth, pageHeight, 'F');

  // Gold border
  doc.setDrawColor(220, 190, 120);
  doc.setLineWidth(2);
  doc.rect(10, 10, pageWidth - 20, pageHeight - 20);
  doc.setLineWidth(0.5);
  doc.rect(13, 13, pageWidth - 26, pageHeight - 26);

  // Title
  doc.setFontSize(36);
  doc.setTextColor(220, 190, 120);
  doc.setFont('helvetica', 'bold');
  doc.text('SAMACHAR', pageWidth / 2, 70, { align: 'center' });
  doc.text('SATHI', pageWidth / 2, 85, { align: 'center' });

  // Decorative line
  doc.setDrawColor(220, 190, 120);
  doc.setLineWidth(1);
  doc.line(50, 95, pageWidth - 50, 95);

  // Month/Year
  doc.setFontSize(18);
  doc.setTextColor(200, 200, 210);
  doc.text(`${month} ${year}`, pageWidth / 2, 115, { align: 'center' });

  // Subtitle
  doc.setFontSize(12);
  doc.setTextColor(180, 180, 190);
  doc.text(lang === 'hi' ? 'UPSC & BPSC मासिक समाचार संकलन' : 'UPSC & BPSC Monthly News Compilation', pageWidth / 2, 135, { align: 'center' });

  // Stats
  doc.setFontSize(14);
  doc.setTextColor(220, 190, 120);
  doc.text(`${analyses.length}`, pageWidth / 2, 165, { align: 'center' });
  doc.setFontSize(10);
  doc.setTextColor(180, 180, 190);
  doc.text(lang === 'hi' ? 'दिनों का विश्लेषण' : 'Days of Analysis', pageWidth / 2, 173, { align: 'center' });

  const totalTopics = analyses.reduce((sum, a) => sum + a.topics.length, 0);
  doc.setFontSize(14);
  doc.setTextColor(220, 190, 120);
  doc.text(`${totalTopics}`, pageWidth / 2, 190, { align: 'center' });
  doc.setFontSize(10);
  doc.setTextColor(180, 180, 190);
  doc.text(lang === 'hi' ? 'विषय कवर किए गए' : 'Topics Covered', pageWidth / 2, 198, { align: 'center' });

  // Author
  doc.setFontSize(11);
  doc.setTextColor(220, 190, 120);
  doc.text('Er. Sangam Krishna', pageWidth / 2, 240, { align: 'center' });
  doc.setFontSize(9);
  doc.setTextColor(160, 160, 170);
  doc.text('Samachar-Sathi', pageWidth / 2, 248, { align: 'center' });

  // Content pages
  analyses.forEach((analysis) => {
    doc.addPage();
    let y = margin;

    // Date header
    const dateStr = new Date(analysis.date).toLocaleDateString(lang === 'hi' ? 'hi-IN' : 'en-IN', {
      weekday: 'long', year: 'numeric', month: 'long', day: 'numeric'
    });
    
    doc.setFillColor(30, 45, 70);
    doc.rect(0, 0, pageWidth, 20, 'F');
    doc.setFontSize(11);
    doc.setTextColor(220, 190, 120);
    doc.setFont('helvetica', 'bold');
    doc.text(dateStr, pageWidth / 2, 13, { align: 'center' });
    
    y = 30;

    analysis.topics.forEach((topic) => {
      if (y + 25 > pageHeight - 25) {
        doc.addPage();
        y = margin;
      }

      doc.setFontSize(11);
      doc.setTextColor(30, 45, 70);
      doc.setFont('helvetica', 'bold');
      const titleLines = doc.splitTextToSize(`[${topic.category[lang]}] ${topic.title[lang]}`, contentWidth);
      doc.text(titleLines, margin, y);
      y += titleLines.length * 6 + 3;

      doc.setFontSize(9);
      doc.setTextColor(80, 80, 80);
      doc.setFont('helvetica', 'normal');
      const summaryLines = doc.splitTextToSize(topic.summary[lang], contentWidth);
      doc.text(summaryLines, margin, y);
      y += summaryLines.length * 4.5 + 3;

      topic.subtopics.forEach(sub => {
        if (y + 15 > pageHeight - 25) {
          doc.addPage();
          y = margin;
        }
        doc.setFontSize(9);
        doc.setFont('helvetica', 'bold');
        doc.setTextColor(50, 50, 50);
        doc.text(sub.title[lang], margin + 3, y);
        y += 5;

        doc.setFont('helvetica', 'normal');
        const lines = doc.splitTextToSize(sub.content[lang], contentWidth - 6);
        lines.forEach((line: string) => {
          if (y + 5 > pageHeight - 25) {
            doc.addPage();
            y = margin;
          }
          doc.text(line, margin + 3, y);
          y += 4.5;
        });

        sub.keyPoints.forEach(kp => {
          if (y + 5 > pageHeight - 25) {
            doc.addPage();
            y = margin;
          }
          doc.text(`• ${kp[lang]}`, margin + 6, y);
          y += 4.5;
        });
        y += 3;
      });

      y += 5;
    });
  });

  addWatermark(doc);
  doc.save(`Pragya_Monthly_${month}_${year}.pdf`);
};
