import React, { useState, useEffect } from 'react';
import { useParams, useNavigate } from 'react-router-dom';
import { getWorkout, deleteWorkout } from '../lib/workoutApi';
import { Workout, Like, Comment } from '../types/workout';
import { useAuth } from '../contexts/AuthContext';
import LikeButton from '../components/LikeButton';
import CommentSection from '../components/CommentSection';
import '../styles/WorkoutDetail.css';

const WorkoutDetail: React.FC = () => {
  const { id } = useParams<{ id: string }>();
  const navigate = useNavigate();
  const { user } = useAuth();
  const [workout, setWorkout] = useState<Workout | null>(null);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState('');

  useEffect(() => {
    loadWorkout();
  }, [id]);

  const loadWorkout = async () => {
    if (!id) return;

    try {
      setLoading(true);
      const data = await getWorkout(id);
      setWorkout(data);
    } catch (err: any) {
      setError('記録の取得に失敗しました');
      console.error('Failed to load workout:', err);
    } finally {
      setLoading(false);
    }
  };

  const handleEdit = () => {
    navigate(`/workouts/${id}/edit`);
  };

  const handleDelete = async () => {
    if (!id) return;
    if (!window.confirm('この記録を削除しますか？')) return;

    try {
      await deleteWorkout(id);
      navigate('/workouts');
    } catch (err: any) {
      setError('記録の削除に失敗しました');
      console.error('Failed to delete workout:', err);
    }
  };

  const handleBack = () => {
    navigate('/workouts');
  };

  const formatDate = (dateString: string) => {
    const date = new Date(dateString);
    return date.toLocaleDateString('ja-JP', {
      year: 'numeric',
      month: '2-digit',
      day: '2-digit',
    });
  };

  const formatTime = (dateString: string) => {
    const date = new Date(dateString);
    return date.toLocaleTimeString('ja-JP', {
      hour: '2-digit',
      minute: '2-digit',
    });
  };

  if (loading) {
    return (
      <div className="workout-detail-page">
        <p className="loading">読み込み中...</p>
      </div>
    );
  }

  if (error || !workout) {
    return (
      <div className="workout-detail-page">
        <p className="error">{error || '記録が見つかりません'}</p>
        <button onClick={handleBack} className="btn-back">戻る</button>
      </div>
    );
  }

  const isOwner = user?.id === workout.userId;

  return (
    <div className="workout-detail-page">
      <div className="workout-detail-header">
        <h1>筋トレ記録詳細</h1>
      </div>

      <div className="detail-container">
        <div className="detail-header">
          <button onClick={handleBack} className="btn-back">← 戻る</button>
          {isOwner && (
            <div className="detail-actions">
              <button onClick={handleEdit} className="btn-edit">編集</button>
              <button onClick={handleDelete} className="btn-delete">削除</button>
            </div>
          )}
        </div>

        <div className="detail-content">
          <div className="user-section">
            <div className="user-info-left">
              {workout.user.profileImageUrl ? (
                <img src={workout.user.profileImageUrl} alt={workout.user.username} className="user-avatar" />
              ) : (
                <div className="user-avatar-placeholder">{workout.user.username[0]}</div>
              )}
              <h3 className="username">{workout.user.username}</h3>
            </div>
            <div className="workout-datetime">
              <span className="date">{formatDate(workout.workoutDate)}</span>
              <span className="time">{formatTime(workout.createdAt)}</span>
            </div>
          </div>

          <div className="workout-section">
            <span className="body-part-badge">{workout.bodyPart}</span>
            <h1 className="exercise-name">{workout.exerciseName}</h1>
          </div>

          <div className="stats-section">
            <div className="stat-card">
              <span className="stat-label">セット数</span>
              <span className="stat-value">{workout.sets}</span>
            </div>
            <div className="stat-card">
              <span className="stat-label">回数</span>
              <span className="stat-value">{workout.reps}</span>
            </div>
            {workout.weight && (
              <div className="stat-card">
                <span className="stat-label">重量</span>
                <span className="stat-value">{workout.weight}kg</span>
              </div>
            )}
          </div>

          {workout.memo && (
            <div className="memo-section">
              <h4>メモ・感想</h4>
              <p>{workout.memo}</p>
            </div>
          )}

          {workout.imageUrl && (
            <div className="image-section">
              <img src={workout.imageUrl} alt={workout.exerciseName} />
            </div>
          )}

          <div className="interaction-section">
            <LikeButton
              workoutId={workout.id}
              likes={workout.likes}
              currentUserId={user?.id || ''}
              onLikesChange={(likes: Like[]) => setWorkout({ ...workout, likes })}
            />
          </div>

          <CommentSection
            workoutId={workout.id}
            comments={workout.comments}
            currentUserId={user?.id || ''}
            onCommentsChange={(comments: Comment[]) => setWorkout({ ...workout, comments })}
          />
        </div>
      </div>
    </div>
  );
};

export default WorkoutDetail;
