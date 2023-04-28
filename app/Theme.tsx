'use client';

import { ThemeProvider } from 'next-themes';

export default function ThemesInit({ children }: { children: React.ReactNode }) {
  return (
    <ThemeProvider
      defaultTheme='system'
      attribute='data-theme'
      themes={['cupcake', 'business']}
      value={{ light: 'cupcake', dark: 'business' }}
    >
      {children}
    </ThemeProvider>
  );
}
