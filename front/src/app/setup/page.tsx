"use client";

import React, { useState, useEffect } from 'react';
import { useRouter } from 'next/navigation';
import Image from 'next/image';

// 質問リスト - 最初にユーザー名を聞く質問を追加
const QuestionList = [
  {question: "ふぁ～...はじめまして。ねむりっていうの。きみの名前、教えてくれる...？", type: "text", isUsername: true},
  {question: "ふぁ～...朝、何時くらいに起きてる...？ねむり、いつも三回くらいスヌーズしちゃうんだ...", type: "text"},
  {question: "学校とか、バイトとか...行くのにどれくらい時間かかってる？急ぎ足だと疲れそう...", type: "text"},
  {question: "勉強とか、バイトとか...何時から始めてる？朝早いと眠いよね...", type: "text"},
  {question: "お勉強とか、お仕事とか...何時に終わるの？ねむり、終わった後いつも図書室で昼寝してから帰るんだ...", type: "text"},
  {question: "夜は何時くらいに寝てる...？ねむりは布団に入ってもぬいぐるみと話したりして、なかなか寝られないんだよね...", type: "text"},
  {question: "今日、何かやらなきゃいけないこととかある...？宿題とか...。ねむり、お姉ちゃんの差し入れ買いに行かなきゃいけないんだ...めんどくさいけど...", type: "text"},
];

const nemurigazou = [
    {src: "/nemuri.jpg", alt: "akubi"},
    {src: "/akubi.png", alt: "nemuri"},
    {src: "/base.png", alt: "base"},
    {src: "/nemuri.jpg", alt: "akubi"},
    {src: "/study.png", alt: "study"},
    {src: "/sleep.png", alt: "sleep"},
    {src: "/nemuri.jpg", alt: "akubi"},
    {src: "/outdoor.png", alt: "outdoor"},
]

