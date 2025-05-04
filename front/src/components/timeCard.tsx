import type { Todo } from '../types/todo'

const TimeCard = ({ startTime, endTime, activity}: Todo) => {
  return (
    <div className="bg-white rounded-lg shadow-md p-4 mb-4 min-w-xs w-fit text-gray-500">
      <p className="text-sm">{startTime} ～ {endTime}</p>
      <p className="mt-2 text-base font-medium text-gray-800">{activity}</p>
      <div className="mt-4 flex justify-end space-x-2">
        <button className="px-3 py-1 bg-green-500 text-white rounded">完了</button>
        <button className="px-3 py-1 bg-red-500 text-white rounded font-bold">キャンセル</button>
      </div>
    </div>
  )
}

export default TimeCard;
