from fastapi import FastAPI
from fastapi.middleware.cors import CORSMiddleware
# APIルーターのインポート
from routers import qanda, summary, tasks, framework, directory, environment, projects, taskDetail, taskChat, graphTask, durationTask, deploy

app = FastAPI(
    title="LangChain Server",
    version="1.0"
)

# CORS設定 多分最後のurl/の/は必要ない
origins = ["https://hackson-support-agent-lzcy0oa36-vyumas-projects.vercel.app","http://localhost:3000","http://localhost:3001","https://hackson-support-agent-git-hotfix-depolygit-vyumas-projects.vercel.app","https://hackson-support-agent.vercel.app","https://hackson-support-agent-git-develop-vyumas-projects.vercel.app/"]
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