import { db } from "@/lib/db";
import { NextRequest, NextResponse } from "next/server";
import { z } from "zod";
import { hash } from 'bcryptjs';

const schema = z.object({
  name: z.string().min(1),
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

  const { email, name, password } = data;

  const emailAlreadyInUse = await db.user.findUnique({
    where: { email },
    select: { id: true },
  });

  if (emailAlreadyInUse) {
    return NextResponse.json(
      { error: 'E-mail already in use' },
      { status: 409 },
    );
  }

  const hashedPassword = await hash(password, 12);

  await db.user.create({
    data: {
      email,
      name,
      password: hashedPassword,
    },
  })

  return NextResponse.json({ ok: true }, { status: 201 });
}
