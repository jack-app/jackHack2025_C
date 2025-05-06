from fastapi import FastAPI
from fastapi.middleware.cors import CORSMiddleware
# APIルーターのインポート
from router import shedular, level , nemuri_chai

# envfileの読み込み
from dotenv import load_dotenv
import os
load_dotenv()
# 環境変数の取得
DOMAIN = os.getenv("CROSS_DOMAIN")

app = FastAPI(
    title="LangChain Server",
    version="1.0"
)

# CORS設定 多分最後のurl/の/は必要ない
origins = [DOMAIN]
app.add_middleware(
    CORSMiddleware,
    allow_origins=origins,
    allow_credentials=True,
    allow_methods=["*"],
    allow_headers=["*"],
)

@app.get("/")
async def root():
    return {"message": "Hello World"}

# APIルーターの登録
app.include_router(shedular.router, prefix="/api/schedular", tags=["schedular"])
app.include_router(level.router, prefix="/api/level", tags=["level"])
app.include_router(nemuri_chai.router, prefix="/api/nemuri", tags=["nemuri"])




if __name__ == '__main__':
    import uvicorn
    uvicorn.run(app, host='localhost', port=8000)