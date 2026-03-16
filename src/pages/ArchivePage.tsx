import { useLanguage } from '@/context/LanguageContext';
import { getAllAnalyses, getAllQuizResults } from '@/lib/storage';
import { Link } from 'react-router-dom';
import { Calendar, BookOpen, Trophy, ChevronRight } from 'lucide-react';
import { useMemo } from 'react';

const ArchivePage = () => {
  const { lang } = useLanguage();
  const analyses = getAllAnalyses();
  const quizResults = getAllQuizResults();

  const sortedAnalyses = useMemo(() => {
    return [...analyses].sort((a, b) => b.date.localeCompare(a.date));
  }, [analyses]);

  const getQuizResult = (date: string) => quizResults.find(r => r.date === date);

  return (
    <div className="space-y-6">
      <div className="pb-4 border-b border-border">
        <h2 className="font-display text-2xl font-bold text-foreground">
          {lang === 'hi' ? 'विश्लेषण संग्रह' : 'Analysis Archive'}
        </h2>
        <p className="text-sm text-muted-foreground font-body mt-1">
          {lang === 'hi' ? 'सभी सेव किए गए दैनिक विश्लेषण' : 'All saved daily analyses'}
        </p>
      </div>

      {sortedAnalyses.length === 0 ? (
        <div className="text-center py-16 text-muted-foreground font-body">
          <Calendar className="h-12 w-12 mx-auto mb-4 opacity-40" />
          <p>{lang === 'hi' ? 'अभी कोई विश्लेषण सेव नहीं है' : 'No analyses saved yet'}</p>
        </div>
      ) : (
        <div className="space-y-3">
          {sortedAnalyses.map(analysis => {
            const dateStr = new Date(analysis.date).toLocaleDateString(lang === 'hi' ? 'hi-IN' : 'en-IN', {
              weekday: 'short', year: 'numeric', month: 'long', day: 'numeric',
            });
            const result = getQuizResult(analysis.date);

            return (
              <Link
                key={analysis.date}
                to={`/?date=${analysis.date}`}
                className="topic-card flex items-center justify-between gap-4"
              >
                <div className="flex items-center gap-4">
                  <div className="w-12 h-12 rounded-lg navy-gradient flex items-center justify-center shrink-0">
                    <BookOpen className="h-5 w-5 text-primary-foreground" />
                  </div>
                  <div>
                    <p className="font-body font-semibold text-foreground text-sm">{dateStr}</p>
                    <p className="text-xs text-muted-foreground font-body">
                      {lang === 'hi' ? `${analysis.topics.length} विषय` : `${analysis.topics.length} topics`}
                    </p>
                  </div>
                </div>
                <div className="flex items-center gap-3">
                  {result && (
                    <div className="flex items-center gap-1 text-xs text-muted-foreground font-body">
                      <Trophy className="h-3.5 w-3.5 text-accent" />
                      {result.score}/{result.total}
                    </div>
                  )}
                  <ChevronRight className="h-4 w-4 text-muted-foreground" />
                </div>
              </Link>
            );
          })}
        </div>
      )}
    </div>
  );
};

export default ArchivePage;
