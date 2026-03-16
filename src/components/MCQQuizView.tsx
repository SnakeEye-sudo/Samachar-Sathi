import { useLanguage } from '@/context/LanguageContext';
import { DailyQuiz, QuizResult } from '@/types/news';
import { useState, useEffect } from 'react';
import { saveQuizResult, getQuizResultByDate } from '@/lib/storage';
import { CheckCircle, XCircle, RotateCcw, Trophy } from 'lucide-react';
import { Button } from '@/components/ui/button';

const MCQQuizView = ({ quiz }: { quiz: DailyQuiz }) => {
  const { lang, t } = useLanguage();
  const [answers, setAnswers] = useState<(number | null)[]>(new Array(quiz.questions.length).fill(null));
  const [submitted, setSubmitted] = useState(false);
  const [existingResult, setExistingResult] = useState<QuizResult | null>(null);

  useEffect(() => {
    const result = getQuizResultByDate(quiz.date);
    if (result) {
      setExistingResult(result);
      setAnswers(result.answers.map(a => a));
      setSubmitted(true);
    }
  }, [quiz.date]);

  const handleSelect = (qIdx: number, optIdx: number) => {
    if (submitted) return;
    const newAnswers = [...answers];
    newAnswers[qIdx] = optIdx;
    setAnswers(newAnswers);
  };

  const handleSubmit = () => {
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
    saveQuizResult(result);
    setExistingResult(result);
    setSubmitted(true);
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
    <div className="space-y-6">
      {/* Header */}
      <div className="flex flex-col sm:flex-row sm:items-center justify-between gap-4 pb-4 border-b border-border">
        <div>
          <h2 className="font-display text-2xl font-bold text-foreground">
            {lang === 'hi' ? 'दैनिक प्रश्नोत्तरी' : 'Daily Quiz'}
          </h2>
          <p className="text-sm text-muted-foreground font-body">
            {lang === 'hi' ? `${quiz.questions.length} प्रश्न — आज की खबरों पर आधारित` : `${quiz.questions.length} questions — based on today's news`}
          </p>
        </div>
        {submitted && (
          <Button variant="outline" onClick={handleReset} className="gap-2 font-body">
            <RotateCcw className="h-4 w-4" />
            {lang === 'hi' ? 'फिर से करें' : 'Retry'}
          </Button>
        )}
      </div>

      {/* Score card */}
      {submitted && (
        <div className={`rounded-lg p-6 text-center border ${percentage >= 70 ? 'bg-emerald-50 border-emerald-200' : percentage >= 40 ? 'bg-amber-50 border-amber-200' : 'bg-red-50 border-red-200'}`}>
          <Trophy className={`h-10 w-10 mx-auto mb-2 ${percentage >= 70 ? 'text-emerald-500' : percentage >= 40 ? 'text-amber-500' : 'text-red-500'}`} />
          <p className="font-display text-3xl font-bold text-foreground">{score}/{quiz.questions.length}</p>
          <p className="text-sm text-muted-foreground font-body mt-1">
            {percentage}% — {percentage >= 70 ? (lang === 'hi' ? 'शानदार!' : 'Excellent!') : percentage >= 40 ? (lang === 'hi' ? 'अच्छा प्रयास!' : 'Good effort!') : (lang === 'hi' ? 'और मेहनत करें!' : 'Keep working!')}
          </p>
        </div>
      )}

      {/* Progress bar */}
      {!submitted && (
        <div className="bg-muted rounded-full h-2 overflow-hidden">
          <div
            className="gold-gradient h-full transition-all duration-300 rounded-full"
            style={{ width: `${(answeredCount / quiz.questions.length) * 100}%` }}
          />
        </div>
      )}

      {/* Questions */}
      <div className="space-y-6">
        {quiz.questions.map((q, qIdx) => {
          const userAnswer = answers[qIdx];
          const isCorrect = userAnswer === q.correctIndex;

          return (
            <div key={q.id} className="topic-card" style={{ animationDelay: `${qIdx * 50}ms` }}>
              <p className="font-body font-semibold text-foreground mb-4">
                <span className="text-accent font-display mr-2">{qIdx + 1}.</span>
                {t(q.question)}
              </p>

              <div className="space-y-2">
                {q.options.map((opt, optIdx) => {
                  let stateClass = '';
                  if (submitted) {
                    if (optIdx === q.correctIndex) stateClass = 'correct';
                    else if (optIdx === userAnswer && !isCorrect) stateClass = 'incorrect';
                  } else if (userAnswer === optIdx) {
                    stateClass = 'selected';
                  }

                  return (
                    <button
                      key={optIdx}
                      onClick={() => handleSelect(qIdx, optIdx)}
                      disabled={submitted}
                      className={`quiz-option w-full text-left flex items-center gap-3 font-body text-sm ${stateClass}`}
                    >
                      <span className="shrink-0 w-7 h-7 rounded-full border border-border flex items-center justify-center text-xs font-semibold">
                        {String.fromCharCode(65 + optIdx)}
                      </span>
                      <span className="flex-1">{t(opt)}</span>
                      {submitted && optIdx === q.correctIndex && <CheckCircle className="h-5 w-5 text-emerald-500 shrink-0" />}
                      {submitted && optIdx === userAnswer && !isCorrect && <XCircle className="h-5 w-5 text-red-500 shrink-0" />}
                    </button>
                  );
                })}
              </div>

              {submitted && (
                <div className="mt-3 p-3 bg-secondary/50 rounded-md border border-border">
                  <p className="text-xs font-body text-muted-foreground">
                    <span className="font-semibold">{lang === 'hi' ? 'व्याख्या' : 'Explanation'}:</span>{' '}
                    {t(q.explanation)}
                  </p>
                </div>
              )}
            </div>
          );
        })}
      </div>

      {/* Submit */}
      {!submitted && (
        <div className="sticky bottom-4">
          <Button
            onClick={handleSubmit}
            disabled={answeredCount < quiz.questions.length}
            className="w-full gold-gradient text-accent-foreground font-body font-semibold text-base py-6 hover:opacity-90"
          >
            {answeredCount < quiz.questions.length
              ? (lang === 'hi' ? `${quiz.questions.length - answeredCount} प्रश्न शेष` : `${quiz.questions.length - answeredCount} questions remaining`)
              : (lang === 'hi' ? 'उत्तर जमा करें' : 'Submit Answers')}
          </Button>
        </div>
      )}
    </div>
  );
};

export default MCQQuizView;
