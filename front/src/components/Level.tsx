import React, { useState, useEffect } from 'react';

const LevelIndicator = ({ level = 0 }) => {
  const [pulse, setPulse] = useState(false);
  const [shake, setShake] = useState(false);
  
  // レベルの範囲を制限する
  const clampedLevel = Math.max(-999, Math.min(100, level));
  
  // レベルに基づいて色を決定
  const getColorClass = () => {
    if (clampedLevel < -500) return "bg-blue-300 text-blue-900"; // 非常に穏やか
    if (clampedLevel < -200) return "bg-blue-400 text-white";    // 穏やか
    if (clampedLevel < 0) return "bg-teal-500 text-white";       // やや穏やか
    if (clampedLevel < 30) return "bg-green-500 text-white";     // 通常
    if (clampedLevel < 60) return "bg-yellow-500 text-white";    // 注意
    if (clampedLevel < 80) return "bg-orange-500 text-white";    // 警告
    return "bg-red-600 text-white";                             // けたたましい
  };
  
  // レベルによって追加するエフェクトを決定
  const getEffects = () => {
    let effects = "";
    
    // レベル80以上で点滅エフェクト
    if (clampedLevel >= -100 && pulse) {
      effects += " animate-pulse";
    }
    
    // レベル90以上で揺れエフェクト
    if (clampedLevel >= 90 && shake) {
      effects += " animate-bounce";
    }
    
    // マイナスレベルで軽い透明度
    if (clampedLevel < 0) {
      effects += " opacity-80";
    }
    
    return effects;
  };
  
  // 高レベルエフェクトのトリガー
  useEffect(() => {
    // レベルが80以上で点滅エフェクト
    if (clampedLevel >= 80) {
      const pulseInterval = setInterval(() => {
        setPulse(prev => !prev);
      }, 2000);
      
      return () => clearInterval(pulseInterval);
    }
  }, [clampedLevel]);
  
  // レベルが90以上で揺れエフェクト
  useEffect(() => {
    if (clampedLevel >= 90) {
      const shakeInterval = setInterval(() => {
        setShake(true);
        setTimeout(() => setShake(false), 500);
      }, 3000);
      
      return () => clearInterval(shakeInterval);
    }
  }, [clampedLevel]);
  
  // レベル表示の接頭辞（マイナスレベルは「-Lv」、通常は「Lv」）
  const prefix = clampedLevel < 0 ? "Lv.-" : "Lv.";
  // 表示用の絶対値
  const displayLevel = Math.abs(clampedLevel);
  
  // サイズはレベルによって少し変わる（全体的に大きくなるよう調整）
  const getSizeClass = () => {
    if (clampedLevel >= 90) return "text-2xl py-4 px-8 font-bold"; // 非常に大きい
    if (clampedLevel >= 50) return "text-xl py-3.5 px-7";      // 大きい
    if (clampedLevel < -500) return "text-lg py-3 px-5"; // 通常
    return "text-xl py-3 px-6";                         // やや大きい
  };
  
  return (
    <div className="flex items-center">
      <div className={`${getColorClass()} ${getSizeClass()} ${getEffects()} rounded-full transition-all duration-300 shadow-lg`}>
        <span className="font-semibold">{prefix} {displayLevel}</span>
        {clampedLevel >= 95 && (
          <span className="ml-2 text-yellow-300 text-2xl">⚠️</span>
        )}
        {clampedLevel <= -900 && (
          <span className="ml-2 text-blue-200 text-2xl">❄️</span>
        )}
      </div>
    </div>
  );
};

export default LevelIndicator;