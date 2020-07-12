const toDoForm = document.querySelector(".js-toDoForm"),
  toDoInput = toDoForm.querySelector("input"),
  toDoList = document.querySelector(".js-toDoList");

  const TODOS_LS = "toDos";

  let toDos = [];

  function deleteToDO (event) {
    const btn = event.target;
    const li = btn.parentNode;
    toDoList.removeChild(li);
    const cleanToDos = toDos.filter(function(toDo) {
        return toDo.id !== parseInt(li.id);
      });
    toDos = cleanToDos;
    saveToDos(); 
  }

  function saveToDos() {
    localStorage.setItem(TODOS_LS, JSON.stringify(toDos));
  } 

  function paintToDo(text){
    const li = document.createElement('li');
    const delBtn = document.createElement('button');
    const span = document.createElement('span');
    const newId = toDos.length + 1;
    delBtn.innerText = 'X';
    delBtn.addEventListener('click', deleteToDO);
    span.innerText = text;
    delBtn.style.border = '0px'
    delBtn.style.backgroundColor = 'transparent'
    delBtn.style.color = 'red'
    delBtn.style.marginLeft = '15px'
    li.appendChild(span);
    li.appendChild(delBtn);
    li.style.listStyleType = 'none'
    li.id = newId;
    toDoList.prepend(li);
    const toDoObj = {
        text:text,
        id:newId,
    };
    toDos = [...toDos, toDoObj];
    console.log(toDos,'todos')
    saveToDos();
  }

  function handleSubmit(event){
    event.preventDefault();
    const currentValue = toDoInput.value;
    paintToDo(currentValue);
    toDoInput.value = '';
  }

  function loadTodos(){
      const loadedToDos = localStorage.getItem(TODOS_LS);
      if(loadedToDos!==null){
          const parsedToDos = JSON.parse(loadedToDos);
          parsedToDos.forEach(function(toDo){
              paintToDo(toDo.text);
          })
      }
  }

  function init(){
      loadTodos();
      toDoForm.addEventListener('submit', handleSubmit);
  }

  init();