import { useState, useEffect } from 'react';
import { X, Download, Bell, BellOff } from 'lucide-react';

interface BeforeInstallPromptEvent extends Event {
  prompt: () => Promise<void>;
  userChoice: Promise<{ outcome: 'accepted' | 'dismissed' }>;
}

const PwaInstallBanner = () => {
  const [installPrompt, setInstallPrompt] = useState<BeforeInstallPromptEvent | null>(null);
  const [showInstall, setShowInstall] = useState(false);
  const [notifState, setNotifState] = useState<NotificationPermission>('default');
  const [showNotifBanner, setShowNotifBanner] = useState(false);
  const [dismissed, setDismissed] = useState(false);

  useEffect(() => {
    // Check if already dismissed
    if (window.matchMedia('(display-mode: standalone)').matches) {
      localStorage.setItem('sathi-installed-samachar-sathi', 'true');
    }
    if (localStorage.getItem('ss_pwa_dismissed')) return;

    // Capture install prompt
    const handler = (e: Event) => {
      e.preventDefault();
      setInstallPrompt(e as BeforeInstallPromptEvent);
      setShowInstall(true);
    };
    window.addEventListener('beforeinstallprompt', handler);
    window.addEventListener('appinstalled', () => {
      localStorage.setItem('sathi-installed-samachar-sathi', 'true');
    });

    // Check notification permission
    if ('Notification' in window) {
      setNotifState(Notification.permission);
      if (Notification.permission === 'default') {
        // Show notif banner after 10s if not already asked
        if (!localStorage.getItem('ss_notif_asked')) {
          setTimeout(() => setShowNotifBanner(true), 10000);
        }
      }
    }

    return () => window.removeEventListener('beforeinstallprompt', handler);
  }, []);

  const handleInstall = async () => {
    if (!installPrompt) return;
    await installPrompt.prompt();
    const { outcome } = await installPrompt.userChoice;
    if (outcome === 'accepted') {
      localStorage.setItem('sathi-installed-samachar-sathi', 'true');
      setShowInstall(false);
      localStorage.setItem('ss_pwa_dismissed', '1');
    }
    setInstallPrompt(null);
  };

  const handleDismissInstall = () => {
    setShowInstall(false);
    setDismissed(true);
    localStorage.setItem('ss_pwa_dismissed', '1');
  };

  const handleEnableNotif = async () => {
    if (!('Notification' in window)) return;
    localStorage.setItem('ss_notif_asked', '1');
    const permission = await Notification.requestPermission();
    setNotifState(permission);
    setShowNotifBanner(false);

    if (permission === 'granted' && 'serviceWorker' in navigator) {
      const reg = await navigator.serviceWorker.ready;
      reg.active?.postMessage({
        type: 'SCHEDULE_NEWS_NOTIF',
        userName: '',
        time: '7:00 AM'
      });
    }
  };

  const handleDismissNotif = () => {
    setShowNotifBanner(false);
    localStorage.setItem('ss_notif_asked', '1');
  };

  if (dismissed && !showNotifBanner) return null;

  return (
    <>
      {/* Install Banner */}
      {showInstall && (
        <div className="fixed bottom-4 left-4 right-4 md:left-auto md:right-4 md:w-80 z-50 animate-in slide-in-from-bottom-4">
          <div className="bg-card border border-border rounded-2xl p-4 shadow-2xl">
            <div className="flex items-start gap-3">
              <div className="w-10 h-10 rounded-xl bg-amber-500/10 flex items-center justify-center shrink-0">
                <Download className="w-5 h-5 text-amber-500" />
              </div>
              <div className="flex-1 min-w-0">
                <p className="font-semibold text-sm text-foreground">App Install करें</p>
                <p className="text-xs text-muted-foreground mt-0.5">
                  SamacharSathi ko home screen pe add karein — offline bhi kaam karega!
                </p>
                <div className="flex gap-2 mt-3">
                  <button
                    onClick={handleInstall}
                    className="flex-1 bg-amber-500 hover:bg-amber-600 text-black text-xs font-bold py-2 px-3 rounded-lg transition-colors"
                  >
                    Install करें
                  </button>
                  <button
                    onClick={handleDismissInstall}
                    className="text-xs text-muted-foreground hover:text-foreground py-2 px-3 rounded-lg hover:bg-muted transition-colors"
                  >
                    Baad mein
                  </button>
                </div>
              </div>
              <button onClick={handleDismissInstall} className="text-muted-foreground hover:text-foreground shrink-0">
                <X className="w-4 h-4" />
              </button>
            </div>
          </div>
        </div>
      )}

      {/* Notification Permission Banner */}
      {showNotifBanner && notifState === 'default' && (
        <div className="fixed bottom-4 left-4 right-4 md:left-auto md:right-4 md:w-80 z-50 animate-in slide-in-from-bottom-4"
          style={{ bottom: showInstall ? '7rem' : '1rem' }}>
          <div className="bg-card border border-border rounded-2xl p-4 shadow-2xl">
            <div className="flex items-start gap-3">
              <div className="w-10 h-10 rounded-xl bg-blue-500/10 flex items-center justify-center shrink-0">
                <Bell className="w-5 h-5 text-blue-400" />
              </div>
              <div className="flex-1 min-w-0">
                <p className="font-semibold text-sm text-foreground">Daily News Reminder</p>
                <p className="text-xs text-muted-foreground mt-0.5">
                  Roz subah 7 baje notification milega — aaj ka news analysis ready hone par!
                </p>
                <div className="flex gap-2 mt-3">
                  <button
                    onClick={handleEnableNotif}
                    className="flex-1 bg-blue-500 hover:bg-blue-600 text-white text-xs font-bold py-2 px-3 rounded-lg transition-colors flex items-center justify-center gap-1"
                  >
                    <Bell className="w-3 h-3" /> Allow
                  </button>
                  <button
                    onClick={handleDismissNotif}
                    className="text-xs text-muted-foreground hover:text-foreground py-2 px-3 rounded-lg hover:bg-muted transition-colors flex items-center gap-1"
                  >
                    <BellOff className="w-3 h-3" /> Nahi
                  </button>
                </div>
              </div>
              <button onClick={handleDismissNotif} className="text-muted-foreground hover:text-foreground shrink-0">
                <X className="w-4 h-4" />
              </button>
            </div>
          </div>
        </div>
      )}
    </>
  );
};

export default PwaInstallBanner;
