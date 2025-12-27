import { NextRequest, NextResponse } from "next/server";
import { cookies } from "next/headers";
import { verify } from "jsonwebtoken";

import { db } from "@/lib/db";
import { env } from "@/app/config/env";

interface UpdateUserProfileParams {
  params: Promise<{ id: string }>;
}

export async function PUT(request: NextRequest, { params }: UpdateUserProfileParams) {
  const { id } = await params;
  const accessToken = (await cookies()).get('accessToken')?.value;

  if (!id) {
    return NextResponse.json(
      { error: 'Invalid id' },
      { status: 400 },
    );
  }

  if (!accessToken) {
    return NextResponse.json(
      { error: 'Unauthorized' },
      { status: 401 },
    );
  }

  const userToUpdate = await db.user.findUnique({
    where: { id },
    select: {
      id: true,
    },
  });

  if (!userToUpdate) {
    return NextResponse.json(
      { error: 'User not found' },
      { status: 400 },
    );
  }

  const { sub: authenticatedUserId } = verify(accessToken, env.jwtSecret);

  if (authenticatedUserId !== userToUpdate.id) {
    return NextResponse.json(
      { error: 'Unauthorized' },
      { status: 401 },
    );
  }

  const body = await request.json();
  
  const updatedUser = await db.user.update({
    where: { id },
    data: {
      email: body.email,
      name: body.name,
      password: body.password && body.password,
    },
  });

  return NextResponse.json(
    { updatedUser },
    { status: 200 },
  );
}
