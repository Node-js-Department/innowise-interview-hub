import { redirect } from "next/navigation"
import { NextRequest } from "next/server";

const NEST = `${process.env.CORE_SERVICE_HOST}:${process.env.CORE_SERVICE_PORT}`;

export const GET = async (req: NextRequest) => {
  redirect(`http://${NEST}/api/auth/google/callback?${req.nextUrl.searchParams.toString()}`);
}