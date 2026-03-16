import { useLanguage } from '@/context/LanguageContext';
import { Link, useLocation } from 'react-router-dom';
import { BookOpen, FileText, ClipboardList, Archive, Globe } from 'lucide-react';
import { Button } from '@/components/ui/button';

const AppHeader = () => {
  const { lang, setLang } = useLanguage();
  const location = useLocation();

  const navItems = [
    { path: '/', label: { hi: 'आज का विश्लेषण', en: "Today's Analysis" }, icon: BookOpen },
    { path: '/quiz', label: { hi: 'दैनिक प्रश्नोत्तरी', en: 'Daily Quiz' }, icon: ClipboardList },
    { path: '/archive', label: { hi: 'संग्रह', en: 'Archive' }, icon: Archive },
    { path: '/magazine', label: { hi: 'मासिक पत्रिका', en: 'Monthly Magazine' }, icon: FileText },
  ];

  return (
    <header className="border-b border-border bg-primary">
      <div className="container mx-auto px-4">
        {/* Top bar */}
        <div className="flex items-center justify-between py-3">
          <Link to="/" className="flex items-center gap-3">
            <div className="w-10 h-10 rounded-full gold-gradient flex items-center justify-center">
              <span className="font-display text-accent-foreground font-bold text-lg">प्र</span>
            </div>
            <div>
              <h1 className="font-display text-primary-foreground text-xl font-bold tracking-tight leading-none">
                Pragya Daily
              </h1>
              <p className="text-primary-foreground/60 text-xs font-body">
                {lang === 'hi' ? 'प्रज्ञा डेली — UPSC & BPSC दैनिक विश्लेषण' : 'Pragya Daily — UPSC & BPSC Daily Analysis'}
              </p>
            </div>
          </Link>

          <div className="flex items-center gap-2">
            <Button
              variant="ghost"
              size="sm"
              onClick={() => setLang(lang === 'hi' ? 'en' : 'hi')}
              className="text-primary-foreground/80 hover:text-primary-foreground hover:bg-primary-foreground/10 gap-1.5"
            >
              <Globe className="h-4 w-4" />
              {lang === 'hi' ? 'EN' : 'हिं'}
            </Button>
          </div>
        </div>

        {/* Navigation */}
        <nav className="flex gap-1 -mb-px overflow-x-auto">
          {navItems.map(item => {
            const isActive = location.pathname === item.path;
            const Icon = item.icon;
            return (
              <Link
                key={item.path}
                to={item.path}
                className={`flex items-center gap-2 px-4 py-2.5 text-sm font-body font-medium border-b-2 transition-colors whitespace-nowrap ${
                  isActive
                    ? 'border-accent text-accent'
                    : 'border-transparent text-primary-foreground/60 hover:text-primary-foreground/80 hover:border-primary-foreground/30'
                }`}
              >
                <Icon className="h-4 w-4" />
                {item.label[lang]}
              </Link>
            );
          })}
        </nav>
      </div>
    </header>
  );
};

export default AppHeader;
