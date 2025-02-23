'use client';

import { useEffect } from 'react';

export default function Page() {

  useEffect(() => {
    console.log('Hello!');
  }, []);

  return <h1>Hello Next.js!</h1>;
}