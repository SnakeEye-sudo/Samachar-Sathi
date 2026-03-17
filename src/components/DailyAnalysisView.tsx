import { useLanguage } from '@/context/LanguageContext';
import { DailyNews, NewsUnit } from '@/types/news';
import { useState } from 'react';
import { Download, ChevronDown, ExternalLink, Sparkles, Globe, Calendar, Link as LinkIcon, Info } from 'lucide-react';
import { Button } from '@/components/ui/button';
import { motion, AnimatePresence } from 'framer-motion';
import { cn } from '@/lib/utils';

const NewsItemCard = ({ item, index }: { item: NewsUnit; index: number }) => {
  const { lang } = useLanguage();
  const [expanded, setExpanded] = useState(false);

  return (
    <motion.div 
      initial={{ opacity: 0, y: 15 }}
      animate={{ opacity: 1, y: 0 }}
      transition={{ delay: index * 0.05 }}
      className={cn(
        "group relative overflow-hidden rounded-2xl border transition-all duration-300",
        expanded 
          ? "bg-card border-accent/40 shadow-xl" 
          : "bg-card/50 border-border/50 hover:border-accent/30 hover:bg-card shadow-sm"
      )}
    >
      <div className="p-4 md:p-6">
        <div className="flex justify-between items-start gap-4">
          <div className="flex-1 space-y-2">
            <div className="flex items-center gap-2 text-[10px] font-bold text-muted-foreground uppercase tracking-wider">
              <Globe className="w-3 h-3 text-accent" />
              {item.source}
            </div>
            <h4 className="text-lg md:text-xl font-display font-bold text-foreground group-hover:text-accent transition-colors leading-tight">
              {lang === 'hi' ? item.title.hi : item.title.en}
            </h4>
          </div>
          <Button
            variant="ghost"
            size="sm"
            onClick={() => setExpanded(!expanded)}
            className={cn(
              "w-8 h-8 rounded-full border transition-all shrink-0",
              expanded ? "bg-accent text-accent-foreground border-accent" : "bg-muted/50 border-border"
            )}
          >
            <ChevronDown className={cn("h-4 w-4 transition-transform", expanded && "rotate-180")} />
          </Button>
        </div>

        <div className="mt-4 flex flex-wrap gap-2">
           <a 
              href={item.link} 
              target="_blank" 
              rel="noopener noreferrer"
              className="inline-flex items-center gap-1.5 px-3 py-1.5 rounded-lg bg-accent/10 text-accent text-xs font-bold hover:bg-accent/20 transition-colors"
            >
              <LinkIcon className="w-3 h-3" />
              {lang === 'hi' ? 'समाचार स्रोत' : 'News Source'}
            </a>
            <button 
              onClick={() => setExpanded(!expanded)}
              className="inline-flex items-center gap-1.5 px-3 py-1.5 rounded-lg bg-muted text-muted-foreground text-xs font-bold hover:bg-muted/80 transition-colors"
            >
              <Info className="w-3 h-3" />
              {lang === 'hi' ? 'UPSC लिंकेज' : 'UPSC Linkage'}
            </button>
        </div>

        <AnimatePresence>
          {expanded && (
            <motion.div
              initial={{ height: 0, opacity: 0 }}
              animate={{ height: 'auto', opacity: 1 }}
              exit={{ height: 0, opacity: 0 }}
              className="overflow-hidden"
            >
              <div className="mt-6 pt-6 border-t border-border/50 space-y-6">
                <div className="space-y-3">
                   <h5 className="text-xs font-black text-accent uppercase tracking-widest flex items-center gap-2">
                      <Sparkles className="w-3.5 h-3.5" />
                      {lang === 'hi' ? 'समाचार विश्लेषण (Understanding)' : 'News Analysis (Understanding)'}
                   </h5>
                   <p className="text-sm font-body text-foreground/90 leading-relaxed">
                      {lang === 'hi' ? item.analysis.hi : item.analysis.en}
                   </p>
                </div>

                <div className="grid gap-4 sm:grid-cols-2">
                   <div className="p-4 rounded-xl bg-accent/5 border border-accent/10 space-y-2">
                      <h6 className="text-[10px] font-black text-accent uppercase tracking-wider">
                         {lang === 'hi' ? 'UPSC क्यों पूछेगा?' : 'Why UPSC might ask?'}
                      </h6>
                      <p className="text-xs font-body text-muted-foreground">
                         {lang === 'hi' ? item.upscContext.relevance.hi : item.upscContext.relevance.en}
                      </p>
                   </div>
                   <div className="p-4 rounded-xl bg-muted/30 border border-border/50 space-y-2">
                      <h6 className="text-[10px] font-black text-muted-foreground uppercase tracking-wider">
                         {lang === 'hi' ? 'स्टैटिक लिंकेज (Static Linkage)' : 'Static Linkage'}
                      </h6>
                      <p className="text-xs font-body text-muted-foreground">
                         {lang === 'hi' ? item.upscContext.staticLinkage.hi : item.upscContext.staticLinkage.en}
                      </p>
                   </div>
                </div>
                
                {item.upscContext.concerns && (
                  <div className="p-4 rounded-xl bg-orange-500/5 border border-orange-500/10 space-y-2">
                     <h6 className="text-[10px] font-black text-orange-600 uppercase tracking-wider">
                        {lang === 'hi' ? 'मुख्य चिंताएं एवं चुनौतियां' : 'Key Concerns & Challenges'}
                     </h6>
                     <p className="text-xs font-body text-orange-900/70">
                        {lang === 'hi' ? item.upscContext.concerns.hi : item.upscContext.concerns.en}
                     </p>
                  </div>
                )}
              </div>
            </motion.div>
          )}
        </AnimatePresence>
      </div>
    </motion.div>
  );
};

