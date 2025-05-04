import type { Todo } from "../types/todo"

type TimeLineProps = {
  todos: Todo[];
};

const TimeLine = ({ todos }: TimeLineProps) => {
  return (
    <div className=" bg-white rounded-lg shadow-md p-4 min-w-[500px] w-fit">
      <ul className="space-y-2">
        {todos.map((todo, idx) => (
          <li key={idx} className="text-sm text-gray-500">
            {todo.startTime} ～ {todo.endTime}  {todo.activity}
          </li>
        ))}
      </ul>
    </div>
  );
};

export default TimeLine;

