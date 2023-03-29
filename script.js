const input = document.querySelector("#todo-input");
const submitToDo = document.querySelector("#submit-todo");
const toDoList = document.querySelector("#todo-list");
const toDoListArr = JSON.parse(localStorage.getItem("todoList")) || [];

const createLi = (obj) => {
  const li = document.createElement("li");
  li.setAttribute("data-id", obj.id);
  li.setAttribute("class", "list-group-item");
  li.innerHTML = ` 
   ${obj.text} 
   <div class="d-flex align-items-center">
   <input class="checkbox form-check-input mx-2" type="checkbox" />
   <button class="remove btn btn-danger">Remove</button>
   </div>
    `;
  console.log(obj);
  toDoList.append(li);
};

const checkListener = (lastToDoItem) => {
  const checkbox = lastToDoItem.querySelector(".checkbox");
  checkbox.addEventListener("click", (e) => {
    e.target.parentElement.parentElement.classList.toggle("text-transform");
  });
};

const removeListener = (lastToDoItem) => {
  const removeBtn = lastToDoItem.querySelector("button");
  removeBtn.addEventListener("click", (e) => {
    const id = e.target.parentElement.parentElement.getAttribute("data-id");
    const index = toDoListArr.findIndex((elem, index) => {
      return elem.id.toString() === id;
    });
    toDoListArr.splice(index, 1);
    e.target.parentElement.parentElement.remove();
    localStorage.setItem("todoList", JSON.stringify(toDoListArr));
  });
};

const generateLiWithListeners = () => {
  const toDoListElements = toDoList.querySelectorAll("li");
  const lastToDoItem = toDoListElements[toDoListElements.length - 1];
  checkListener(lastToDoItem);
  removeListener(lastToDoItem);
};

submitToDo.addEventListener("click", (e) => {
  if (input.value.length !== 0) {
    toDoListArr.push({
      text: input.value,
      id: toDoListArr.length ? toDoListArr[toDoListArr.length - 1].id + 1 : 1,
    });
    createLi(toDoListArr[toDoListArr.length - 1]);
    generateLiWithListeners();
    localStorage.setItem("todoList", JSON.stringify(toDoListArr));
    input.value = "";
  }
});

toDoListArr.forEach((elem) => {
  createLi(elem);
  generateLiWithListeners();
});
