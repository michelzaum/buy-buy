import { NextRequest, NextResponse } from "next/server";
import { z } from "zod";
import { compare } from 'bcryptjs';
import { sign } from 'jsonwebtoken';

import { db } from "@/lib/db";
import { env } from "@/app/config/env";
import { EXP_TIME_IN_DAYS } from "@/lib/constants";
import { RefreshTokenRepository } from "../refresh-token/RefreshTokenRepository";

const schema = z.object({
  email: z.string().email(),
  password: z.string().min(1),
});

export async function POST(request: NextRequest) {
  const refreshTokenRepository = new RefreshTokenRepository();
  const body = await request.json();

  const { success, error, data } = schema.safeParse(body);

  if (!success) {
    return NextResponse.json(
      { errors: error.issues },
      { status: 400 },
    );
  }

  const { email, password } = data;

  const user = await db.user.findUnique({
    where: { email },
  });

  if (!user) {
    return NextResponse.json(
      { error: 'Invalid credentials' },
      { status: 401 },
    );
  }

  const isPasswordValid = await compare(password, user.password);

  if (!isPasswordValid) {
    return NextResponse.json(
      { error: 'Invalid credentials' },
      { status: 401 },
    );
  }

  const accessToken = sign(
    { sub: user.id },
    env.jwtSecret,
    { expiresIn: '2d' },
  );

  const expiresAt = new Date();
  expiresAt.setDate(expiresAt.getDate() + EXP_TIME_IN_DAYS);

  const { id } = await refreshTokenRepository.create({ userId: user.id, expiresAt });

  const response = NextResponse.json(
    { name: user.name, email: user.email, refreshToken: id },
    { status: 200 },
  );

  response.cookies.set(
    'accessToken',
    accessToken,
    {
      httpOnly: true,
      maxAge: 2 * 24 * 60 * 60, // 2 days
      path: '/',
      sameSite: 'strict',
      secure: true,
    },
  );

  return response;
}
