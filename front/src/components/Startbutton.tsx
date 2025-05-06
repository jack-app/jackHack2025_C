import React from "react";
import { useRouter } from "next/navigation";

  
  export default function StartButton() {
    const router = useRouter();
    const handleClick = () => {
      router.push("/setup");
    };
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
  