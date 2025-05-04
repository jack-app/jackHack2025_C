import React from 'react';
import { TimeCardPropsType } from '@/types/todoType';

const TimeCard = ({ 
  startTime, 
  endTime, 
  activity, 
  isDone, 
  isDoneHandler, 
  isCancel, 
  isCancelHandler 
}: TimeCardPropsType) => {
  return (
    <div className={`rounded-lg shadow-md p-4 mb-4 w-full max-w-md text-gray-500 ${
      isCancel ? 'bg-gray-100 opacity-70' : 
      isDone ? 'bg-green-50' : 'bg-white'
    }`}>
      <p className="text-sm">{startTime} ～ {endTime}</p>
      <p className={`mt-2 text-base font-medium text-gray-800 break-words ${isCancel ? 'line-through' : ''}`}>
        {activity}
      </p>
      <div className="mt-4 flex justify-end space-x-2">
        <button 
          className={`px-3 py-1 ${isDone ? 'bg-gray-400' : 'bg-green-500'} text-white rounded w-24 text-center`}
          onClick={() => isDoneHandler(!isDone)}
          disabled={isCancel}
        >
          {isDone ? '完了済み' : '完了'}
        </button>
        <button 
          className={`px-3 py-1 ${isCancel ? 'bg-gray-400' : 'bg-red-500'} text-white rounded font-bold w-24 text-center`}
          onClick={() => isCancelHandler(!isCancel)}
          disabled={isDone}
        >
          {isCancel ? 'キャンセル済み' : 'キャンセル'}
        </button>
      </div>
    </div>
  );
};

export default TimeCard;