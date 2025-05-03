from fastapi import APIRouter, responses
from pydantic import BaseModel
from ai_services.chat import ChatService

router = APIRouter()

class ChatRequest(BaseModel):
    user_input: str

@router.post("/") 
async def chat(request: ChatRequest):
    """
    ユーザーからの入力を受け取り、AIモデルに渡して応答を得る。
    """
    chat_service = ChatService()
    response = chat_service.llm_chat(request.user_input)
    
    return responses.JSONResponse(content={"response": response})