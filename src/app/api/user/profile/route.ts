import { NextRequest, NextResponse } from "next/server";
import { verify } from "jsonwebtoken";

import { db } from "@/lib/db";
import { env } from "@/app/config/env";

export async function GET(request: NextRequest) {
  const accessToken = request.cookies.get('accessToken')?.value;

  if (!accessToken) {
    return NextResponse.json(
      { error: 'Invalid access token' },
      { status: 401 },
    );
  }

  const { sub: userId } = verify(accessToken, env.jwtSecret);

  if (!userId) {
    return NextResponse.json(
      { error: 'Invalid access token' },
      { status: 401 },
    );
  }
  
  const user = await db.user.findUnique({
    where: { id: userId as string },
    select: { name: true, email: true },
  });

  return NextResponse.json(
    { user },
    { status: 200 },
  );
}
