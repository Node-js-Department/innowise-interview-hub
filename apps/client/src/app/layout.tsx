'use client';

import { RouteChangesProvider } from 'nextjs-router-events';

import { LocaleProvider } from '../../hooks/locale-provider';

import './style.css';

export default function RootLayout({ children }: { children: React.ReactNode }) {

  // const locale = getLocale();

  return (
    <html lang='en' suppressHydrationWarning>
      <head>
        <meta charSet='UTF-8' />
        <meta name='theme-color' content='#ffffff' />
        <meta content='width=device-width, initial-scale=1.0' name='viewport' />
        <title>Innowise Inteview Hub</title>
      </head>
      <body>
        <RouteChangesProvider>
          <main>
            <LocaleProvider value='en'>
              {children}
            </LocaleProvider>
          </main>
        </RouteChangesProvider>
      </body>
    </html>
  );
}
