from fastapi import APIRouter, responses
from pydantic import BaseModel
from level_service.lazylevel import level_calc

router = APIRouter()

class LevelRequest(BaseModel):
    start_time: str
    end_time: str
    activity: str
    is_cancel: bool
    is_active :bool 
    cancel_total:int
    conmbo_number:int


@router.post("/")
async def level_controller(requests: LevelRequest):
    """
    ユーザーからの入力を受け取り、AIモデルに渡して応答を得る。
    """
    response = level_calc(
        requests.is_cancel,
        requests.activity,
        requests.conmbo_number,
        requests.start_time,
        requests.end_time,
        requests.cancel_total,
        requests.is_active
    )
    return responses.JSONResponse(content={"response": response})