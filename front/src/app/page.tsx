
import React, { useState } from 'react';
import { Calendar, Clock } from 'lucide-react';

const TimeBlockScheduler = () => {
  const [currentDate, setCurrentDate] = useState(new Date());
  const [events, setEvents] = useState([
    { id: 1, title: "ミーティング", start: 9, end: 10, color: "#4CAF50" },
    { id: 2, title: "プロジェクト作業", start: 11, end: 13, color: "#2196F3" },
    { id: 3, title: "昼食", start: 13, end: 14, color: "#FF9800" },
    { id: 4, title: "メール対応", start: 14, end: 15, color: "#9C27B0" },
    { id: 5, title: "自己啓発", start: 16, end: 17, color: "#E91E63" }
  ]);
  const [newEvent, setNewEvent] = useState({ title: "", start: 9, end: 10, color: "#4CAF50" });
  const [showForm, setShowForm] = useState(false);

  // 曜日の配列
  const weekdays = ["日", "月", "火", "水", "木", "金", "土"];
  
  // 今月の日付を取得
  const daysInMonth = () => {
    const year = currentDate.getFullYear();
    const month = currentDate.getMonth();
    const days = new Date(year, month + 1, 0).getDate();
    
    const firstDay = new Date(year, month, 1).getDay();
    const dateArray = [];
    
    // 前月の日を追加
    for (let i = 0; i < firstDay; i++) {
      const prevMonthDay = new Date(year, month, 0).getDate() - firstDay + i + 1;
      dateArray.push({ date: prevMonthDay, currentMonth: false });
    }
    
    // 現在の月の日を追加
    for (let i = 1; i <= days; i++) {
      dateArray.push({ date: i, currentMonth: true });
    }
    
    // 次月の日を追加（6行のカレンダーになるように）
    const remainingDays = 42 - dateArray.length;
    for (let i = 1; i <= remainingDays; i++) {
      dateArray.push({ date: i, currentMonth: false });
    }
    
    return dateArray;
  };

  // 時間の選択肢を生成
  const timeOptions = () => {
    const options = [];
    for (let i = 6; i <= 22; i++) {
      options.push(<option key={i} value={i}>{i}:00</option>);
    }
    return options;
  };

  // イベントの追加
  const handleAddEvent = () => {
    if (newEvent.title && newEvent.start < newEvent.end) {
      setEvents([...events, { ...newEvent, id: events.length + 1 }]);
      setNewEvent({ title: "", start: 9, end: 10, color: "#4CAF50" });
      setShowForm(false);
    }
  };

  // イベントの削除
  const handleDeleteEvent = (id:number) => {
    setEvents(events.filter(event => event.id !== id));
  };

  // 前月へ移動
  const prevMonth = () => {
    setCurrentDate(new Date(currentDate.getFullYear(), currentDate.getMonth() - 1, 1));
  };

  // 次月へ移動
  const nextMonth = () => {
    setCurrentDate(new Date(currentDate.getFullYear(), currentDate.getMonth() + 1, 1));
  };

  // タイムスケジュールの描画
  const renderTimeSchedule = () => {
    const hours = [];
    for (let i = 6; i <= 22; i++) {
      hours.push(
        <div key={i} className="flex h-12 border-b border-gray-200">
          <div className="w-16 pr-2 text-right text-sm text-gray-500">{`${i}:00`}</div>
          <div className="flex-grow relative">
            {events.filter(event => event.start <= i && event.end > i).map(event => (
              <div
                key={event.id}
                className="absolute left-0 right-0 px-2 rounded overflow-hidden text-white text-sm flex justify-between"
                style={{
                  backgroundColor: event.color,
                  top: event.start === i ? '0' : '-1px',
                  height: event.start === i ? `${(event.end - event.start) * 48}px` : 'auto',
                  display: event.start === i ? 'flex' : 'none',
                  zIndex: 10
                }}
              >
                <div>{event.title}</div>
                <div>{`${event.start}:00-${event.end}:00`}</div>
                <button 
                  onClick={() => handleDeleteEvent(event.id)} 
                  className="text-white hover:text-red-200"
                >
                  ×
                </button>
              </div>
            ))}
          </div>
        </div>
      );
    }
    return hours;
  };

  // 月表示の描画
  const renderCalendar = () => {
    const days = daysInMonth();
    return (
      <div className="grid grid-cols-7 gap-1">
        {weekdays.map(day => (
          <div key={day} className="text-center py-2 font-bold text-gray-600">
            {day}
          </div>
        ))}
        {days.map((day, index) => (
          <div
            key={index}
            className={`h-24 p-1 border ${day.currentMonth ? 'bg-white' : 'bg-gray-100'} 
            ${new Date().getDate() === day.date && day.currentMonth && new Date().getMonth() === currentDate.getMonth() ? 'border-blue-500 border-2' : 'border-gray-200'}`}
          >
            <div className="text-right text-sm">{day.date}</div>
            <div className="overflow-y-auto h-16">
              {day.currentMonth && events.map(event => (
                <div
                  key={event.id}
                  className="text-xs p-1 my-1 rounded text-white truncate"
                  style={{ backgroundColor: event.color }}
                >
                  {event.title}
                </div>
              ))}
            </div>
          </div>
        ))}
      </div>
    );
  };

  return (
    <div className="p-4 max-w-6xl mx-auto bg-gray-50 rounded-lg shadow">
      <div className="flex justify-between items-center mb-4">
        <div className="flex items-center">
          <button onClick={prevMonth} className="mr-2 p-1 rounded hover:bg-gray-200">
            &lt;
          </button>
          <h2 className="text-xl font-bold">
            {currentDate.getFullYear()}年{currentDate.getMonth() + 1}月
          </h2>
          <button onClick={nextMonth} className="ml-2 p-1 rounded hover:bg-gray-200">
            &gt;
          </button>
        </div>
        <div className="flex items-center">
          <button
            onClick={() => setShowForm(!showForm)}
            className="flex items-center bg-blue-500 text-white px-3 py-1 rounded hover:bg-blue-600"
          >
            <span className="mr-1">+</span> 予定を追加
          </button>
        </div>
      </div>

      <div className="flex space-x-4">
        <div className="w-2/3 bg-white p-4 rounded shadow">
          <div className="flex mb-2 items-center">
            <Calendar className="mr-2" size={18} />
            <h3 className="text-lg font-semibold">月カレンダー</h3>
          </div>
          {renderCalendar()}
        </div>
        
        <div className="w-1/3 bg-white p-4 rounded shadow">
          <div className="flex mb-2 items-center">
            <Clock className="mr-2" size={18} />
            <h3 className="text-lg font-semibold">本日のスケジュール</h3>
          </div>
          <div className="overflow-y-auto max-h-96">
            {renderTimeSchedule()}
          </div>
        </div>
      </div>

      {showForm && (
        <div className="mt-4 p-4 bg-white rounded shadow">
          <h3 className="text-lg font-semibold mb-2">新しい予定を追加</h3>
          <div className="grid grid-cols-1 gap-4 md:grid-cols-2">
            <div>
              <label className="block text-sm font-medium text-gray-700">タイトル</label>
              <input
                type="text"
                value={newEvent.title}
                onChange={(e) => setNewEvent({...newEvent, title: e.target.value})}
                className="mt-1 block w-full border border-gray-300 rounded p-2"
              />
            </div>
            <div>
              <label className="block text-sm font-medium text-gray-700">色</label>
              <input
                type="color"
                value={newEvent.color}
                onChange={(e) => setNewEvent({...newEvent, color: e.target.value})}
                className="mt-1 block w-full border border-gray-300 rounded p-1 h-10"
              />
            </div>
            <div>
              <label className="block text-sm font-medium text-gray-700">開始時間</label>
              <select
                value={newEvent.start}
                onChange={(e) => setNewEvent({...newEvent, start: parseInt(e.target.value)})}
                className="mt-1 block w-full border border-gray-300 rounded p-2"
              >
                {timeOptions()}
              </select>
            </div>
            <div>
              <label className="block text-sm font-medium text-gray-700">終了時間</label>
              <select
                value={newEvent.end}
                onChange={(e) => setNewEvent({...newEvent, end: parseInt(e.target.value)})}
                className="mt-1 block w-full border border-gray-300 rounded p-2"
              >
                {timeOptions()}
              </select>
            </div>
          </div>
          <div className="mt-4 flex justify-end">
            <button
              onClick={() => setShowForm(false)}
              className="mr-2 px-4 py-2 border border-gray-300 rounded text-gray-700 hover:bg-gray-100"
            >
              キャンセル
            </button>
            <button
              onClick={handleAddEvent}
              className="px-4 py-2 bg-blue-500 text-white rounded hover:bg-blue-600"
            >
              追加
            </button>
          </div>
        </div>
      )}
    </div>
  );
};

export default TimeBlockScheduler;