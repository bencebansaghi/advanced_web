document.addEventListener('DOMContentLoaded', () => {
    const todoForm = document.getElementById('todoForm');
    todoForm.addEventListener('submit', async function (event) {
        event.preventDefault();
        const userInputField = document.getElementById('userInput');
        const todoInputField = document.getElementById('todoInput');
        const userInput = userInputField.value;
        const todoInput = todoInputField.value;
        userInputField.value = '';
        todoInputField.value = '';

        try {
            const response = await fetch('/add', {
                method: 'POST',
                headers: {
                    'Content-Type': 'application/json'
                },
                body: JSON.stringify({
                    name: userInput,
                    todo: todoInput
                })
            });

            if (!response.ok) {
                throw new Error(`HTTP error! status: ${response.status}`);
            }

            const data = await response.json();
            const todoList = document.getElementById('todoList');
            todoList.innerHTML = data;
        } catch (error) {
            console.error('Error:', error);
            const todoList = document.getElementById('todoList');
            todoList.innerHTML = 'An error occurred while adding the todo item.';
        }
    });
    const searchForm = document.getElementById('searchForm');
    searchForm.addEventListener('submit', async function (event) {
        event.preventDefault();
        const inputUsernameField = document.getElementById('searchInput');
        const inputUsername = inputUsernameField.value;
        inputUsernameField.value=''
        let todoList = document.getElementById('todoList');
        todoList.innerHTML='';
        const response = await fetch(`/todos/${inputUsername}`);
        const data = await response.json();
        try{
            if (data.todos.length==0){
                todoList.innerHTML="No todos found for user"
                return
            }
        } catch{
            const existingButton = document.getElementById('deleteUser'); if (existingButton) { existingButton.remove(); }
            todoList.innerHTML=data.message
            return
        }
        for(let i=0;i<data.todos.length;i++){
            let li=document.createElement('li');
            let a=document.createElement('a');
            a.className="delete-task";
            a.textContent=(data.todos[i]);
            a.addEventListener('click', async function (event) {
                event.preventDefault();
                const response = await fetch("/update", {
                    method: "put",
                    headers: {"Content-type": "application/json"},
                    body: JSON.stringify({
                        name: inputUsername,
                        todo: data.todos[i]
                    })
                });
                const todoData = await response.json()
                todoList.innerHTML=todoData.message;
            });
            li.appendChild(a);
            todoList.appendChild(li);
        };
        addDeleteField(inputUsername)
    });
});
function addDeleteField(user){
    const form=document.getElementById('searchForm');
    const existingButton = document.getElementById('deleteUser'); if (existingButton) { existingButton.remove(); }
    const delButton = document.createElement('button');
    delButton.id='deleteUser'
    delButton.innerHTML='Delete User';
    form.appendChild(delButton)
    delButton.addEventListener('click', async function (event) {
        event.preventDefault();
        const response = await fetch('/delete', {
            method: 'delete',
            headers: {
                'Content-Type': 'application/json'
            },
            body: JSON.stringify({
                username: user
            })
        });
        const data = await response.json()
        delButton.remove()
        let todoList = document.getElementById('todoList')
        todoList.innerHTML=data.message;
    });
}