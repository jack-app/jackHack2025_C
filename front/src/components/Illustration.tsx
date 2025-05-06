
import React from "react";
import Startbutton from "./Startbutton";
import Image from "next/image";

export default function Illustration() {
  return (
    <div style={{ backgroundColor: "#f1f8e8" }} className="relative flex min-h-screen">
    {/* メインコンテンツエリア (左側) */}
    <div className="w-3/4 p-6">
      <div className="max-w-3xl mx-auto">
        {/* タイトル */}
        <h1 style={{ color: "#55AD9B" }} className="text-3xl font-bold mb-6">Make You Lazy って？</h1>

        {/* 段落コンテンツ */}
        <p className="text-black text-lg leading-relaxed mb-4">
          皆さんは、リマインダーアプリや ToDo アプリを使ったことがありますか？
        </p>

        <p className="text-black text-lg leading-relaxed mb-4">
          リマインダーや ToDo アプリは自分がしなければならないことを明確にリストに表示してくれて、通知してくれて、
          効率的で生産的な生活を送るためには、最高のアプリだと思います。
        </p>

        <p className="text-black text-lg leading-relaxed mb-4">
          でも、本当にそれでいいんですか？
        </p>

        <p className="text-black text-lg leading-relaxed mb-4">
          そんなに最適化された日々を繰り返すロボットのような生活で満足できるのでしょうか。
        </p>

        <p className="text-black text-lg leading-relaxed mb-4 font-bold">
          もっと人間らしい、自由で豊かな人生を歩みたいんだ！と思ったそこのあなた！
        </p>

        <p className="text-black text-lg leading-relaxed mb-12">
          そんなあなたのために、このアプリを作りました！
        </p>

        {/* Make You Lazy の説明 */}
        <div>
          <h2 style={{ color: "#55AD9B" }} className="text-2xl font-semibold mb-4">Make You Lazy の使い方</h2>
          <p className="text-black text-lg leading-relaxed mb-4">
            Make you Lazy は、今まで皆さんが送りたくても送れなかった、怠惰な生活を支援する、
            新しいリマインダーアプリです！
          </p>
        </div>

        {/* 機能説明 */}
        <ul className="text-black text-lg leading-relaxed mb-8">
          <li className="mb-4">
            予定を追加で、開始時間と終了時間、やることを入力し、自分の理想の生活を追加可能！
          </li>
          <li className="mb-4">
            タスク一覧で、追加した予定を確認できます。
            <p>キャンセルボタンを押すことで、生活レベルを下げることができます！</p>
          </li>
          <li className="mb-4">
            予定をキャンセルして怠惰な生活を満喫し、Lv.-999を目指しましょう！
          </li>
        </ul>

        <div className="mt-8 mb-12">
          <Startbutton />
        </div>
      </div>
    </div>

    {/* キャラクターエリア (右側固定) */}
    <div className="w-2/5 fixed right-0 top-0 h-screen z-10 flex items-center justify-center p-5">
      <Image src="/trans_tatie.png" alt="Illustration" width={400} height={400} className="w-full h-auto" />
    </div>
  </div>
  );
}