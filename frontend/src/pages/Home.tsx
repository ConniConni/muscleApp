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
          <h2>🎉 認証機能の実装が完了しました！</h2>
          <p>ログイン・新規登録が正常に動作しています。</p>
          <div className="user-details">
            <h3>ユーザー情報</h3>
            <ul>
              <li><strong>ユーザー名:</strong> {user?.username}</li>
              <li><strong>メールアドレス:</strong> {user?.email}</li>
              <li><strong>ユーザーID:</strong> {user?.id}</li>
            </ul>
          </div>
          <div className="next-steps">
            <h3>次のステップ</h3>
            <p>スプリント3では、筋トレ記録の投稿機能を実装します。</p>
          </div>
        </div>
      </main>
    </div>
  );
};

export default Home;
