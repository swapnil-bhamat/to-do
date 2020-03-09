var ToDo = ToDo || {};
ToDo.Controller = (function(model, view) {
  var init = function() {
    view.onNewToDoInput(addTodo);
  };

  var addTodo = function(todo) {
    var todoId = model.addTodo(todo);
    var todoDetails = model.getTodoDetailsById(todoId);
    view.addTodo(todoId, todoDetails);
    view.onToDoStatusUpdate(todoId, toggleTodoStatus);
    view.onToDoDelete(todoId, deleteTodo);
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
