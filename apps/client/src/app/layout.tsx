'use client';

import { RouteChangesProvider } from 'nextjs-router-events';
import React from 'react';
import './style.css';
import { ReactFlowProvider } from '@xyflow/react';

import { getLocale } from '@/i18next/client';
import { LocaleProvider } from '@/hooks/locale-provider';

const RootLayout = ({
  children,
}: {
  children: React.ReactNode,
}): JSX.Element => {
  const locale = getLocale();

  return (
    <html lang={locale} suppressHydrationWarning>
      <head>
        <meta charSet='UTF-8' />
        <meta name='theme-color' content='#ffffff' />
        <meta content='width=device-width, initial-scale=1.0' name='viewport' />
        <title>Innowise Inteview Hub</title>
      </head>
      <body>
        <RouteChangesProvider>
          <main>
            <LocaleProvider value={locale}>
              <ReactFlowProvider>{children}</ReactFlowProvider>
            </LocaleProvider>
          </main>
        </RouteChangesProvider>
        {/* eslint-disable-next-line @next/next/no-sync-scripts  */}
        <script src='/init/env' type='text/javascript'></script>
      </body>
    </html>
  );
};

export default RootLayout;
