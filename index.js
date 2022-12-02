window.addEventListener('load', () => {
    todos = JSON.parse(localStorage.getItem('todos')) || [];
    const nameInput = document.querySelector('#name');
    const newTodoForm = document.querySelector('#new-todo-form');

    const username = localStorage.getItem('username') || '';

    nameInput.value = username;

    nameInput.addEventListener('change', e => {
        localStorage.setItem('username', e.target.value);
    })
// takes username input and stores it in local storage.

    newTodoForm.addEventListener('submit', e => {
        e.preventDefault(); // prevents page from moving to a fresh page after submitting.

        const todo = {
            content: e.target.elements.content.value,
            category: e.currentTarget.elements.category.value,
            done: false,
            createdAt: new Date().getTime()
        }

        todos.push(todo);

        localStorage.setItem('todos', JSON.stringify(todos));

        e.target.reset();
// takes the todo input and saves it in local storage.
        displayTodos();
    })
    displayTodos();
})


function displayTodos() {
    const todoList = document.querySelector('#todolist');
    // Building the todo list.

    todoList.innerHTML = '';

    todos.forEach(todo => {
        // thus for every todo implemented or being created
        const todoitem = document.createElement('div');
        todoitem.classList.add('todo-item'); // cfreates a class for todoitem with name 'todo-item'

        const label = document.createElement('label');
        const span = document.createElement('span');
        const input = document.createElement('input');
        const edit = document.createElement('button');
        const deletebuttom = document.createElement('button');
        const actions = document.createElement('div');
        const content = document.createElement('div');

        input.type = 'checkbox';
        input.checked = todo.done; // crosses out the done todo when checked.
        span.classList.add('bubble');

        content.classList.add('todo-content');
        actions.classList.add('actions');
        edit.classList.add('edit');
        deletebuttom.classList.add('delete');

        content.innerHTML = `<input type="text" value ="${todo.content}" readonly>`; // places the previously added todo to the content of the todo list.
        edit.innerHTML = 'edit';
        deletebuttom.innerHTML = 'delete';

        label.appendChild(input);
        label.appendChild(span);
        actions.appendChild(label);
        todoitem.appendChild(content);
        todoitem.appendChild(actions);
        actions.appendChild(edit);
        actions.appendChild(deletebuttom); //appendchild pushes the content of the latter into the former.

        todoList.appendChild(todoitem);

        if (todo.done) {
            todoitem.classList.add('done');
        }

        input.addEventListener('click', e => {
            todo.done = e.target.checked;
            localStorage.setItem('todos', JSON.stringify(todos));

            if (todo.done) {
                todoitem.classList.add('done');
            } else {
                todoitem.classList.remove('done');
            }

            displayTodos();
        })

        edit.addEventListener('click', e => {
            const input = content.querySelector('input');
            input.removeAttribute('readonly');
            input.focus();
            input.addEventListener('blur', e => {
                input.setAttribute('readonly', true);
                todo.content = e.target.value;
                localStorage.setItem('todos', JSON.stringify(todos));
                displayTodos();
            })
        })

        deletebuttom.addEventListener('click', e => {
            todos = todos.filter(t => t != todo);
            localStorage.setItem('todos', JSON.stringify(todos));
            displayTodos();
        })
    })

}