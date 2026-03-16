import { useLanguage } from '@/context/LanguageContext';
import { getAllAnalyses, getAllQuizResults } from '@/lib/db';
import { DailyAnalysis, QuizResult } from '@/types/news';
import { useState, useEffect } from 'react';
import { Link } from 'react-router-dom';
import { Calendar, BookOpen, Trophy, ChevronRight, Search, Clock, Filter } from 'lucide-react';
import { useMemo } from 'react';
import AppLayout from '@/components/AppLayout';
import { motion } from 'framer-motion';
import { Input } from '@/components/ui/input';
import { cn } from '@/lib/utils';

const ArchivePage = () => {
  const { lang } = useLanguage();
  const [analyses, setAnalyses] = useState<DailyAnalysis[]>([]);
  const [quizResults, setQuizResults] = useState<QuizResult[]>([]);
  const [loading, setLoading] = useState(true);
  const [searchQuery, setSearchQuery] = useState('');

  useEffect(() => {
    const fetchData = async () => {
      const allAnalyses = await getAllAnalyses();
      const allResults = await getAllQuizResults();
      setAnalyses(allAnalyses);
      setQuizResults(allResults);
      setLoading(false);
    };
    fetchData();
  }, []);

  const filteredAnalyses = useMemo(() => {
    let result = [...analyses].sort((a, b) => b.date.localeCompare(a.date));
    
    if (searchQuery) {
      const query = searchQuery.toLowerCase();
      result = result.filter(a => 
        a.date.includes(query) || 
        a.topics.some(t => 
          t.title.hi.toLowerCase().includes(query) || 
          t.title.en.toLowerCase().includes(query)
        )
      );
    }
    
    return result;
  }, [analyses, searchQuery]);

  const getQuizResult = (date: string) => quizResults.find(r => r.date === date);

  return (
    <AppLayout>
      <div className="max-w-4xl mx-auto space-y-10 pb-20">
        {/* Header */}
        <div className="space-y-4">
          <div className="inline-flex items-center gap-2 px-3 py-1 rounded-full bg-navy/5 text-navy text-[10px] font-bold uppercase tracking-widest border border-navy/10">
            <Clock className="h-3 w-3" />
            {lang === 'hi' ? 'ऐतिहासिक रिकॉर्ड' : 'Historical Records'}
          </div>
          <h1 className="text-5xl font-display font-bold text-foreground tracking-tight">
            {lang === 'hi' ? 'ज्ञान संग्रह' : 'Knowledge Repository'}
          </h1>
          <p className="text-lg text-muted-foreground font-body max-w-2xl leading-relaxed">
            {lang === 'hi' 
              ? 'आपके सभी पिछले दैनिक संक्षिप्त विवरण और बुद्धिमत्ता रिपोर्ट का पूर्ण संकलन।' 
              : 'The complete compilation of your past daily briefings and intelligence reports.'}
          </p>
        </div>

        {/* Search & Filter */}
        <div className="relative group max-w-lg">
          <Search className="absolute left-4 top-1/2 -translate-y-1/2 h-5 w-5 text-muted-foreground group-focus-within:text-accent transition-colors" />
          <Input 
            value={searchQuery}
            onChange={(e) => setSearchQuery(e.target.value)}
            placeholder={lang === 'hi' ? 'तारीख या विषय खोजें...' : 'Search by date or topic...'}
            className="pl-12 py-7 rounded-2xl border-2 focus-visible:ring-0 focus-visible:border-accent font-body bg-background/50 backdrop-blur-sm shadow-sm"
          />
        </div>

        {/* Grid List */}
        {loading ? (
          <div className="grid gap-4">
            {[1,2,3].map(i => (
              <div key={i} className="h-24 rounded-3xl bg-muted animate-pulse" />
            ))}
          </div>
        ) : filteredAnalyses.length === 0 ? (
          <div className="text-center py-24 rounded-3xl border-2 border-dashed border-border bg-muted/20">
            <Calendar className="h-16 w-16 mx-auto mb-4 text-muted-foreground opacity-20" />
            <h3 className="text-xl font-display font-bold text-foreground">
              {lang === 'hi' ? 'कोई रिकॉर्ड नहीं मिला' : 'No Records Found'}
            </h3>
            <p className="text-muted-foreground font-body mt-2">
              {searchQuery ? (lang === 'hi' ? 'अपनी खोज बदलें' : 'Try a different search term') : (lang === 'hi' ? 'दैनिक विश्लेषण सेव होने पर यहाँ संग्रह बनेगा' : 'The repository will populate as you save daily analyses')}
            </p>
          </div>
        ) : (
          <div className="grid gap-4">
            {filteredAnalyses.map((analysis, idx) => {
              const dateObj = new Date(analysis.date);
              const day = dateObj.getDate();
              const month = dateObj.toLocaleDateString(lang === 'hi' ? 'hi-IN' : 'en-IN', { month: 'short' });
              const year = dateObj.getFullYear();
              const result = getQuizResult(analysis.date);

              return (
                <motion.div
                  key={analysis.date}
                  initial={{ opacity: 0, y: 10 }}
                  animate={{ opacity: 1, y: 0 }}
                  transition={{ delay: idx * 0.05 }}
                >
                  <Link
                    to={`/?date=${analysis.date}`}
                    className="group relative flex items-center gap-6 p-5 rounded-[2rem] bg-card border border-border shadow-sm hover:shadow-xl hover:border-accent/30 transition-all duration-500"
                  >
                    {/* Date Block */}
                    <div className="w-16 h-20 rounded-2xl gold-gradient flex flex-col items-center justify-center text-accent-foreground shadow-lg shadow-accent/10">
                      <span className="text-xs uppercase font-bold opacity-70 tracking-tighter">{month}</span>
                      <span className="text-2xl font-black">{day}</span>
                      <span className="text-[10px] opacity-70 font-mono mt-0.5">{year}</span>
                    </div>

                    {/* Content */}
                    <div className="flex-1 space-y-2">
                      <div className="flex items-center gap-2">
                        {analysis.topics.slice(0, 3).map((topic, i) => (
                          <span key={i} className="text-[10px] px-2 py-0.5 rounded-full bg-secondary text-secondary-foreground font-bold uppercase tracking-tight">
                            {topic.category.en}
                          </span>
                        ))}
                        {analysis.topics.length > 3 && (
                          <span className="text-[10px] text-muted-foreground font-bold">+{analysis.topics.length - 3}</span>
                        )}
                      </div>
                      <h4 className="text-lg font-display font-bold group-hover:text-accent transition-colors leading-tight line-clamp-1">
                        {analysis.topics[0]?.title[lang]}
                      </h4>
                    </div>

                    {/* Stats & Actions */}
                    <div className="flex items-center gap-6 pr-4">
                      {result && result.total > 0 && (
                        <div className="text-right hidden sm:block">
                          <p className="text-[10px] font-bold text-muted-foreground uppercase opacity-50 mb-0.5">Quiz Score</p>
                          <div className="flex items-center gap-2">
                            <Trophy className={cn(
                              "h-3.5 w-3.5",
                              (result.score / result.total) >= 0.7 ? "text-emerald-500" : "text-amber-500"
                            )} />
                            <span className="text-sm font-black tracking-tight">{result.score}/{result.total}</span>
                          </div>
                        </div>
                      )}
                      <div className="w-10 h-10 rounded-full bg-muted flex items-center justify-center group-hover:bg-accent group-hover:text-accent-foreground transition-all duration-500">
                        <ChevronRight className="h-5 w-5" />
                      </div>
                    </div>
                  </Link>
                </motion.div>
              );
            })}
          </div>
        )}
      </div>
    </AppLayout>
  );
};

export default ArchivePage;
