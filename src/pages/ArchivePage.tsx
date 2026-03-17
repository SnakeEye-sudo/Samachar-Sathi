import { useLanguage } from '@/context/LanguageContext';
import { getAllAnalyses } from '@/lib/db';
import { DailyNews } from '@/types/news';
import { useState, useEffect } from 'react';
import { Link } from 'react-router-dom';
import { Calendar, Search, Clock, ChevronRight, BookOpen } from 'lucide-react';
import { useMemo } from 'react';
import AppLayout from '@/components/AppLayout';
import { motion } from 'framer-motion';
import { Input } from '@/components/ui/input';

const ArchivePage = () => {
  const { lang } = useLanguage();
  const [analyses, setAnalyses] = useState<DailyNews[]>([]);
  const [loading, setLoading] = useState(true);
  const [searchQuery, setSearchQuery] = useState('');

  useEffect(() => {
    const fetchData = async () => {
      const allAnalyses = await getAllAnalyses();
      setAnalyses(allAnalyses);
      setLoading(false);
    };
    fetchData();
  }, []);

  const filteredAnalyses = useMemo(() => {
    let result = [...analyses].sort((a, b) => b.metadata.date.localeCompare(a.metadata.date));
    
    if (searchQuery) {
      const query = searchQuery.toLowerCase();
      result = result.filter(a => 
        a.metadata.date.includes(query) || 
        a.categories.some(cat => 
          cat.name.toLowerCase().includes(query) ||
          cat.news.some(n => 
            n.title.hi.toLowerCase().includes(query) || 
            n.title.en.toLowerCase().includes(query)
          )
        )
      );
    }
    
    return result;
  }, [analyses, searchQuery]);

  return (
    <AppLayout>
      <div className="max-w-4xl mx-auto space-y-10 pb-20">
        {/* Header */}
        <div className="space-y-4">
          <div className="inline-flex items-center gap-2 px-3 py-1 rounded-full bg-accent/10 text-accent text-[10px] font-bold uppercase tracking-widest border border-accent/20">
            <Clock className="h-3 w-3" />
            {lang === 'hi' ? 'ऐतिहासिक रिकॉर्ड' : 'Intelligence Vault'}
          </div>
          <h1 className="text-5xl font-display font-black text-foreground tracking-tight">
            {lang === 'hi' ? 'ज्ञान संग्रह' : 'Knowledge Repository'}
          </h1>
          <p className="text-lg text-muted-foreground font-body max-w-2xl leading-relaxed">
            {lang === 'hi' 
              ? 'आपके सभी पिछले दैनिक संक्षिप्त विवरण और बुद्धिमत्ता रिपोर्ट का पूर्ण संकलन।' 
              : 'The complete compilation of your past daily briefings and intelligence units.'}
          </p>
        </div>

        {/* Search & Filter */}
        <div className="relative group max-w-lg">
          <Search className="absolute left-4 top-1/2 -translate-y-1/2 h-5 w-5 text-muted-foreground group-focus-within:text-accent transition-colors" />
          <Input 
            value={searchQuery}
            onChange={(e) => setSearchQuery(e.target.value)}
            placeholder={lang === 'hi' ? 'तारीख या विषय खोजें...' : 'Search by date or intelligence unit...'}
            className="pl-12 py-7 rounded-2xl border-2 focus-visible:ring-0 focus-visible:border-accent font-body bg-background/50 backdrop-blur-sm shadow-md"
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
          <div className="text-center py-24 rounded-[3rem] border-2 border-dashed border-border bg-muted/20">
            <Calendar className="h-16 w-16 mx-auto mb-4 text-muted-foreground opacity-20" />
            <h3 className="text-xl font-display font-bold text-foreground">
              {lang === 'hi' ? 'कोई रिकॉर्ड नहीं मिला' : 'No Records Found'}
            </h3>
            <p className="text-muted-foreground font-body mt-2">
              {searchQuery ? (lang === 'hi' ? 'अपनी खोज बदलें' : 'Try a different search term') : (lang === 'hi' ? 'दैनिक विश्लेषण सेव होने पर यहाँ संग्रह बनेगा' : 'The repository will populate as you save daily intelligence')}
            </p>
          </div>
        ) : (
          <div className="grid gap-4">
            {filteredAnalyses.map((analysis, idx) => {
              const dateObj = new Date(analysis.metadata.date);
              const day = dateObj.getDate();
              const month = dateObj.toLocaleDateString(lang === 'hi' ? 'hi-IN' : 'en-IN', { month: 'short' });
              const year = dateObj.getFullYear();
              
              const totalNews = analysis.categories.reduce((acc, cat) => acc + cat.news.length, 0);
              const topCategory = analysis.categories.find(c => c.news.length > 0)?.name || 'N/A';

              return (
                <motion.div
                  key={analysis.metadata.date}
                  initial={{ opacity: 0, x: -20 }}
                  animate={{ opacity: 1, x: 0 }}
                  transition={{ delay: idx * 0.05 }}
                >
                  <Link
                    to={`/?date=${analysis.metadata.date}`}
                    className="group relative flex items-center gap-6 p-5 rounded-[2.5rem] bg-card border-2 border-border shadow-sm hover:shadow-2xl hover:border-accent/30 transition-all duration-500"
                  >
                    {/* Date Block */}
                    <div className="w-20 h-24 rounded-3xl navy-gradient flex flex-col items-center justify-center text-white shadow-xl group-hover:scale-105 transition-transform">
                      <span className="text-xs uppercase font-black opacity-60 tracking-tighter">{month}</span>
                      <span className="text-3xl font-black leading-none my-1">{day}</span>
                      <span className="text-[10px] opacity-60 font-mono">{year}</span>
                    </div>

                    {/* Content */}
                    <div className="flex-1 space-y-2">
                      <div className="flex items-center gap-2">
                        <span className="text-[10px] px-3 py-1 rounded-full bg-accent/10 text-accent font-black uppercase tracking-tight border border-accent/20">
                          {topCategory}
                        </span>
                        {analysis.categories.length > 1 && (
                          <span className="text-[10px] px-3 py-1 rounded-full bg-muted text-muted-foreground font-bold uppercase tracking-tight">
                            +{analysis.categories.length - 1} Categories
                          </span>
                        )}
                        <span className="text-[10px] px-3 py-1 rounded-full bg-emerald-500/10 text-emerald-600 font-bold uppercase tracking-tight">
                           {totalNews} Units
                        </span>
                      </div>
                      <h4 className="text-xl font-display font-black group-hover:text-accent transition-colors leading-tight line-clamp-1">
                        {analysis.categories.find(c => c.news.length > 0)?.news[0]?.title[lang === 'hi' ? 'hi' : 'en']}
                      </h4>
                    </div>

                    {/* Actions */}
                    <div className="flex items-center pr-4">
                      <div className="w-12 h-12 rounded-full border-2 border-border flex items-center justify-center group-hover:bg-accent group-hover:border-accent group-hover:text-accent-foreground transition-all duration-500">
                        <ChevronRight className="h-6 w-6" />
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
