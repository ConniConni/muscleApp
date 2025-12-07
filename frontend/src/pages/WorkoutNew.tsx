import React from 'react';
import { useNavigate } from 'react-router-dom';
import WorkoutForm from '../components/WorkoutForm';
import { createWorkout } from '../lib/workoutApi';
import { CreateWorkoutRequest } from '../types/workout';
import '../styles/WorkoutNew.css';

const WorkoutNew: React.FC = () => {
  const navigate = useNavigate();

  const handleSubmit = async (data: CreateWorkoutRequest) => {
    await createWorkout(data);
    navigate('/workouts');
  };

  const handleCancel = () => {
    navigate('/workouts');
  };

  return (
    <div className="workout-new-page">
      <div className="workout-new-header">
        <h1>筋トレ記録を登録</h1>
      </div>
      <WorkoutForm onSubmit={handleSubmit} onCancel={handleCancel} />
    </div>
  );
};

export default WorkoutNew;
