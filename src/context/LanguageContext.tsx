import { createContext, useContext, useState, ReactNode } from 'react';
import { Language } from '@/types/news';

interface LanguageContextType {
  lang: Language;
  setLang: (lang: Language) => void;
  t: (obj: { hi: string; en: string }) => string;
}

const LanguageContext = createContext<LanguageContextType | undefined>(undefined);

export const LanguageProvider = ({ children }: { children: ReactNode }) => {
  const [lang, setLang] = useState<Language>(() => {
    return (localStorage.getItem('pragya-lang') as Language) || 'hi';
  });

  const handleSetLang = (newLang: Language) => {
    setLang(newLang);
    localStorage.setItem('pragya-lang', newLang);
  };

  const t = (obj: { hi: string; en: string }) => obj[lang];

  return (
    <LanguageContext.Provider value={{ lang, setLang: handleSetLang, t }}>
      {children}
    </LanguageContext.Provider>
  );
};

export const useLanguage = () => {
  const context = useContext(LanguageContext);
  if (!context) throw new Error('useLanguage must be used within LanguageProvider');
  return context;
};
