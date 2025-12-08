export class LikeWithUserDto {
  id: string;
  workoutId: string;
  userId: string;
  createdAt: Date;
  user: {
    id: string;
    username: string;
    profileImageUrl: string | null;
  };
}
