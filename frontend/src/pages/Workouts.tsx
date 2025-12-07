import React, { useState, useEffect } from 'react';
import { useNavigate } from 'react-router-dom';
import WorkoutList from '../components/WorkoutList';
import { getWorkouts } from '../lib/workoutApi';
import { Workout } from '../types/workout';
import '../styles/Workouts.css';

const Workouts: React.FC = () => {
  const navigate = useNavigate();
  const [workouts, setWorkouts] = useState<Workout[]>([]);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState('');

  useEffect(() => {
    loadWorkouts();
  }, []);

  const loadWorkouts = async () => {
    try {
      setLoading(true);
      const data = await getWorkouts();
      setWorkouts(data);
    } catch (err: any) {
      setError('記録の取得に失敗しました');
      console.error('Failed to load workouts:', err);
    } finally {
      setLoading(false);
    }
  };

  const handleWorkoutClick = (id: string) => {
    navigate(`/workouts/${id}`);
  };

  const handleCreateClick = () => {
    navigate('/workouts/new');
  };

  return (
    <div className="workouts-page">
      <div className="workouts-header">
        <h1>筋トレ記録</h1>
        <button className="btn-create" onClick={handleCreateClick}>
          ＋ 記録を投稿
        </button>
      </div>

      {error && <div className="error-message">{error}</div>}

      <WorkoutList
        workouts={workouts}
        onWorkoutClick={handleWorkoutClick}
        loading={loading}
      />
    </div>
  );
};

export default Workouts;
