'use client';

import { useEffect, useState } from "react";
import Header from "@/components/header";
import TimeCard from "@/components/timeCard";
import TimeLine from "@/components/timeLine";
import CreateTodo from "@/components/CreateTodo";
import type { ToDoCardPropsType } from '@/types/todoType';
import Clock from "@/components/Clock";
import IDEAL_SCHEDULE from "@/dummydata";

import EditTodoModal from "@/components/EditTodoModal";

// TimeCardコンポーネントの拡張版（編集・削除ボタン付き）
const EnhancedTimeCard = ({ 
  todo, 
  index, 
  onIsDoneChange, 
  onIsCancelChange, 
  onEdit, 
  onDelete 
}: { 
  todo: ToDoCardPropsType, 
  index: number, 
  onIsDoneChange: (index: number, isDone: boolean) => void, 
  onIsCancelChange: (index: number, isCancel: boolean) => void, 
  onEdit: (todo: ToDoCardPropsType) => void, 
  onDelete: (index: number) => void 
}) => {
  return (
    <div className={`rounded-lg shadow-md p-4 mb-4 w-full max-w-md text-gray-500 ${
      todo.isCancel ? 'bg-gray-100 opacity-70' : 
      todo.isDone ? 'bg-green-50' : 'bg-white'
    }`}>
      <div className="flex justify-between items-center mb-2">
        <p className="text-sm">{todo.startTime} ～ {todo.endTime}</p>
        <div className="flex space-x-2">
          <button 
            onClick={() => onEdit(todo)} 
            className="text-blue-500 hover:text-blue-700"
            title="編集"
          >
            <svg xmlns="http://www.w3.org/2000/svg" className="h-5 w-5" fill="none" viewBox="0 0 24 24" stroke="currentColor">
              <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M11 5H6a2 2 0 00-2 2v11a2 2 0 002 2h11a2 2 0 002-2v-5m-1.414-9.414a2 2 0 112.828 2.828L11.828 15H9v-2.828l8.586-8.586z" />
            </svg>
          </button>
          <button 
            onClick={() => onDelete(index)} 
            className="text-red-500 hover:text-red-700"
            title="削除"
          >
            <svg xmlns="http://www.w3.org/2000/svg" className="h-5 w-5" fill="none" viewBox="0 0 24 24" stroke="currentColor">
              <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M19 7l-.867 12.142A2 2 0 0116.138 21H7.862a2 2 0 01-1.995-1.858L5 7m5 4v6m4-6v6m1-10V4a1 1 0 00-1-1h-4a1 1 0 00-1 1v3M4 7h16" />
            </svg>
          </button>
        </div>
      </div>
      <p className={`mt-2 text-base font-medium text-gray-800 break-words ${todo.isCancel ? 'line-through' : ''}`}>
        {todo.activity}
      </p>
      <div className="mt-4 flex justify-end space-x-2">
        <button 
          className={`px-3 py-1 ${todo.isDone ? 'bg-gray-400' : 'bg-green-500'} text-white rounded w-24 text-center`}
          onClick={() => onIsDoneChange(index, !todo.isDone)}
          disabled={todo.isCancel}
        >
          {todo.isDone ? '完了済み' : '完了'}
        </button>
        <button 
          className={`px-3 py-1 ${todo.isCancel ? 'bg-gray-400' : 'bg-red-500'} text-white rounded font-bold w-24 text-center`}
          onClick={() => onIsCancelChange(index, !todo.isCancel)}
          disabled={todo.isDone}
        >
          {todo.isCancel ? 'キャンセル済み' : 'キャンセル'}
        </button>
      </div>
    </div>
  );
};

