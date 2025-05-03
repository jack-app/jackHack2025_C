from langchain.prompts import PromptTemplate, ChatPromptTemplate
from langchain.output_parsers import ResponseSchema, StructuredOutputParser
from .base import BaseService
# json_repair
from json_repair import repair_json
from copy import deepcopy

class ChatService(BaseService):
    def __init__(self):
        super().__init__()
    
    def generate_perfect_weekday_schedule(self, user_input:str):
        """
        ユーザからのinputを受け取り、完璧な平日のスケジュールを生成する。
        """
        response_schemas = [
            ResponseSchema(
                name="schedule",
                description="完璧な平日のスケジュールをJSON形式で返す。{  }",
                type="array[object]",
            )
        ]
        parser = StructuredOutputParser.from_response_schemas(response_schemas)
        parser = StructuredOutputParser.from_response_schemas(response_schemas)
        prompt_template = ChatPromptTemplate.from_template(
            template="""
            あなたはスケジュール作成の専門家です。以下の情報を基に、完璧な平日のスケジュールを生成してください。
            ただし以下の、ユーザの指示に従ってください。
            {user_input}
            ただし、スケジュールは確実にJSON形式で返してください。
            
            {format_instructions}
            """,
            partial_variables={"format_instructions": parser.get_format_instructions()},
        )
        
        chain = prompt_template | self.llm_pro | parser
        
        result = chain.invoke({"user_input": user_input})
        print(result)
        
        # JSON形式で返す
        return result["schedule"]
        
        
        
        
        