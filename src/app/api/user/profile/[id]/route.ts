import { NextRequest, NextResponse } from "next/server";
import { db } from "@/lib/db";

interface UpdateUserProfileParams {
  params: Promise<{ id: string }>;
}

export async function PUT(request: NextRequest, { params }: UpdateUserProfileParams) {
  const { id } = await params;

  if (!id) {
    return NextResponse.json(
      { error: 'Invalid id' },
      { status: 400 },
    );
  }

  const userId = await db.user.findUnique({
    where: { id },
    select: {
      id: true,
    },
  });

  if (!userId) {
    return NextResponse.json(
      { error: 'User not found' },
      { status: 400 },
    );
  }

  const body = await request.json();
  
  const updatedUser = await db.user.update({
    where: { id },
    data: {
      email: body.email,
      name: body.name,
      password: body.password,
    },
  });

  return NextResponse.json(
    { updatedUser },
    { status: 200 },
  );
}
