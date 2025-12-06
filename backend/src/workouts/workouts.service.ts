import { Injectable, NotFoundException, ForbiddenException } from '@nestjs/common';
import { PrismaService } from '../prisma/prisma.service';
import { CreateWorkoutDto } from './dto/create-workout.dto';
import { UpdateWorkoutDto } from './dto/update-workout.dto';

@Injectable()
export class WorkoutsService {
  constructor(private prisma: PrismaService) {}

  async create(userId: string, createWorkoutDto: CreateWorkoutDto) {
    return this.prisma.workout.create({
      data: {
        userId,
        bodyPart: createWorkoutDto.bodyPart,
        exerciseName: createWorkoutDto.exerciseName,
        sets: createWorkoutDto.sets,
        reps: createWorkoutDto.reps,
        weight: createWorkoutDto.weight,
        memo: createWorkoutDto.memo,
        imageUrl: createWorkoutDto.imageUrl,
        workoutDate: new Date(createWorkoutDto.workoutDate),
      },
      include: {
        user: {
          select: {
            id: true,
            username: true,
            email: true,
            profileImageUrl: true,
          },
        },
      },
    });
  }

  async findAll(userId: string) {
    // 自分の記録と友達の記録を取得
    const friendships = await this.prisma.friendship.findMany({
      where: {
        OR: [
          { userId: userId },
          { friendId: userId },
        ],
      },
    });

    // 友達のIDリストを作成
    const friendIds = friendships.map((f) =>
      f.userId === userId ? f.friendId : f.userId,
    );

    // 自分と友達のIDを合わせる
    const allowedUserIds = [userId, ...friendIds];

    return this.prisma.workout.findMany({
      where: {
        userId: {
          in: allowedUserIds,
        },
      },
      include: {
        user: {
          select: {
            id: true,
            username: true,
            email: true,
            profileImageUrl: true,
          },
        },
        likes: {
          select: {
            id: true,
            userId: true,
          },
        },
        comments: {
          select: {
            id: true,
            content: true,
            userId: true,
            createdAt: true,
            user: {
              select: {
                id: true,
                username: true,
                profileImageUrl: true,
              },
            },
          },
          orderBy: {
            createdAt: 'asc',
          },
        },
      },
      orderBy: {
        workoutDate: 'desc',
      },
    });
  }

  async findMyWorkouts(userId: string) {
    return this.prisma.workout.findMany({
      where: {
        userId,
      },
      include: {
        user: {
          select: {
            id: true,
            username: true,
            email: true,
            profileImageUrl: true,
          },
        },
        likes: {
          select: {
            id: true,
            userId: true,
          },
        },
        comments: {
          select: {
            id: true,
            content: true,
            userId: true,
            createdAt: true,
            user: {
              select: {
                id: true,
                username: true,
                profileImageUrl: true,
              },
            },
          },
          orderBy: {
            createdAt: 'asc',
          },
        },
      },
      orderBy: {
        workoutDate: 'desc',
      },
    });
  }

  async findOne(id: string, userId: string) {
    const workout = await this.prisma.workout.findUnique({
      where: { id },
      include: {
        user: {
          select: {
            id: true,
            username: true,
            email: true,
            profileImageUrl: true,
          },
        },
        likes: {
          select: {
            id: true,
            userId: true,
          },
        },
        comments: {
          select: {
            id: true,
            content: true,
            userId: true,
            createdAt: true,
            user: {
              select: {
                id: true,
                username: true,
                profileImageUrl: true,
              },
            },
          },
          orderBy: {
            createdAt: 'asc',
          },
        },
      },
    });

    if (!workout) {
      throw new NotFoundException('記録が見つかりません');
    }

    // 自分の記録か友達の記録かチェック
    if (workout.userId !== userId) {
      const isFriend = await this.prisma.friendship.findFirst({
        where: {
          OR: [
            { userId: userId, friendId: workout.userId },
            { userId: workout.userId, friendId: userId },
          ],
        },
      });

      if (!isFriend) {
        throw new ForbiddenException('この記録にアクセスする権限がありません');
      }
    }

    return workout;
  }

  async update(id: string, userId: string, updateWorkoutDto: UpdateWorkoutDto) {
    const workout = await this.prisma.workout.findUnique({
      where: { id },
    });

    if (!workout) {
      throw new NotFoundException('記録が見つかりません');
    }

    if (workout.userId !== userId) {
      throw new ForbiddenException('この記録を編集する権限がありません');
    }

    return this.prisma.workout.update({
      where: { id },
      data: {
        ...(updateWorkoutDto.bodyPart && { bodyPart: updateWorkoutDto.bodyPart }),
        ...(updateWorkoutDto.exerciseName && { exerciseName: updateWorkoutDto.exerciseName }),
        ...(updateWorkoutDto.sets && { sets: updateWorkoutDto.sets }),
        ...(updateWorkoutDto.reps && { reps: updateWorkoutDto.reps }),
        ...(updateWorkoutDto.weight !== undefined && { weight: updateWorkoutDto.weight }),
        ...(updateWorkoutDto.memo !== undefined && { memo: updateWorkoutDto.memo }),
        ...(updateWorkoutDto.imageUrl !== undefined && { imageUrl: updateWorkoutDto.imageUrl }),
        ...(updateWorkoutDto.workoutDate && { workoutDate: new Date(updateWorkoutDto.workoutDate) }),
      },
      include: {
        user: {
          select: {
            id: true,
            username: true,
            email: true,
            profileImageUrl: true,
          },
        },
      },
    });
  }

  async remove(id: string, userId: string) {
    const workout = await this.prisma.workout.findUnique({
      where: { id },
    });

    if (!workout) {
      throw new NotFoundException('記録が見つかりません');
    }

    if (workout.userId !== userId) {
      throw new ForbiddenException('この記録を削除する権限がありません');
    }

    return this.prisma.workout.delete({
      where: { id },
    });
  }
}
