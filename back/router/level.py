from fastapi import APIRouter, responses
from pydantic import BaseModel
from ai_services.perfect_schedule import Scheduler

router = APIRouter()

class LevelRequest(BaseModel):
    start_time: str
    end_time: str
    activity: str
    is_cancel: bool
    is_active :bool 
    conmbo_number:int
    cancel_total:int


@router.route("/level")
async def level_controller(request: LevelRequest):
    """
    ユーザーからの入力を受け取り、AIモデルに渡して応答を得る。
    """
    pass 