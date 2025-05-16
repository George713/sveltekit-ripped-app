// Extend Window interface to include PWA installation properties
interface Window {
  deferredInstallPrompt?: {
    prompt: () => Promise<void>;
    userChoice: Promise<{ outcome: 'accepted' | 'dismissed' }>;
  } | null;
}
