'use server';

import { cookies } from "next/headers";
import { redirect } from "next/navigation";

export const isTokenValid = async (token: string) => {
  const backend = `${process.env.NEXT_PUBLIC_CORE_SERVICE_HOST}:${process.env.NEXT_PUBLIC_CORE_SERVICE_PORT}`;

  const response = await fetch(`http://${backend}/api/auth/validate`, {
    headers: {
      Cookie: `access_token=${token}`,
    },
  });

  const { isValid } = await response.json();

  return isValid;
};

export const handleLogout = async () => {
  const cookieStore = await cookies();
  cookieStore.delete('access_token');

  redirect('/signin');
};
