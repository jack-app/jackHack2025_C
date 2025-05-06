import React from "react";
import Charactor from "./Charactor";
import Image from 'next/image';
import {useRouter} from "next/navigation";

type HeaderProps = {
    onProfileClick: () => void;
    level: number;
};

const Header = ( {onProfileClick, level}: HeaderProps ) => {
    const router = useRouter();
    const handleClick = () => {
        router.push("/Chat")
    }
    return (
        <header className="bg-[#55AD9B] text-white py-4 px-6 shadow-md flex items-center justify-between relative">
        {/* 左：プロフィールアイコン */}
        <button onClick={onProfileClick} className="flex items-center space-x-2 cursor-pointer">
            <div className="w-12 h-12 rounded-full overflow-hidden ">
                <Charactor level={level}/>
            </div>    
            <span className="font-medium hover:underline">プロフィール</span>
        </button>

        {/* 中央：タイトル */}
        <h1 className="absolute left-1/2 top-1/2 transform -translate-x-1/2 -translate-y-1/2 text-2xl font-semibold">
            Make you Lazy
        </h1>

        {/* 右：左と幅を合わせるためのプレースホルダー（なくてもOK） */}
        <div className="w-fit p-1 border-2 border-[#36aa95]">
            <button onClick={handleClick} className="flex items-center space-x-2 cursor-pointer ">
                <div className="w-12 h-12 rounded-full overflow-hidden ">
                    <Image src = "/imageForChat.png" width={48} height={48} alt ="chat用画像"/>
                </div>    
                <span>チャット</span>
            </button>
        </div>
        </header>
    );
};

export default Header;
