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
    return todoObj;
  };

  var updateTodoStatus = function(todoId, status) {
    todoObj[todoId]["completed"] = status;
  };

  var deleteTodo = function(todoId) {
    delete todoObj[todoId];
    return todoObj;
  };
  return {
    getAllTodo: getAllTodo,
    addTodo: addTodo,
    updateTodoStatus: updateTodoStatus,
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

  var addTodo = function(todo) {
    model.addTodo(todo);
    renderTodoList();
  };

  var updateTodoStatus = function() {};

  var deleteTodo = function() {};

  var renderTodoList = function() {
    var todoList = model.getAllTodo();
    var todoHTML = ``;
    for (var todoId in todoList) {
      var todoDetail = todoList[todoId];
      todoHTML += `
      <div class="card" id="${todoId}">
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
