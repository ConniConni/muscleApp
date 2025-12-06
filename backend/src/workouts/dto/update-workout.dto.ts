import { IsString, IsInt, IsOptional, IsNumber, IsDateString, Min } from 'class-validator';

export class UpdateWorkoutDto {
  @IsOptional()
  @IsString()
  bodyPart?: string;

  @IsOptional()
  @IsString()
  exerciseName?: string;

  @IsOptional()
  @IsInt()
  @Min(1)
  sets?: number;

  @IsOptional()
  @IsInt()
  @Min(1)
  reps?: number;

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

  @IsOptional()
  @IsDateString()
  workoutDate?: string;
}
