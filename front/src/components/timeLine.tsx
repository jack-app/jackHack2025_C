import type { Todo } from "../types/todoType"

type TimeLineProps = {
  todos: Todo[];
};

const TimeLine = ({ todos }: TimeLineProps) => {
  return (
    <div className="bg-white rounded-lg shadow-md p-4 min-w-[500px] w-fit border border-gray-100">
      <h3 className="text-green-600 font-medium mb-3">今日の予定</h3>
      <ul className="space-y-3">
        {todos.map((todo, idx) => (
          <li 
            key={idx} 
            className="text-sm flex space-x-3 items-start border-l-2 border-green-500 pl-3 py-1 hover:bg-gray-50 transition-colors duration-200"
          >
            <span className="text-gray-600 font-medium whitespace-nowrap">{todo.startTime} ～ {todo.endTime}</span>
            <span className="ml-2 text-gray-800">{todo.activity}</span>
          </li>
        ))}
      </ul>
    </div>
  );
};

export default TimeLine;