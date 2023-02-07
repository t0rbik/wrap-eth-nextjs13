'use client';

import { Provider } from '@radix-ui/react-toast';

export default function ToastProvider({ children }: { children: React.ReactNode }) {
  return <Provider>{children}</Provider>;
}
