import React from 'react';
import AppHeader from './AppHeader';

interface AppLayoutProps {
  children: React.ReactNode;
}

const AppLayout: React.FC<AppLayoutProps> = ({ children }) => {
  return (
    <div className="min-h-screen flex flex-col bg-background selection:bg-accent/30">
      <AppHeader />
      <main className="flex-1 container mx-auto px-4 py-6 md:py-10">
        {children}
      </main>
      <footer className="border-t border-border py-8 bg-muted/50">
        <div className="container mx-auto px-4 text-center">
          <p className="text-sm text-muted-foreground font-body">
            &copy; {new Date().getFullYear()} Samachar-Sathi. 
            All your local analysis is stored in the Samachar-Sathi Vault.
          </p>
        </div>
      </footer>
    </div>
  );
};

export default AppLayout;
