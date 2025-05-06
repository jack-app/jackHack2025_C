import React from "react";
import { ToDoCardPropsType } from "@/types/todoType";

// TimeCardコンポーネントの拡張版（編集・削除ボタン付き）
const EnhancedTimeCard = ({
  todo,
  index,
  onIsDoneChange,
  onIsCancelChange,
  onEdit,
  onDelete,
}: {
  todo: ToDoCardPropsType;
  index: number;
  onIsDoneChange: (index: number, isDone: boolean) => void;
  onIsCancelChange: (index: number, isCancel: boolean) => void;
  onEdit: (todo: ToDoCardPropsType) => void;
  onDelete: (index: number) => void;
}) => {
  return (
    <div
      className={`rounded-lg shadow-md p-4 mb-4 w-full max-w-md text-gray-500 ${
        todo.isCancel
          ? "bg-gray-100 opacity-70"
          : todo.isDone
          ? "bg-green-50"
          : "bg-white"
      }`}
    >
      <div className="flex justify-between items-center mb-2">
        <p className="text-sm">
          {todo.startTime} ～ {todo.endTime}
        </p>
        <div className="flex space-x-2">
          <button
            onClick={() => onEdit(todo)}
            className="text-blue-500 hover:text-blue-700 cursor-pointer"
            title="編集"
          >
            <svg
              xmlns="http://www.w3.org/2000/svg"
              className="h-5 w-5"
              fill="none"
              viewBox="0 0 24 24"
              stroke="currentColor"
            >
              <path
                strokeLinecap="round"
                strokeLinejoin="round"
                strokeWidth={2}
                d="M11 5H6a2 2 0 00-2 2v11a2 2 0 002 2h11a2 2 0 002-2v-5m-1.414-9.414a2 2 0 112.828 2.828L11.828 15H9v-2.828l8.586-8.586z"
              />
            </svg>
          </button>
          <button
            onClick={() => onDelete(index)}
            className="text-red-500 hover:text-red-700 cursor-pointer"
            title="削除"
          >
            <svg
              xmlns="http://www.w3.org/2000/svg"
              className="h-5 w-5"
              fill="none"
              viewBox="0 0 24 24"
              stroke="currentColor"
            >
              <path
                strokeLinecap="round"
                strokeLinejoin="round"
                strokeWidth={2}
                d="M19 7l-.867 12.142A2 2 0 0116.138 21H7.862a2 2 0 01-1.995-1.858L5 7m5 4v6m4-6v6m1-10V4a1 1 0 00-1-1h-4a1 1 0 00-1 1v3M4 7h16"
              />
            </svg>
          </button>
        </div>
      </div>
      <p
        className={`mt-2 text-base font-medium text-gray-800 break-words ${
          todo.isCancel ? "line-through" : ""
        }`}
      >
        {todo.activity}
      </p>
      <div className="mt-4 flex justify-end space-x-2">
        <button
          className={`${
            todo.isCancel ? "bg-gray-400" : "bg-green-500"
          } px-3 py-1 text-white rounded font-bold w-36 h-14 text-center cursor-pointer`}
          onClick={() => onIsCancelChange(index, !todo.isCancel)}
          disabled={todo.isDone}
        >
          {todo.isCancel ? "キャンセル済み" : "キャンセル"}
        </button>
        <button
          className={`${
            todo.isDone ? "bg-gray-400" : "bg-red-500"
          } text-xs text-white rounded w-12 h-6 text-center self-end cursor-pointer`}
          onClick={() => onIsDoneChange(index, !todo.isDone)}
          disabled={todo.isCancel}
        >
          {todo.isDone ? "済" : "完了"}
        </button>
      </div>
    </div>
  );
};

export default EnhancedTimeCard;
