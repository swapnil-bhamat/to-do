var ToDo = ToDo || {};
ToDo.View = (function() {
  var resetTodoInput = function() {
    document.getElementById("todoInput").value = "";
  };

  var addTodo = function(todoId, todoDetails) {
    var newTodoHTML = `
          <div class="card" id="todo_${todoId}">
            <div class="card-body">
              <div class="row">
                <div class="col-10">
                  <span>
                    ${todoDetails.todo}
                  </span>
                </div>
                <div class="col-2">
                  <button id="delete_${todoId}" class="btn btn-sm btn-danger">
                    <i class="fa fa-close"></i>
                  </button>
                </div>
              </div>
            </div>
          </div>`;
    document
      .getElementById("todoList")
      .insertAdjacentHTML("beforeend", newTodoHTML);
    resetTodoInput();
  };

  var updateTodoStatus = function(todoId, todoDone) {
    var todoElement = document.getElementById("todo_" + todoId);
    todoElement.className = todoDone ? "card bg-success" : "card";
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