const DailyAnalysisView = ({ analysis }: { analysis: DailyNews }) => {
  const { lang } = useLanguage();
  const [activeCategory, setActiveCategory] = useState<string | null>(null);

  const dateStr = new Date(analysis.metadata.date).toLocaleDateString(lang === 'hi' ? 'hi-IN' : 'en-IN', {
    weekday: 'long', year: 'numeric', month: 'long', day: 'numeric',
  });

  const categories = analysis.categories.filter(c => c.news.length > 0);

  return (
    <div className="space-y-10 pb-20 px-4">
      {/* Premium Header */}
      <section className="relative rounded-[2.5rem] overflow-hidden py-10 px-8 md:px-12 navy-gradient text-white shadow-2xl">
        <div className="absolute inset-0 gold-gradient opacity-10 mix-blend-overlay" />
        <div className="absolute -right-20 -bottom-20 w-96 h-96 bg-accent blur-[150px] opacity-20" />
        
        <div className="relative z-10 flex flex-col md:flex-row md:items-center justify-between gap-8">
          <div className="space-y-3">
            <div className="inline-flex items-center gap-2 px-3 py-1 rounded-full bg-white/10 backdrop-blur-md border border-white/20 text-[10px] font-bold uppercase tracking-widest text-accent">
              <span className="w-2 h-2 rounded-full bg-accent animate-pulse" />
              {lang === 'hi' ? 'UPSC विशेष विश्लेषण' : 'UPSC Special Intelligence'}
            </div>
            <h2 className="font-display text-3xl md:text-5xl font-black tracking-tight leading-tight">
              {lang === 'hi' ? 'समाचार साथी बुलेटिन' : 'Samachar Sathi Bulletin'}
            </h2>
            <div className="flex items-center gap-4 text-white/70 text-sm font-medium">
              <span className="flex items-center gap-1.5"><Calendar className="w-4 h-4" /> {dateStr}</span>
            </div>
          </div>

          <Button
            size="lg"
            className="bg-white text-navy hover:bg-white/90 font-bold px-8 rounded-2xl shadow-xl transition-all hover:scale-105 active:scale-95 gap-2 w-full md:w-auto"
          >
            <Download className="h-5 w-5" />
            {lang === 'hi' ? 'आज की मैगज़ीन' : 'Today\'s Magazine'}
          </Button>
        </div>
      </section>

      {/* Category Filter Pills */}
      <div className="sticky top-20 z-30 py-4 bg-background/80 backdrop-blur-md border-b border-border/50 -mx-4 px-4 overflow-x-auto no-scrollbar flex items-center gap-2">
         <Button 
            variant={activeCategory === null ? "default" : "outline"}
            size="sm"
            onClick={() => setActiveCategory(null)}
            className="rounded-full text-[10px] font-bold uppercase tracking-wider px-5"
         >
            {lang === 'hi' ? 'सभी' : 'All Topics'}
         </Button>
         {categories.map((cat) => (
            <Button 
               key={cat.name}
               variant={activeCategory === cat.name ? "default" : "outline"}
               size="sm"
               onClick={() => setActiveCategory(cat.name)}
               className="rounded-full text-[10px] font-bold uppercase tracking-wider px-5 whitespace-nowrap"
            >
               {cat.name}
            </Button>
         ))}
      </div>

      {/* Feed Area */}
      <div className="grid gap-12">
        {categories
          .filter(cat => activeCategory === null || activeCategory === cat.name)
          .map((category) => (
          <section key={category.name} className="space-y-6">
             <div className="flex items-center gap-4">
                <h3 className="text-xl font-display font-black uppercase tracking-tight text-foreground bg-accent/10 px-4 py-1.5 rounded-lg border-l-4 border-accent">
                   {category.name}
                </h3>
                <div className="flex-1 h-px bg-border" />
             </div>
             
             <div className="grid gap-4 md:grid-cols-2 lg:grid-cols-1">
                {category.news.map((item, idx) => (
                  <NewsItemCard key={idx} item={item} index={idx} />
                ))}
             </div>
          </section>
        ))}
      </div>
    </div>
  );
};

export default DailyAnalysisView;
