import { useLanguage } from '@/context/LanguageContext';
import { useEffect, useMemo, useState } from 'react';
import { useSearchParams } from 'react-router-dom';
import { getSampleQuiz } from '@/data/sampleData';
import { saveQuiz, getQuizByDate } from '@/lib/db';
import MCQQuizView from '@/components/MCQQuizView';
import { DailyQuiz } from '@/types/news';
import AppLayout from '@/components/AppLayout';
import { BrainCircuit, Trophy, Target, Sparkles } from 'lucide-react';

const QuizPage = () => {
  const { lang } = useLanguage();
  const [searchParams] = useSearchParams();
  const dateParam = searchParams.get('date');
  const today = new Date().toISOString().split('T')[0];
  const date = dateParam || today;

  const [quiz, setQuiz] = useState<DailyQuiz | null>(null);

  useEffect(() => {
    const loadQuiz = async () => {
      let currentQuiz = await getQuizByDate(date);
      if (!currentQuiz && date === today) {
        currentQuiz = getSampleQuiz(today);
        await saveQuiz(currentQuiz);
      }
      setQuiz(currentQuiz || null);
    };
    loadQuiz();
  }, [date, today]);

  return (
    <AppLayout>
      <div className="max-w-4xl mx-auto space-y-10 pb-20">
        {/* Header Section */}
        <div className="text-center space-y-6">
          <div className="inline-flex items-center gap-2 px-4 py-1.5 rounded-full bg-accent/10 text-accent text-xs font-black uppercase tracking-[0.2em] border border-accent/20">
            <Target className="h-3.5 w-3.5" />
            {lang === 'hi' ? 'दैनिक योग्यता परीक्षण' : 'Daily Aptitude Test'}
          </div>
          
          <div className="relative inline-block">
             <div className="absolute -top-6 -right-6 text-accent/30 animate-pulse">
               <Sparkles className="h-12 w-12" />
             </div>
             <h1 className="text-6xl font-display font-black text-foreground tracking-tighter">
              {lang === 'hi' ? 'बुद्धिमत्ता प्रश्नोत्तरी' : 'Intelligence Quiz'}
            </h1>
          </div>
          
          <p className="text-xl text-muted-foreground font-body max-w-2xl mx-auto leading-relaxed">
            {lang === 'hi' 
              ? 'आज की गंभीर समाचारों पर आधारित विशेष रूप से तैयार की गई अभ्यास प्रश्नावली।' 
              : 'Precision-engineered assessment based on today\'s critical intelligence units.'}
          </p>
        </div>

        {/* Main Quiz View */}
        <div className="relative px-2">
          {quiz ? (
            <MCQQuizView quiz={quiz} />
          ) : (
            <div className="flex flex-col items-center justify-center min-h-[400px] rounded-[3rem] border-2 border-dashed border-border bg-muted/20 space-y-4">
              <BrainCircuit className="h-16 w-16 text-muted-foreground/30 animate-pulse" />
              <p className="text-lg font-display font-bold text-muted-foreground">
                {lang === 'hi' ? 'प्रश्नावली तैयार की जा रही है...' : 'Synthesizing your assessment...'}
              </p>
            </div>
          )}
        </div>

        {/* Motivation Card */}
        <div className="p-8 rounded-[3.5rem] navy-gradient overflow-hidden shadow-2xl relative">
          <div className="absolute top-0 right-0 p-12 text-white/10">
            <Trophy className="h-48 w-48 rotate-12" />
          </div>
          <div className="relative z-10 space-y-4 max-w-lg">
            <h4 className="text-2xl font-display font-black text-white">
              {lang === 'hi' ? 'लगातार बने रहें' : 'Retention is Mastery'}
            </h4>
            <p className="text-white/70 font-body leading-relaxed">
              {lang === 'hi' 
                ? 'दैनिक प्रश्नोत्तरी हल करने से न केवल आपकी स्मृति तेज़ होती है, बल्कि जटिल विषयों पर आपकी विश्लेषणात्मक पकड़ भी मजबूत होती है।' 
                : 'Consistent assessment bridges the gap between passive reading and active knowledge retention. Master the units today to conquer the challenges tomorrow.'}
            </p>
          </div>
        </div>
      </div>
    </AppLayout>
  );
};

export default QuizPage;
