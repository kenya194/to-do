window.addEventListener( 'load', () => {
     todos = JSON.parse(localStorage.getItem('todos')) || [];
    const nameInput = document.querySelector('#name');
    const newTodoForm = document.querySelector('#new-todo-form');

    const username = localStorage.getItem('username') || '';
 
    nameInput.value = username;

    nameInput.addEventListener('change', e => {
        localStorage.setItem('username', e.target.value);
    })

    newTodoForm.addEventListener('submit', e => {
        e.preventDefault();

        const todo = {
            content: e.target.elements.content.value,
            category: e.currentTarget.elements.category.value,
            done:false,
           createdAt: new Date().getTime()
        }

        todos.push(todo);

        localStorage.setItem('todos', JSON.stringify(todos));

        e.target.reset();

        displayTodos();
    })
    displayTodos();
})


function displayTodos() {
    const todoList = document.querySelector('#todo-list');

    todoList.innerHTML= '';

    todos.forEach(todo => {

        const todoitem = document.createElement('div');
        todoitem.classList.add('todo-item');

        const label = document.createElement('label');
        const span = document.createElement('span');
        const input = document.createElement('input');
        const edit = document.createElement('button');
        const deletebuttom = document.createElement('button');
        const actions = document.createElement('div');
        const content = document.createElement('div');
       
        input.type = 'checkbox';
        input.checked = todo.done;
        span.classList.add('bubble');

        content.classList.add('todo-content');
        actions.classList.add('actions');
        edit.classList.add('edit');
        deletebuttom.classList.add('delete');

        content.innerHTML = `<input type="text" value ="$(todo.content)" readonly>`;
        edit.innerHTML = 'edit';
        deletebuttom = 'delete';

        label.appendChild(input);
        label.appendChild(span);
        actions.appendChild(label);
        todoitem.appendChild(content);
        todoitem.appendChild(actions);

        todoList.appendChild(todoitem);

        if (todo.done){
            todoitem.classList.add('done');
        }

        input.addEventListener('click', e => {
            todo.done = e.target.checked;
            localStorage.setItem('todos', JSON.stringify(todos));

            if(todo.done){
                todoitem.classList.add('done');
            } else{
                todoitem.classList.remove('done');
            }
            
            displayTodos();
        })
        
        edit.addEventListener('click', e =>{
            const input = content.querySelector('input');
            input.removeAttribute('readonly');
            input.focus();
            input.addEventListener('blur', e =>{
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