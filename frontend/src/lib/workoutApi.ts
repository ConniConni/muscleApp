import api from './api';
import { Workout, CreateWorkoutRequest, UpdateWorkoutRequest } from '../types/workout';

// 自分と友達の筋トレ記録一覧を取得
export const getWorkouts = async (): Promise<Workout[]> => {
  const response = await api.get('/workouts');
  return response.data;
};

// 自分の筋トレ記録一覧を取得
export const getMyWorkouts = async (): Promise<Workout[]> => {
  const response = await api.get('/workouts/me');
  return response.data;
};

// 筋トレ記録の詳細を取得
export const getWorkout = async (id: string): Promise<Workout> => {
  const response = await api.get(`/workouts/${id}`);
  return response.data;
};

// 筋トレ記録を作成
export const createWorkout = async (data: CreateWorkoutRequest): Promise<Workout> => {
  const response = await api.post('/workouts', data);
  return response.data;
};

// 筋トレ記録を更新
export const updateWorkout = async (id: string, data: UpdateWorkoutRequest): Promise<Workout> => {
  const response = await api.patch(`/workouts/${id}`, data);
  return response.data;
};

// 筋トレ記録を削除
export const deleteWorkout = async (id: string): Promise<void> => {
  await api.delete(`/workouts/${id}`);
};
