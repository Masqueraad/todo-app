const input = document.querySelector("#todo-input");
const submitToDo = document.querySelector("#submit-todo");
const toDoList = document.querySelector("#todo-list");
const toDoListArr = [];

submitToDo.addEventListener("click", (e) => {
  if (input.value.length !== 0) {
    const li = document.createElement("li");
    li.innerHTML = ` 
    ${input.value}  <input class="checkbox" type="checkbox">  <button class="remove">Remove</button>
     `;
    toDoList.append(li);
    input.value = "";
    const toDoListElements = toDoList.querySelectorAll("li");
    const lastToDoItem = toDoListElements[toDoListElements.length - 1];

    const checkbox = lastToDoItem.querySelector(".checkbox");
    checkbox.addEventListener("click", (e) => {
      e.target.parentElement.classList.toggle("text-transform");
    });

    const removeBtn = lastToDoItem.querySelector("button");
    removeBtn.addEventListener("click", (e) => {
      console.log(e.target.parentElement);
      e.target.parentElement.remove();
    });
  }
});
