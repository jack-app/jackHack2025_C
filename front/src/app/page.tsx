import Header from "../components/header"
import TimeCard from "../components/timeCard"

export default function Page() {
  return (
    <div className="min-h-screen flex flex-col bg-[#f1f8e8]">
      <Header />
      {/* 以下に本日のTodo画面のコンテンツを入れていきます */}
      <main className="flex-1 p-6">
        {/* Todoリスト */}
        <TimeCard startTime="4:15" endTime="6:00" activity="お風呂"/>
      </main>
    </div>
  );
}
