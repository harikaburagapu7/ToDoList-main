// Load from local storage on page load
$(document).ready(function() {
    loadFromLocalStorage();
  });
  
  // Event listener for form submission
  $('#todo-form').submit(function(event) {
    event.preventDefault(); // Prevent default form submission behavior
  
    const todoText = $('#todo').val().trim(); // Trim any leading/trailing whitespace
  
    if (todoText !== '') {
      // Create list item
      const listItem = $('<li class="draggable"></li>');
      listItem.html(`
        <input type="checkbox">
        <span>${todoText}</span>
        <button class="edit-button">✎</button>
        <button class="delete">❌</button>
      `);
  
      // Append list item to the list
      $('#todo-list').append(listItem);
  
      // Clear input field
      $('#todo').val('');
  
      // Save to local storage
      saveToLocalStorage();
    }
  });
  
  // Event listener for delete buttons
  $('#todo-list').on('click', '.delete', function() {
    $(this).parent().remove();
    saveToLocalStorage();
  });
  
  // Event listener for clear button
  $('#clear-completed').click(function() {
    $('#todo-list input[type="checkbox"]:checked').parent().remove();
    saveToLocalStorage();
  });
  
  // Event listener for checkbox changes
  $('#todo-list').on('change', 'input[type="checkbox"]', function() {
    saveToLocalStorage();
  });
  
  // Event listener for edit buttons
  $('#todo-list').on('click', '.edit-button', function() {
    const span = $(this).siblings('span');
    const newText = prompt('Enter new task name:', span.text());
    if (newText !== null && newText !== '') {
      span.text(newText);
      saveToLocalStorage();
    }
  });
  
  // Function to save to local storage
  function saveToLocalStorage() {
    const todos = [];
    $('#todo-list li').each(function() {
      const checkbox = $(this).find('input[type="checkbox"]');
      const text = $(this).find('span').text();
      todos.push({
        text: text,
        completed: checkbox.prop('checked')
      });
    });
    localStorage.setItem('todos', JSON.stringify(todos));
  }
  
  // Function to load from local storage
  function loadFromLocalStorage() {
    const todos = JSON.parse(localStorage.getItem('todos'));
    if (todos) {
      todos.forEach(function(todo) {
        const listItem = $('<li class="draggable"></li>');
        listItem.html(`
          <input type="checkbox" ${todo.completed ? 'checked' : ''}>
          <span>${todo.text}</span>
          <button class="edit-button">✎</button>
          <button class="delete">❌</button>
        `);
        $('#todo-list').append(listItem);
      });
    }
  }
  
  // Make list items draggable
  $('#todo-list').sortable({
    handle: '.draggable'
  });
  