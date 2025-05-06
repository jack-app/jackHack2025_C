import {ToDoCardPropsType,LevelDownCombo } from '@/types/todoType'


function levelCalc(
    isCancel: boolean,
    activity: string,
    comboNumber: number,
    startTime: string,
    endTime: string,
    cancelTotal: number,
    isActive: boolean
  ): number {
    // Parse the time strings into Date objects
    const datetimeStart = new Date(`1970-01-01T${startTime}:00`);
    const datetimeEnd = new Date(`1970-01-01T${endTime}:00`);
    
    // Handle cases where end time is on the next day
    if (datetimeEnd < datetimeStart) {
      datetimeEnd.setDate(datetimeEnd.getDate() + 1);
    }
    
    // Calculate time difference in minutes
    const totalSeconds = (datetimeEnd.getTime() - datetimeStart.getTime()) / 1000;
    const totalMinutes = totalSeconds / 60;
    const rate = 1 + totalMinutes / 60;
    
    let cancelCount = 0;
    
    if (isActive) {
      if (cancelTotal > 5) {
        cancelCount = 5;
      } else if (2 < cancelTotal && cancelTotal <= 5) {
        cancelCount = 3;
      } else {
        cancelCount = 1;
      }
    } else {
      cancelCount = 0;
    }
    
    if (isCancel) {
      if (["朝飯", "昼飯", "晩飯", "コーヒー", "友達", "寝る", "バイト"].includes(activity)) {
        return Math.floor(-2 * comboNumber * rate - cancelCount);
      } else {
        return Math.floor(-1 * comboNumber * rate - cancelCount);
      }
    } else {
      return 1;
    }
  }

export const postLevelDown = async (data: ToDoCardPropsType,combo:number,cancelTotal:number) => {
    const postLevelDownUrl = process.env.NEXT_PUBLIC_API_URL;

    const levelDownData: LevelDownCombo = {
        start_time: data.startTime,
        end_time: data.endTime,
        activity: data.activity,
        is_active: data.isDone,
        is_cancel: data.isCancel,
        cancel_total: cancelTotal,
        conmbo_number: combo,
    };
    console.log("postLevelDownUrl", postLevelDownUrl);
    console.log("levelDownData", levelDownData);

    try {
        const downNumber = levelCalc(
            data.isCancel,
            data.activity,
            combo,
            data.startTime,
            data.endTime,
            cancelTotal,
            data.isDone
        );

        return downNumber ;
    } catch (error) {
        console.error('Error:', error);
        return null;
    }
}