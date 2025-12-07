import React from 'react';
import { Workout } from '../types/workout';
import '../styles/WorkoutCard.css';

interface WorkoutCardProps {
  workout: Workout;
  onClick: () => void;
}

const WorkoutCard: React.FC<WorkoutCardProps> = ({ workout, onClick }) => {
  const formatDate = (dateString: string) => {
    const date = new Date(dateString);
    return date.toLocaleDateString('ja-JP', {
      year: 'numeric',
      month: 'long',
      day: 'numeric',
    });
  };

  const formatTime = (dateString: string) => {
    const date = new Date(dateString);
    return date.toLocaleTimeString('ja-JP', {
      hour: '2-digit',
      minute: '2-digit',
    });
  };

  return (
    <div className="workout-card" onClick={onClick}>
      <div className="workout-card-header">
        <div className="user-info">
          {workout.user.profileImageUrl ? (
            <img src={workout.user.profileImageUrl} alt={workout.user.username} className="user-avatar" />
          ) : (
            <div className="user-avatar-placeholder">{workout.user.username[0]}</div>
          )}
          <span className="username">{workout.user.username}</span>
        </div>
        <div className="workout-date">
          <span className="date">{formatDate(workout.workoutDate)}</span>
          <span className="time">{formatTime(workout.createdAt)}</span>
        </div>
      </div>

      <div className="workout-card-body">
        <div className="workout-info">
          <span className="body-part-badge">{workout.bodyPart}</span>
          <h3 className="exercise-name">{workout.exerciseName}</h3>
        </div>

        <div className="workout-stats">
          <div className="stat">
            <span className="stat-label">セット</span>
            <span className="stat-value">{workout.sets}</span>
          </div>
          <div className="stat">
            <span className="stat-label">回数</span>
            <span className="stat-value">{workout.reps}</span>
          </div>
          {workout.weight && (
            <div className="stat">
              <span className="stat-label">重量</span>
              <span className="stat-value">{workout.weight}kg</span>
            </div>
          )}
        </div>

        {workout.memo && (
          <p className="workout-memo">{workout.memo}</p>
        )}

        {workout.imageUrl && (
          <div className="workout-image">
            <img src={workout.imageUrl} alt={workout.exerciseName} />
          </div>
        )}
      </div>

      <div className="workout-card-footer">
        <div className="interaction">
          <span className="likes-count">
            ❤️ {workout.likes.length}
          </span>
          <span className="comments-count">
            💬 {workout.comments.length}
          </span>
        </div>
      </div>
    </div>
  );
};

export default WorkoutCard;
