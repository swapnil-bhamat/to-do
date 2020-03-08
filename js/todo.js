var todoModel = (function() {
  /**
   * {
   * "todoId1": {
   *    todo: "todo goes here..",
   *    completed: true / false
   * },
   * "todoId2": {
   *  ... same as above
   * }
   * }
   */
  var todoObj = {};

  var getAllTodo = function() {
    return todoObj;
  };

  var getTodoDetailsById = function(todoId) {
    return todoObj[todoId];
  };

  var addTodo = function(todo) {
    var timeStamp = new Date().getTime();
    todoObj[timeStamp] = {
      todo: todo,
      completed: false
    };
    return timeStamp;
  };

  var toggleTodoStatus = function(todoId) {
    todoObj[todoId]["completed"] = !todoObj[todoId]["completed"];
  };

  var deleteTodo = function(todoId) {
    delete todoObj[todoId];
  };
  return {
    getAllTodo: getAllTodo,
    getTodoDetailsById: getTodoDetailsById,
    addTodo: addTodo,
    toggleTodoStatus: toggleTodoStatus,
    deleteTodo: deleteTodo
  };
})();

var todoView = (function() {
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

var todoController = (function(model, view) {
  var init = function() {
    todoInputHandler();
  };

  var todoInputHandler = function() {
    document
      .getElementById("todoInput")
      .addEventListener("keypress", function(e) {
        if (e.key === "Enter" && e.target.value !== "") {
          addTodo(e.target.value);
        }
      });
  };

  var todoStatusUpdateHandler = function(todoId) {
    document
      .getElementById("todo_" + todoId)
      .addEventListener("click", function(e) {
        var todoId = this.id.replace(/\D/g, "");
        toggleTodoStatus(todoId);
      });
  };

  var deleteTodoHandler = function(todoId) {
    document
      .getElementById("delete_" + todoId)
      .addEventListener("click", function(e) {
        e.stopPropagation();
        var todoId = this.id.replace(/\D/g, "");
        deleteTodo(todoId);
      });
  };

  var addTodo = function(todo) {
    var todoId = model.addTodo(todo);
    var todoDetails = model.getTodoDetailsById(todoId);
    view.addTodo(todoId, todoDetails);
    todoStatusUpdateHandler(todoId);
    deleteTodoHandler(todoId);
  };

  var toggleTodoStatus = function(todoId) {
    model.toggleTodoStatus(todoId);
    var todoDetails = model.getTodoDetailsById(todoId);
    view.updateTodoStatus(todoId, todoDetails.completed);
  };

  var deleteTodo = function(todoId) {
    model.deleteTodo(todoId);
    view.removeTodo(todoId);
  };

  return { init: init };
})(todoModel, todoView);

todoController.init();
