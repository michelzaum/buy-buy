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

  async findById(id: string): Promise<RefreshToken | null> {
    return db.refreshToken.findUnique({
      where: { id },
    });
  }

  async delete(id: string) {
    return db.refreshToken.delete({
      where: { id },
    });
  }
}
