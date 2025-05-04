type TimeCardProps = {
  startTime: string;
  endTime: string;
  activity: string;
};

const TimeCard = ({startTime,endTime,activity}: TimeCardProps) => {
  return (
    <div className="bg-white rounded-lg shadow-md p-4 mb-4 min-w-xs w-fit text-gray-500">
      <div className="flex items-center justify-between">
        <p className="text-sm">
          {startTime} ～ {endTime}
        </p>
      </div>
      <p className="mt-2 text-base font-medium text-gray-800">
        {activity}
      </p>
      <div className="mt-4 flex justify-end space-x-2">
        <button>完了</button>
        <button><strong>キャンセル</strong></button>
      </div>
    </div>
  )
}

export default TimeCard;