from fastapi import FastAPI
from pydantic import BaseModel
from fastapi.staticfiles import StaticFiles

class Memo(BaseModel):
    id:str
    contet:str

memos = []

app = FastAPI()

@app.post("/memos")
def create_memo(memo):
    memos.append(memo)
    return '메모 추가 성공 했습니다.'

@app.get("/memos")
def read_memo():
    return memos

app.mount("/", StaticFiles(directory="static", html=True),name="static")