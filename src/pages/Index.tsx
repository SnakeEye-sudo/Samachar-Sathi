import { useLanguage } from '@/context/LanguageContext';
import { useEffect, useState } from 'react';
import { useSearchParams } from 'react-router-dom';
import AppLayout from '@/components/AppLayout';
import { getAnalysisByDate, saveAnalysis, saveQuiz } from '@/lib/db';
import { sampleAnalysis, sampleQuiz } from '@/lib/seedData';
import DailyAnalysisView from '@/components/DailyAnalysisView';
import { DailyAnalysis } from '@/types/news';
import { toast } from 'sonner';
import { Calendar as CalendarIcon, Filter, Search, Sparkles } from 'lucide-react';
import { Button } from '@/components/ui/button';
import { Input } from '@/components/ui/input';
import { Popover, PopoverContent, PopoverTrigger } from '@/components/ui/popover';
import { Calendar } from '@/components/ui/calendar';
import { format } from 'date-fns';

const Index = () => {
  const { lang } = useLanguage();
  const [searchParams, setSearchParams] = useSearchParams();
  const dateParam = searchParams.get('date');
  const today = new Date().toISOString().split('T')[0];
  const date = dateParam || today;

  const [analysis, setAnalysis] = useState<DailyAnalysis | null>(null);
  const [loading, setLoading] = useState(true);

  useEffect(() => {
    const loadData = async () => {
      setLoading(true);
      
      // 1. Try to get from local IndexedDB first
      let data = await getAnalysisByDate(date);
      
      // 2. If not in DB, try to fetch from public/news/[date].json (for deployed site)
      if (!data) {
        try {
          const response = await fetch(`${import.meta.env.BASE_URL}news/${date}.json`);
          if (response.ok) {
            const remoteData = await response.json();
            if (remoteData.analysis) {
              data = remoteData; // Store the whole object including mcqs and title
              await saveAnalysis(remoteData.analysis);
              if (remoteData.mcqs) await saveQuiz(remoteData.mcqs);
            }
          }
        } catch (error) {
          console.error("Error fetching remote news:", error);
        }
      }

      // 3. Fallback to sample ONLY if it's "today" and still no data 
      // AND there is absolutely no other data in the system (first run experience)
      if (!data && date === today) {
        // Only seed if user hasn't added anything yet
        const existing = await getAnalysisByDate(today);
        if (!existing) {
          data = sampleAnalysis;
          await saveAnalysis(sampleAnalysis);
          await saveQuiz(sampleQuiz);
        }
      }

      setAnalysis(data);
      setLoading(false);
    };

    loadData();
  }, [date, today]);

  const handleDateChange = (newDate: Date | undefined) => {
    if (newDate) {
      const formattedDate = format(newDate, 'yyyy-MM-dd');
      setSearchParams({ date: formattedDate });
    }
  };

  return (
    <AppLayout>
      <div className="max-w-6xl mx-auto space-y-12">
        {/* Controls Bar */}
        <div className="flex flex-col md:flex-row items-center justify-between gap-6 px-4">
           <div className="space-y-1 text-center md:text-left">
              <h2 className="text-3xl font-display font-black tracking-tight text-foreground">
                {lang === 'hi' ? 'दैनिक बुलेटिन' : 'Daily Intelligence'}
              </h2>
              <p className="text-muted-foreground font-body text-sm font-bold uppercase tracking-widest flex items-center gap-2 justify-center md:justify-start">
                 <CalendarIcon className="h-3 w-3" />
                 {format(new Date(date), 'PPP', { locale: undefined })}
              </p>
           </div>

           <div className="flex items-center gap-3">
             <Popover>
               <PopoverTrigger asChild>
                 <Button variant="outline" className="rounded-full border-2 py-6 px-6 font-bold gap-3 shadow-md hover:border-accent group">
                   <CalendarIcon className="h-5 w-5 text-accent group-hover:animate-bounce" />
                   {lang === 'hi' ? 'तिथि बदलें' : 'Archive Calendar'}
                 </Button>
               </PopoverTrigger>
               <PopoverContent className="w-auto p-0 rounded-3xl" align="end">
                 <Calendar
                   mode="single"
                   selected={new Date(date)}
                   onSelect={handleDateChange}
                   initialFocus
                 />
               </PopoverContent>
             </Popover>
           </div>
        </div>

        {/* Content Area */}
        {loading ? (
          <div className="flex flex-col items-center justify-center min-h-[500px] space-y-6">
            <div className="relative">
               <div className="w-20 h-20 rounded-[2rem] border-4 border-accent/20 border-t-accent animate-spin" />
               <div className="absolute inset-0 flex items-center justify-center">
                  <Sparkles className="h-8 w-8 text-accent animate-pulse" />
               </div>
            </div>
            <div className="text-center space-y-2">
              <p className="text-xl font-display font-black uppercase tracking-[0.3em] text-foreground animate-pulse">
                {lang === 'hi' ? 'बुद्धिमत्ता संकलित हो रही है' : 'Gathering Intel'}
              </p>
              <p className="text-muted-foreground font-body text-sm">Syncing with local vault...</p>
            </div>
          </div>
        ) : analysis ? (
          <DailyAnalysisView analysis={analysis} />
        ) : (
          <div className="flex flex-col items-center justify-center min-h-[600px] text-center px-4">
            <div className="relative mb-10 group">
                <div className="absolute inset-0 bg-accent/20 blur-3xl rounded-full opacity-50 group-hover:opacity-100 transition-opacity" />
                <div className="w-32 h-32 rounded-[3.5rem] bg-card border-4 border-border flex items-center justify-center relative transform rotate-12 group-hover:rotate-0 transition-transform duration-500">
                   <span className="text-6xl text-muted-foreground opacity-30">?</span>
                </div>
            </div>
            <div className="space-y-6 max-w-md">
              <h2 className="text-4xl font-display font-black text-foreground tracking-tighter">
                {lang === 'hi' ? 'डेटा अनुपलब्ध' : 'Intelligence Gap'}
              </h2>
              <p className="text-lg text-muted-foreground font-body leading-relaxed">
                {lang === 'hi' 
                  ? `क्षमा करें, ${date} के लिए इस डिवाइस के वॉल्ट में कोई डेटा नहीं मिला।` 
                  : `No intelligence recorded for ${date} in this vault. New data can be populated via the Newsroom Terminal.`}
              </p>
              <div className="flex flex-col sm:flex-row gap-4 justify-center pt-4">
                <Button 
                  onClick={() => setSearchParams({ date: today })}
                  className="rounded-2xl py-6 px-8 navy-gradient text-white font-bold"
                >
                  {lang === 'hi' ? 'आज पर लौटें' : 'Return to Current'}
                </Button>
                <Button 
                   asChild
                   variant="outline"
                   className="rounded-2xl py-6 px-8 border-2 font-bold"
                >
                  <a href="/admin">
                    {lang === 'hi' ? 'न्यूज़रूम खोलें' : 'Enter Newsroom'}
                  </a>
                </Button>
              </div>
            </div>
          </div>
        )}
      </div>
    </AppLayout>
  );
};

export default Index;
