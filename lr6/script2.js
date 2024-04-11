// Функція для отримання тудушок з локального сховища
const getTodosFromLocalStorage = () => {
    const todosString = localStorage.getItem('todos');
    return todosString ? JSON.parse(todosString) : [];
}

// Функція для збереження тудушок в локальному сховищі
const saveTodosToLocalStorage = (todos) => {
    localStorage.setItem('todos', JSON.stringify(todos));
}

// Функція для додавання нової тудушки
const addNewTodo = () => {
    const newTodoText = document.querySelector('.add__todo_input').value;
    if (newTodoText.length > 1) {
        const todos = getTodosFromLocalStorage(); // Отримуємо збережені тудушки
        const todo = { text: newTodoText, done: false }; // Створюємо об'єкт тудушки
        todos.push(todo); // Додаємо нову тудушку до масиву
        saveTodosToLocalStorage(todos); // Зберігаємо оновлений масив тудушок в локальному сховищі

        const todoDiv = createTodoElement(newTodoText); // Створюємо HTML елемент тудушки
        const parentElement = document.querySelector(".main");
        parentElement.appendChild(todoDiv);

        document.querySelector('.add__todo_input').value = '';

        const checkboxInput = todoDiv.querySelector('input[type="checkbox"]');
        checkboxInput.addEventListener('change', () => {
            const todos = getTodosFromLocalStorage(); // Отримуємо збережені тудушки
            const index = todos.findIndex(todo => todo.text === newTodoText); // Знаходимо індекс тудушки
            if (index !== -1) {
                todos[index].done = true; // Позначаємо тудушку як виконану
                saveTodosToLocalStorage(todos); // Зберігаємо оновлений масив тудушок в локальному сховищі
            }
            doneTodo(newTodoText);
            todoDiv.remove();
        });
    }
}

// Функція для створення HTML елементу тудушки
const createTodoElement = (text) => {
    const todoDiv = document.createElement("div");
    todoDiv.classList.add("todo");

    const textInput = document.createElement("input");
    textInput.setAttribute("type", "text");
    textInput.classList.add("todo__text");
    textInput.value = text;

    const checkboxContainer = document.createElement("div");
    const checkboxInput = document.createElement("input");
    checkboxInput.setAttribute("type", "checkbox");
    checkboxContainer.appendChild(checkboxInput);

    todoDiv.appendChild(textInput);
    todoDiv.appendChild(checkboxContainer);

    return todoDiv;
}

// Функція для позначення тудушки як виконаної
const doneTodo = (text) => {
    let doneTodoDiv = document.createElement("div");
    doneTodoDiv.classList.add("done-todo");

    let inputDiv = document.createElement("div");
    let textInput = document.createElement("input");
    textInput.value = text;
    textInput.setAttribute("type", "text");
    inputDiv.appendChild(textInput);
    doneTodoDiv.appendChild(inputDiv);

    let parentElement = document.querySelector(".done");
    parentElement.appendChild(doneTodoDiv);
}

// Виклик функції для оновлення годинника
const updateClock = () => {
    const date = new Date();
    document.getElementsByClassName('date')[0].innerText = (date.getHours() + ':' + date.getMinutes() + ':' + date.getSeconds())
}

// Встановлення інтервалу для оновлення годинника
setInterval(updateClock, 1000);

// Завантаження тудушок при завантаженні сторінки
window.onload = () => {
    const todos = getTodosFromLocalStorage(); // Отримуємо збережені тудушки
    todos.forEach(todo => {
        const todoDiv = createTodoElement(todo.text); // Створюємо HTML елемент тудушки
        const parentElement = document.querySelector(".main");
        parentElement.appendChild(todoDiv);
        if (todo.done) {
            doneTodo(todo.text);
            todoDiv.remove();
        } else {
            const checkboxInput = todoDiv.querySelector('input[type="checkbox"]');
            checkboxInput.addEventListener('change', () => {
                const index = todos.findIndex(t => t.text === todo.text); // Знаходимо індекс тудушки
                if (index !== -1) {
                    todos[index].done = true; // Позначаємо тудушку як виконану
                    saveTodosToLocalStorage(todos); // Зберігаємо оновлений масив тудушок в локальному сховищі
                }
                doneTodo(todo.text);
                todoDiv.remove();
            });
        }
    });
}

const sortTodosByText = () => {
    const todos = getTodosFromLocalStorage(); // Отримуємо список тудушок з локального сховища
    todos.sort((a, b) => {
        // Сортуємо тудушки за текстом у порядку зростання
        if (a.text < b.text) return -1;
        if (a.text > b.text) return 1;
        return 0;
    });

    // Очищаємо основний контейнер для тудушок
    const mainElement = document.querySelector('.main');
    mainElement.innerHTML = '';

    // Відображаємо відсортовані тудушки
    todos.forEach(todo => {
        const todoDiv = createTodoElement(todo.text);
        mainElement.appendChild(todoDiv);
        if (todo.done) {
            doneTodo(todo.text);
            todoDiv.remove();
        } else {
            const checkboxInput = todoDiv.querySelector('input[type="checkbox"]');
            checkboxInput.addEventListener('change', () => {
                const index = todos.findIndex(t => t.text === todo.text);
                if (index !== -1) {
                    todos[index].done = true;
                    saveTodosToLocalStorage(todos);
                }
                doneTodo(todo.text);
                todoDiv.remove();
            });
        }
    });
}
