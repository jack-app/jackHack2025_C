import React from "react";

function handleClick() {
    window.location.href = "https://ja.react.dev/learn"; // ここに遷移先のURLを設定
  }
  
  export default function StartButton() {
    return (
      <button
        onClick={handleClick}
        style={{ backgroundColor: "#55AD9B" }}
        className="text-lg text-white px-10 py-3 rounded-2xl"
      >
        怠惰になる！
      </button>
    );
  }
  