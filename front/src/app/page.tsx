
'use client';

import { useState } from "react"
import Header from "../components/header"
import TimeCard from "../components/timeCard"
import TimeLine from "../components/timeLine"
import CreateTodo from "../components/CreateTodo"
import type { Todo } from '../types/todo'
import IDEAL_SCHEDULE from "@/dummydata";

export default function Page() {
  const [todos, setTodo] = useState<Todo[]>(IDEAL_SCHEDULE);

  return (
    <div className="min-h-screen flex flex-col bg-[#f1f8e8]">
      <Header />
      <main className="flex-1 p-6">
        <section>
          <h1>To Do</h1>
          <TimeCard startTime="4:15" endTime="6:00" activity="お風呂"/>
        </section>
        
        <section>
          <h2>予定を追加</h2>
          <CreateTodo onSave={t => setTodo(prev => [...prev, t])} />
        </section>
        
        <section>
          <h2>理想の1日のスケジュール</h2>
          <TimeLine todos={todos}/>
        </section>
      </main>
    </div>
    <div>
      
    </div>
    </>
  );
};

export default App;
