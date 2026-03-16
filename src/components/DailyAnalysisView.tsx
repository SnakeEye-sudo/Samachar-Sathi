import { useLanguage } from '@/context/LanguageContext';
import { DailyAnalysis, Topic } from '@/types/news';
import { useState } from 'react';
import { Download, ChevronDown, BookOpen, Tag, ExternalLink, Sparkles, Globe, ShieldCheck, Calendar } from 'lucide-react';
import { Button } from '@/components/ui/button';
import { generateDailyPDF } from '@/lib/pdfGenerator';
import { motion, AnimatePresence } from 'framer-motion';
import { cn } from '@/lib/utils';

const CategoryBadge = ({ categoryKey, label }: { categoryKey: string; label: string }) => {
  const colors: Record<string, string> = {
    'international-relations': 'bg-blue-500/10 text-blue-500 border-blue-500/20',
    'polity': 'bg-purple-500/10 text-purple-500 border-purple-500/20',
    'economy': 'bg-amber-500/10 text-amber-500 border-amber-500/20',
    'environment': 'bg-emerald-500/10 text-emerald-500 border-emerald-500/20',
    'science-technology': 'bg-cyan-500/10 text-cyan-500 border-cyan-500/20',
    'bihar-special': 'bg-orange-500/10 text-orange-500 border-orange-500/20',
    'social-justice': 'bg-rose-500/10 text-rose-500 border-rose-500/20',
  };

  const cls = colors[categoryKey] || 'bg-muted text-muted-foreground border-border';
  
  return (
    <span className={cn("px-3 py-1 rounded-full text-[10px] font-bold uppercase tracking-wider border", cls)}>
      {label}
    </span>
  );
};

const TopicCard = ({ topic, index }: { topic: Topic; index: number }) => {
  const { lang, t } = useLanguage();
  const [expanded, setExpanded] = useState(false);

  return (
    <motion.div 
      initial={{ opacity: 0, y: 20 }}
      animate={{ opacity: 1, y: 0 }}
      transition={{ delay: index * 0.1 }}
      className={cn(
        "group relative overflow-hidden rounded-2xl border transition-all duration-500",
        expanded 
          ? "bg-card border-accent/30 shadow-2xl shadow-accent/5 ring-1 ring-accent/20" 
          : "bg-card/50 border-border/50 hover:border-accent/30 hover:bg-card hover:shadow-xl"
      )}
    >
      {/* Decorative Gradient Background */}
      <div className={cn(
        "absolute -right-20 -top-20 w-64 h-64 bg-accent/5 blur-[100px] transition-opacity duration-500",
        expanded ? "opacity-100" : "opacity-0 group-hover:opacity-100"
      )} />

      <div className="p-5 md:p-7">
        <div className="flex flex-col md:flex-row md:items-start justify-between gap-6">
          <div className="flex-1 space-y-4">
            <div className="flex items-center gap-3">
              <CategoryBadge categoryKey={topic.categoryKey} label={t(topic.category)} />
              <div className="h-4 w-px bg-border/50" />
              <div className="flex items-center gap-1.5 text-xs text-muted-foreground font-medium">
                <Globe className="w-3.5 h-3.5" />
                {topic.source}
              </div>
            </div>

            <div className="space-y-2">
              <h3 className="font-display text-xl md:text-2xl font-bold text-foreground group-hover:text-accent transition-colors leading-tight">
                {t(topic.title)}
              </h3>
              <p className="text-muted-foreground font-body leading-relaxed md:text-base line-clamp-2 group-data-[expanded=true]:line-clamp-none">
                {t(topic.summary)}
              </p>
            </div>
          </div>

          <Button
            variant="ghost"
            size="sm"
            onClick={() => setExpanded(!expanded)}
            className={cn(
              "self-end md:self-start w-10 h-10 rounded-full border transition-all",
              expanded ? "bg-accent text-accent-foreground border-accent scale-110" : "bg-muted/50 border-border group-hover:border-accent/50"
            )}
          >
            <ChevronDown className={cn("h-5 w-5 transition-transform duration-500", expanded && "rotate-180")} />
          </Button>
        </div>

        <AnimatePresence>
          {expanded && (
            <motion.div
              initial={{ height: 0, opacity: 0 }}
              animate={{ height: 'auto', opacity: 1 }}
              exit={{ height: 0, opacity: 0 }}
              transition={{ duration: 0.4, ease: "easeInOut" }}
              className="overflow-hidden"
            >
              <div className="mt-8 pt-8 border-t border-border/50 space-y-10">
                {topic.subtopics.map((sub, i) => (
                  <div key={i} className="relative pl-6 space-y-5">
                    {/* Timeline-like connector */}
                    <div className="absolute left-0 top-1 bottom-0 w-1 gold-gradient rounded-full opacity-30" />
                    <div className="absolute left-[-4px] top-1 w-3 h-3 rounded-full gold-gradient shadow-[0_0_10px_rgba(212,175,55,0.5)]" />

                    <div className="space-y-4">
                      <h4 className="font-display text-lg font-bold text-foreground">
                        {t(sub.title)}
                      </h4>
                      <p className="text-foreground/80 font-body leading-relaxed text-base">
                        {t(sub.content)}
                      </p>
                    </div>

                    <div className="grid grid-cols-1 lg:grid-cols-2 gap-6">
                      <div className="space-y-3 bg-muted/30 rounded-xl p-5 border border-border/50">
                        <h5 className="text-xs font-bold text-accent uppercase tracking-widest flex items-center gap-2">
                          <Sparkles className="w-3.5 h-3.5" />
                          {lang === 'hi' ? 'मुख्य बिंदु' : 'Key Elements'}
                        </h5>
                        <ul className="space-y-3">
                          {sub.keyPoints.map((kp, j) => (
                            <li key={j} className="text-sm font-body text-foreground/80 flex items-start gap-3">
                              <span className="w-1.5 h-1.5 rounded-full gold-gradient mt-2 shrink-0" />
                              {t(kp)}
                            </li>
                          ))}
                        </ul>
                      </div>

                      <div className="space-y-3 bg-accent/5 rounded-xl p-5 border border-accent/20">
                        <h5 className="text-xs font-bold text-accent uppercase tracking-widest flex items-center gap-2">
                          <ShieldCheck className="w-3.5 h-3.5" />
                          {lang === 'hi' ? 'परीक्षा के लिए महत्व' : 'Exam Relevance'}
                        </h5>
                        <p className="text-sm font-body text-muted-foreground leading-relaxed">
                          {t(sub.examRelevance)}
                        </p>
                      </div>
                    </div>
                  </div>
                ))}

                <div className="flex justify-end pt-4">
                  <a 
                    href="#" 
                    className="flex items-center gap-2 text-xs font-bold text-accent hover:underline uppercase tracking-wider"
                  >
                    {lang === 'hi' ? 'स्रोत देखें' : 'View Detailed Source'}
                    <ExternalLink className="w-3 h-3" />
                  </a>
                </div>
              </div>
            </motion.div>
          )}
        </AnimatePresence>
      </div>
    </motion.div>
  );
};

