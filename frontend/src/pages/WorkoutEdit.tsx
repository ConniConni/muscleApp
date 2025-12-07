import React, { useState, useEffect } from 'react';
import { useParams, useNavigate } from 'react-router-dom';
import WorkoutForm from '../components/WorkoutForm';
import { getWorkout, updateWorkout } from '../lib/workoutApi';
import { CreateWorkoutRequest } from '../types/workout';
import '../styles/WorkoutEdit.css';

const WorkoutEdit: React.FC = () => {
  const { id } = useParams<{ id: string }>();
  const navigate = useNavigate();
  const [initialData, setInitialData] = useState<Partial<CreateWorkoutRequest> | null>(null);
  const [loading, setLoading] = useState(true);

  useEffect(() => {
    loadWorkout();
  }, [id]);

  const loadWorkout = async () => {
    if (!id) return;

    try {
      setLoading(true);
      const workout = await getWorkout(id);
      setInitialData({
        bodyPart: workout.bodyPart,
        exerciseName: workout.exerciseName,
        sets: workout.sets,
        reps: workout.reps,
        weight: workout.weight,
        memo: workout.memo,
        imageUrl: workout.imageUrl,
        workoutDate: workout.workoutDate.split('T')[0],
      });
    } catch (err: any) {
      console.error('Failed to load workout:', err);
      navigate('/workouts');
    } finally {
      setLoading(false);
    }
  };

  const handleSubmit = async (data: CreateWorkoutRequest) => {
    if (!id) return;
    await updateWorkout(id, data);
    navigate(`/workouts/${id}`);
  };

  const handleCancel = () => {
    navigate(`/workouts/${id}`);
  };

  if (loading || !initialData) {
    return (
      <div className="workout-edit-page">
        <p className="loading">読み込み中...</p>
      </div>
    );
  }

  return (
    <div className="workout-edit-page">
      <div className="workout-edit-header">
        <h1>筋トレ記録を編集</h1>
      </div>
      <WorkoutForm
        onSubmit={handleSubmit}
        onCancel={handleCancel}
        initialData={initialData}
      />
    </div>
  );
};

export default WorkoutEdit;
