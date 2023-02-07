import WagmiProvider from '@/providers/wagmiProvider';
import ToastProvider from '@/providers/toastProvider';

import { inter } from '@/utils/fonts';
import '@/theme/globals.css';

export default function RootLayout({ children }: { children: React.ReactNode }) {
  return (
    <html lang="en" className={inter.className}>
      <head />
      <body>
        <ToastProvider>
          <WagmiProvider>{children}</WagmiProvider>
        </ToastProvider>
      </body>
    </html>
  );
}
