import React from "react";

const Header = () => {
    return (
        <header className="bg-[#55AD9B] text-white py-4 px-6 shadow-md flex items-center justify-between relative">
        {/* 左：プロフィールアイコン */}
        <button className="flex items-center space-x-2">
            <div className="w-10 h-10 rounded-full ring-2 ring-white bg-gray-200 flex-shrink-0" />
            <span className="font-medium hover:underline">プロフィール</span>
        </button>

        {/* 中央：タイトル */}
        <h1 className="absolute left-1/2 top-1/2 transform -translate-x-1/2 -translate-y-1/2 text-2xl font-semibold">
            Make you Lazy
        </h1>

        {/* 右：左と幅を合わせるためのプレースホルダー（なくてもOK） */}
        <div className="w-32" />
        </header>
    );
};

export default Header;
