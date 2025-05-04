type Todo = {
  startTime: string;
  endTime: string;
  activity: string;
};

type TimeLineProps = {
  todos: Todo[];
};

const TimeLine = ({ todos }: TimeLineProps) => {
  return (
    <div className=" bg-white rounded-lg shadow-md p-4 flex justify-between items-center w-[500px]">
      <ul className="space-y-2">
        {todos.map((todo, idx) => (
          <li key={idx}>
            <div>
              <p className="text-sm text-gray-500">
                {todo.startTime} ～ {todo.endTime}
                <br />
                {todo.activity}
              </p>
            </div>
          </li>
        ))}
      </ul>
    </div>
  );
};

export default TimeLine;
