const userInput = document.getElementById('user-input')
const todoContainer = document.querySelector('.todo-container')
const submitBtn = document.querySelector('.submit-btn')
const clearAllBtn = document.querySelector('.remove-clear-all')
const noTaskAlert = document.querySelector('.no-task-alert')


let editFlag = false
let editId = ''
let editElement

// FUNCTIONS
const clearAll = () => {
  let allTodos = document.querySelectorAll('.todo')
  if (allTodos.length > 0) {
    allTodos.forEach(todo => {
      todoContainer.removeChild(todo)
    })
  }
  clearAllBtn.classList.remove('clear-all')
  noTaskAlert.style.display = 'block'
}

const editTodo = (e) => {
  let todoArticle = e.target.parentElement.parentElement
  editId = todoArticle.dataset.id
  editElement = e.target.parentElement.previousElementSibling.lastElementChild
  userInput.value = editElement.innerHTML
  editFlag = true
  submitBtn.textContent = 'Update'
}

const deleteTodo = (e) => {
  let todoArticle = e.target.parentElement.parentElement
  todoContainer.removeChild(todoArticle)
  if (todoContainer.children.length > 1) {
    clearAllBtn.classList.add('clear-all') 
  } else if (todoContainer.children.length <= 1) {
    clearAllBtn.classList.remove('clear-all')
    noTaskAlert.style.display = 'block'
  }
}

const createTodo = () => {
  let value = userInput.value
  let id = new Date().getTime()

  if (editFlag && value) {
    editElement.textContent = value
    submitBtn.textContent = 'Submit'
    userInput.value = ''
    editFlag = false
  }
  else if (!editFlag && value) {
  const article = document.createElement('article')
  article.classList.add('todo')
  article.setAttribute('data-id', id)
  article.innerHTML = `
  <p>
  <input type="checkbox">
  <span>${value}</span>
  </p>
  <button class="actions">
  <i class="fa-solid fa-pen fa-green"></i>
  <i class="fa-solid fa-trash-can"></i>
  </button>
  `
  todoContainer.appendChild(article)
  clearAllBtn.classList.add('clear-all')
  noTaskAlert.style.display = 'none'
  let deleteBtn = article.querySelector('.fa-trash-can')
  let editBtn = article.querySelector('.fa-pen')

  deleteBtn.addEventListener('click', deleteTodo)
  editBtn.addEventListener('click', editTodo)
  userInput.value = ''
  }
  else if (!editFlag && !value) {
    noTaskAlert.textContent = 'Please enter a value'
  }
  
}

// LOCALSTORAGE FUNCTIONS
const addToLocalStorage = () => {
  
}

const updateLocalStorage = () => {
  
}

const removeFromLocalStorage = () => {
  
}

// EVENTS
submitBtn.addEventListener('click', createTodo)
clearAllBtn.addEventListener('click', clearAll)
userInput.addEventListener('keyup', (e) => {
  if (e.keyCode === 13) {
    e.preventDefault()
    submitBtn.click()
  }
})