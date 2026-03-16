import { useLanguage } from '@/context/LanguageContext';
import { getAllAnalyses, getAnalysesForMonth } from '@/lib/db';
import { DailyAnalysis } from '@/types/news';
import { useState, useEffect } from 'react';
import { generateMagazinePDF } from '@/lib/pdfGenerator';
import { Download, BookOpen, Calendar, Star, Layers, Search, FileText } from 'lucide-react';
import { Button } from '@/components/ui/button';
import { useMemo } from 'react';
import AppLayout from '@/components/AppLayout';
import { motion } from 'framer-motion';
import { cn } from '@/lib/utils';
import { toast } from 'sonner';

const MagazinePage = () => {
  const { lang } = useLanguage();
  const [analyses, setAnalyses] = useState<DailyAnalysis[]>([]);
  const [loading, setLoading] = useState(true);

  useEffect(() => {
    const fetchData = async () => {
      const all = await getAllAnalyses();
      setAnalyses(all);
      setLoading(false);
    };
    fetchData();
  }, []);

  const months = useMemo(() => {
    const monthMap = new Map<string, { year: number; month: number; count: number; topicCount: number; dates: string[] }>();
    analyses.forEach(a => {
      const [y, m] = a.date.split('-').map(Number);
      const key = `${y}-${String(m).padStart(2, '0')}`;
      const existing = monthMap.get(key);
      if (existing) {
        existing.count++;
        existing.topicCount += a.topics.length;
        existing.dates.push(a.date);
      } else {
        monthMap.set(key, { year: y, month: m, count: 1, topicCount: a.topics.length, dates: [a.date] });
      }
    });
    return Array.from(monthMap.entries()).sort((a, b) => b[0].localeCompare(a[0]));
  }, [analyses]);

  const monthNames = {
    hi: ['', 'जनवरी', 'फरवरी', 'मार्च', 'अप्रैल', 'मई', 'जून', 'जुलाई', 'अगस्त', 'सितंबर', 'अक्टूबर', 'नवंबर', 'दिसंबर'],
    en: ['', 'January', 'February', 'March', 'April', 'May', 'June', 'July', 'August', 'September', 'October', 'November', 'December'],
  };

  const handleDownload = async (year: number, month: number, monthName: string) => {
    toast.info(lang === 'hi' ? 'पत्रिका तैयार की जा रही है...' : 'Compiling magazine...');
    try {
      const monthAnalyses = await getAnalysesForMonth(year, month);
      generateMagazinePDF(monthAnalyses, monthName, String(year), lang);
      toast.success(lang === 'hi' ? 'डाउनलोड शुरू हुआ' : 'Download started');
    } catch (error) {
      toast.error(lang === 'hi' ? 'विफल रहा' : 'Failed to generate PDF');
    }
  };

  return (
    <AppLayout>
      <div className="max-w-6xl mx-auto space-y-12 pb-20">
        {/* Header Section */}
        <div className="text-center space-y-4">
          <div className="inline-flex items-center gap-2 px-4 py-1.5 rounded-full bg-accent/10 text-accent text-xs font-black uppercase tracking-[0.2em] border border-accent/20">
            <Star className="h-3 w-3 fill-current" />
            {lang === 'hi' ? 'विशिष्ट संग्रह' : 'Exclusive Volumes'}
          </div>
          <h1 className="text-6xl font-display font-black text-foreground tracking-tighter">
            {lang === 'hi' ? 'ज्ञान-कोष पत्रिका' : 'Intelligence Digest'}
          </h1>
          <p className="text-xl text-muted-foreground font-body max-w-2xl mx-auto leading-relaxed">
            {lang === 'hi' 
              ? 'गहन शोध और उच्च गुणवत्ता वाली UPSC संकलित मासिक पत्रिकाएं।' 
              : 'High-fidelity monthly compilations curated for peak UPSC analytical readiness.'}
          </p>
        </div>

        {/* Shelf Grid */}
        {loading ? (
          <div className="grid gap-8 sm:grid-cols-2 lg:grid-cols-3">
             {[1,2,3].map(i => (
              <div key={i} className="aspect-[3/4] rounded-3xl bg-muted animate-pulse border border-border" />
            ))}
          </div>
        ) : months.length === 0 ? (
          <div className="text-center py-24 rounded-[3rem] border-4 border-dashed border-muted bg-muted/5 p-8">
            <div className="w-24 h-24 bg-muted rounded-full flex items-center justify-center mx-auto mb-6 transform -rotate-12">
              <BookOpen className="h-10 w-10 text-muted-foreground" />
            </div>
            <h2 className="text-2xl font-display font-bold text-foreground">
              {lang === 'hi' ? 'अभी कोई खंड तैयार नहीं है' : 'No Volumes Ready Yet'}
            </h2>
            <p className="text-muted-foreground font-body mt-3 max-w-sm mx-auto">
              {lang === 'hi' 
                ? 'दैनिक विश्लेषणों को सेव करना जारी रखें। महीने के अंत में आपका प्रथम खंड यहाँ स्वतः प्रकट होगा।' 
                : 'Keep saving daily briefings. Your first volume will manifest here once a month of intelligence is gathered.'}
            </p>
          </div>
        ) : (
          <div className="grid gap-10 sm:grid-cols-2 lg:grid-cols-3">
            {months.map(([key, data], idx) => {
              const monthLabel = monthNames[lang][data.month];
              const monthLabelEn = monthNames['en'][data.month];

              return (
                <motion.div
                  key={key}
                  initial={{ opacity: 0, scale: 0.9 }}
                  animate={{ opacity: 1, scale: 1 }}
                  transition={{ delay: idx * 0.1 }}
                  className="group relative"
                >
                  <div className="absolute inset-x-4 -top-4 h-full bg-accent/20 rounded-[3rem] blur-2xl opacity-0 group-hover:opacity-100 transition-opacity duration-500" />
                  
                  <div className="relative overflow-hidden rounded-[2.5rem] bg-card border-2 border-border shadow-md hover:shadow-2xl transition-all duration-500 hover:-translate-y-2 flex flex-col h-full bg-white dark:bg-zinc-900">
                    {/* Visual Header */}
                    <div className="h-48 relative overflow-hidden navy-gradient flex flex-col items-center justify-center text-center p-6">
                      <div className="absolute top-0 right-0 p-4 opacity-10">
                        <Layers className="h-32 w-32" />
                      </div>
                      <div className="relative z-10 space-y-1">
                        <p className="text-[10px] font-black uppercase tracking-[0.3em] text-accent opacity-80">Collection Volume</p>
                        <h3 className="text-3xl font-display font-black text-white">{monthLabel}</h3>
                        <p className="text-white/60 font-mono text-lg">{data.year}</p>
                      </div>
                    </div>

                    {/* Stats */}
                    <div className="p-8 flex-1 space-y-6">
                      <div className="grid grid-cols-2 gap-4">
                        <div className="p-4 rounded-2xl bg-muted/50 border border-border/50 text-center">
                          <p className="text-[10px] font-black uppercase text-muted-foreground tracking-widest mb-1">Briefings</p>
                          <p className="text-2xl font-black text-foreground">{data.count}</p>
                        </div>
                        <div className="p-4 rounded-2xl bg-muted/50 border border-border/50 text-center">
                          <p className="text-[10px] font-black uppercase text-muted-foreground tracking-widest mb-1">Intel Units</p>
                          <p className="text-2xl font-black text-foreground">{data.topicCount}</p>
                        </div>
                      </div>

                      <div className="space-y-4">
                        <div className="flex items-center justify-between text-xs font-bold font-body uppercase tracking-tighter text-muted-foreground">
                          <span>Archive Progress</span>
                          <span>{Math.round((data.count / 30) * 100)}%</span>
                        </div>
                        <div className="h-2 w-full bg-muted rounded-full overflow-hidden">
                          <motion.div 
                            initial={{ width: 0 }}
                            animate={{ width: `${(data.count / 30) * 100}%` }}
                            className="h-full gold-gradient" 
                          />
                        </div>
                      </div>
                    </div>

                    {/* Action */}
                    <div className="p-6 pt-0 mt-auto">
                      <Button
                        onClick={() => handleDownload(data.year, data.month, monthLabelEn)}
                        className="w-full py-7 rounded-2xl bg-foreground text-background hover:bg-accent hover:text-accent-foreground font-black uppercase tracking-widest text-xs gap-3 transition-all group/btn shadow-xl"
                      >
                        <Download className="h-5 w-5 group-hover/btn:animate-bounce" />
                        {lang === 'hi' ? 'PDF डाउनलोड करें' : 'Download volume'}
                      </Button>
                    </div>
                  </div>
                </motion.div>
              );
            })}
          </div>
        )}

        {/* Info Banner */}
        <div className="p-8 rounded-[3rem] bg-muted/30 border border-border flex flex-col md:flex-row items-center gap-8 justify-between">
          <div className="flex items-center gap-6">
            <div className="w-16 h-16 rounded-3xl navy-gradient flex items-center justify-center shrink-0">
              <FileText className="h-8 w-8 text-white" />
            </div>
            <div>
              <h4 className="text-xl font-display font-bold">{lang === 'hi' ? 'अनुकूलन योग्य प्रिंट' : 'Print-Ready Format'}</h4>
              <p className="text-muted-foreground font-body text-sm mt-1">
                {lang === 'hi' 
                  ? 'सभी पत्रिकाएं उच्च-रिज़ॉल्यूशन फोंट और प्रिंट-तैयार लेआउट के साथ आती हैं।' 
                  : 'All volumes are generated in high-fidelity PDF formats, optimized for offline reading and physical printing.'}
              </p>
            </div>
          </div>
          <div className="flex -space-x-3">
             {[1,2,3,4].map(i => (
               <div key={i} className="w-10 h-10 rounded-full border-2 border-background bg-accent/20 flex items-center justify-center text-[10px] font-black text-accent-foreground">V{i}</div>
             ))}
          </div>
        </div>
      </div>
    </AppLayout>
  );
};

export default MagazinePage;
