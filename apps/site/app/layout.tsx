import type { ReactNode } from 'react';
import './global.css';

export const metadata = {
  title: 'whest-docs',
  description: 'Unified docs shell for whest and whestbench',
};

export default function RootLayout({ children }: { children: ReactNode }) {
  return (
    <html lang="en">
      <body>{children}</body>
    </html>
  );
}
