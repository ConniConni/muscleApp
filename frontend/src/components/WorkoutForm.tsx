import React, { useState } from 'react';
import { CreateWorkoutRequest } from '../types/workout';
import '../styles/WorkoutForm.css';

interface WorkoutFormProps {
  onSubmit: (data: CreateWorkoutRequest) => Promise<void>;
  onCancel: () => void;
  initialData?: Partial<CreateWorkoutRequest>;
}

const WorkoutForm: React.FC<WorkoutFormProps> = ({ onSubmit, onCancel, initialData }) => {
  const [formData, setFormData] = useState<CreateWorkoutRequest>({
    bodyPart: initialData?.bodyPart || '',
    exerciseName: initialData?.exerciseName || '',
    sets: initialData?.sets || 1,
    reps: initialData?.reps || 1,
    weight: initialData?.weight,
    memo: initialData?.memo || '',
    imageUrl: initialData?.imageUrl || '',
    workoutDate: initialData?.workoutDate || new Date().toISOString().split('T')[0],
  });

  const [isSubmitting, setIsSubmitting] = useState(false);
  const [error, setError] = useState('');

  const handleChange = (e: React.ChangeEvent<HTMLInputElement | HTMLTextAreaElement | HTMLSelectElement>) => {
    const { name, value } = e.target;
    setFormData(prev => ({
      ...prev,
      [name]: ['sets', 'reps', 'weight'].includes(name) ? (value === '' ? undefined : Number(value)) : value,
    }));
  };

  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault();
    setError('');
    setIsSubmitting(true);

    try {
      await onSubmit(formData);
    } catch (err: any) {
      setError(err.response?.data?.message || '記録の投稿に失敗しました');
    } finally {
      setIsSubmitting(false);
    }
  };

  const bodyParts = ['胸', '背中', '脚', '肩', '腕', '腹筋', 'その他'];

  return (
    <div className="workout-form-container">
      <form onSubmit={handleSubmit} className="workout-form">
        <h2>筋トレ記録を投稿</h2>

        {error && <div className="error-message">{error}</div>}

        <div className="form-group">
          <label htmlFor="bodyPart">部位 *</label>
          <select
            id="bodyPart"
            name="bodyPart"
            value={formData.bodyPart}
            onChange={handleChange}
            required
          >
            <option value="">選択してください</option>
            {bodyParts.map(part => (
              <option key={part} value={part}>{part}</option>
            ))}
          </select>
        </div>

        <div className="form-group">
          <label htmlFor="exerciseName">種目名 *</label>
          <input
            type="text"
            id="exerciseName"
            name="exerciseName"
            value={formData.exerciseName}
            onChange={handleChange}
            placeholder="例: ベンチプレス"
            required
          />
        </div>

        <div className="form-row">
          <div className="form-group">
            <label htmlFor="sets">セット数 *</label>
            <input
              type="number"
              id="sets"
              name="sets"
              value={formData.sets}
              onChange={handleChange}
              min="1"
              required
            />
          </div>

          <div className="form-group">
            <label htmlFor="reps">回数 *</label>
            <input
              type="number"
              id="reps"
              name="reps"
              value={formData.reps}
              onChange={handleChange}
              min="1"
              required
            />
          </div>

          <div className="form-group">
            <label htmlFor="weight">重量 (kg)</label>
            <input
              type="number"
              id="weight"
              name="weight"
              value={formData.weight || ''}
              onChange={handleChange}
              min="0"
              step="0.5"
            />
          </div>
        </div>

        <div className="form-group">
          <label htmlFor="workoutDate">トレーニング日 *</label>
          <input
            type="date"
            id="workoutDate"
            name="workoutDate"
            value={formData.workoutDate}
            onChange={handleChange}
            required
          />
        </div>

        <div className="form-group">
          <label htmlFor="memo">メモ・感想</label>
          <textarea
            id="memo"
            name="memo"
            value={formData.memo}
            onChange={handleChange}
            placeholder="今日の感想や気づきを記録しましょう"
            rows={4}
          />
        </div>

        <div className="form-group">
          <label htmlFor="imageUrl">画像URL</label>
          <input
            type="url"
            id="imageUrl"
            name="imageUrl"
            value={formData.imageUrl}
            onChange={handleChange}
            placeholder="https://example.com/image.jpg"
          />
        </div>

        <div className="form-actions">
          <button type="button" onClick={onCancel} className="btn-cancel" disabled={isSubmitting}>
            キャンセル
          </button>
          <button type="submit" className="btn-submit" disabled={isSubmitting}>
            {isSubmitting ? '投稿中...' : '投稿する'}
          </button>
        </div>
      </form>
    </div>
  );
};

export default WorkoutForm;
