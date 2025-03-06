import { redirect } from "next/navigation"
import { NextRequest } from "next/server";

export const GET = async (req: NextRequest) => {
  redirect(`http://localhost:6900/api/auth/google/callback?${req.nextUrl.searchParams.toString()}`);
}