'use client';

import React from 'react';

const RootLayout = ({ children }: { children: React.ReactNode }): JSX.Element => (
  <div className='app'>
    {children}
  </div>
);

export default RootLayout;
