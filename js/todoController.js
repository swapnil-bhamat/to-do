var ToDo = ToDo || {};
ToDo.Controller = (function(model, view) {
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
})(ToDo.Model, ToDo.View);

ToDo.Controller.init();
