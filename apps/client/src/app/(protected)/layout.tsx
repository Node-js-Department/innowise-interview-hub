import React from 'react';
import { cookies } from 'next/headers';
import { redirect } from 'next/navigation';

import { isTokenValid } from '@/lib/actions';

const ProtectedLayout = async ({ children }: { children: React.ReactNode }) => {
  const cookieStore = await cookies();
  const token = cookieStore.get('access_token')?.value;

  if (!token) {
    redirect('/signin');
  }

  const isValid = await isTokenValid(token);
  if (!isValid) {
    redirect('/signin');
  }

  return (
    { children }
  );
};

export default ProtectedLayout;
