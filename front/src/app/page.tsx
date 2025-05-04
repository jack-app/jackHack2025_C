import Header from "../components/header"

export default function Page() {
  return (
    <div className="min-h-screen flex flex-col bg-[#f1f8e8]">
      <Header />
      {/* 以下に本日のTodo画面のコンテンツを入れていきます */}
      <main className="flex-1 p-6">
        {/* Todoリスト */}
      </main>
    </div>
  );
}
