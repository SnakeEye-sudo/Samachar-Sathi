import { useLanguage } from '@/context/LanguageContext';
import { getAllAnalyses, getAnalysesForMonth } from '@/lib/storage';
import { generateMagazinePDF } from '@/lib/pdfGenerator';
import { Download, BookOpen, Calendar } from 'lucide-react';
import { Button } from '@/components/ui/button';
import { useMemo } from 'react';

const MagazinePage = () => {
  const { lang } = useLanguage();
  const analyses = getAllAnalyses();

  const months = useMemo(() => {
    const monthMap = new Map<string, { year: number; month: number; count: number; topicCount: number }>();
    analyses.forEach(a => {
      const [y, m] = a.date.split('-').map(Number);
      const key = `${y}-${String(m).padStart(2, '0')}`;
      const existing = monthMap.get(key);
      if (existing) {
        existing.count++;
        existing.topicCount += a.topics.length;
      } else {
        monthMap.set(key, { year: y, month: m, count: 1, topicCount: a.topics.length });
      }
    });
    return Array.from(monthMap.entries()).sort((a, b) => b[0].localeCompare(a[0]));
  }, [analyses]);

  const monthNames = {
    hi: ['', 'जनवरी', 'फरवरी', 'मार्च', 'अप्रैल', 'मई', 'जून', 'जुलाई', 'अगस्त', 'सितंबर', 'अक्टूबर', 'नवंबर', 'दिसंबर'],
    en: ['', 'January', 'February', 'March', 'April', 'May', 'June', 'July', 'August', 'September', 'October', 'November', 'December'],
  };

  const handleDownload = (year: number, month: number) => {
    const monthAnalyses = getAnalysesForMonth(year, month);
    const monthName = monthNames.en[month];
    generateMagazinePDF(monthAnalyses, monthName, String(year), lang);
  };

  return (
    <div className="space-y-6">
      <div className="pb-4 border-b border-border">
        <h2 className="font-display text-2xl font-bold text-foreground">
          {lang === 'hi' ? 'प्रज्ञा मासिक पत्रिका' : 'Pragya Monthly Magazine'}
        </h2>
        <p className="text-sm text-muted-foreground font-body mt-1">
          {lang === 'hi' ? 'हर महीने का संकलित समाचार विश्लेषण' : 'Compiled news analysis for each month'}
        </p>
      </div>

      {months.length === 0 ? (
        <div className="text-center py-16 text-muted-foreground font-body">
          <BookOpen className="h-12 w-12 mx-auto mb-4 opacity-40" />
          <p>{lang === 'hi' ? 'अभी कोई पत्रिका उपलब्ध नहीं है' : 'No magazines available yet'}</p>
          <p className="text-xs mt-1">{lang === 'hi' ? 'दैनिक विश्लेषण सेव होने पर यहाँ मासिक पत्रिका बनेगी' : 'Monthly magazine will appear as daily analyses are saved'}</p>
        </div>
      ) : (
        <div className="grid gap-4 sm:grid-cols-2 lg:grid-cols-3">
          {months.map(([key, data]) => (
            <div key={key} className="topic-card">
              <div className="flex items-start justify-between">
                <div>
                  <div className="flex items-center gap-2 mb-2">
                    <Calendar className="h-4 w-4 text-accent" />
                    <span className="font-display text-lg font-bold text-foreground">
                      {monthNames[lang][data.month]} {data.year}
                    </span>
                  </div>
                  <p className="text-sm text-muted-foreground font-body">
                    {lang === 'hi' ? `${data.count} दिन • ${data.topicCount} विषय` : `${data.count} days • ${data.topicCount} topics`}
                  </p>
                </div>
              </div>
              <Button
                onClick={() => handleDownload(data.year, data.month)}
                className="w-full mt-4 gold-gradient text-accent-foreground hover:opacity-90 font-body font-semibold gap-2"
                size="sm"
              >
                <Download className="h-4 w-4" />
                {lang === 'hi' ? 'PDF डाउनलोड' : 'Download PDF'}
              </Button>
            </div>
          ))}
        </div>
      )}
    </div>
  );
};

export default MagazinePage;
