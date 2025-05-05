'use client';

import { useEffect, useState } from "react";
import Header from "@/components/header";
import TimeCard from "@/components/timeCard";
import TimeLine from "@/components/timeLine";
import CreateTodo from "@/components/CreateTodo";
import type { ToDoCardPropsType } from '@/types/todoType';
import Clock from "@/components/Clock";
import IDEAL_SCHEDULE from "@/dummydata";
import LevelIndicator from "@/components/Level";
import EnhancedTimeCard from "@/components/EnhancedTimeCard";
import EditTodoModal from "@/components/EditTodoModal";
import {postLevelDown} from "@/libs/postleveldown";



export default function Page() {
  // JSONデータの状態管理
  const [todos, setTodos] = useState<ToDoCardPropsType[]>([]);
  // 現在表示するタスク
  const [viewTodos, setViewTodos] = useState<ToDoCardPropsType[]>([]);
  // 編集中のタスク
  const [editingTodo, setEditingTodo] = useState<ToDoCardPropsType | null>(null);
  //タスク表示の状態管理
  const [showTask, setShowTask] = useState<"currentTask" | "AllTask">("currentTask");
  const initallevel = 100;
  const [_combo, setCombo] = useState<number>(0);  
  const [cancelTotal, setCancelTotal] = useState<number>(0);
  const [level, setLevel] = useState<number>(initallevel);
  
  // アプリ起動時にローカルストレージからデータを読み込む
  useEffect(() => {
    const savedTodos = localStorage.getItem('todos');
    const level = localStorage.getItem('level');
    const combo = localStorage.getItem('_combo');
    if (level) {
      setLevel(Number(level));
    }
    if (combo) {
      setCombo(Number(combo));
    }
    if (savedTodos) {
      try {
        const parsedTodos = JSON.parse(savedTodos);
        setTodos(parsedTodos);
      } catch (error) {
        console.error('Failed to parse saved todos:', error);
        // エラー時はデフォルトデータを使用
        setTodos(IDEAL_SCHEDULE.map(todo => ({
          ...todo,
          isDone: false,
          isCancel: false
        })));
      }
    } else {
      // 保存データがない場合はデフォルトデータを使用
      setTodos(IDEAL_SCHEDULE.map(todo => ({
        ...todo,
        isDone: false,
        isCancel: false
      })));
    }
  }, []);

  // todosが変更されたときにローカルストレージに保存
  useEffect(() => {
    if (todos.length > 0) {
      localStorage.setItem('todos', JSON.stringify(todos));
      handleNowViewTask(todos);
    }
    // レベルの状態を更新する関数
    const updateLevel = () => {
      const downlevel = handle_levelDown();
      console.log("downlevel", downlevel);
    };
    updateLevel();
    
  }, [todos]);

  const handle_levelDown = async () => {
    // todosの中から、iscancelがtrueのものを取得する
    const cancelTodos = todos.filter(todo => todo.isCancel);
    // cancelTodosの数を取得する
    const cancelTotal = cancelTodos.length;
    // comboの数を取得する
    const combo = _combo + 1;
    
    // キャンセルされたタスクがあるか確認
    if (cancelTodos.length === 0) {
      console.log("No canceled todos found");
      // キャンセルタスクがない場合、デフォルトの動作としてレベルを下げる
      setLevel(prev => prev - 1);
      return null;
    }
    
    console.log("Using canceled todo for level down:", cancelTodos[0]);
    
    // 最初のキャンセルされたタスクを使ってレベルダウン処理を行う
    const downlevel = await postLevelDown(cancelTodos[0], combo, cancelTotal);
    console.log("downlevel", downlevel);
    
    if (downlevel) {
      // APIからのレスポンスがある場合はその値でレベルを更新
      setLevel(prev => prev + downlevel);
    } else {
      // レスポンスがない場合はデフォルトの動作
      setLevel(prev => prev - 1);
    }
    
    // viewTodosのチェックはレベル更新後に行う
    if (!viewTodos || viewTodos.length === 0) {
      console.log("viewTodos is empty or undefined");
      return null;
    }
    
    return downlevel;
  }


  // 完了状態を変更するハンドラー
  const handleIsDone = (index: number, isDone: boolean) => {
    const newTodos = [...todos];
    // viewTodosのindexからtodosの対応するインデックスを見つける
    const actualTodoIndex = newTodos.findIndex(todo => 
      todo.startTime === viewTodos[index].startTime && 
      todo.endTime === viewTodos[index].endTime && 
      todo.activity === viewTodos[index].activity
    );
    
    if (actualTodoIndex !== -1) {
      newTodos[actualTodoIndex].isDone = isDone;
      // 完了とキャンセルは同時に設定できないようにする
      if (isDone) {
        newTodos[actualTodoIndex].isCancel = false;
      }
      setTodos(newTodos);
    }
    setCombo(0)
    setCancelTotal(prev => prev - 1);
  };

  // キャンセル状態を変更するハンドラー
  const handleIsCancel = (index: number, isCancel: boolean) => {
    const newTodos = [...todos];
    // viewTodosのindexからtodosの対応するインデックスを見つける
    const actualTodoIndex = newTodos.findIndex(todo => 
      todo.startTime === viewTodos[index].startTime && 
      todo.endTime === viewTodos[index].endTime && 
      todo.activity === viewTodos[index].activity
    );
    
    if (actualTodoIndex !== -1) {
      newTodos[actualTodoIndex].isCancel = isCancel;
      // 完了とキャンセルは同時に設定できないようにする
      if (isCancel) {
        newTodos[actualTodoIndex].isDone = false;
      }
      setTodos(newTodos);
    }
    setCombo(prev => prev + 1);
    setCancelTotal(prev => prev + 1);
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
    
    // 現在のタスクが存在しない場合は、次のタスクを表示
    if (nowProssingTask.length === 0) {
      // これから始まるタスクを取得
      const upcomingTasks = todos.filter(todo => {
        const [startHour, startMinute] = todo.startTime.split(':').map(Number);
        const startTime = new Date(now.getFullYear(), now.getMonth(), now.getDate(), startHour, startMinute);
        return startTime > now;
      });
      
      // 時間順にソート
      upcomingTasks.sort((a, b) => {
        const [aStartHour, aStartMinute] = a.startTime.split(':').map(Number);
        const [bStartHour, bStartMinute] = b.startTime.split(':').map(Number);
        const aStartTime = new Date(0, 0, 0, aStartHour, aStartMinute);
        const bStartTime = new Date(0, 0, 0, bStartHour, bStartMinute);
        return aStartTime.getTime() - bStartTime.getTime();
      });
      console.log('upcomingTasks', upcomingTasks);
      
      if (upcomingTasks.length > 0) {
        // 次のタスクを表示
        console.log('次のタスク:', upcomingTasks);
        setViewTodos(upcomingTasks);
      } else {
        // すべてのタスクが完了している場合
        setViewTodos([]);
      }
    } else {
      setViewTodos(nowProssingTask);
    }
  };

  // 時間順にソートする関数
  const sortTodosByDate = (todos: ToDoCardPropsType[]) => {
    return [...todos].sort((a, b) => {
      const [aStartHour, aStartMinute] = a.startTime.split(':').map(Number);
      const [bStartHour, bStartMinute] = b.startTime.split(':').map(Number);
      const aStartTime = new Date(0, 0, 0, aStartHour, aStartMinute);
      const bStartTime = new Date(0, 0, 0, bStartHour, bStartMinute);
      return aStartTime.getTime() - bStartTime.getTime();
    });
  };

  // 新しいTodoの追加
  const handleAddTodo = (newTodo: ToDoCardPropsType) => {
    // 新しいTodoには初期状態のisDoneとisCancelを追加
    const todoWithState = {
      ...newTodo,
      isDone: false,
      isCancel: false
    };
    
    const newTodos = [...todos, todoWithState];
    // 時間順にソート
    setTodos(sortTodosByDate(newTodos));
  };

  // タスクの編集開始
  const handleEditStart = (todo: ToDoCardPropsType) => {
    setEditingTodo(todo);
  };

  // タスクの編集保存
  const handleEditSave = (updatedTodo: ToDoCardPropsType) => {
    if (!editingTodo) return;
    
    const todoIndex = todos.findIndex(todo => 
      todo.startTime === editingTodo.startTime && 
      todo.endTime === editingTodo.endTime && 
      todo.activity === editingTodo.activity
    );
    
    if (todoIndex !== -1) {
      const newTodos = [...todos];
      newTodos[todoIndex] = {
        ...updatedTodo,
        isDone: todos[todoIndex].isDone,
        isCancel: todos[todoIndex].isCancel
      };
      
      // 時間順にソート
      setTodos(sortTodosByDate(newTodos));
    }
    
    setEditingTodo(null);
  };

  // タスクの削除
  const handleDeleteTodo = (index: number) => {
    if (window.confirm('このタスクを削除してもよろしいですか？')) {
      const actualTodoIndex = todos.findIndex(todo => 
        todo.startTime === viewTodos[index].startTime && 
        todo.endTime === viewTodos[index].endTime && 
        todo.activity === viewTodos[index].activity
      );
      
      if (actualTodoIndex !== -1) {
        const newTodos = [...todos];
        newTodos.splice(actualTodoIndex, 1);
        setTodos(newTodos);
      }
    }
  };

  // すべてのタスクを表示
  const handleShowAllTasks = () => {
    setViewTodos(todos);
    setShowTask("AllTask");
  };

  // 現在のタスクのみを表示
  const handleShowCurrentTask = () => {
    handleNowViewTask(todos);
    setShowTask("currentTask");
  };

  // 1分ごとに現在のタスクを更新
  useEffect(() => {
    // 初回レンダリング時にhandleNowViewTaskを実行する
    if (todos.length > 0) {
      handleNowViewTask(todos);
    }
    
    // todosStateが変更されたときにhandleNowViewTaskを実行する
    const interval = setInterval(() => {
      if (todos.length > 0) {
        handleNowViewTask(todos);
      }
    }, 1000 * 60); // 1分ごとに実行
    
    return () => clearInterval(interval);
  }, [todos]);

  return (
    <div className="min-h-screen flex flex-col bg-[#f1f8e8] text-[#55AD9B]">
      <Header />
      <main className="flex-1 p-6 max-w-6xl mx-auto grid grid-cols-1 md:grid-cols-2 gap-6">
        {/* レベル・時間セクション */}
        <section className="mb-5">
          <h2 className="text-2xl font-bold mb-7 border-b border-green-300 pb-2 w-[85%]">Taida Time</h2>
          <div className="flex flex-col-2 space-x-7">
            <LevelIndicator level={level} />
            <Clock />

          </div>
        </section>
          
        {/* 予定追加セクション */}
        <section className="mb-5">
          <h2 className="text-2xl font-bold mb-7 border-b border-green-300 pb-2">
            予定を追加
          </h2>
          <CreateTodo onSave={handleAddTodo} />
        </section>

        {/* タスク一覧表示セクション */}
        <section className="mb-8">
          <div className="flex space-x-10 border-b border-green-300 mb-4 w-[85%]">
            <h2 className="text-2xl font-bold text-[#55AD9B] pb-2">
              タスク一覧
            </h2>
            <div className="flex">
              {showTask === "currentTask" ? (
                // currentTask 中 → 全タスク表示へ切り替え
                <button
                  onClick={() => {
                    handleShowAllTasks();
                  }}
                  className="rounded px-3 py-1 cursor-pointer"
                >
                  全てのタスクを表示
                </button>
              ) : (
                // AllTask 中 → 現在タスク表示へ切り替え
                <button
                  onClick={() => {
                    console.log("現在タスク表示ボタンが押されました");
                    handleShowCurrentTask();
                  }}
                  className="rounded px-3 py-1 cursor-pointer"
                >
                  直近のタスクを表示
                </button>
              )}
            </div>
          </div>

          <div className="space-y-4">
            {viewTodos.map((todo, index) => (
              <EnhancedTimeCard
                key={index}
                todo={todo}
                index={index}
                onIsDoneChange={handleIsDone}
                onIsCancelChange={handleIsCancel}
                onEdit={handleEditStart}
                onDelete={handleDeleteTodo}
              />
            ))}
          </div>
        </section>
        
        {/* タイムラインセクション */}
        <section className="mb-8">
          <h1 className="text-2xl font-bold mb-4 border-b border-green-300 pb-2">
            本日のスケジュール
          </h1>
          <TimeLine todos={todos} />
        </section>
      </main>
      
      {/* 編集モーダル - 編集中のタスクがある場合のみ表示 */}
      {editingTodo && (
        <EditTodoModal
          todo={editingTodo}
          onSave={handleEditSave}
          onCancel={() => setEditingTodo(null)}
        />
      )}
    </div>
  );
};

