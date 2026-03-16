import { useLanguage } from '@/context/LanguageContext';
import { DailyAnalysis, Topic } from '@/types/news';
import { useState } from 'react';
import { Download, ChevronDown, ChevronUp, BookOpen, Tag, ExternalLink } from 'lucide-react';
import { Button } from '@/components/ui/button';
import { generateDailyPDF } from '@/lib/pdfGenerator';

const CategoryColors: Record<string, string> = {
  international: 'bg-blue-100 text-blue-800 border-blue-200',
  education: 'bg-emerald-100 text-emerald-800 border-emerald-200',
  economy: 'bg-amber-100 text-amber-800 border-amber-200',
  polity: 'bg-purple-100 text-purple-800 border-purple-200',
  environment: 'bg-green-100 text-green-800 border-green-200',
  bihar: 'bg-orange-100 text-orange-800 border-orange-200',
  science: 'bg-cyan-100 text-cyan-800 border-cyan-200',
};

const TopicCard = ({ topic }: { topic: Topic }) => {
  const { lang, t } = useLanguage();
  const [expanded, setExpanded] = useState(false);
  const colorClass = CategoryColors[topic.categoryKey] || 'bg-muted text-muted-foreground';

  return (
    <div className="topic-card animate-fade-in">
      <div className="flex items-start justify-between gap-4">
        <div className="flex-1">
          <span className={`inline-block text-xs font-body font-semibold px-2.5 py-1 rounded-full border mb-3 ${colorClass}`}>
            {t(topic.category)}
          </span>
          <h3 className="font-display text-lg font-bold text-foreground leading-snug mb-2">
            {t(topic.title)}
          </h3>
          <p className="text-sm text-muted-foreground font-body leading-relaxed">
            {t(topic.summary)}
          </p>
          <p className="text-xs text-muted-foreground/60 mt-2 font-body flex items-center gap-1">
            <ExternalLink className="h-3 w-3" />
            {topic.source}
          </p>
        </div>
        <Button
          variant="ghost"
          size="sm"
          onClick={() => setExpanded(!expanded)}
          className="shrink-0 text-muted-foreground hover:text-foreground"
        >
          {expanded ? <ChevronUp className="h-5 w-5" /> : <ChevronDown className="h-5 w-5" />}
        </Button>
      </div>

      {expanded && (
        <div className="mt-5 space-y-5 border-t border-border pt-5">
          {topic.subtopics.map((sub, i) => (
            <div key={i} className="space-y-3">
              <h4 className="font-display text-base font-semibold text-foreground flex items-center gap-2">
                <BookOpen className="h-4 w-4 text-accent" />
                {t(sub.title)}
              </h4>
              <p className="text-sm text-foreground/80 font-body leading-relaxed pl-6">
                {t(sub.content)}
              </p>
              
              <div className="pl-6">
                <h5 className="text-xs font-body font-semibold text-muted-foreground uppercase tracking-wider mb-2">
                  {lang === 'hi' ? 'मुख्य बिंदु' : 'Key Points'}
                </h5>
                <ul className="space-y-1.5">
                  {sub.keyPoints.map((kp, j) => (
                    <li key={j} className="text-sm font-body text-foreground/80 flex items-start gap-2">
                      <span className="text-accent mt-1">●</span>
                      {t(kp)}
                    </li>
                  ))}
                </ul>
              </div>

              <div className="pl-6 bg-secondary/50 rounded-md p-3 border border-border">
                <div className="flex items-center gap-1.5 text-xs font-body">
                  <Tag className="h-3.5 w-3.5 text-accent" />
                  <span className="font-semibold text-accent-foreground">
                    {lang === 'hi' ? 'परीक्षा प्रासंगिकता' : 'Exam Relevance'}:
                  </span>
                  <span className="text-muted-foreground">{t(sub.examRelevance)}</span>
                </div>
              </div>
            </div>
          ))}
        </div>
      )}
    </div>
  );
};

const DailyAnalysisView = ({ analysis }: { analysis: DailyAnalysis }) => {
  const { lang } = useLanguage();

  const dateStr = new Date(analysis.date).toLocaleDateString(lang === 'hi' ? 'hi-IN' : 'en-IN', {
    weekday: 'long', year: 'numeric', month: 'long', day: 'numeric',
  });

  return (
    <div className="space-y-6">
      {/* Header */}
      <div className="flex flex-col sm:flex-row sm:items-center justify-between gap-4 pb-4 border-b border-border">
        <div>
          <p className="text-sm text-muted-foreground font-body">{dateStr}</p>
          <h2 className="font-display text-2xl font-bold text-foreground">
            {lang === 'hi' ? 'दैनिक समाचार विश्लेषण' : 'Daily News Analysis'}
          </h2>
          <p className="text-sm text-muted-foreground font-body mt-1">
            {lang === 'hi' ? `${analysis.topics.length} विषय कवर किए गए` : `${analysis.topics.length} topics covered`}
          </p>
        </div>
        <Button
          onClick={() => generateDailyPDF(analysis, lang)}
          className="gold-gradient text-accent-foreground hover:opacity-90 font-body font-semibold gap-2"
        >
          <Download className="h-4 w-4" />
          {lang === 'hi' ? 'PDF डाउनलोड करें' : 'Download PDF'}
        </Button>
      </div>

      {/* Topics */}
      <div className="space-y-4">
        {analysis.topics.map(topic => (
          <TopicCard key={topic.id} topic={topic} />
        ))}
      </div>
    </div>
  );
};

export default DailyAnalysisView;
