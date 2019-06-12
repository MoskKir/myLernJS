function createTodoItem(title) {                             // эта функция создает элементы на странице (элемент списка todo)
    const checkbox = document.createElement('input');
    checkbox.type = 'checkbox';
    checkbox.className = 'checkbox';

    const label = document.createElement('label');
    label.innerText = title;
    label.className = 'title';

    const editInput = document.createElement('input');
    editInput.type = 'text';
    editInput.className = 'textfield';

    const editButton = document.createElement('button');
    editButton.innerText = 'Изменить'
    editButton.className = 'edit'

    const deleteButton = document.createElement('button');
    deleteButton.innerText = 'Удалить'
    deleteButton.className = 'delete'

    const listItem = document.createElement('li')
    listItem.className = 'todo-item';

    //теперь нужно поместить все элементы в элемент li с помощью метода ependChild

    listItem.appendChild(checkbox);
    listItem.appendChild(label);
    listItem.appendChild(editInput);
    listItem.appendChild(editButton);
    listItem.appendChild(deleteButton);
    
    bindEvents(listItem); //вызов функции на обработчик событий

    return listItem;
}

function bindEvents(todoItem) {  //функция создаёт обработчик событий
    const checkbox = todoItem.querySelector('.checkbox'); //получаем доступ к DOM элементам
    const editButton = todoItem.querySelector('button.edit');
    const deleteButton = todoItem.querySelector('button.delete');

    checkbox.addEventListener('change', toggleTodoItem);   //подписываемся на изменение состояния чекбокса и при изминении отправляем функцию toggleTodoItem
    editButton.addEventListener('click', editTodoItem);
    deleteButton.addEventListener('click', deleteTodoButton);
}

function addTodoItem(event) { 
    event.preventDefault(); //остановить отправку данных на сервер, что бы страница не перезагружалась

    if (addInput.value === '') return alert('Необходимо ввести название задачи'); //смотрим есть ли значение у addInput если нет выводим алерт

    const todoItem = createTodoItem(addInput.value);
    todoList.appendChild(todoItem);
    addInput.value = '';
}

function toggleTodoItem(event) { //эта функция срабатывает на отмечание галочки в чек бокси
    const listItem = this.parentNode; //получаем доступ к родителю
    listItem.classList.toggle('completed'); // этот метод добавляет в listItem класс completed который прописан в css    
}

function editTodoItem(event) {
    const listItem = this.parentNode;
    const title = listItem.querySelector('.title');
    const editInput = listItem.querySelector('.textfield');
    const isEditing = listItem.classList.contains('editing');

    if (isEditing) {
       title.innerText = editInput.value; //меняет текст внутри(innerText) класса title на текужее значения поля редактирования 
       this.innerText = 'Изменить';
    } else {
        editInput.value = title.innerText;
        this.innerText = 'Сохранить';
    }

    listItem.classList.toggle('editing');    
}

function deleteTodoButton(event) {
    const listItem = this.parentNode;
    todoList.removeChild(listItem);
}

//DOM элементы
const todoForm = document.getElementById('todo-form');
const addInput = document.getElementById('add-input');
const todoList = document.getElementById('todo-list');      //получим доступ к списку задач
const todoItems = document.querySelectorAll('.todo-item'); // этот метод возвращает массив 

function main() {      //функция c которой начинаеться выполнение программы также она иногда называеться ИНИТ (init)
    todoForm.addEventListener('submit', addTodoItem);
    todoItems.forEach(item => bindEvents(item)); // можно использовать метод forEach тк todoItems массив
}

main();

function parallax(event) {
    this.querySelectorAll('.layer').forEach(layer => {
        let speed = layer.getAttribute('data-speed');
        layer.style.transform = `translateX(${event.clientX * speed/1200}px)`
        
    });

    console.log(event);
    console.log(event.clientX);
}

document.addEventListener('mousemove', parallax);