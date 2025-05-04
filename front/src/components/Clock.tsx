// src/components/Clock.tsx
'use client';

import { useState, useEffect } from 'react';

export default function Clock() {
  // 初期値は空の文字列にする
  const [time, setTime] = useState('');
  const [date, setDate] = useState('');
  
  useEffect(() => {
    // クライアントサイドでのみ時間を設定
    const updateTime = () => {
      const now = new Date();
      
      // 時間を設定（時:分:秒）
      setTime(now.toLocaleTimeString());
      
      // 日付を設定（年/月/日）
      setDate(now.toLocaleDateString());
    };
    
    // 初回レンダリング時に更新
    updateTime();
    
    // 1秒ごとに更新
    const interval = setInterval(updateTime, 1000);
    
    // クリーンアップ
    return () => clearInterval(interval);
  }, []);

  // 時間を時、分、秒に分割
  const timeParts = time.split(':');
  
  return (
    <div className="clock-container bg-green-50 p-4 rounded-lg shadow-md border border-green-300">
      <div className="date text-sm text-green-700 font-medium mb-1">{date}</div>
      <div className="time flex items-center justify-center text-5xl font-bold">
        <span className="text-green-800">{timeParts[0]}</span>
        <span className="text-green-500 mx-1">:</span>
        <span className="text-green-700">{timeParts[1]}</span>
        <span className="text-green-500 mx-1">:</span>
        <span className="text-green-600">{timeParts[2]}</span>
      </div>
      <div className="text-xs text-green-700 mt-2 text-right">現在時刻</div>
    </div>
  );
}