const NemuriScheduleApp = () => {
  // 現在の質問インデックスと回答を管理するステート
  const [currentQuestionIndex, setCurrentQuestionIndex] = useState(0);
  const [answers, setAnswers] = useState<Record<number, string>>({});
  const [currentAnswer, setCurrentAnswer] = useState("");
  const [completed, setCompleted] = useState(false);
  const [fadeIn, setFadeIn] = useState(true);
  const [username, setUsername] = useState("");
    const router = useRouter();

  // コンポーネントがマウントされたときにセッションストレージから回答を読み込む
  useEffect(() => {
    const savedAnswers = sessionStorage.getItem('ScheduleAnswers');
    const savedUsername = sessionStorage.getItem('Username');
    
    if (savedUsername) {
      setUsername(savedUsername);
    }
    
    if (savedAnswers) {
      const parsedAnswers = JSON.parse(savedAnswers);
      setAnswers(parsedAnswers);
      
      // 最後の質問まで回答されていれば、完了状態にする
      const lastAnsweredIndex = Object.keys(parsedAnswers).length - 1;
      if (lastAnsweredIndex >= QuestionList.length - 1) {
        setCompleted(true);
      } else {
        setCurrentQuestionIndex(lastAnsweredIndex + 1);
      }
    }
  }, []);

  // 回答を保存する関数
  const saveAnswer = () => {
    if (currentAnswer.trim() === "") return;
    
    const newAnswers = { ...answers, [currentQuestionIndex]: currentAnswer };
    setAnswers(newAnswers);
    
    // ユーザー名の場合は特別に保存
    if (QuestionList[currentQuestionIndex].isUsername) {
      setUsername(currentAnswer);
      sessionStorage.setItem('Username', currentAnswer);
    }
    
    // セッションストレージに保存
    sessionStorage.setItem('ScheduleAnswers', JSON.stringify(newAnswers));
    
    // アニメーション効果のためにフェードアウト
    setFadeIn(false);
    
    // アニメーション後に次の質問に進む
    setTimeout(() => {
      if (currentQuestionIndex < QuestionList.length - 1) {
        setCurrentQuestionIndex(currentQuestionIndex + 1);
        setCurrentAnswer("");
      } else {
        setCompleted(true);
      }
      setFadeIn(true);
    }, 300);
  };

  // Enterキーを押して回答を送信
  const handleKeyPress = (e: React.KeyboardEvent<HTMLInputElement>) => {
    if (e.key === 'Enter') {
      saveAnswer();
    }
  };

  // 質問を最初からやり直す
  const resetQuestions = () => {
    sessionStorage.removeItem('nemuriScheduleAnswers');
    setAnswers({});
    setCurrentQuestionIndex(0);
    setCurrentAnswer("");
    setCompleted(false);
    setFadeIn(true);
  };

  // 回答一覧を表示
  const showAnswersSummary = () => {
    // ユーザー名を取得（最初の質問の回答）
    const displayUsername = answers[0] || "ゲスト";
    
    return (
        <div className="bg-green-50 p-8 rounded-lg shadow-lg max-w-4xl mx-auto mt-8">
        <h2 className="text-2xl font-semibold text-green-800 mb-6 text-center">{displayUsername}さんの予定</h2>
        
        <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
          {QuestionList.map((q, index) => {
            // ユーザー名の質問はスキップ
            if (q.isUsername) return null;
            
            return (
              <div key={index} className="bg-white p-5 rounded-lg shadow-sm border border-green-100 hover:shadow-md transition-shadow duration-300">
                <p className="text-gray-600 mb-2 text-sm font-medium">{q.question}</p>
                <p className="bg-green-50 p-3 rounded border border-green-200 min-h-12 flex items-center">
                  {answers[index] || "未回答"}
                </p>
              </div>
            );
          })}
        </div>
        
        <div className="flex flex-col sm:flex-row justify-center gap-4 mt-8">
          <button 
            onClick={resetQuestions}
            className="bg-green-500 hover:bg-green-600 text-white py-3 px-6 rounded-full transition-colors duration-300 text-lg font-medium shadow-sm hover:shadow"
          >
            もう一度話す
          </button>
          
          <button 
            onClick={() => {
              router.push('/agent');
            }}
            className="bg-green-400 hover:bg-green-500 text-white py-3 px-6 rounded-full transition-colors duration-300 text-lg font-medium shadow-sm hover:shadow"
          >
            今日の完璧なタスクを見る
          </button>
        </div>
      </div>
    );
  };

  // 完了したら回答一覧を表示
  if (completed) {
    return showAnswersSummary();
  }

  // 質問文の表示
  const getQuestionText = () => {
    const currentQuestion = QuestionList[currentQuestionIndex];
    
    // ユーザー名が入力済みで、現在の質問がユーザー名の質問でない場合、
    // ユーザー名を質問の中に組み込む
    if (username && !currentQuestion.isUsername) {
      return currentQuestion.question.replace('...？', `...？${username}...`);
    }
    
    return currentQuestion.question;
  };

const getNemuriImage = () => {
    const currentAvater = nemurigazou[currentQuestionIndex];
    return (
        <Image
                src={currentAvater.src}
                alt={currentAvater.alt}
                width={80}
                height={80}
                className="rounded-full"
                />
    )
}

  return (
    <div className="min-h-screen bg-green-50 p-4 flex flex-col items-center justify-center">
      <div className="max-w-md w-full bg-white rounded-lg shadow-md p-6 mb-4">
        <div className={`transition-opacity duration-300 ${fadeIn ? 'opacity-100' : 'opacity-0'}`}>
          {/* ねむりちゃんのアバター部分（シンプルな表現） */}
          <div className="flex justify-center mb-4">
            <div className="w-20 h-20 bg-green-200 rounded-full flex items-center justify-center">
              {getNemuriImage()}
            </div>
          </div>
          
          {/* 質問表示部分 */}
          <div className="bg-green-100 rounded-lg p-4 mb-4">
            <p className="text-green-800">
              {getQuestionText()}
            </p>
          </div>
          
          {/* 回答入力部分 */}
          <div className="mb-4">
            <input
              type="text"
              value={currentAnswer}
              onChange={(e) => setCurrentAnswer(e.target.value)}
              onKeyPress={handleKeyPress}
              placeholder="ここに回答を入力してね..."
              className="w-full p-3 border border-gray-300 rounded-lg focus:outline-none focus:ring-2 focus:ring-green-300"
            />
          </div>
          
          <button
            onClick={saveAnswer}
            className="w-full bg-green-500 hover:bg-green-600 text-white py-2 px-4 rounded-lg transition-colors duration-300"
          >
            次へ
          </button>
        </div>
      </div>
      
      {/* 進行状況 */}
      <div className="w-full max-w-md bg-white rounded-lg shadow-sm p-4">
        <div className="flex justify-between mb-2">
          <span className="text-sm text-gray-600">進行状況</span>
          <span className="text-sm text-gray-600">{currentQuestionIndex + 1} / {QuestionList.length}</span>
        </div>
        <div className="w-full bg-gray-200 rounded-full h-2">
          <div 
            className="bg-green-500 h-2 rounded-full transition-all duration-500 ease-in-out" 
            style={{ width: `${((currentQuestionIndex + 1) / QuestionList.length) * 100}%` }}
          ></div>
        </div>
      </div>
    </div>
  );
};

export default NemuriScheduleApp;