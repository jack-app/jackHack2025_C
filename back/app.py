from fastapi import FastAPI
from fastapi.middleware.cors import CORSMiddleware
# APIルーターのインポート
from router import shedular, level , nemuri_chai

app = FastAPI(
    title="LangChain Server",
    version="1.0"
)

# CORS設定 多分最後のurl/の/は必要ない
origins = ["http://localhost:3000"]
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