const DailyAnalysisView = ({ analysis }: { analysis: DailyAnalysis }) => {
  const { lang } = useLanguage();

  const dateStr = new Date(analysis.date).toLocaleDateString(lang === 'hi' ? 'hi-IN' : 'en-IN', {
    weekday: 'long', year: 'numeric', month: 'long', day: 'numeric',
  });

  return (
    <div className="space-y-12 pb-20">
      {/* Dynamic Header Section */}
      <section className="relative rounded-3xl overflow-hidden py-12 px-6 md:px-12 premium-gradient text-white shadow-2xl">
        <div className="absolute inset-0 gold-gradient opacity-10 mix-blend-overlay" />
        <div className="absolute -right-20 -bottom-20 w-96 h-96 bg-accent blur-[150px] opacity-20" />
        
        <div className="relative z-10 flex flex-col md:flex-row md:items-end justify-between gap-8">
          <div className="space-y-4">
            <div className="inline-flex items-center gap-2 px-3 py-1 rounded-full bg-white/10 backdrop-blur-md border border-white/20 text-[10px] font-bold uppercase tracking-widest">
              <span className="w-2 h-2 rounded-full bg-accent animate-pulse" />
              {lang === 'hi' ? 'दैनिक अपडेट' : 'Daily Intelligence'}
            </div>
            <h2 className="font-display text-3xl md:text-5xl font-black tracking-tight leading-tight">
              {lang === 'hi' ? 'आज का समाचार विश्लेषण' : 'Today\'s News Analysis'}
            </h2>
            <div className="flex items-center gap-4 text-white/70 font-medium">
              <span className="flex items-center gap-1.5"><Calendar className="w-4 h-4" /> {dateStr}</span>
              <span className="flex items-center gap-1.5"><BookOpen className="w-4 h-4" /> {analysis.topics.length} Topics</span>
            </div>
          </div>

          <div className="flex flex-col sm:flex-row gap-4">
            <Button
              onClick={() => generateDailyPDF(analysis, lang)}
              size="lg"
              className="bg-white text-navy hover:bg-white/90 font-bold px-8 rounded-2xl shadow-xl transition-all hover:scale-105 active:scale-95 gap-2"
            >
              <Download className="h-5 w-5" />
              {lang === 'hi' ? 'PDF डाउनलोड करें' : 'Download PDF'}
            </Button>
            
            <Button
              asChild
              size="lg"
              className="bg-accent text-accent-foreground hover:bg-accent/90 font-bold px-8 rounded-2xl shadow-xl transition-all hover:scale-105 active:scale-95 gap-2"
            >
              <a href={`/Samachar-Sathi/quiz?date=${analysis.date}`}>
                <Sparkles className="h-5 w-5" />
                {lang === 'hi' ? 'टेस्ट दें (MCQ)' : 'Take MCQ Test'}
              </a>
            </Button>
          </div>
        </div>
      </section>

      {/* Topics Feed */}
      <div className="max-w-4xl mx-auto space-y-8">
        {analysis.topics.map((topic, idx) => (
          <TopicCard key={topic.id} topic={topic} index={idx} />
        ))}
      </div>
    </div>
  );
};

export default DailyAnalysisView;
