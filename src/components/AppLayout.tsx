import React from 'react';
import AppHeader from './AppHeader';

interface AppLayoutProps {
  children: React.ReactNode;
}

const FAMILY_HUB_URL = 'https://snakeeye-sudo.github.io/Aapka-Sathi/';

const AppLayout: React.FC<AppLayoutProps> = ({ children }) => {
  return (
    <div className="min-h-screen flex flex-col bg-background selection:bg-accent/30">
      <AppHeader />
      <main className="flex-1 container mx-auto px-4 py-6 md:py-10">
        {children}
      </main>
      <footer className="border-t border-border bg-muted/30 py-5">
        <div className="container mx-auto px-4 flex flex-col gap-3 text-sm text-muted-foreground font-body md:flex-row md:items-center md:justify-between">
          <p>&copy; {new Date().getFullYear()} Samachar-Sathi. Local analysis stays inside your app flow.</p>
          <div className="flex flex-wrap items-center gap-3">
            <a
              href={FAMILY_HUB_URL}
              target="_blank"
              rel="noopener noreferrer"
              className="inline-flex items-center rounded-full border border-border px-3 py-1 text-xs font-semibold text-foreground transition-colors hover:bg-muted"
            >
              Aapka-Sathi Family
            </a>
            <span className="text-xs">Developed by <span className="font-semibold text-foreground">Er. Sangam Krishna</span></span>
          </div>
        </div>
      </footer>
    </div>
  );
};

export default AppLayout;
