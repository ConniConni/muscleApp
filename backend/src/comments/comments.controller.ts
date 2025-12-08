import {
  Controller,
  Post,
  Delete,
  Get,
  Param,
  Body,
  UseGuards,
  Request,
  HttpCode,
  HttpStatus,
} from '@nestjs/common';
import { JwtAuthGuard } from '../auth/guards/jwt-auth.guard';
import { CommentsService } from './comments.service';
import { CreateCommentDto, CommentResponseDto } from './dto';

@Controller()
@UseGuards(JwtAuthGuard)
export class CommentsController {
  constructor(private readonly commentsService: CommentsService) {}

  @Post('workouts/:workoutId/comments')
  async create(
    @Param('workoutId') workoutId: string,
    @Body() createCommentDto: CreateCommentDto,
    @Request() req,
  ): Promise<CommentResponseDto> {
    return this.commentsService.create(workoutId, req.user.userId, createCommentDto);
  }

  @Get('workouts/:workoutId/comments')
  async findAll(
    @Param('workoutId') workoutId: string,
  ): Promise<CommentResponseDto[]> {
    return this.commentsService.findByWorkoutId(workoutId);
  }

  @Delete('comments/:id')
  @HttpCode(HttpStatus.NO_CONTENT)
  async delete(@Param('id') id: string, @Request() req): Promise<void> {
    await this.commentsService.delete(id, req.user.userId);
  }
}
