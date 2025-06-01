import { env } from "@/app/config/env";
import { JwtPayload, verify } from "jsonwebtoken";
import { cookies } from "next/headers";
import { db } from "./db";
import { User } from "@/entities/User";

async function getAccessToken() {
  return (await cookies()).get('accessToken')?.value;
}

async function verifyJwt(): Promise<null | string> {
  const accessToken = await getAccessToken();

  if (!accessToken) {
    return null;
  }

  try {
    const { sub: userId } = verify(accessToken, env.jwtSecret) as JwtPayload;

    if (!userId) {
      return null;
    }

    return userId;
  } catch {
    return null;
  }
}

export async function isAuthenticated(): Promise<boolean> {
  const isValidJwt = await verifyJwt();

  return !!isValidJwt;
}

export async function auth(): Promise<null | User> {
  const userId = await verifyJwt();

  if (!userId) {
    return null;
  }

  try {
    const user = await db.user.findUnique({
      where: { id: userId },
    });
  
    return user;
  } catch {
    return null;
  }
}
