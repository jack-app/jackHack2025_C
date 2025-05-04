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