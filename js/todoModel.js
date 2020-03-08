var ToDo = ToDo || {};
ToDo.Model = (function() {
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
