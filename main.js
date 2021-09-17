
 //Selecionando os elementos
const todoForm = document.querySelector('.todo-form');
const todoInput = document.querySelector('.todo-input');
const todoItemsList = document.querySelector('.todo-items');

// array dos todos
let todos = [];

// Adicionando eventListener
todoForm.addEventListener('submit', function(event) {
  event.preventDefault();
  addTodo(todoInput.value); 
});

// function to add todo
function addTodo(item) {
  // verificando se o item não estiver vazio
  if (item == '') {
      alert("Não é possível adicionar uma atividade vazia");
    }
   else {
    // Construindo os objetos do Todo
    const todo = {
      id: Date.now(),
      name: item,
      completed: false
    };

    // Adicionando no array
    todos.push(todo);
    //Adicionando no localstorage
    addToLocalStorage(todos);

    // Limpando o valor do input
    todoInput.value = '';
  }
}

// Renderizando os todos
function renderTodos(todos) {
  // Limpando a lista
  todoItemsList.innerHTML = '';

  // Loop para cada Todo
  todos.forEach(function(item) {
    // checando se o item está completo
    const checked = item.completed ? 'checked': null;

    // Construindo o toDo
    const li = document.createElement('li');
    li.setAttribute('class', 'item');
    // Adicionando o atributo de id para o item
    li.setAttribute('data-key', item.id);

    // Se o item estiver sido feito , adicionar a classe checked
    if (item.completed === true) {
      li.classList.add('checked');
    }

    // Construindo o que será adicionado dentro de cada item da lista
    li.innerHTML = `
      <input type="checkbox" class="checkbox" ${checked}>
      ${item.name}
      <button class="delete-button">X</button>
    `;
    //Adicionando o toDo a lista
    todoItemsList.append(li);
  });

}

// Função para adicionar no localstorage
function addToLocalStorage(todos) {
  localStorage.setItem('todos', JSON.stringify(todos));

  renderTodos(todos);
}

// Função para pegar do localstorage
function getFromLocalStorage() {
  const reference = localStorage.getItem('todos');
  // Se o array existir
  if (reference) {
    // Retorna o array
    todos = JSON.parse(reference);
    renderTodos(todos);
  }
}

// toggle the value to completed and not completed
function toggle(id) {
  todos.forEach(function(item) {
    // use == not ===, because here types are different. One is number and other is string
    if (item.id == id) {
      // toggle the value
      item.completed = !item.completed;
    }
  });

  addToLocalStorage(todos);
}

// Deleta o todo do array e atualiza o local storage
function deleteTodo(id) {
  todos = todos.filter(function(item) {
  return item.id != id;
  });

  // Atualizando localStorage
  addToLocalStorage(todos);
}

// Chamando a função de pegar do localstorage
getFromLocalStorage();

// Adicionando o eventListener
todoItemsList.addEventListener('click', function(event) {
  // Checando se o que foi clicado foi o checkbox
  if (event.target.type === 'checkbox') {
    // Escolhendo o elemento que será marcado
    toggle(event.target.parentElement.getAttribute('data-key'));

  }

    // Checando se o que foi clicado foi o do delete
  if (event.target.classList.contains('delete-button')) {
    // Deletando o elemento que foi marcado
    deleteTodo(event.target.parentElement.getAttribute('data-key'));
  }
});