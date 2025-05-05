import React from "react";



const StartHeader = () => {
    return (
        <header className="bg-emerald-600 text-white py-4 px-6 shadow-md flex items-center justify-between relative">
        {/* 左：プロフィールアイコン */}

          <div className="w-12 h-12">

          </div>

        {/* 中央：タイトル */}
        <h1 className="absolute left-1/2 top-1/2 transform -translate-x-1/2 -translate-y-1/2 text-2xl font-semibold">
          Make you Lazy
        </h1>

        {/* 右：左と幅を合わせるためのプレースホルダー */}
        <div className="w-32" />
      </header>
    );
};

export default StartHeader;
