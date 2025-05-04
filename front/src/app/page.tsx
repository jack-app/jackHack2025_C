'use client';

import { use, useEffect, useState } from "react"
import Header from "@/components/header"
import TimeCard from "@/components/timeCard"
import TimeLine from "@/components/timeLine"
import CreateTodo from "@/components/CreateTodo"
import type { ToDoCardPropsType } from '@/types/todoType'
import Clock from "@/components/Clock"
import IDEAL_SCHEDULE from "@/dummydata";


export default function Page() {
  const [ViewHandler, setViewHandler] = useState<ToDoCardPropsType[]>(
    IDEAL_SCHEDULE.map(todo => ({
      ...todo,
      isDone: false,
      isCancel: false
    }))
  )
  // 完了状態とキャンセル状態を管理するための状態
  const [todosState, setTodosState] = useState(
    IDEAL_SCHEDULE.map(todo => ({
      ...todo,
      isDone: false,
      isCancel: false
    }))
  );

  // 完了状態を変更するハンドラー
  const handleIsDone = (index: number, isDone: boolean) => {
    const newTodos = [...todosState];
    newTodos[index].isDone = isDone;
    // 完了とキャンセルは同時に設定できないようにする
    if (isDone) {
      newTodos[index].isCancel = false;
    }
    setTodosState(newTodos);

  };

  // キャンセル状態を変更するハンドラー
  const handleIsCancel = (index: number, isCancel: boolean) => {
    const newTodos = [...todosState];
    newTodos[index].isCancel = isCancel;
    // 完了とキャンセルは同時に設定できないようにする
    if (isCancel) {
      newTodos[index].isDone = false;
    }
    setTodosState(newTodos);
  };

  // 現在時刻に基づいて処理するべきタスクを取得することができる関数
  const handleNowViewTask = (todos: ToDoCardPropsType[]) => {
    const now = new Date();
    const nowProssingTask = todos.filter(todo => {
      const [startHour, startMinute] = todo.startTime.split(':').map(Number);
      const [endHour, endMinute] = todo.endTime.split(':').map(Number);
      const startTime = new Date(now.getFullYear(), now.getMonth(), now.getDate(), startHour, startMinute);
      const endTime = new Date(now.getFullYear(), now.getMonth(), now.getDate(), endHour, endMinute);
      return now >= startTime && now <= endTime;
    });
    // nowProssingTaskのindexを取得する
    const nowProssingTaskIndex = todos.findIndex(todo => {
      const [startHour, startMinute] = todo.startTime.split(':').map(Number);
      const [endHour, endMinute] = todo.endTime.split(':').map(Number);
      const startTime = new Date(now.getFullYear(), now.getMonth(), now.getDate(), startHour, startMinute);
      const endTime = new Date(now.getFullYear(), now.getMonth(), now.getDate(), endHour, endMinute);
      return now >= startTime && now <= endTime;
    });
    // nowProssingTaskが存在しない場合は空の配列を返す
    if (nowProssingTask.length === 0) {
      return [];
    }
    // nowProssingTaskが存在する場合は、そのindexからindex+1までの配列を返す。　ただし、index+1がtodosのlengthを超えないようにする
    const nextIndex = nowProssingTaskIndex + 1;
    if (nextIndex >= todos.length) {
      setViewHandler([todos[-1]])
    }
    const nextTask = todos.slice(nextIndex, nextIndex + 1);
    setViewHandler(nextTask);
  };

  // dateの考慮して、date順に並び変える関数を作成する。
    const sortTodosByDate=(todos: ToDoCardPropsType[])=>{
    return todos.sort((a, b) => {
      const [aStartHour, aStartMinute] = a.startTime.split(':').map(Number);
      const [bStartHour, bStartMinute] = b.startTime.split(':').map(Number);
      const aStartTime = new Date(0, 0, 0, aStartHour, aStartMinute);
      const bStartTime = new Date(0, 0, 0, bStartHour, bStartMinute);
      return aStartTime.getTime() - bStartTime.getTime();
    });
  }

  // 新しいTodoが追加されたときに、handleNowViewTaskを実行するかつ、ソートを行う関数
  const handleNewTodo = (newTodo: ToDoCardPropsType) => {
    setTodosState(prev => {
      const newTodos = [...prev, newTodo];
      return sortTodosByDate(newTodos);
    });
    handleNowViewTask([...todosState, newTodo]);
  };


  useEffect(() => {
    // 初回レンダリング時にhandleNowViewTaskを実行する
    handleNowViewTask(todosState);
    // todosStateが変更されたときにhandleNowViewTaskを実行する
    const interval = setInterval(() => {
      handleNowViewTask(todosState);
    }
    , 1000 * 60); // 1分ごとに実行
    return () => clearInterval(interval);
  }, [todosState]);




  return (
    <>
      <div className="min-h-screen flex flex-col bg-[#f1f8e8]">
        <Header />
        <main className="flex p-6 max-w-4xl mx-auto">
          <div className="flex justify-between items-center mb-6">
            <Clock />

            <section className="mb-8">
              <h1 className="text-2xl font-bold text-green-700 mb-4 border-b border-green-300 pb-2">今日のTo Do</h1>
              <div className="space-y-4">
                {ViewHandler.map((todo, index) => (
                  <TimeCard
                    key={index}
                    startTime={todo.startTime}
                    endTime={todo.endTime}
                    activity={todo.activity}
                    isDone={todo.isDone}
                    isDoneHandler={(isDone) => handleIsDone(index, isDone)}
                    isCancel={todo.isCancel}
                    isCancelHandler={(isCancel) => handleIsCancel(index, isCancel)}
                  />
                ))}
              </div>
            </section>
            <div className="flex flex-col items-center">
            <section className="mb-8">
              <h2 className="text-xl font-bold text-green-700 mb-4 border-b border-green-300 pb-2">予定を追加</h2>
              <CreateTodo onSave={newTodo => {
                // 新しいTodoには初期状態のisDoneとisCancelを追加
                const todoWithState = {
                  ...newTodo,
                  isDone: false,
                  isCancel: false
                };
                handleNewTodo(todoWithState);
              }} />
            </section>
            
            <section className="mb-8">
              <h2 className="text-xl font-bold text-green-700 mb-4 border-b border-green-300 pb-2">理想の1日のスケジュール</h2>
              {/* todosを使用せず、todosStateを使用 */}
              <TimeLine todos={todosState} />
            </section>
            </div>
          </div>
        </main>
      </div>
    </>
  );
}