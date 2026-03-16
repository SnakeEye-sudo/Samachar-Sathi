import { useLanguage } from '@/context/LanguageContext';
import { DailyQuiz, QuizResult } from '@/types/news';
import { useState, useEffect } from 'react';
import { saveQuizResult, getQuizResultByDate } from '@/lib/db';
import { CheckCircle, XCircle, RotateCcw, Trophy, Brain, ArrowRight } from 'lucide-react';
import { Button } from '@/components/ui/button';
import { motion, AnimatePresence } from 'framer-motion';
import { cn } from '@/lib/utils';

const MCQQuizView = ({ quiz }: { quiz: DailyQuiz }) => {
  const { lang, t } = useLanguage();
  const [answers, setAnswers] = useState<(number | null)[]>(new Array(quiz.questions.length).fill(null));
  const [submitted, setSubmitted] = useState(false);
  const [existingResult, setExistingResult] = useState<QuizResult | null>(null);

  useEffect(() => {
    const loadResult = async () => {
      const result = await getQuizResultByDate(quiz.date);
      if (result) {
        setExistingResult(result);
        setAnswers(result.answers.map(a => a));
        setSubmitted(true);
      }
    };
    loadResult();
  }, [quiz.date]);

  const handleSelect = (qIdx: number, optIdx: number) => {
    if (submitted) return;
    const newAnswers = [...answers];
    newAnswers[qIdx] = optIdx;
    setAnswers(newAnswers);
  };

  const handleSubmit = async () => {
    const score = answers.reduce((acc, ans, idx) => {
      return acc + (ans === quiz.questions[idx].correctIndex ? 1 : 0);
    }, 0);
    
    const result: QuizResult = {
      date: quiz.date,
      score,
      total: quiz.questions.length,
      answers: answers.map(a => a ?? -1),
      completedAt: new Date().toISOString(),
    };
    await saveQuizResult(result);
    setExistingResult(result);
    setSubmitted(true);
    window.scrollTo({ top: 0, behavior: 'smooth' });
  };

  const handleReset = () => {
    setAnswers(new Array(quiz.questions.length).fill(null));
    setSubmitted(false);
    setExistingResult(null);
  };

  const score = existingResult?.score ?? answers.reduce((acc, ans, idx) => {
    return acc + (ans === quiz.questions[idx].correctIndex ? 1 : 0);
  }, 0);

  const answeredCount = answers.filter(a => a !== null).length;
  const percentage = submitted ? Math.round((score / quiz.questions.length) * 100) : 0;

  return (
    <div className="max-w-4xl mx-auto space-y-8 pb-12">
      {/* Header */}
      <div className="text-center space-y-4">
        <div className="inline-flex items-center gap-2 px-3 py-1 rounded-full bg-accent/10 text-accent text-xs font-bold uppercase tracking-wider">
          <Brain className="h-3 w-3" />
          {lang === 'hi' ? 'दैनिक परीक्षण' : 'Daily Intelligence Test'}
        </div>
        <h1 className="text-4xl font-display font-bold text-foreground">
          {lang === 'hi' ? 'आज की सुर्खी' : "Today's Assessment"}
        </h1>
        <p className="text-muted-foreground font-body max-w-xl mx-auto">
          {lang === 'hi' 
            ? 'अपनी स्मरण शक्ति और समझ का परीक्षण करें। आज के समाचार विश्लेषण पर आधारित प्रश्न।' 
            : 'Test your retention and understanding of today\'s core briefing analysis.'}
        </p>
      </div>

      {/* Results Banner */}
      <AnimatePresence>
        {submitted && (
          <motion.div 
            initial={{ opacity: 0, y: -20 }}
            animate={{ opacity: 1, y: 0 }}
            className={cn(
              "relative overflow-hidden rounded-3xl p-8 border text-center shadow-xl",
              percentage >= 70 ? "bg-emerald-500/10 border-emerald-500/20" : 
              percentage >= 40 ? "bg-amber-500/10 border-amber-500/20" : 
              "bg-rose-500/10 border-rose-500/20"
            )}
          >
            <div className="absolute top-0 right-0 p-4 opacity-10">
              <Trophy className="h-32 w-32" />
            </div>
            
            <Trophy className={cn(
              "h-16 w-16 mx-auto mb-4",
              percentage >= 70 ? "text-emerald-500" : 
              percentage >= 40 ? "text-amber-500" : 
              "text-rose-500"
            )} />
            
            <div className="space-y-2 relative z-10">
              <h2 className="text-5xl font-display font-black text-foreground">
                {score} <span className="text-2xl text-muted-foreground opacity-50">/ {quiz.questions.length}</span>
              </h2>
              <p className="text-lg font-body font-medium text-foreground">
                {percentage >= 70 ? (lang === 'hi' ? 'उत्कृष्ट प्रदर्शन!' : 'Exceptional Performance!') : 
                 percentage >= 40 ? (lang === 'hi' ? 'सराहनीय प्रयास' : 'Commendable Effort') : 
                 (lang === 'hi' ? 'पुनः प्रयास आवश्यक' : 'Review Suggested')}
              </p>
              <div className="pt-4 flex justify-center gap-4">
                <Button variant="outline" onClick={handleReset} className="rounded-xl font-body bg-background/50 backdrop-blur-sm">
                  <RotateCcw className="h-4 w-4 mr-2" />
                  {lang === 'hi' ? 'पुनः परीक्षा' : 'Retake Test'}
                </Button>
              </div>
            </div>
          </motion.div>
        )}
      </AnimatePresence>

      {/* Questions Stack */}
      <div className="space-y-6">
        {quiz.questions.map((q, qIdx) => {
          const userAnswer = answers[qIdx];
          const isCorrect = userAnswer === q.correctIndex;

          return (
            <motion.div 
              key={q.id}
              initial={{ opacity: 0, x: -20 }}
              animate={{ opacity: 1, x: 0 }}
              transition={{ delay: qIdx * 0.1 }}
              className="group p-6 rounded-3xl bg-card border border-border shadow-sm hover:shadow-md transition-all"
            >
              <div className="flex gap-4 mb-6">
                <span className="flex items-center justify-center w-8 h-8 rounded-xl bg-accent/10 text-accent font-display font-bold text-sm shrink-0">
                  {qIdx + 1}
                </span>
                <h3 className="text-lg font-body font-semibold text-foreground mt-0.5 leading-relaxed">
                  {t(q.question)}
                </h3>
              </div>

              <div className="grid sm:grid-cols-2 gap-3">
                {q.options.map((opt, optIdx) => {
                  const isSelected = userAnswer === optIdx;
                  const showResult = submitted;
                  const isActuallyCorrect = optIdx === q.correctIndex;
                  const isUserMistake = isSelected && !isActuallyCorrect;

                  return (
                    <button
                      key={optIdx}
                      onClick={() => handleSelect(qIdx, optIdx)}
                      disabled={submitted}
                      className={cn(
                        "relative flex items-center justify-between p-4 rounded-2xl border-2 text-left font-body text-sm transition-all group/btn",
                        !showResult && isSelected ? "border-accent bg-accent/5 shadow-sm" : 
                        !showResult && !isSelected ? "border-transparent bg-muted/30 hover:bg-muted/50" : 
                        showResult && isActuallyCorrect ? "border-emerald-500 bg-emerald-500/10 text-emerald-700 dark:text-emerald-400" :
                        showResult && isUserMistake ? "border-rose-500 bg-rose-500/10 text-rose-700 dark:text-rose-400" :
                        "border-transparent bg-muted/10 opacity-60"
                      )}
                    >
                      <span className="flex-1 pr-4">{t(opt)}</span>
                      {!showResult && (
                        <div className={cn(
                          "w-2 h-2 rounded-full transition-all",
                          isSelected ? "bg-accent scale-100" : "bg-muted scale-0"
                        )} />
                      )}
                      {showResult && isActuallyCorrect && <CheckCircle className="h-5 w-5 text-emerald-500 shrink-0" />}
                      {showResult && isUserMistake && <XCircle className="h-5 w-5 text-rose-500 shrink-0" />}
                    </button>
                  );
                })}
              </div>

              {submitted && (
                <motion.div 
                  initial={{ opacity: 0, height: 0 }}
                  animate={{ opacity: 1, height: 'auto' }}
                  className="mt-6 p-4 rounded-2xl bg-accent/5 border border-accent/10"
                >
                  <p className="text-xs font-body text-muted-foreground leading-relaxed">
                    <span className="font-bold text-accent mr-2 uppercase tracking-tighter">Briefing:</span>
                    {t(q.explanation)}
                  </p>
                </motion.div>
              )}
            </motion.div>
          );
        })}
      </div>

      {/* Action Footer */}
      <AnimatePresence>
        {!submitted && (
          <motion.div 
            initial={{ opacity: 0, y: 20 }}
            animate={{ opacity: 1, y: 0 }}
            exit={{ opacity: 0, y: 20 }}
            className="sticky bottom-8 z-50 flex items-center justify-between p-4 bg-background/80 backdrop-blur-xl border border-border rounded-3xl shadow-2xl"
          >
            <div className="pl-4">
              <p className="text-[10px] font-bold text-muted-foreground uppercase tracking-widest leading-none">Intelligence Check</p>
              <p className="text-lg font-display font-black">
                {answeredCount} <span className="text-sm font-normal text-muted-foreground">/ {quiz.questions.length} Complete</span>
              </p>
            </div>
            <Button
              onClick={handleSubmit}
              disabled={answeredCount < quiz.questions.length}
              className="gold-gradient text-accent-foreground px-8 py-6 rounded-2xl font-bold shadow-lg shadow-accent/20 transition-all hover:scale-[1.02] active:scale-[0.98]"
            >
              {lang === 'hi' ? 'सबमिट करें' : 'Submit Intel'} 
              <ArrowRight className="h-5 w-5 ml-2" />
            </Button>
          </motion.div>
        )}
      </AnimatePresence>
    </div>
  );
};

export default MCQQuizView;
