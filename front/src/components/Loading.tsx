"use client";
import React, { useState, useEffect } from 'react';
import Image from 'next/image';

const NemuriLoadingAnimation = () => {
  const [loadingText, setLoadingText] = useState('');
  const [textIndex, setTextIndex] = useState(0);
  const [showBubble, setShowBubble] = useState(false);
  const [currentPhraseIndex, setCurrentPhraseIndex] = useState(0);
  
  // ねむりちゃんのセリフ集
  const nemuriPhrases = [
    "ふわぁ〜...ロード中...",
    "めんどくさ〜い...でも頑張る...",
    "ちょっと...待ってね...",
    "もう少し...かかりそう...",
    "眠たい...けど...ロードしてるよ...",
    "ゆっくり...進んでる...",
    "五分だけ...待ってて..."
  ];
  
  useEffect(() => {
    // 吹き出しを表示する
    setTimeout(() => {
      setShowBubble(true);
    }, 500);
    
    // 文字を一つずつ表示する処理
    let currentText = '';
    let charIndex = 0;
    
    const typingInterval = setInterval(() => {
      if (charIndex < nemuriPhrases[currentPhraseIndex].length) {
        currentText += nemuriPhrases[currentPhraseIndex][charIndex];
        setLoadingText(currentText);
        charIndex++;
      } else {
        clearInterval(typingInterval);
        
        // 文字が全部表示されたら次のセリフに進む準備
        setTimeout(() => {
          setShowBubble(false);
          
          // 短い遅延の後、次のセリフに進む
          setTimeout(() => {
            setCurrentPhraseIndex((prev) => (prev + 1) % nemuriPhrases.length);
            setLoadingText('');
            setTextIndex(prev => prev + 1);
          }, 300);
        }, 3000);
      }
    }, 150); // ゆっくりとしたタイピング速度
    
    return () => {
      clearInterval(typingInterval);
    };
  }, [textIndex]);
  
  // 吹き出しが非表示になったら、再表示する
  useEffect(() => {
    if (!showBubble) {
      setTimeout(() => {
        setShowBubble(true);
      }, 500);
    }
  }, [showBubble]);
  
  return (
    <div className="min-h-screen flex flex-col items-center justify-center bg-green-50 py-8">
      <div className="relative w-full max-w-md">
        {/* キャラクターの立ち絵のプレースホルダー */}
        {/* 注意: 実際には画像のURLを入れる必要があります */}
        <div className="w-64 h-64 mx-auto mb-6 relative">
          <div className="w-full h-full bg-green-200 rounded-full flex items-center justify-center overflow-hidden">
            <Image
              src="/wait.png" // ここに実際の画像のURLを入れる
              alt="甘露ねむりちゃん" 
              className="object-cover"
            width={256}
            height={256}
            />
          </div>
          
          {/* 吹き出し */}
          {showBubble && (
            <div className="absolute top-0 right-0 transform -translate-y-8 translate-x-4">
              <div className="bg-white p-3 rounded-xl shadow-md max-w-xs relative">
                {/* 吹き出しの三角形 */}
                <div className="absolute bottom-0 left-6 transform translate-y-full">
                  <div className="w-4 h-4 bg-white transform rotate-45 -mt-2"></div>
                </div>
                
                {/* ローディングテキスト */}
                <p className="text-gray-700 text-sm min-h-8">
                  {loadingText}
                </p>
              </div>
            </div>
          )}
        </div>
        
        {/* ローディングバー */}
        <div className="w-full bg-gray-100 rounded-full h-3 mb-2 mt-4">
          <div 
            className="bg-green-300 h-3 rounded-full transition-all duration-1000 ease-in-out"
            style={{ 
              width: `${(currentPhraseIndex / (nemuriPhrases.length - 1)) * 100}%`,
            }}
          ></div>
        </div>
        
        {/* ローディング表示 */}
        <div className="text-center text-green-600 font-medium">
          Loading...
        </div>
      </div>
    </div>
  );
};

export default NemuriLoadingAnimation;