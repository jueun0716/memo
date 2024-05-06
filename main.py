from fastapi import FastAPI
from pydantic import BaseModel
from fastapi.staticfiles import StaticFiles

class Memo(BaseModel):
    id:str
    contet:str

memos = []

app = FastAPI()

@app.post("/memos")
def create_memo(memo:Memo):
    memos.append(memo)
    return '메모 추가 성공 했습니다.'

@app.get("/memos")
def read_memo():
    return memos

@app.put("/memo/{memo_id}") #메모를 id로 받는다.
def put_memo(req_memo:Memo): #요청한 메모랑 memo 랑 맞는지 확인
    for memo in memos: #memos를 돌린다.
        if memo.id == req_memo.id:
            memo.content = memo.content
            return '성공했습니다.'      
    return '그런 메모는 없습니다.' #for 문이 실패했을때

@app.delete("/memos/{memo_id}")
def delete_memo(memo_id): 
    for index,memo in enumerate (memos) : #포문을 쓸때 인덱스를 쓰려면 배열 뒤에 enumerate로 감싸줘야한다. enumerate는 배열에 인덱스와 같이 뽑아주는 명령어
        if memo.id==memo_id: #path로 전달해주는거랑 아이디를 찾아서 
            memos.pop(index) #pop 없앤다.
            return '성공했습니다.'      
    return '그런 메모는 없습니다.' #for 문이 실패했을때
            

app.mount("/", StaticFiles(directory="static", html=True),name="static")