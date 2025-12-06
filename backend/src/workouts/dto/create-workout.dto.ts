import { IsString, IsInt, IsOptional, IsNumber, IsDateString, Min } from 'class-validator';

export class CreateWorkoutDto {
  @IsString()
  bodyPart: string;

  @IsString()
  exerciseName: string;

  @IsInt()
  @Min(1)
  sets: number;

  @IsInt()
  @Min(1)
  reps: number;

  @IsOptional()
  @IsNumber()
  @Min(0)
  weight?: number;

  @IsOptional()
  @IsString()
  memo?: string;

  @IsOptional()
  @IsString()
  imageUrl?: string;

  @IsDateString()
  workoutDate: string;
}
