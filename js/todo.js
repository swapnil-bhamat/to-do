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
    addTodo: addTodo,
    toggleTodoStatus: toggleTodoStatus,
    deleteTodo: deleteTodo
  };
})();

var todoController = (function(model) {
  var init = function() {
    attachTodoInputHandler();
  };

  var attachTodoInputHandler = function() {
    document
      .getElementById("todoInput")
      .addEventListener("keypress", function(e) {
        if (e.key === "Enter") {
          addTodo(e.target.value);
          e.target.value = "";
        }
      });
  };

  var attachUpdateTodoStatusHandler = function(todoId) {
    document
      .getElementById("todo_" + todoId)
      .addEventListener("click", function(e) {
        var todoId = this.id.replace(/\D/g, "");
        toggleTodoStatus(todoId);
      });
  };

  var attachDeleteTodoHandler = function(todoId) {
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
    renderTodoList();
    attachUpdateTodoStatusHandler(todoId);
    attachDeleteTodoHandler(todoId);
  };

  var toggleTodoStatus = function(todoId) {
    model.toggleTodoStatus(todoId);
    renderTodoList();
  };

  var deleteTodo = function(todoId) {
    model.deleteTodo(todoId);
    renderTodoList();
  };

  var renderTodoList = function() {
    var todoList = model.getAllTodo();
    var todoHTML = ``;
    for (var todoId in todoList) {
      var todoDetail = todoList[todoId];
      var cardClass = todoDetail.completed ? "card bg-success" : "card";
      todoHTML += `
      <div class="${cardClass}" id="todo_${todoId}">
            <div class="card-body">
              <div class="row">
                <div class="col-10">
                  <span>
                    ${todoDetail.todo}
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
    }
    document.getElementById("todoList").innerHTML = todoHTML;
  };

  return { init: init };
})(todoModel);

todoController.init();
