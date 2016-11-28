module.exports = function todoService(models, todoModel) {

    var Todo = models.Todo;

    this.create = create;
    this.update = update;
    this.delete = deleteTodo;
    this.deleteCompleted = deleteCompleted;

    function create(todo) {
        return Todo.create(todo)
            .then(newTodo => todoModel.get(newTodo.todo_id));
    }

    function update(id, todo) {
        return Todo.update(todo, {
            fields : ['title', 'completed'],
            where : { todo_id : id }
        });
    }

     function deleteTodo(id) {
        return Todo.destroy({
            where : { todo_id : id }
        });
     }

     function deleteCompleted() {
         return Todo.destroy({
             where : { completed : true }
         });
     }

    return this;
};