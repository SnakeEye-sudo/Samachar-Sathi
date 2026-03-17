import { useState } from 'react';
import { useLanguage } from '@/context/LanguageContext';
import { Button } from '@/components/ui/button';
import { Input } from '@/components/ui/input';
import { Textarea } from '@/components/ui/textarea';
import { Card, CardHeader, CardTitle, CardContent, CardFooter } from '@/components/ui/card';
import { Database, Upload, Download, Trash2, Save, Plus, X, Newspaper, Cpu, RefreshCw, Zap, ShieldAlert, FileJson } from 'lucide-react';
import { saveAnalysis, clearAllData, getAllAnalyses } from '@/lib/db';
import { parseRawNewsText } from '@/lib/smartParser';
import { toast } from 'sonner';
import { DailyNews } from '@/types/news';
import AppLayout from '@/components/AppLayout';
import { motion, AnimatePresence } from 'framer-motion';

const AdminPage = () => {
  const { lang } = useLanguage();
  const [jsonInput, setJsonInput] = useState('');
  const [rawTextInput, setRawTextInput] = useState('');
  const [selectedDate, setSelectedDate] = useState(new Date().toISOString().split('T')[0]);
  const [isParsing, setIsParsing] = useState(false);

  const handleSmartParse = async () => {
    if (!rawTextInput.trim()) {
      toast.error(lang === 'hi' ? 'कोई टेक्स्ट नहीं मिला' : 'No text provided');
      return;
    }
    
    setIsParsing(true);
    await new Promise(r => setTimeout(r, 1500));
    
    try {
      // For now, parseRawNewsText returns the structure we need.
      // But we need to make sure the parser is updated to return DailyNews.
      const analysis = parseRawNewsText(rawTextInput, selectedDate) as any;
      await saveAnalysis(analysis);
      
      const totalUnits = analysis.categories?.reduce((acc: number, cat: any) => acc + (cat.news?.length || 0), 0) || 0;

      toast.success(lang === 'hi' ? 'सफलतापूर्वक पार्स किया गया' : 'Sync Successful', {
        description: lang === 'hi' ? `${totalUnits} इंटेलिजेंस यूनिट सेव की गईं` : `${totalUnits} intelligence units recorded`,
      });
      setRawTextInput('');
    } catch (e) {
      console.error(e);
      toast.error(lang === 'hi' ? 'पार्सिंग विफल' : 'Parsing Engine Error');
    } finally {
      setIsParsing(false);
    }
  };

  const handleImport = async () => {
    try {
      const data = JSON.parse(jsonInput);
      if (data) {
        await saveAnalysis(data);
      }
      toast.success(lang === 'hi' ? 'डेटा सिंक हुआ' : 'Data Synchronized');
      setJsonInput('');
    } catch (e) {
      toast.error(lang === 'hi' ? 'अमान्य प्रारूप' : 'Invalid Intelligence Format');
    }
  };

  const handleExport = async () => {
    const analyses = await getAllAnalyses();
    const data = { analyses };
    const blob = new Blob([JSON.stringify(data, null, 2)], { type: 'application/json' });
    const url = URL.createObjectURL(blob);
    const a = document.createElement('a');
    a.href = url;
    a.download = `samachar-sathi-vault-${new Date().toISOString().split('T')[0]}.json`;
    a.click();
    toast.success(lang === 'hi' ? 'एक्सपोर्ट पूर्ण' : 'Vault Backup Complete');
  };

  const handleClear = async () => {
    if (window.confirm(lang === 'hi' ? 'क्या आप सारा डेटा मिटाना चाहते हैं?' : 'Are you sure you want to clear the entire Vault?')) {
      await clearAllData();
      toast.error(lang === 'hi' ? 'डेटा साफ़ किया गया' : 'Vault Purged');
    }
  };

  return (
    <AppLayout>
      <div className="max-w-6xl mx-auto space-y-12 pb-24">
        {/* Newsroom Hero */}
        <div className="relative p-10 rounded-[3rem] navy-gradient overflow-hidden">
          <div className="absolute top-0 right-0 p-10 text-white/5 pointer-events-none">
            <Cpu className="h-64 w-64 rotate-12" />
          </div>
          <div className="relative z-10 flex flex-col md:flex-row items-center justify-between gap-10">
            <div className="space-y-4 text-center md:text-left">
              <div className="inline-flex items-center gap-2 px-3 py-1 rounded-full bg-accent/20 text-accent text-[10px] font-black uppercase tracking-widest border border-accent/30">
                <Zap className="h-3 w-3 fill-current" />
                {lang === 'hi' ? 'नियंत्रण केंद्र' : 'Intelligence Control'}
              </div>
              <h1 className="text-5xl font-display font-black text-white leading-tight tracking-tighter">
                {lang === 'hi' ? 'न्यूज़रूम टर्मिनल' : 'Newsroom Terminal'}
              </h1>
              <p className="text-white/60 font-body text-lg max-w-xl">
                {lang === 'hi' 
                  ? 'स्थानीय संपादन और बुद्धिमत्ता पार्सिंग के लिए आपका उन्नत इंटरफ़ेस।' 
                  : 'Your advanced interface for local compilation and raw intelligence processing.'}
              </p>
            </div>
            <div className="flex gap-4">
              <Button onClick={handleExport} variant="outline" className="bg-white/10 border-white/20 text-white hover:bg-white/20 py-8 px-6 rounded-2xl flex flex-col gap-1 items-center font-bold">
                 <Download className="h-6 w-6" />
                 <span className="text-[10px] uppercase tracking-widest">Backup Vault</span>
              </Button>
              <Button onClick={handleClear} variant="destructive" className="bg-red-500/20 border-red-500/30 text-red-500 hover:bg-red-500/30 py-8 px-6 rounded-2xl flex flex-col gap-1 items-center font-bold">
                 <Trash2 className="h-6 w-6" />
                 <span className="text-[10px] uppercase tracking-widest">Purge All</span>
              </Button>
            </div>
          </div>
        </div>

        {/* Integration Grid */}
        <div className="grid gap-8 lg:grid-cols-3">
          <div className="lg:col-span-2 space-y-8">
            <Card className="rounded-[2.5rem] border-2 border-border overflow-hidden bg-card/50 backdrop-blur-sm shadow-xl">
              <CardHeader className="p-8 pb-4">
                <div className="flex items-center justify-between">
                  <div className="space-y-1">
                    <CardTitle className="text-2xl font-display font-black flex items-center gap-3">
                      <Newspaper className="h-6 w-6 text-accent" />
                      {lang === 'hi' ? 'स्मार्ट न्यूज़ प्रोसेसर' : 'Smart News Processor'}
                    </CardTitle>
                    <p className="text-muted-foreground text-sm font-body">
                      {lang === 'hi' ? 'कच्चे समाचार टेक्स्ट को संरचित डेटा में बदलें' : 'Transform raw text into structured intelligence units'}
                    </p>
                  </div>
                  <Input 
                    type="date" 
                    value={selectedDate} 
                    onChange={(e) => setSelectedDate(e.target.value)}
                    className="w-40 rounded-xl font-bold bg-muted border-none"
                  />
                </div>
              </CardHeader>
              <CardContent className="p-8 pt-4 space-y-6">
                <div className="relative group">
                   <Textarea
                    placeholder={lang === 'hi' ? 'यहाँ कच्चा टेक्स्ट पेस्ट करें...' : 'Paste raw news content, PIB releases, or articles here...'}
                    className="min-h-[400px] rounded-3xl p-6 font-body text-base leading-relaxed border-2 border-muted focus-visible:ring-0 focus-visible:border-accent bg-background resize-none"
                    value={rawTextInput}
                    onChange={(e) => setRawTextInput(e.target.value)}
                  />
                  <AnimatePresence>
                    {isParsing && (
                      <motion.div 
                        initial={{ opacity: 0 }}
                        animate={{ opacity: 1 }}
                        exit={{ opacity: 0 }}
                        className="absolute inset-0 bg-background/80 backdrop-blur-md rounded-3xl flex flex-col items-center justify-center space-y-6"
                      >
                         <RefreshCw className="h-16 w-16 text-accent animate-spin" />
                         <div className="text-center space-y-1">
                           <p className="font-display font-black text-xl tracking-widest uppercase">Analyzing Context</p>
                           <p className="text-muted-foreground font-body text-sm">Our AI engine is categorizing your news units...</p>
                         </div>
                      </motion.div>
                    )}
                  </AnimatePresence>
                </div>
                <Button 
                  onClick={handleSmartParse} 
                  disabled={isParsing || !rawTextInput.trim()}
                  className="w-full py-8 rounded-[1.5rem] gold-gradient text-accent-foreground font-black uppercase tracking-[0.2em] text-sm shadow-xl hover:scale-[1.02] active:scale-[0.98] transition-all disabled:opacity-50"
                >
                   {isParsing ? 'Processing...' : (lang === 'hi' ? 'इंसर्ट/अपडेट डेटा' : 'Sync Intelligence')}
                </Button>
              </CardContent>
            </Card>
          </div>

          <div className="space-y-8">
            <Card className="rounded-[2.5rem] border-2 border-border bg-card shadow-lg">
              <CardHeader className="p-8 pb-4">
                <CardTitle className="text-xl font-display font-black flex items-center gap-2">
                  <FileJson className="h-5 w-5 text-accent" />
                  {lang === 'hi' ? 'इंटेलिजेंस पैकेट' : 'Intelligence Packet'}
                </CardTitle>
                <p className="text-xs text-muted-foreground font-body">Direct JSON Import/Sync</p>
              </CardHeader>
              <CardContent className="p-8 pt-0 space-y-4">
                <div className="p-4 rounded-xl bg-orange-500/10 border border-orange-500/20 mb-4">
                    <p className="text-[10px] text-orange-600 font-bold uppercase tracking-wider mb-1">Developer Mode</p>
                    <p className="text-[10px] text-orange-700/70">Ensure JSON matches the DailyNews schema for correct visualization.</p>
                </div>
                <Textarea
                  placeholder='{ "metadata": { "date": "..." }, "categories": [...] }'
                  className="min-h-[200px] rounded-2xl font-mono text-[10px] bg-muted/50 border-none"
                  value={jsonInput}
                  onChange={(e) => setJsonInput(e.target.value)}
                />
                <Button onClick={handleImport} className="w-full py-6 rounded-2xl bg-secondary text-secondary-foreground hover:bg-secondary/80 font-bold uppercase tracking-widest text-xs">
                  {lang === 'hi' ? 'पैकेट लोड करें' : 'Load Packet'}
                </Button>
              </CardContent>
            </Card>

            <Card className="rounded-[2.5rem] border-2 border-border bg-card shadow-lg overflow-hidden">
               <div className="p-8 space-y-6">
                  <div className="flex items-center justify-between">
                    <h4 className="font-display font-black uppercase text-xs tracking-tighter">Vault Integrity</h4>
                    <div className="flex items-center gap-1.5 px-2 py-0.5 rounded-full bg-emerald-500/10 text-emerald-500 text-[10px] font-bold">
                       <span className="w-1.5 h-1.5 rounded-full bg-emerald-500 animate-pulse" />
                       Active
                    </div>
                  </div>

                  <div className="space-y-4 text-xs font-body">
                    <div className="flex items-center justify-between">
                      <span className="text-muted-foreground">Version</span>
                      <span className="font-bold">2.0.0 (Gold)</span>
                    </div>
                    <div className="flex items-center justify-between">
                      <span className="text-muted-foreground">Encryption</span>
                      <span className="font-bold">Local-First Vault</span>
                    </div>
                  </div>

                  <div className="pt-4 border-t border-border">
                    <div className="flex items-center gap-2 text-amber-500 uppercase font-black text-[10px] tracking-widest mb-2">
                      <ShieldAlert className="h-3.5 w-3.5" />
                      Security Advisory
                    </div>
                    <p className="text-[10px] text-muted-foreground leading-relaxed">
                      Intelligence units are stored locally. Always download a Backup Vault before clearing browser memory.
                    </p>
                  </div>
               </div>
            </Card>
          </div>
        </div>
      </div>
    </AppLayout>
  );
};

export default AdminPage;
