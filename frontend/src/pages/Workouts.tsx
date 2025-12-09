import React, { useState, useEffect } from 'react';
import { useNavigate } from 'react-router-dom';
import { useAuth } from '../contexts/AuthContext';
import WorkoutList from '../components/WorkoutList';
import { getWorkouts } from '../lib/workoutApi';
import { Workout } from '../types/workout';
import '../styles/Workouts.css';

const Workouts: React.FC = () => {
  const navigate = useNavigate();
  const { user, logout } = useAuth();
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

  const handleLogout = () => {
    logout();
    navigate('/login');
  };

  const handleReviewClick = () => {
    navigate('/review');
  };

  return (
    <div className="workouts-page">
      <header className="workouts-header">
        <h1>筋トレ記録共有アプリ</h1>
        <div className="user-info">
          <button onClick={handleReviewClick} className="review-button">
            📊 振り返り
          </button>
          <span>ようこそ、{user?.username}さん</span>
          <button onClick={handleLogout} className="logout-button">
            ログアウト
          </button>
        </div>
      </header>

      {error && <div className="error-message">{error}</div>}

      <WorkoutList
        workouts={workouts}
        onWorkoutClick={handleWorkoutClick}
        loading={loading}
      />

      <button className="fab-create" onClick={handleCreateClick}>
        ＋
      </button>
    </div>
  );
};

export default Workouts;
