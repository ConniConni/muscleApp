import React, { useState } from 'react';
import { Like } from '../types/workout';
import { addLike, removeLike } from '../lib/workoutApi';
import '../styles/LikeButton.css';

interface LikeButtonProps {
  workoutId: string;
  likes: Like[];
  currentUserId: string;
  onLikesChange: (likes: Like[]) => void;
}

const LikeButton: React.FC<LikeButtonProps> = ({ workoutId, likes, currentUserId, onLikesChange }) => {
  const [isLoading, setIsLoading] = useState(false);

  const isLiked = likes.some(like => like.userId === currentUserId);

  const handleLikeToggle = async (e: React.MouseEvent) => {
    e.stopPropagation();
    if (isLoading) return;

    setIsLoading(true);
    try {
      if (isLiked) {
        await removeLike(workoutId);
        onLikesChange(likes.filter(like => like.userId !== currentUserId));
      } else {
        await addLike(workoutId);
        const newLike: Like = {
          id: Date.now().toString(),
          userId: currentUserId,
          user: {
            id: currentUserId,
            username: 'You',
            profileImageUrl: null,
          },
        };
        onLikesChange([...likes, newLike]);
      }
    } catch (error) {
      console.error('Failed to toggle like:', error);
      alert('いいねの操作に失敗しました');
    } finally {
      setIsLoading(false);
    }
  };

  return (
    <button
      className={`like-button ${isLiked ? 'liked' : ''} ${isLoading ? 'loading' : ''}`}
      onClick={handleLikeToggle}
      disabled={isLoading}
    >
      <span className="like-icon">{isLiked ? '❤️' : '🤍'}</span>
      <span className="like-count">{likes.length}</span>
    </button>
  );
};

export default LikeButton;
