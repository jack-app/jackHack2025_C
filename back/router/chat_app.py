from fastapi import APIRouter, responses
from pydantic import BaseModel
from ai_services.perfect_schedule import Scheduler

router = APIRouter()

class ChatRequest(BaseModel):
    user_input: str

@router.post("/") 
async def perfect_weekday_schedule(request: ChatRequest):
    """
    ユーザーからの入力を受け取り、AIモデルに渡して応答を得る。
    """
    chat_service = Scheduler()
    response = chat_service.generate_perfect_weekday_schedule(request.user_input)
    
    return responses.JSONResponse(content={"response": response})