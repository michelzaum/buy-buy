import { NextRequest, NextResponse } from "next/server";
import { z } from "zod";

export async function POST(request: NextRequest) {
  const schema = z.object({
    refreshToken: z.string().uuid(),
  });

  const body = await request.json();
  const validateSchema = schema.safeParse(body);

  if (!validateSchema.success) {
    return NextResponse.json(
      { error: 'Invalid refresh token' },
      { status: 400 });
  }

  return NextResponse.json({ request })
}