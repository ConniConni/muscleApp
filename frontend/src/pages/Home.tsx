import React from 'react';
import { useAuth } from '../contexts/AuthContext';
import { useNavigate } from 'react-router-dom';
import '../styles/Home.css';

const Home: React.FC = () => {
  const { user, logout } = useAuth();
  const navigate = useNavigate();

  const handleLogout = () => {
    logout();
    navigate('/login');
  };

  return (
    <div className="home-container">
      <header className="home-header">
        <h1>筋トレ記録共有アプリ</h1>
        <div className="user-info">
          <span>ようこそ、{user?.username}さん</span>
          <button onClick={handleLogout} className="logout-button">
            ログアウト
          </button>
        </div>
      </header>

      <main className="home-main">
        <div className="welcome-card">
          <h2>🎉 筋トレ記録共有アプリへようこそ！</h2>
          <p>友達と一緒に筋トレを頑張りましょう！</p>
          <div className="user-details">
            <h3>ユーザー情報</h3>
            <ul>
              <li><strong>ユーザー名:</strong> {user?.username}</li>
              <li><strong>メールアドレス:</strong> {user?.email}</li>
            </ul>
          </div>
          <div className="action-buttons">
            <button onClick={() => navigate('/workouts')} className="primary-button">
              筋トレ記録を見る
            </button>
            <button onClick={() => navigate('/workouts/new')} className="secondary-button">
              記録を投稿する
            </button>
          </div>
        </div>
      </main>
    </div>
  );
};

export default Home;
