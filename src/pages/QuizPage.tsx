import { useLanguage } from '@/context/LanguageContext';
import { useEffect, useMemo } from 'react';
import { getSampleQuiz } from '@/data/sampleData';
import { saveQuiz, getQuizByDate } from '@/lib/storage';
import MCQQuizView from '@/components/MCQQuizView';

const QuizPage = () => {
  const { lang } = useLanguage();
  const today = new Date().toISOString().split('T')[0];

  useEffect(() => {
    if (!getQuizByDate(today)) {
      saveQuiz(getSampleQuiz(today));
    }
  }, [today]);

  const quiz = useMemo(() => {
    return getQuizByDate(today) || getSampleQuiz(today);
  }, [today]);

  return (
    <div className="paper-texture min-h-screen">
      <div className="container mx-auto px-4 py-8 max-w-3xl">
        <MCQQuizView quiz={quiz} />
      </div>
    </div>
  );
};

export default QuizPage;
