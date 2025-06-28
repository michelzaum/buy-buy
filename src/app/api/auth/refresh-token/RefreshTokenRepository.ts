import { db } from "@/lib/db";
import { RefreshToken } from "@prisma/client";

interface ICreateDTO {
  userId: string;
  expiresAt: Date;
}

export class RefreshTokenRepository {
  async create({ userId, expiresAt }: ICreateDTO): Promise<RefreshToken> {
    return db.refreshToken.create({
      data: {
        userId, expiresAt,
      },
    });
  }
}