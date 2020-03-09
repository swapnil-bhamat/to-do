var ToDo = ToDo || {};
ToDo.View = (function() {
  var resetTodoInput = function() {
    document.getElementById("todoInput").value = "";
  };

  var addTodo = function(todoId, todoDetails) {
    var newTodoHTML =
      '<div class="card mx-auto w-75 bg-info mb-2" id="todo_' +
      todoId +
      '">' +
      '<div class="card-body pt-2 pb-2 text-light custom-card bg-custom-cyan">' +
      todoDetails.todo +
      '<button id="delete_' +
      todoId +
      '" class="btn btn-sm btn-info text-dark border-0 bg-custom-cyan font-weight-bold float-right"> X </button></div></div>';
    document
      .getElementById("todoList")
      .insertAdjacentHTML("beforeend", newTodoHTML);
    resetTodoInput();
  };

  var updateTodoStatus = function(todoId, todoDone) {
    var todoElement = document.getElementById("todo_" + todoId);
    var baseClasses = "card mx-auto w-75 bg-info mb-2";
    todoElement.className = todoDone
      ? baseClasses + " todo-complete"
      : baseClasses;
  };

  var removeTodo = function(todoId) {
    var element = document.getElementById("todo_" + todoId);
    element.parentNode.removeChild(element);
  };
  return {
    addTodo: addTodo,
    updateTodoStatus: updateTodoStatus,
    removeTodo: removeTodo
  };
})();
