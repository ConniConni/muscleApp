import React from 'react';
import { Workout } from '../types/workout';
import WorkoutCard from './WorkoutCard';
import '../styles/WorkoutList.css';

interface WorkoutListProps {
  workouts: Workout[];
  onWorkoutClick: (id: string) => void;
  loading?: boolean;
}

const WorkoutList: React.FC<WorkoutListProps> = ({ workouts, onWorkoutClick, loading }) => {
  if (loading) {
    return (
      <div className="workout-list-loading">
        <p>読み込み中...</p>
      </div>
    );
  }

  if (workouts.length === 0) {
    return (
      <div className="workout-list-empty">
        <p>まだ記録がありません</p>
        <p>最初の筋トレ記録を投稿してみましょう！</p>
      </div>
    );
  }

  return (
    <div className="workout-list">
      {workouts.map(workout => (
        <WorkoutCard
          key={workout.id}
          workout={workout}
          onClick={() => onWorkoutClick(workout.id)}
        />
      ))}
    </div>
  );
};

export default WorkoutList;
