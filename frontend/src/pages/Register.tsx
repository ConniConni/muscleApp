import React, { useState, useEffect } from 'react';
import { useNavigate, Link } from 'react-router-dom';
import { useForm } from 'react-hook-form';
import { zodResolver } from '@hookform/resolvers/zod';
import { z } from 'zod';
import { useAuth } from '../contexts/AuthContext';
import '../styles/Auth.css';

const registerSchema = z.object({
  email: z.string().email('有効なメールアドレスを入力してください'),
  username: z.string().min(2, 'ユーザー名は2文字以上で入力してください'),
  password: z.string().min(6, 'パスワードは6文字以上で入力してください'),
  confirmPassword: z.string(),
}).refine((data) => data.password === data.confirmPassword, {
  message: 'パスワードが一致しません',
  path: ['confirmPassword'],
});

type RegisterFormData = z.infer<typeof registerSchema>;

const Register: React.FC = () => {
  const navigate = useNavigate();
  const { register: registerUser } = useAuth();
  const [error, setError] = useState('');
  const [isLoading, setIsLoading] = useState(false);

  const {
    register,
    handleSubmit,
    formState: { errors },
    watch,
  } = useForm<RegisterFormData>({
    resolver: zodResolver(registerSchema),
  });

  // フィールドの変更を監視
  const email = watch('email');
  const username = watch('username');
  const password = watch('password');
  const confirmPassword = watch('confirmPassword');

  // フィールドが変更されたらエラーメッセージをクリア
  useEffect(() => {
    if (error) {
      setError('');
    }
    // eslint-disable-next-line react-hooks/exhaustive-deps
  }, [email, username, password, confirmPassword]);

  const onSubmit = async (data: RegisterFormData) => {
    try {
      setIsLoading(true);
      setError('');
      await registerUser({
        email: data.email,
        username: data.username,
        password: data.password,
      });
      navigate('/');
    } catch (err: any) {
      console.error('Register error:', err);
      console.error('Error response:', err.response);

      // エラーメッセージの処理
      let errorMessage = '登録に失敗しました。入力内容を確認してください。';

      if (err.response?.data?.message) {
        // NestJSのエラーメッセージを処理
        const message = err.response.data.message;
        if (Array.isArray(message)) {
          // バリデーションエラーの場合
          errorMessage = message.join(', ');
        } else if (message.includes('already exists') || message.includes('Unique constraint')) {
          errorMessage = 'このメールアドレスは既に登録されています。';
        } else {
          errorMessage = message;
        }
      } else if (err.message) {
        errorMessage = err.message;
      }

      setError(errorMessage);
    } finally {
      setIsLoading(false);
    }
  };

  return (
    <div className="auth-container">
      <div className="auth-card">
        <h1 className="auth-title">新規登録</h1>
        <p className="auth-subtitle">アカウントを作成して筋トレを記録しよう</p>

        {error && <div className="error-message">{error}</div>}

        <form onSubmit={handleSubmit(onSubmit)} className="auth-form">
          <div className="form-group">
            <label htmlFor="email">メールアドレス</label>
            <input
              id="email"
              type="email"
              {...register('email')}
              placeholder="example@example.com"
              className={errors.email ? 'input-error' : ''}
            />
            {errors.email && <span className="field-error">{errors.email.message}</span>}
          </div>

          <div className="form-group">
            <label htmlFor="username">ユーザー名</label>
            <input
              id="username"
              type="text"
              {...register('username')}
              placeholder="山田太郎"
              className={errors.username ? 'input-error' : ''}
            />
            {errors.username && <span className="field-error">{errors.username.message}</span>}
          </div>

          <div className="form-group">
            <label htmlFor="password">パスワード</label>
            <input
              id="password"
              type="password"
              {...register('password')}
              placeholder="6文字以上"
              className={errors.password ? 'input-error' : ''}
            />
            {errors.password && <span className="field-error">{errors.password.message}</span>}
          </div>

          <div className="form-group">
            <label htmlFor="confirmPassword">パスワード（確認）</label>
            <input
              id="confirmPassword"
              type="password"
              {...register('confirmPassword')}
              placeholder="パスワードを再入力"
              className={errors.confirmPassword ? 'input-error' : ''}
            />
            {errors.confirmPassword && <span className="field-error">{errors.confirmPassword.message}</span>}
          </div>

          <button type="submit" className="submit-button" disabled={isLoading}>
            {isLoading ? '登録中...' : '新規登録'}
          </button>
        </form>

        <div className="auth-footer">
          <p>
            既にアカウントをお持ちの方は{' '}
            <Link to="/login" className="auth-link">
              ログイン
            </Link>
          </p>
        </div>
      </div>
    </div>
  );
};

export default Register;
