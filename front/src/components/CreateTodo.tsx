import type { Todo } from '../types/todo'
import { useState } from "react"

type Props = {
  onSave: (todo: Todo) => void
}

const CreateTodo = ({ onSave }: Props) =>  {
  const [startTime, setStartTime] = useState('')
  const [endTime, setEndTime]     = useState('')
  const [activity, setActivity]   = useState('')

  const handleSave = () => {
    if (!startTime || !endTime || !activity) return
    onSave({ startTime, endTime, activity })
    setStartTime(''); setEndTime(''); setActivity('')
  }

  return (
    <div className="p-4 bg-white rounded shadow w-[300px]">
      <input
        type="time"
        value={startTime}
        onChange={e => setStartTime(e.target.value )}
        className="border p-1 mb-2 w-full rounded"
        placeholder="開始時刻"
      />
      <input
        type="time"
        value={endTime}
        onChange={e => setEndTime(e.target.value)}
        className="border p-1 mb-2 w-full rounded"
        placeholder="終了時刻"
      />
      <input
        type="text"
        value={activity}
        onChange={e => setActivity(e.target.value )}
        className="border p-1 mb-2 w-full rounded"
        placeholder="やること"
      />
      <button
        onClick={handleSave}
        className="bg-[#55AD9B] text-white px-4 py-1 rounded w-full"
      >
        保存
      </button>
    </div>
  );
}

export default CreateTodo;