export default function Page() {
  // JSONデータの状態管理
  const [todos, setTodos] = useState<ToDoCardPropsType[]>([]);
  // 現在表示するタスク
  const [viewTodos, setViewTodos] = useState<ToDoCardPropsType[]>([]);
  // 編集中のタスク
  const [editingTodo, setEditingTodo] = useState<ToDoCardPropsType | null>(null);
  
  // アプリ起動時にローカルストレージからデータを読み込む
  useEffect(() => {
    const savedTodos = localStorage.getItem('todos');
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
  }, [todos]);

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
      
      if (upcomingTasks.length > 0) {
        // 次のタスクを表示
        setViewTodos([upcomingTasks[0]]);
      } else {
        // すべてのタスクを表示
        setViewTodos(todos);
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
  };

  // 現在のタスクのみを表示
  const handleShowCurrentTask = () => {
    handleNowViewTask(todos);
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

  // JSONデータをエクスポート
  const exportToJson = () => {
    const dataStr = JSON.stringify(todos, null, 2);
    const dataUri = 'data:application/json;charset=utf-8,'+ encodeURIComponent(dataStr);
    
    const exportFileDefaultName = `todo-export-${new Date().toISOString().slice(0, 10)}.json`;
    
    const linkElement = document.createElement('a');
    linkElement.setAttribute('href', dataUri);
    linkElement.setAttribute('download', exportFileDefaultName);
    linkElement.click();
  };

  // JSONデータをインポート
  const importFromJson = (event: React.ChangeEvent<HTMLInputElement>) => {
    const fileReader = new FileReader();
    if (event.target.files && event.target.files.length > 0) {
      fileReader.readAsText(event.target.files[0], "UTF-8");
      fileReader.onload = e => {
        if (e.target && typeof e.target.result === 'string') {
          try {
            const importedTodos = JSON.parse(e.target.result);
            setTodos(importedTodos);
            alert('タスクをインポートしました');
          } catch (error) {
            console.error('Failed to parse imported file:', error);
            alert('無効なJSONファイルです');
          }
        }
      };
    }
  };

  return (
    <>
      <div className="min-h-screen flex flex-col bg-[#f1f8e8]">
        <Header />
        <main className="flex-1 p-6 max-w-5xl mx-auto">
          <div className="flex justify-between items-center mb-6">
            <Clock />
            
            <div className="flex space-x-2">
              <button 
                onClick={handleShowCurrentTask} 
                className="px-3 py-1 bg-green-500 text-white rounded"
              >
                現在のタスク
              </button>
              <button 
                onClick={handleShowAllTasks} 
                className="px-3 py-1 bg-blue-500 text-white rounded"
              >
                すべてのタスク
              </button>
            </div>
            
            <div className="flex space-x-2">
              <button 
                onClick={exportToJson} 
                className="px-3 py-1 bg-purple-500 text-white rounded flex items-center"
              >
                <svg xmlns="http://www.w3.org/2000/svg" className="h-5 w-5 mr-1" fill="none" viewBox="0 0 24 24" stroke="currentColor">
                  <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M4 16v1a3 3 0 003 3h10a3 3 0 003-3v-1m-4-4l-4 4m0 0l-4-4m4 4V4" />
                </svg>
                エクスポート
              </button>
              <div className="relative">
                <button 
                  onClick={() => document.getElementById('file-upload')?.click()} 
                  className="px-3 py-1 bg-indigo-500 text-white rounded flex items-center"
                >
                  <svg xmlns="http://www.w3.org/2000/svg" className="h-5 w-5 mr-1" fill="none" viewBox="0 0 24 24" stroke="currentColor">
                    <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M4 16v1a3 3 0 003 3h10a3 3 0 003-3v-1m-4-8l-4-4m0 0L8 8m4-4v12" />
                  </svg>
                  インポート
                </button>
                <input 
                  id="file-upload" 
                  type="file" 
                  accept=".json" 
                  onChange={importFromJson} 
                  className="hidden" 
                />
              </div>
            </div>
          </div>
          
          <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
            <section className="mb-8">
              <h1 className="text-2xl font-bold text-green-700 mb-4 border-b border-green-300 pb-2">タスク一覧</h1>
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
            
            <div className="flex flex-col">
              <section className="mb-8">
                <h2 className="text-xl font-bold text-green-700 mb-4 border-b border-green-300 pb-2">予定を追加</h2>
                <CreateTodo onSave={handleAddTodo} />
              </section>
              
              <section className="mb-8">
                <h2 className="text-xl font-bold text-green-700 mb-4 border-b border-green-300 pb-2">理想の1日のスケジュール</h2>
                <TimeLine todos={todos} />
              </section>
            </div>
          </div>
        </main>
      </div>
      
      {/* 編集モーダル */}
      {editingTodo && (
        <EditTodoModal
          todo={editingTodo}
          onSave={handleEditSave}
          onCancel={() => setEditingTodo(null)}
        />
      )}
    </>
  );
}