from langchain.prompts import PromptTemplate, ChatPromptTemplate
from langchain.output_parsers import ResponseSchema, StructuredOutputParser
from .base import BaseService
from copy import deepcopy

class Scheduler(BaseService):
    def __init__(self):
        super().__init__()
    
    def generate_perfect_weekday_schedule(self, user_input:str):
        """
        ユーザからのinputを受け取り、完璧な平日のスケジュールを生成する。
        """
        response_schemas = [
            ResponseSchema(
                name="schedule",
                description="""
                完璧な平日のスケジュールをJSON形式で返す。
                {Response: [
                    {
                        start_time: "07:00",
                        end_time: "7:30",
                        activity: "起床、コップ一杯の水を飲む、窓を開けて換気",
                    },
                    {
                        start_time: "10:00",
                        end_time: "11:30",
                        activity: "自由時間（趣味、自己学習、運動、家族や友人との時間など）",
                    }
                ]}
                """,
                type="array[object]",
            )
        ]
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
    def generate_perfect_weekend_schedule(self, user_input:str):
        """
        ユーザからのinputを受け取り、完璧な平日のスケジュールを生成する。
        """
        response_schemas = [
            ResponseSchema(
                name="schedule",
                description="""
                完璧な休日のスケジュールをJSON形式で返す。
                {Response: [
                    {
                        start_time: "07:00",
                        end_time: "7:30",
                        activity: "起床、コップ一杯の水を飲む、窓を開けて換気",
                    },
                    {
                        start_time: "10:00",
                        end_time: "11:30",
                        activity: "自由時間（趣味、自己学習、運動、家族や友人との時間など）",
                    }
                ]}
                """,
                type="array[object]",
            )
        ]
        parser = StructuredOutputParser.from_response_schemas(response_schemas)
        prompt_template = ChatPromptTemplate.from_template(
            template="""
            あなたはスケジュール作成の専門家です。以下の情報を基に、完璧な休日のスケジュールを生成してください。
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
        
        
        
        