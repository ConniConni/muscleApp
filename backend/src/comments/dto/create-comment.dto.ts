import { IsNotEmpty, IsString, MaxLength } from 'class-validator';

export class CreateCommentDto {
  @IsNotEmpty({ message: 'コメント内容は必須です' })
  @IsString({ message: 'コメント内容は文字列で入力してください' })
  @MaxLength(500, { message: 'コメントは500文字以内で入力してください' })
  content: string;
}
