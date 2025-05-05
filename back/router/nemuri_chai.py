from fastapi import APIRouter, responses
from pydantic import BaseModel
from ai_services.chat import NemuriChat

router = APIRouter()

class ChatRequest(BaseModel):
    user_input: str
    user_name: str = "あなた"

@router.post("/") 
async def chat_with_nemuri(request: ChatRequest):
    """
    ユーザーからの入力を受け取り、AIモデルに渡して応答を得る。
    """
    chat_service =  NemuriChat()
    response = chat_service.chat_with_nemuri(request.user_input,user_name=request.user_name)
    
    return responses.JSONResponse(content={"response": response})
