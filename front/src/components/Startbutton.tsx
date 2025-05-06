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
        className="text-lg bg-green-400 text-white px-10 py-3 rounded-2xl hover:bg-green-600 transition duration-300 ease-in-out shadow-md hover:shadow-lg"
      >
        怠惰になる！
      </button>
    );
  }
  