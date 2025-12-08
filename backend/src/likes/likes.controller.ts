import {
  Controller,
  Post,
  Delete,
  Get,
  Param,
  UseGuards,
  Request,
  HttpCode,
  HttpStatus,
} from '@nestjs/common';
import { JwtAuthGuard } from '../auth/guards/jwt-auth.guard';
import { LikesService } from './likes.service';
import { LikeResponseDto, LikeWithUserDto } from './dto';

@Controller('workouts/:workoutId/likes')
@UseGuards(JwtAuthGuard)
export class LikesController {
  constructor(private readonly likesService: LikesService) {}

  @Post()
  async create(
    @Param('workoutId') workoutId: string,
    @Request() req,
  ): Promise<LikeResponseDto> {
    return this.likesService.create(workoutId, req.user.userId);
  }

  @Delete()
  @HttpCode(HttpStatus.NO_CONTENT)
  async remove(@Param('workoutId') workoutId: string, @Request() req): Promise<void> {
    await this.likesService.remove(workoutId, req.user.userId);
  }

  @Get()
  async findAll(@Param('workoutId') workoutId: string): Promise<LikeWithUserDto[]> {
    return this.likesService.findByWorkoutId(workoutId);
  }
}
