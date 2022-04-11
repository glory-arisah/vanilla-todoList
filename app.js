const userInput = document.getElementById('user-input')
const todoContainer = document.querySelector('.todo-container')
const submitBtn = document.querySelector('.submit-btn')
const clearAllBtn = document.querySelector('.remove-clear-all')
const noTaskAlert = document.querySelector('.no-task-alert')


let editFlag = false
let editId = ''
let editElement

// LOCALSTORAGE FUNCTIONS
const getTodos = () => {
  return localStorage.getItem('todoList') ? JSON.parse(localStorage.getItem('todoList')) : []
}
const addToLocalStorage = (id, value) => {
  let todoParams = {id, value}
  // fetch items in localStorage todoList property
  let todoList = getTodos()
  // add todoParams object to the todoList array
  todoList.push(todoParams)
  // set the todoList localStorage prop to the updated todoList array
  localStorage.setItem('todoList', JSON.stringify(todoList))
}

const updateLocalStorage = (id, value) => {
  let todoList = getTodos()

  todoList = todoList.map(todo => {
    if (todo.id === id) {
      todo.value = value
    }
    return todo
  })
  localStorage.setItem('todoList', JSON.stringify(todoList))
}

const removeFromLocalStorage = id => {
  let todoList = getTodos()

  todoList = todoList.filter((todo) => {
    if (todo.id !== id) {
      return todo
    }
  })

  localStorage.setItem('todoList', JSON.stringify(todoList))
  console.log(localStorage.getItem('todoList'))
}

// FUNCTIONS
const defaultSetting = () => {
  clearAllBtn.classList.remove('clear-all')
  noTaskAlert.textContent = 'you have no tasks'
  noTaskAlert.style.display = 'block'
}

const clearAll = () => {
  let allTodos = document.querySelectorAll('.todo')
  if (allTodos.length > 0) {
    allTodos.forEach(todo => {
      todoContainer.removeChild(todo)
    })
  }
  defaultSetting()
  localStorage.clear()
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
  let id = todoArticle.dataset.id
  todoContainer.removeChild(todoArticle)
  console.log(id)
  if (todoContainer.children.length > 1) {
    clearAllBtn.classList.add('clear-all') 
  } else if (todoContainer.children.length <= 1) {
    defaultSetting()
  }
  removeFromLocalStorage(id)
}

const createTodo = () => {
  let value = userInput.value
  let id = new Date().getTime().toString()

  if (editFlag && value) {
    editElement.textContent = value
    updateLocalStorage(editId, value)
    userInput.value = ''
    submitBtn.textContent = 'Submit'
    editFlag = false
    editId = ''
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
  addToLocalStorage(id, value)
  userInput.value = ''
  }
  else if (!editFlag && !value) {
    noTaskAlert.textContent = 'Please enter a value'
  }
  
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