function createTodoWidget(id) {
    // Create the outer widget container
    const widget = document.createElement('div');
    widget.classList.add('widget', 'todo-list');
    widget.setAttribute('draggable', 'true');
    // widget.id = id

    // Create the todo container
    const todoContainer = document.createElement('div');
    todoContainer.classList.add('todo-container');

    // Create the input field for new todo entry
    const todoEntry = document.createElement('input');
    todoEntry.setAttribute('type', 'text');
    todoEntry.setAttribute('id', 'todo-entry');
    todoEntry.setAttribute('name', 'todo-entry');
    todoEntry.setAttribute('placeholder', 'New Todo Entry...');

    // Create the submit button
    const submitButton = document.createElement('button');
    submitButton.classList.add('timer-btn');
    submitButton.textContent = 'Submit';
    submitButton.onclick = function () {
        submitTodo(todoContainer, todoEntry); // Pass the container and input field to submitTodo
    };

    // Append the elements to the widget container
    widget.appendChild(todoContainer);
    widget.appendChild(todoEntry);
    widget.appendChild(submitButton);

    const container = document.createElement('div');
    container.classList.add('widget');
    container.id = id
    container.appendChild(widget)

    return container
}
// createTodoWidget()

function submitTodo(todoContainer, todoEntry) {
    // Get the value from the input field
    const todoText = todoEntry.value.trim();

    // If the input is empty, do nothing
    if (!todoText) {
        return;
    }

    // Create a new todo item div
    const newTodoItem = document.createElement('div');
    newTodoItem.classList.add('todo-item');

    // Create the paragraph element for the todo text
    const newTodoText = document.createElement('p');
    newTodoText.textContent = todoText;

    // Create the buttons (complete and delete)
    const completeButton = document.createElement('button');
    completeButton.classList.add('complete-todo-btn');
    completeButton.addEventListener('click', function() {
        newTodoItem.classList.toggle('complete'); // Toggle the completed class
    });

    const deleteButton = document.createElement('button');
    deleteButton.classList.add('delete-todo-btn');
    deleteButton.addEventListener('click', function() {
        newTodoItem.remove(); // Remove the todo item from the DOM
    });

    // Append the elements to the new todo item div
    newTodoItem.appendChild(newTodoText);
    newTodoItem.appendChild(completeButton);
    newTodoItem.appendChild(deleteButton);

    // Append the new todo item to the todo container
    todoContainer.appendChild(newTodoItem);

    // Clear the input field after adding the todo
    todoEntry.value = '';
}
