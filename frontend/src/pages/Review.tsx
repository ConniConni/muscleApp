import React, { useState } from 'react';
import { useNavigate } from 'react-router-dom';
import { useAuth } from '../contexts/AuthContext';
import WorkoutCalendar from '../components/WorkoutCalendar';
import ExerciseHistory from '../components/ExerciseHistory';
import '../styles/Review.css';

const Review: React.FC = () => {
  const navigate = useNavigate();
  const { user, logout } = useAuth();
  const [activeTab, setActiveTab] = useState<'calendar' | 'exercise'>('calendar');

  const handleLogout = () => {
    logout();
    navigate('/login');
  };

  const handleBackToWorkouts = () => {
    navigate('/workouts');
  };

  return (
    <div className="review-page">
      <header className="review-header">
        <button onClick={handleBackToWorkouts} className="back-button">
          ← 記録一覧へ
        </button>
        <h1>振り返り</h1>
        <div className="user-info">
          <span>ようこそ、{user?.username}さん</span>
          <button onClick={handleLogout} className="logout-button">
            ログアウト
          </button>
        </div>
      </header>

      <div className="review-tabs">
        <button
          className={`tab-button ${activeTab === 'calendar' ? 'active' : ''}`}
          onClick={() => setActiveTab('calendar')}
        >
          カレンダー
        </button>
        <button
          className={`tab-button ${activeTab === 'exercise' ? 'active' : ''}`}
          onClick={() => setActiveTab('exercise')}
        >
          種目別記録
        </button>
      </div>

      <div className="review-content">
        {activeTab === 'calendar' ? <WorkoutCalendar /> : <ExerciseHistory />}
      </div>
    </div>
  );
};

export default Review;
