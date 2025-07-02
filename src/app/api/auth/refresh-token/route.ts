import { NextRequest, NextResponse } from "next/server";
import { z } from "zod";
import { sign } from "jsonwebtoken";

import { RefreshTokenRepository } from "./RefreshTokenRepository";
import { env } from "@/app/config/env";

export async function POST(request: NextRequest) {
  // TODO: Check the possibility to transform this file in a class
  // and receive this repository in contructor
  const refreshTokenRepository = new RefreshTokenRepository();
  
  // TODO: move this to a constant file
  const EXP_TIME_IN_DAYS = 5;

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

  const expiresAt = new Date();
  expiresAt.setDate(expiresAt.getDate() + EXP_TIME_IN_DAYS);

  const [accessToken, newRefreshToken] = await Promise.all([
    sign({ sub: refreshToken.userId }, env.jwtSecret),
    refreshTokenRepository.create({ userId: refreshToken.userId, expiresAt }),
  ]);

  return NextResponse.json({ accessToken, newRefreshToken });
}