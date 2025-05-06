// components/ProfileModal.tsx
import React from "react";
import { ProfilePropsType } from "@/types/todoType";
import Charactor from "./Charactor"

const ProfileModal = ({
  isOpen,
  onClose,
  profile,
}: ProfilePropsType) => {
  if (!isOpen) return null;

  return (
    <div
      className="fixed inset-0 z-50 flex items-center justify-center bg-black/50 p-4"
      aria-modal="true"
      role="dialog"
    >
      <div className="relative bg-[#eefcf2] rounded-2xl shadow-lg w-full max-w-xs p-6">
        {/* 閉じるボタン */}
        <button
          onClick={onClose}
          className="absolute top-3 right-3 text-gray-500 hover:text-gray-700 focus:outline-none"
          aria-label="閉じる"
        >
          ✕
        </button>

        {/* 本体 */}
        <div className="flex flex-col items-center space-y-4">
          {/* アイコン */}
          <div className="rounded-full overflow-hidden">
            <Charactor level={profile.level-1}/>
          </div>

          {/* 名前 */}
          <h2 className="text-2xl font-semibold text-green-700">
            {profile.name}
          </h2>

          {/* レベル */}
          <p className="text-lg text-green-600">
            Lv.{profile.level.toLocaleString()}
          </p>

          {/* キャンセル数 */}
          <p className="text-base text-green-600">
            キャンセル数：{profile.canceledCount.toLocaleString()}
          </p>
        </div>
      </div>
    </div>
  );
};

export default ProfileModal;
