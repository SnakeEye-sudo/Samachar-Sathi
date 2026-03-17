import { useLanguage } from '@/context/LanguageContext';
import { useEffect, useState } from 'react';
import { useSearchParams } from 'react-router-dom';
import AppLayout from '@/components/AppLayout';
import { getAnalysisByDate, saveAnalysis } from '@/lib/db';
import { sampleAnalysis } from '@/lib/seedData';
import DailyAnalysisView from '@/components/DailyAnalysisView';
import { DailyNews } from '@/types/news';
import { Calendar as CalendarIcon, Sparkles } from 'lucide-react';
import { Button } from '@/components/ui/button';
import { Popover, PopoverContent, PopoverTrigger } from '@/components/ui/popover';
import { Calendar } from '@/components/ui/calendar';
import { format } from 'date-fns';

const Index = () => {
  const { lang } = useLanguage();
  const [searchParams, setSearchParams] = useSearchParams();
  const dateParam = searchParams.get('date');
  const today = new Date().toISOString().split('T')[0];
  const date = dateParam || today;

  const [analysis, setAnalysis] = useState<DailyNews | null>(null);
  const [loading, setLoading] = useState(true);

  useEffect(() => {
    const loadData = async () => {
      setLoading(true);
      
      // 1. Try to get from local IndexedDB
      let data = await getAnalysisByDate(date);
      
      // 2. If not in DB, try to fetch remote (for deployment)
      if (!data) {
        try {
          const response = await fetch(`${import.meta.env.BASE_URL}news/${date}.json`);
          if (response.ok) {
            data = await response.json();
            if (data) await saveAnalysis(data);
          }
        } catch (error) {
          console.error("Error fetching remote news:", error);
        }
      }

      // 3. Fallback to sample for today and first-time users
      if (!data && date === today) {
        data = sampleAnalysis;
        await saveAnalysis(sampleAnalysis);
      }

      setAnalysis(data || null);
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
      <div className="max-w-6xl mx-auto space-y-8">
        <div className="flex flex-col md:flex-row items-center justify-between gap-6 px-4">
           <div className="space-y-1 text-center md:text-left">
              <h2 className="text-3xl font-display font-black tracking-tight text-foreground">
                {lang === 'hi' ? 'दैनिक बुलेटिन' : 'Daily Intelligence'}
              </h2>
              <p className="text-muted-foreground font-body text-sm font-bold uppercase tracking-widest flex items-center gap-2 justify-center md:justify-start">
                 <CalendarIcon className="h-3 w-3" />
                 {format(new Date(date), 'PPP')}
              </p>
           </div>

           <div className="flex items-center gap-3">
             <Popover>
               <PopoverTrigger asChild>
                 <Button variant="outline" className="rounded-full border-2 py-6 px-6 font-bold gap-3 shadow-md hover:border-accent">
                   <CalendarIcon className="h-5 w-5 text-accent" />
                   {lang === 'hi' ? 'बुलेटिन बदलें' : 'Change Date'}
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

        {loading ? (
          <div className="flex flex-col items-center justify-center min-h-[500px] space-y-6">
            <div className="relative">
               <div className="w-16 h-16 rounded-[1.5rem] border-4 border-accent/20 border-t-accent animate-spin" />
               <div className="absolute inset-0 flex items-center justify-center">
                  <Sparkles className="h-6 w-6 text-accent animate-pulse" />
               </div>
            </div>
          </div>
        ) : analysis ? (
          <DailyAnalysisView analysis={analysis} />
        ) : (
          <div className="flex flex-col items-center justify-center min-h-[500px] text-center px-4">
             <h2 className="text-2xl font-display font-black text-foreground">{lang === 'hi' ? 'डेटा नहीं मिला' : 'Intelligence Not Found'}</h2>
             <p className="text-muted-foreground mt-2">{lang === 'hi' ? 'इस तिथि के लिए कोई डेटा उपलब्ध नहीं है।' : 'No data recorded for this date.'}</p>
             <Button onClick={() => setSearchParams({ date: today })} className="mt-6 rounded-2xl px-8">
                {lang === 'hi' ? 'आज पर लौटें' : 'Back to Today'}
             </Button>
          </div>
        )}
      </div>
    </AppLayout>
  );
};

export default Index;
