import React, { useState, useEffect } from 'react';
import { useNavigate } from 'react-router-dom';
import { getExercises, getWorkoutsByExercise } from '../lib/workoutApi';
import { Workout } from '../types/workout';
import '../styles/ExerciseHistory.css';

interface Exercise {
  exerciseName: string;
  bodyPart: string;
  count: number;
}

const ExerciseHistory: React.FC = () => {
  const navigate = useNavigate();
  const [exercises, setExercises] = useState<Exercise[]>([]);
  const [selectedExercise, setSelectedExercise] = useState<string | null>(null);
  const [workouts, setWorkouts] = useState<Workout[]>([]);
  const [loading, setLoading] = useState(false);
  const [loadingWorkouts, setLoadingWorkouts] = useState(false);

  useEffect(() => {
    loadExercises();
  }, []);

  const loadExercises = async () => {
    setLoading(true);
    try {
      const data = await getExercises();
      setExercises(data);
    } catch (error) {
      console.error('Failed to load exercises:', error);
    } finally {
      setLoading(false);
    }
  };

  const handleExerciseClick = async (exerciseName: string) => {
    if (selectedExercise === exerciseName) {
      setSelectedExercise(null);
      setWorkouts([]);
      return;
    }

    setSelectedExercise(exerciseName);
    setLoadingWorkouts(true);
    try {
      const data = await getWorkoutsByExercise(exerciseName);
      setWorkouts(data);
    } catch (error) {
      console.error('Failed to load workouts:', error);
    } finally {
      setLoadingWorkouts(false);
    }
  };

  const formatDate = (dateString: string) => {
    const date = new Date(dateString);
    return date.toLocaleDateString('ja-JP', {
      year: 'numeric',
      month: '2-digit',
      day: '2-digit',
    });
  };

  const handleWorkoutClick = (workoutId: string) => {
    navigate(`/workouts/${workoutId}`);
  };

  if (loading) {
    return <div className="exercise-history-loading">読み込み中...</div>;
  }

  if (exercises.length === 0) {
    return (
      <div className="exercise-history-empty">
        <p>まだ記録がありません</p>
      </div>
    );
  }

  return (
    <div className="exercise-history">
      <div className="exercises-list">
        {exercises.map((exercise) => (
          <div
            key={exercise.exerciseName}
            className={`exercise-card ${selectedExercise === exercise.exerciseName ? 'selected' : ''}`}
            onClick={() => handleExerciseClick(exercise.exerciseName)}
          >
            <div className="exercise-header">
              <h4 className="exercise-name">{exercise.exerciseName}</h4>
              <span className="exercise-badge">{exercise.bodyPart}</span>
            </div>
            <div className="exercise-count">{exercise.count}回記録</div>
          </div>
        ))}
      </div>

      {selectedExercise && (
        <div className="workout-history">
          <h3 className="history-title">{selectedExercise} の記録</h3>

          {loadingWorkouts ? (
            <div className="history-loading">読み込み中...</div>
          ) : workouts.length === 0 ? (
            <div className="history-empty">記録がありません</div>
          ) : (
            <div className="history-list">
              {workouts.map((workout) => (
                <div
                  key={workout.id}
                  className="history-item"
                  onClick={() => handleWorkoutClick(workout.id)}
                >
                  <div className="history-date">{formatDate(workout.workoutDate)}</div>
                  <div className="history-stats">
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
                    <div className="history-memo">{workout.memo}</div>
                  )}
                </div>
              ))}
            </div>
          )}
        </div>
      )}
    </div>
  );
};

export default ExerciseHistory;
