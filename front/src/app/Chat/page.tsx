// src/app/chat/page.tsx
"use client";
import { useState, FormEvent, useRef, useEffect } from "react";
import Image from "next/image";
import {useRouter} from "next/navigation";

type Message = {
  from: "user" | "bot";
  text: string;
};

export default function ChatPage() {
  const [input, setInput] = useState("");
  const [messages, setMessages] = useState<Message[]>([]);
  const messagesEndRef = useRef<HTMLDivElement>(null);
  const [isTyping, setIsTyping] = useState(false);
  const router = useRouter();
  const handleClick = () => {
      router.push("/agent")
  }

  // チャットが更新されたら自動スクロール
  useEffect(() => {
    messagesEndRef.current?.scrollIntoView({ behavior: "smooth" });
  }, [messages]);

  const sendMessage = async (e: FormEvent) => {
    e.preventDefault();
    if (!input.trim()) return;
    
    // ユーザー発言を追加
    setMessages((prev) => [...prev, { from: "user", text: input }]);
    const userInput = input;
    setInput("");
    
    // タイピングアニメーション開始
    setIsTyping(true);
    
    // API呼び出し
    try {
      const res = await fetch("/api/chat", {
        method: "POST",
        headers: { "Content-Type": "application/json" },
        body: JSON.stringify({ user_input: userInput }),
      });
      const { response } = await res.json();
      
      // 少し遅延を入れてタイピング感を出す
      setTimeout(() => {
        // Bot発言を追加
        setMessages((prev) => [...prev, { from: "bot", text: response }]);
        setIsTyping(false);
      }, 500 + Math.random() * 1000); // リアルさのためにランダムな遅延
      
    } catch {
      setIsTyping(false);
      setMessages((prev) => [
        ...prev,
        { from: "bot", text: "通信エラーが発生しました。" },
      ]);
    }
  };

  return (
    <div className="min-h-screen flex bg-[#fff4dd]">
      {/* 左側1/3: キャラクター立ち絵エリア */}
      <button
          type="button"
          onClick={handleClick}
          className="
            absolute top-4 left-4 z-10
            flex items-center gap-1
            bg-[#fff4dd] bg-opacity-80 hover:bg-opacity-100
            px-3 py-1 rounded-full
            transition
            cursor-pointer
      ">
        <span className="text-sm text-gray-700">戻る</span>
      </button>  
      <div className="w-1/3 flex flex-col items-center justify-center p-4 relative">
        <div className="relative w-full h-[80vh] flex items-center justify-center">
          <Image
            src="/chat.png"
            alt="ねむりちゃん立ち絵"
            layout="fill"
            objectFit="contain"
            priority
          />
        </div>
      </div>
      
      {/* 右側2/3: チャットエリア */}
      <div className="w-2/3 flex flex-col bg-white rounded-l-3xl shadow-xl p-6">
        <h2 className="text-2xl font-semibold mb-4 text-[#55AD9B]">ねむりちゃん Chat</h2>
        
        {/* チャットメッセージエリア */}
        <div className="flex-1 overflow-y-auto mb-4 pr-2">
          {messages.length === 0 ? (
            // 会話前のプレースホルダー
            <div className="h-full flex items-center justify-center text-gray-500">
              <p className="text-lg">ねむりちゃんと会話しよう</p>
            </div>
          ) : (
            // 会話開始後のチャット表示
            <div className="space-y-4">
              {messages.map((m, i) =>
                m.from === "bot" ? (
                  <div key={i} className="flex items-start space-x-2">
                    <div className="w-10 h-10 rounded-full overflow-hidden bg-[#55AD9B] flex items-center justify-center">
                      <Image
                        src="/imageForChat.png"
                        width={40}
                        height={40}
                        alt="ねむりちゃん"
                      />
                    </div>
                    <div className="bg-[#F1F8E8] p-3 rounded-tr-none rounded-lg shadow max-w-[80%]">
                      {m.text}
                    </div>
                  </div>
                ) : (
                  <div key={i} className="flex justify-end">
                    <div className="bg-[#55AD9B] text-white p-3 rounded-bl-none rounded-lg shadow max-w-[80%]">
                      {m.text}
                    </div>
                  </div>
                )
              )}
              {/* タイピングインジケーター */}
              {isTyping && (
                <div className="flex items-start space-x-2">
                  <div className="w-10 h-10 rounded-full overflow-hidden bg-[#55AD9B] flex items-center justify-center">
                    <Image
                      src="/imageForChat.png"
                      width={40}
                      height={40}
                      alt="ねむりちゃん"
                    />
                  </div>
                  <div className="bg-[#F1F8E8] p-3 rounded-tr-none rounded-lg shadow">
                    <div className="flex space-x-1">
                      <div className="w-2 h-2 bg-gray-500 rounded-full animate-bounce" style={{ animationDelay: "0ms" }}></div>
                      <div className="w-2 h-2 bg-gray-500 rounded-full animate-bounce" style={{ animationDelay: "200ms" }}></div>
                      <div className="w-2 h-2 bg-gray-500 rounded-full animate-bounce" style={{ animationDelay: "400ms" }}></div>
                    </div>
                  </div>
                </div>
              )}
              <div ref={messagesEndRef} />
            </div>
          )}
        </div>
        
        {/* 入力フォーム */}
        <form
          onSubmit={sendMessage}
          className="flex items-center space-x-2 bg-white p-3 rounded-lg"
        >
          <input
            type="text"
            value={input}
            onChange={(e) => setInput(e.target.value)}
            className="flex-1 border rounded-full px-4 py-2 focus:outline-none focus:ring-2 focus:ring-[#55AD9B]"
            placeholder="メッセージを入力..."
          />
          <button
            type="submit"
            className="bg-[#55AD9B] text-white px-4 py-2 rounded-full hover:bg-[#4A9C8B] transition-colors"
            disabled={isTyping}
          >
            送信
          </button>
        </form>
      </div>
    </div>
  );
}