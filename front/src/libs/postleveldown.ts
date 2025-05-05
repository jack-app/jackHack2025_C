import {ToDoCardPropsType,LevelDownCombo } from '@/types/todoType'

type responseType = {
    response: number
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
        const response = await fetch(`${postLevelDownUrl}/api/level`, {
            method: 'POST',
            headers: {
                'Content-Type': 'application/json',
            },
            body: JSON.stringify(levelDownData),
        });
        const result : responseType = await response.json();
        return result.response;
    } catch (error) {
        console.error('Error:', error);
        return null;
    }
}