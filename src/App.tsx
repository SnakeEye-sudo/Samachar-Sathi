import { QueryClient, QueryClientProvider } from "@tanstack/react-query";
import { BrowserRouter, Route, Routes } from "react-router-dom";
import { Toaster as Sonner } from "@/components/ui/sonner";
import { Toaster } from "@/components/ui/toaster";
import { TooltipProvider } from "@/components/ui/tooltip";
import { LanguageProvider } from "@/context/LanguageContext";
import { ThemeProvider } from "@/components/theme-provider";
import AppHeader from "@/components/AppHeader";
import PwaInstallBanner from "@/components/PwaInstallBanner";
import Index from "./pages/Index";
import QuizPage from "./pages/QuizPage";
import ArchivePage from "./pages/ArchivePage";
import MagazinePage from "./pages/MagazinePage";
import AdminPage from "./pages/AdminPage";
import NotFound from "./pages/NotFound";

const queryClient = new QueryClient();

const App = () => (
  <QueryClientProvider client={queryClient}>
    <TooltipProvider>
      <ThemeProvider defaultTheme="light" storageKey="samachar-sathi-theme">
        <LanguageProvider>
          <Toaster />
          <Sonner />
          <BrowserRouter basename="/Samachar-Sathi">
            <AppHeader />
            <Routes>
              <Route path="/" element={<Index />} />
              <Route path="/quiz" element={<QuizPage />} />
              <Route path="/archive" element={<ArchivePage />} />
              <Route path="/magazine" element={<MagazinePage />} />
              <Route path="/admin" element={<AdminPage />} />
              <Route path="*" element={<NotFound />} />
            </Routes>
            <PwaInstallBanner />
          </BrowserRouter>
        </LanguageProvider>
      </ThemeProvider>
    </TooltipProvider>
  </QueryClientProvider>
);

export default App;
