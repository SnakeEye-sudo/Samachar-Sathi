import { useLanguage } from '@/context/LanguageContext';
import { useEffect as useAuthEffect, useState as useAuthState } from 'react';
import { signInWithGoogle, logout, onAuthChange, autoSignInFromUrl } from '@/lib/authService';
import { User } from 'firebase/auth';
import { useTheme } from '@/components/theme-provider';
import { 
  Menu, 
  Search, 
  Moon, 
  Sun, 
  BookOpen, 
  Grid, 
  BrainCircuit, 
  Calendar,
  Settings,
  Languages,
  LogOut,
  UserCircle
} from 'lucide-react';
import { useState, useEffect } from 'react';
import { cn } from '@/lib/utils';
import { Link, useLocation } from 'react-router-dom';
import { motion, AnimatePresence } from 'framer-motion';

const AppHeader = () => {
  const { lang, setLang } = useLanguage();
  const { theme, setTheme } = useTheme();
  const [isScrolled, setIsScrolled] = useState(false);
    const [user, setUser] = useAuthState<User | null>(null);
  const location = useLocation();

  useEffect(() => {
    const handleScroll = () => setIsScrolled(window.scrollY > 10);
    window.addEventListener('scroll', handleScroll);
    return () => window.removeEventListener('scroll', handleScroll);
  }, []);

  // Auth state listener
  useAuthEffect(() => {
    // Try cross-app SSO from URL token first (coming from ParikshaSathi)
    autoSignInFromUrl();
    const unsubscribe = onAuthChange((user) => {
      setUser(user);
    });
    return () => unsubscribe();
  }, []);

    const handleSignIn = async () => {
    try {
      await signInWithGoogle();
    } catch (error) {
      console.error('Sign in failed:', error);
    }
  };

  const handleSignOut = async () => {
    try {
      await logout();
    } catch (error) {
      console.error('Sign out failed:', error);
    }
  };

  const navItems = [
    { id: 'analysis', icon: BookOpen, label: { hi: 'विश्लेषण', en: 'Analysis' }, path: '/' },
    { id: 'archive', icon: Calendar, label: { hi: 'अभिलेखागार', en: 'Archive' }, path: '/archive' },
    { id: 'magazine', icon: Grid, label: { hi: 'पत्रिका', en: 'Magazine' }, path: '/magazine' },
  ];

  return (
    <header 
      className={cn(
        "sticky top-0 z-50 transition-all duration-300 px-4 py-3 md:px-8",
        isScrolled 
          ? "bg-background/80 backdrop-blur-lg border-b border-border/50 py-2 shadow-sm" 
          : "bg-transparent py-4"
      )}
    >
      <div className="max-w-7xl mx-auto flex items-center justify-between">
        {/* Logo Section */}
        <Link to="/" className="group flex items-center gap-3">
          <div className="relative">
            <img 
              src={`${import.meta.env.BASE_URL}logo.png`}
              alt="Logo" 
              className="w-12 h-12 rounded-2xl shadow-lg group-hover:scale-105 transition-transform object-cover border border-border"
            />
            <div className="absolute -inset-1 gold-gradient opacity-10 blur-sm rounded-2xl group-hover:opacity-30 transition-opacity" />
          </div>
          <div className="hidden sm:block">
            <h1 className="font-display font-bold text-lg md:text-xl tracking-tight leading-none">
              Samachar<span className="text-accent">-</span>Sathi
            </h1>
            <p className="text-[10px] text-muted-foreground uppercase tracking-[0.2em] font-medium">
              Knowledge Nexus
            </p>
          </div>
        </Link>

        {/* Desktop Navigation */}
        <nav className="hidden md:flex items-center gap-1">
          {navItems.map((item) => {
            const isActive = location.pathname === item.path;
            return (
              <Link 
                key={item.id}
                to={item.path}
                className={cn(
                  "px-4 py-2 rounded-lg text-sm font-medium transition-all flex items-center gap-2",
                  isActive 
                    ? "bg-accent/10 text-accent" 
                    : "text-muted-foreground hover:bg-muted/50 hover:text-foreground"
                )}
              >
                <item.icon className="w-4 h-4" />
                <span>{lang === 'hi' ? item.label.hi : item.label.en}</span>
              </Link>
            );
          })}
        </nav>

        {/* Actions Section */}
        <div className="flex items-center gap-2">
          {/* Language Toggle */}
          <button
            onClick={() => setLang(lang === 'hi' ? 'en' : 'hi')}
            className="w-10 h-10 rounded-full hover:bg-muted flex items-center justify-center transition-colors relative group"
            title={lang === 'hi' ? 'Switch to English' : 'हिंदी में बदलें'}
          >
            <Languages className="w-5 h-5 text-muted-foreground group-hover:text-accent transition-colors" />
            <span className="absolute -bottom-1 -right-1 text-[8px] font-bold bg-accent text-accent-foreground px-1 rounded uppercase">
              {lang}
            </span>
          </button>

          {/* Theme Toggle */}
          <button
            onClick={() => setTheme(theme === 'dark' ? 'light' : 'dark')}
            className="w-10 h-10 rounded-full hover:bg-muted flex items-center justify-center transition-colors text-muted-foreground hover:text-foreground"
          >
            {theme === 'dark' ? <Sun className="w-5 h-5" /> : <Moon className="w-5 h-5" />}
          </button>

                    {/* User Profile / Sign In */}
          {user ? (
            <div className="flex items-center gap-2">
              <img 
                src={user.photoURL || ''} 
                alt={user.displayName || 'User'}
                className="w-8 h-8 rounded-full border-2 border-primary"
              />
              <button
                onClick={handleSignOut}
                className="w-10 h-10 rounded-full hover:bg-muted flex items-center justify-center transition-colors"
                title="Sign Out"
              >
                <LogOut className="w-5 h-5" />
              </button>
            </div>
          ) : (
            <button
              onClick={handleSignIn}
              className="flex items-center gap-2 px-4 py-2 bg-primary text-primary-foreground rounded-full hover:bg-primary/90 transition-colors"
            >
              <UserCircle className="w-5 h-5" />
              <span className="text-sm font-medium">{lang === 'hi' ? 'साइन इन' : 'Sign In'}</span>
            </button>
          )}

          {/* Admin/Settings */}
          <Link
            to="/admin"
            className="w-10 h-10 rounded-full hover:bg-muted flex items-center justify-center transition-colors text-muted-foreground hover:text-foreground"
          >
            <Settings className="w-5 h-5" />
          </Link>

          {/* Mobile Menu Trigger */}
          <button className="md:hidden w-10 h-10 rounded-lg bg-muted flex items-center justify-center">
            <Menu className="w-5 h-5" />
          </button>
        </div>
      </div>
    </header>
  );
};

export default AppHeader;
