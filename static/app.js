async function editMemo(event) {
  const id = event.target.dataset.id; //서버에 맞는 아이디를 요청 하고 수정할 수 있게 만드는
  const editInput = prompt("수정할 값을 입력하세요"); //수정된 값을 input 해라
  const res = await fetch(`/memo/${id}`, {
    method: "PUT", //어떤 값을 수정할때는 PUT 을 특정 값이 있을때 그 값으로 바꿔주라는 의미
    headers: {
      "Content-Type": "application/json",
    },
    body: JSON.stringify({
      id: id,
      content: editInput,
    }),
  });
  readMemo();
}

async function deleteMemo(event) {
  const id = event.target.dataset.id;
  const res = await fetch(`/memo/${id}`, {
    method: "DELETE", //특정 메모를 삭제
  });
  readMemo();
}

function displayMemo(memo) {
  const ul = document.querySelector("#memo-ul");

  const li = document.createElement("li");
  li.innerText = `${memo.content}`; //[id:${memo.id}] 앞에 id 값 표시

  const editBtn = document.createElement("button"); //메모 옆에 버튼
  editBtn.innerText = "수정하기";
  editBtn.addEventListener("click", editMemo);
  editBtn.dataset.id = memo.id; //메모에 edit를 넣어줌

  const delBtn = document.createElement("button");
  delBtn.innerText = "삭제";
  delBtn.addEventListener("click", deleteMemo);
  delBtn.dataset.id = memo.id;

  li.appendChild(delBtn);
  li.appendChild(editBtn);
  ul.appendChild(li);
}

async function readMemo() {
  const res = await fetch("/memos");
  const jsonRes = await res.json();
  const ul = document.querySelector("#memo-ul");
  ul.innerHTML = "";
  jsonRes.forEach(displayMemo);
}

async function createMemo(value) {
  const res = await fetch("/memos", {
    method: "POST",
    headers: {
      "Content-Type": "application/json", //request body를 보낼때 필수적으로 작성해야하는 header
    },
    body: JSON.stringify({
      //통신할때는 문자열로 보낼수 있으니깐 문자열로 바꿔야 한다.
      id: new Date().getTime(),
      content: value,
    }),
  });
  readMemo();
}

function handleSubmit(event) {
  event.preventDefault();
  const input = document.querySelector("#memo-input");
  createMemo(input.value);
  input.value = "";
}

const form = document.querySelector("#memo-form");
form.addEventListener("submit", handleSubmit);
readMemo();
