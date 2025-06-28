import { NextRequest, NextResponse } from "next/server";
import { z } from "zod";
import { RefreshTokenRepository } from "./RefreshTokenRepository";

export async function POST(request: NextRequest) {
  // TODO: Check the possibility to transform this file in a class
  // and receive this repository in contructor
  const refreshTokenRepository = new RefreshTokenRepository();

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

  const { refreshToken: refreshTokenId } = validateSchema.data;

  const refreshToken = await refreshTokenRepository.findById(refreshTokenId);

  if (!refreshToken) {
    return NextResponse.json(
      { error: "Invalid refresh token" },
      { status: 401 },
    );
  }

  if (Date.now() > refreshToken.expiresAt.getTime()) {
    return NextResponse.json(
      { error: "Invalid refresh token" },
      { status: 401 },
    );
  }

  return NextResponse.json({ request })
}