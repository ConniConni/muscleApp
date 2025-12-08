export class CommentResponseDto {
  id: string;
  workoutId: string;
  userId: string;
  content: string;
  createdAt: Date;
  updatedAt: Date;
  user: {
    id: string;
    username: string;
    profileImageUrl: string | null;
  };
}
