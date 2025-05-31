import { db } from "@/lib/db";
import { NextRequest, NextResponse } from "next/server";
import { z } from "zod";
import { compare } from 'bcryptjs';

const schema = z.object({
  email: z.string().email(),
  password: z.string().min(1),
});

export async function POST(request: NextRequest) {
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
    select: { id: true, email: true, password: true },
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

  

  return new NextResponse(null, { status: 204 });
}
