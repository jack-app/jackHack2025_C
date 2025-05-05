import {ToDoCardPropsType,LevelDownCombo } from '@/types/todoType'

export const postLevelDown = async (data: ToDoCardPropsType,combo:number) => {
    const postLevelDownUrl = process.env.NEXT_PUBLIC_API_URL;

    const levelDownData: LevelDownCombo = {
        startTime: data.startTime,
        endTime: data.endTime,
        activity: data.activity,
        isDone: data.isDone,
        isCancel: data.isCancel,
        combo: combo,
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
        const result = await response.json();
        return result;
    } catch (error) {
        console.error('Error:', error);
        return null;
    }
}