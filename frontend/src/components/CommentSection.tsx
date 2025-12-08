import React, { useState } from 'react';
import { Comment } from '../types/workout';
import { addComment, deleteComment } from '../lib/workoutApi';
import '../styles/CommentSection.css';

interface CommentSectionProps {
  workoutId: string;
  comments: Comment[];
  currentUserId: string;
  onCommentsChange: (comments: Comment[]) => void;
}

const CommentSection: React.FC<CommentSectionProps> = ({
  workoutId,
  comments,
  currentUserId,
  onCommentsChange,
}) => {
  const [newComment, setNewComment] = useState('');
  const [isSubmitting, setIsSubmitting] = useState(false);

  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault();
    if (!newComment.trim() || isSubmitting) return;

    setIsSubmitting(true);
    try {
      const comment = await addComment(workoutId, newComment.trim());
      onCommentsChange([...comments, comment]);
      setNewComment('');
    } catch (error) {
      console.error('Failed to post comment:', error);
      alert('コメントの投稿に失敗しました');
    } finally {
      setIsSubmitting(false);
    }
  };

  const handleDelete = async (commentId: string) => {
    if (!window.confirm('このコメントを削除しますか？')) return;

    try {
      await deleteComment(commentId);
      onCommentsChange(comments.filter(c => c.id !== commentId));
    } catch (error) {
      console.error('Failed to delete comment:', error);
      alert('コメントの削除に失敗しました');
    }
  };

  const formatTime = (dateString: string) => {
    const date = new Date(dateString);
    return date.toLocaleString('ja-JP', {
      month: '2-digit',
      day: '2-digit',
      hour: '2-digit',
      minute: '2-digit',
    });
  };

  return (
    <div className="comment-section">
      <h4 className="comment-section-title">コメント ({comments.length})</h4>

      <form className="comment-form" onSubmit={handleSubmit}>
        <textarea
          className="comment-input"
          value={newComment}
          onChange={(e) => setNewComment(e.target.value)}
          placeholder="コメントを入力..."
          maxLength={500}
          rows={3}
          disabled={isSubmitting}
        />
        <div className="comment-form-footer">
          <span className="character-count">
            {newComment.length} / 500
          </span>
          <button
            type="submit"
            className="comment-submit-btn"
            disabled={!newComment.trim() || isSubmitting}
          >
            {isSubmitting ? '投稿中...' : 'コメントする'}
          </button>
        </div>
      </form>

      <div className="comments-list">
        {comments.length === 0 ? (
          <p className="no-comments">まだコメントがありません</p>
        ) : (
          comments.map((comment) => (
            <div key={comment.id} className="comment-item">
              <div className="comment-header">
                <div className="comment-user">
                  {comment.user.profileImageUrl ? (
                    <img
                      src={comment.user.profileImageUrl}
                      alt={comment.user.username}
                      className="comment-avatar"
                    />
                  ) : (
                    <div className="comment-avatar-placeholder">
                      {comment.user.username[0]}
                    </div>
                  )}
                  <div className="comment-meta">
                    <span className="comment-username">{comment.user.username}</span>
                    <span className="comment-time">{formatTime(comment.createdAt)}</span>
                  </div>
                </div>
                {comment.userId === currentUserId && (
                  <button
                    className="comment-delete-btn"
                    onClick={() => handleDelete(comment.id)}
                  >
                    削除
                  </button>
                )}
              </div>
              <p className="comment-content">{comment.content}</p>
            </div>
          ))
        )}
      </div>
    </div>
  );
};

export default CommentSection;
