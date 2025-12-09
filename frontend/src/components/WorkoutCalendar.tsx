import React, { useState, useEffect } from 'react';
import { getCalendar } from '../lib/workoutApi';
import '../styles/WorkoutCalendar.css';

interface CalendarDay {
  date: string;
  count: number;
  workouts: Array<{
    id: string;
    exerciseName: string;
    bodyPart: string;
  }>;
}

interface CalendarData {
  year: number;
  month: number;
  days: CalendarDay[];
}

const WorkoutCalendar: React.FC = () => {
  const [currentDate, setCurrentDate] = useState(new Date());
  const [calendarData, setCalendarData] = useState<CalendarData | null>(null);
  const [selectedDay, setSelectedDay] = useState<CalendarDay | null>(null);
  const [loading, setLoading] = useState(false);

  const year = currentDate.getFullYear();
  const month = currentDate.getMonth() + 1;

  useEffect(() => {
    loadCalendar();
  }, [year, month]);

  const loadCalendar = async () => {
    setLoading(true);
    try {
      const data = await getCalendar(year, month);
      setCalendarData(data);
    } catch (error) {
      console.error('Failed to load calendar:', error);
    } finally {
      setLoading(false);
    }
  };

  const getDaysInMonth = (year: number, month: number) => {
    return new Date(year, month, 0).getDate();
  };

  const getFirstDayOfMonth = (year: number, month: number) => {
    return new Date(year, month - 1, 1).getDay();
  };

  const handlePrevMonth = () => {
    setCurrentDate(new Date(year, month - 2, 1));
    setSelectedDay(null);
  };

  const handleNextMonth = () => {
    setCurrentDate(new Date(year, month, 1));
    setSelectedDay(null);
  };

  const handleDayClick = (day: CalendarDay) => {
    setSelectedDay(selectedDay?.date === day.date ? null : day);
  };

  const getWorkoutForDate = (date: string): CalendarDay | undefined => {
    return calendarData?.days.find(d => d.date === date);
  };

  const renderCalendar = () => {
    const daysInMonth = getDaysInMonth(year, month);
    const firstDay = getFirstDayOfMonth(year, month);
    const days = [];

    // Empty cells for days before month starts
    for (let i = 0; i < firstDay; i++) {
      days.push(<div key={`empty-${i}`} className="calendar-day empty"></div>);
    }

    // Days of the month
    for (let day = 1; day <= daysInMonth; day++) {
      const dateStr = `${year}-${String(month).padStart(2, '0')}-${String(day).padStart(2, '0')}`;
      const workout = getWorkoutForDate(dateStr);
      const isToday = dateStr === new Date().toISOString().split('T')[0];

      days.push(
        <div
          key={day}
          className={`calendar-day ${workout ? 'has-workout' : ''} ${isToday ? 'today' : ''} ${selectedDay?.date === dateStr ? 'selected' : ''}`}
          onClick={() => workout && handleDayClick(workout)}
        >
          <span className="day-number">{day}</span>
          {workout && <span className="workout-count">{workout.count}</span>}
        </div>
      );
    }

    return days;
  };

  if (loading) {
    return <div className="calendar-loading">読み込み中...</div>;
  }

  return (
    <div className="workout-calendar">
      <div className="calendar-header">
        <button onClick={handlePrevMonth} className="month-nav-btn">‹</button>
        <h3 className="calendar-title">{year}年 {month}月</h3>
        <button onClick={handleNextMonth} className="month-nav-btn">›</button>
      </div>

      <div className="calendar-weekdays">
        <div className="weekday">日</div>
        <div className="weekday">月</div>
        <div className="weekday">火</div>
        <div className="weekday">水</div>
        <div className="weekday">木</div>
        <div className="weekday">金</div>
        <div className="weekday">土</div>
      </div>

      <div className="calendar-grid">
        {renderCalendar()}
      </div>

      {selectedDay && (
        <div className="calendar-detail">
          <h4>{selectedDay.date} の記録 ({selectedDay.count}件)</h4>
          <ul className="workout-list">
            {selectedDay.workouts.map((workout) => (
              <li key={workout.id} className="workout-item">
                <span className="body-part">{workout.bodyPart}</span>
                <span className="exercise-name">{workout.exerciseName}</span>
              </li>
            ))}
          </ul>
        </div>
      )}
    </div>
  );
};

export default WorkoutCalendar;
