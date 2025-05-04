

def hogehoge(is_cancel,task_title,is_combo):
    """
    is_cancel : bool 
    """

    if is_cancel:
        if task_title in "怠惰":
            return -100
        else:
            return -10
        
    else:
        return f"start {task_title}"

if __name__ == "__main__":
    # is_cancel = True
    is_cancel = False
    print(hogehoge(is_cancel))