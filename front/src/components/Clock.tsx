
// src/components/Clock.tsx
'use client';

import { useState, useEffect } from 'react';

export default function Clock() {
  // 初期値は空の文字列にする
  const [time, setTime] = useState('');
  
  useEffect(() => {
    // クライアントサイドでのみ時間を設定
    const updateTime = () => {
      setTime(new Date().toLocaleTimeString());
    };
    
    // 初回レンダリング時に更新
    updateTime();
    
    // 1秒ごとに更新
    const interval = setInterval(updateTime, 1000);
    
    // クリーンアップ
    return () => clearInterval(interval);
  }, []);
  
  return <div className='text-5xl'>{time}</div>;
}