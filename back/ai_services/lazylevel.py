def hoho(is_cancel, activity, combo_number, start_time, end_time, cancel_total, is_active):
    from datetime import datetime, timedelta

    datetime_start = datetime.strptime(start_time, "%H:%M:%S")
    datetime_end = datetime.strptime(end_time, "%H:%M:%S")

    if datetime_end < datetime_start:
        datetime_end += timedelta(days=1)

    time_diff = datetime_end - datetime_start
    total_seconds = time_diff.total_seconds()
    total_minutes = total_seconds / 60
    rate = 1 + total_minutes / 60  

    if is_active:
        if cancel_total > 5:
            cancel_count = 5
        elif 2 < cancel_total <= 5:
            cancel_count = 3
        else:
            cancel_count = 1
    else:
        cancel_count = 0

    if is_cancel:
        if activity in ["朝飯", "昼飯", "晩飯", "コーヒー", "友達", "寝る", "バイト"]:
            return -2 * combo_number * rate - cancel_count
        else:
            return -1 * combo_number * rate - cancel_count
    else:
        return f"start {activity}"