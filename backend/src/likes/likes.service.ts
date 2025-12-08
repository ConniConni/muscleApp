import { Injectable, ConflictException, NotFoundException } from '@nestjs/common';
import { PrismaService } from '../prisma/prisma.service';
import { LikeResponseDto, LikeWithUserDto } from './dto';

@Injectable()
export class LikesService {
  constructor(private prisma: PrismaService) {}

  async create(workoutId: string, userId: string): Promise<LikeResponseDto> {
    // ワークアウトの存在確認
    const workout = await this.prisma.workout.findUnique({
      where: { id: workoutId },
    });

    if (!workout) {
      throw new NotFoundException('Workout not found');
    }

    // 既にいいねしているかチェック
    const existingLike = await this.prisma.like.findUnique({
      where: {
        workoutId_userId: {
          workoutId,
          userId,
        },
      },
    });

    if (existingLike) {
      throw new ConflictException('Already liked');
    }

    // いいねを作成
    const like = await this.prisma.like.create({
      data: {
        workoutId,
        userId,
      },
    });

    return like;
  }

  async remove(workoutId: string, userId: string): Promise<void> {
    const like = await this.prisma.like.findUnique({
      where: {
        workoutId_userId: {
          workoutId,
          userId,
        },
      },
    });

    if (!like) {
      throw new NotFoundException('Like not found');
    }

    await this.prisma.like.delete({
      where: {
        id: like.id,
      },
    });
  }

  async findByWorkoutId(workoutId: string): Promise<LikeWithUserDto[]> {
    const likes = await this.prisma.like.findMany({
      where: { workoutId },
      include: {
        user: {
          select: {
            id: true,
            username: true,
            profileImageUrl: true,
          },
        },
      },
      orderBy: {
        createdAt: 'desc',
      },
    });

    return likes;
  }

  async countByWorkoutId(workoutId: string): Promise<number> {
    return this.prisma.like.count({
      where: { workoutId },
    });
  }

  async isLikedByUser(workoutId: string, userId: string): Promise<boolean> {
    const like = await this.prisma.like.findUnique({
      where: {
        workoutId_userId: {
          workoutId,
          userId,
        },
      },
    });

    return !!like;
  }
}
