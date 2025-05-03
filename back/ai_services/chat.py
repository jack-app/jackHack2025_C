from langchain.prompts import PromptTemplate, ChatPromptTemplate
from langchain.output_parsers import StringOutputParser
from .base import BaseService
# json_repair
from json_repair import repair_json
from copy import deepcopy

class ChatService(BaseService):
    def __init__(self):
        super().__init__()

    def llm_chat(self, user_input:str)-> str:
        """
        ユーザーからの入力を受け取り、AIモデルに渡して応答を得る。
        """
        
        prompt = PromptTemplate(
            input_variables=["user_input"],
            template="あなたは優秀なAIアシスタントです。{user_input}に対して、最適な応答を生成してください。"
        )
        
        parser = StringOutputParser()
        
        # ユーザーからの入力をプロンプトに渡す
        chain = prompt | self.llm_pro | parser
        
        response = chain.invoke({"user_input": user_input})
        
        return response
    
        