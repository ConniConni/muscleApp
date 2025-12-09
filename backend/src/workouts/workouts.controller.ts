import {
  Controller,
  Get,
  Post,
  Body,
  Patch,
  Param,
  Delete,
  UseGuards,
  Request,
  Query,
} from '@nestjs/common';
import { WorkoutsService } from './workouts.service';
import { CreateWorkoutDto } from './dto/create-workout.dto';
import { UpdateWorkoutDto } from './dto/update-workout.dto';
import { JwtAuthGuard } from '../auth/guards/jwt-auth.guard';

@Controller('workouts')
@UseGuards(JwtAuthGuard)
export class WorkoutsController {
  constructor(private readonly workoutsService: WorkoutsService) {}

  @Post()
  create(@Request() req, @Body() createWorkoutDto: CreateWorkoutDto) {
    return this.workoutsService.create(req.user.userId, createWorkoutDto);
  }

  @Get()
  findAll(@Request() req) {
    return this.workoutsService.findAll(req.user.userId);
  }

  @Get('me')
  findMyWorkouts(@Request() req) {
    return this.workoutsService.findMyWorkouts(req.user.userId);
  }

  @Get('calendar')
  getCalendar(
    @Request() req,
    @Query('year') year: string,
    @Query('month') month: string,
  ) {
    return this.workoutsService.getCalendar(
      req.user.userId,
      parseInt(year),
      parseInt(month),
    );
  }

  @Get('exercises')
  getExercises(@Request() req) {
    return this.workoutsService.getExercises(req.user.userId);
  }

  @Get('by-exercise')
  getByExercise(
    @Request() req,
    @Query('name') exerciseName: string,
  ) {
    return this.workoutsService.getByExercise(req.user.userId, exerciseName);
  }

  @Get(':id')
  findOne(@Param('id') id: string, @Request() req) {
    return this.workoutsService.findOne(id, req.user.userId);
  }

  @Patch(':id')
  update(
    @Param('id') id: string,
    @Request() req,
    @Body() updateWorkoutDto: UpdateWorkoutDto,
  ) {
    return this.workoutsService.update(id, req.user.userId, updateWorkoutDto);
  }

  @Delete(':id')
  remove(@Param('id') id: string, @Request() req) {
    return this.workoutsService.remove(id, req.user.userId);
  }
}
