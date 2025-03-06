'use server';

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
