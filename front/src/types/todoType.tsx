export type Todo = {
  startTime: string
  endTime:   string
  activity:  string
}

export type ToDoCardPropsType = {
  startTime: string
  endTime:   string
  activity:  string
  isDone : boolean,
  isCancel: boolean,
}


export type TimeCardPropsType = {
  startTime: string
  endTime:   string
  activity:  string
  isDone : boolean,
  isDoneHandler: (isDone: boolean) => void
  isCancel: boolean,
  isCancelHandler: (isCancel: boolean) => void
}

export type LevelDownCombo = {
  start_time: string
  end_time:   string
  activity:  string
  is_active : boolean,
  is_cancel: boolean,
  cancel_total: number,
  conmbo_number: number,
}