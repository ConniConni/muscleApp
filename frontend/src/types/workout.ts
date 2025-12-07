import { User } from './auth';

export interface Workout {
  id: string;
  userId: string;
  bodyPart: string;
  exerciseName: string;
  sets: number;
  reps: number;
  weight?: number;
  memo?: string;
  imageUrl?: string;
  workoutDate: string;
  createdAt: string;
  updatedAt: string;
  user: User;
  likes: Like[];
  comments: Comment[];
}

export interface Like {
  id: string;
  userId: string;
}

export interface Comment {
  id: string;
  content: string;
  userId: string;
  createdAt: string;
  user: {
    id: string;
    username: string;
    profileImageUrl: string | null;
  };
}

export interface CreateWorkoutRequest {
  bodyPart: string;
  exerciseName: string;
  sets: number;
  reps: number;
  weight?: number;
  memo?: string;
  imageUrl?: string;
  workoutDate: string;
}

export interface UpdateWorkoutRequest {
  bodyPart?: string;
  exerciseName?: string;
  sets?: number;
  reps?: number;
  weight?: number;
  memo?: string;
  imageUrl?: string;
  workoutDate?: string;
}
