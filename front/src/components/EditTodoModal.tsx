'use client';

import { useState } from "react";
import type { ToDoCardPropsType } from '@/types/todoType';

// 編集モーダルコンポーネント
const EditTodoModal = ({ 
  todo, 
  onSave, 
  onCancel 
}: { 
  todo: ToDoCardPropsType, 
  onSave: (updatedTodo: ToDoCardPropsType) => void, 
  onCancel: () => void 
}) => {
  const [editedTodo, setEditedTodo] = useState<ToDoCardPropsType>({...todo});

  return (
    <div className="fixed inset-0 bg-black bg-opacity-50 flex items-center justify-center z-50">
      <div className="bg-white rounded-lg p-6 w-full max-w-md">
        <h2 className="text-xl font-bold text-green-700 mb-4">タスクの編集</h2>
        
        <div className="mb-4">
          <label className="block text-gray-700 text-sm font-bold mb-2">開始時間:</label>
          <input
            type="time"
            value={editedTodo.startTime}
            onChange={(e) => setEditedTodo({...editedTodo, startTime: e.target.value})}
            className="shadow appearance-none border rounded w-full py-2 px-3 text-gray-700 leading-tight focus:outline-none focus:shadow-outline"
          />
        </div>
        
        <div className="mb-4">
          <label className="block text-gray-700 text-sm font-bold mb-2">終了時間:</label>
          <input
            type="time"
            value={editedTodo.endTime}
            onChange={(e) => setEditedTodo({...editedTodo, endTime: e.target.value})}
            className="shadow appearance-none border rounded w-full py-2 px-3 text-gray-700 leading-tight focus:outline-none focus:shadow-outline"
          />
        </div>
        
        <div className="mb-4">
          <label className="block text-gray-700 text-sm font-bold mb-2">タスク:</label>
          <input
            type="text"
            value={editedTodo.activity}
            onChange={(e) => setEditedTodo({...editedTodo, activity: e.target.value})}
            className="shadow appearance-none border rounded w-full py-2 px-3 text-gray-700 leading-tight focus:outline-none focus:shadow-outline"
          />
        </div>
        
        <div className="flex justify-end space-x-2">
          <button
            onClick={() => onCancel()}
            className="px-4 py-2 bg-gray-300 text-gray-800 rounded"
          >
            キャンセル
          </button>
          <button
            onClick={() => onSave(editedTodo)}
            className="px-4 py-2 bg-green-500 text-white rounded"
          >
            保存
          </button>
        </div>
      </div>
    </div>
  );
};

export default EditTodoModal;