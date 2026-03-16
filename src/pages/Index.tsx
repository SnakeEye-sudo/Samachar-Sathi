import { useLanguage } from '@/context/LanguageContext';
import { useEffect, useMemo } from 'react';
import { useSearchParams } from 'react-router-dom';
import { getSampleAnalysis, getSampleQuiz } from '@/data/sampleData';
import { saveAnalysis, getAnalysisByDate, saveQuiz, getQuizByDate } from '@/lib/storage';
import DailyAnalysisView from '@/components/DailyAnalysisView';

const Index = () => {
  const { lang } = useLanguage();
  const [searchParams] = useSearchParams();
  const dateParam = searchParams.get('date');
  const today = new Date().toISOString().split('T')[0];
  const date = dateParam || today;

  useEffect(() => {
    // Load/save sample data for today
    if (!getAnalysisByDate(date)) {
      saveAnalysis(getSampleAnalysis(date));
    }
    if (!getQuizByDate(date)) {
      saveQuiz(getSampleQuiz(date));
    }
  }, [date]);

  const analysis = useMemo(() => {
    return getAnalysisByDate(date) || getSampleAnalysis(date);
  }, [date]);

  return (
    <div className="paper-texture min-h-screen">
      <div className="container mx-auto px-4 py-8 max-w-4xl">
        {/* Masthead */}
        <div className="text-center mb-8">
          <div className="editorial-divider mb-6" />
          <p className="text-xs text-muted-foreground font-body uppercase tracking-[0.3em] mb-2">
            {lang === 'hi' ? 'UPSC & BPSC परीक्षा की तैयारी के लिए' : 'For UPSC & BPSC Exam Preparation'}
          </p>
          <p className="text-xs text-muted-foreground/60 font-body">
            {lang === 'hi' ? 'संकलन: Er. Sangam Krishna' : 'Compiled by: Er. Sangam Krishna'}
          </p>
          <div className="editorial-divider mt-6" />
        </div>

        <DailyAnalysisView analysis={analysis} />
      </div>
    </div>
  );
};

export default Index;
