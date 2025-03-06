import { redirect } from 'next/navigation';
import { NextRequest } from 'next/server';

const NEST = `${process.env.NEXT_PUBLIC_CORE_SERVICE_HOST}:${process.env.NEXT_PUBLIC_CORE_SERVICE_PORT}`;

export const GET = async (req: NextRequest) => {
  redirect(`http://${NEST}/api/auth/google/callback?${req.nextUrl.searchParams.toString()}`);
};
