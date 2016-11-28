module.exports = function sampleRouter(powerRouter, todoModel, todoService) {
    'use strict';

    var route = powerRouter.createRouter('/todos');

    route.get('/', list)
        .post('/', create)
        .put('/:id', update, { nocontent : true })
        .delete('/', deleteCompleted, { nocontent : true })
        .delete('/:id', deleteTodo, { nocontent : true });

    function list() {
        return todoModel.list();
    }

    function create(req) {
        return todoService.create(req.body);
    }

    function update(req) {
        return todoService.update(req.params.id, req.body);
    }

    function deleteCompleted(req) {
        return todoService.deleteCompleted();
    }

    function deleteTodo(req) {
        return todoService.delete(req.params.id);
    }

    /**
     * We must return the router to acqua, because express-power-router is built with
     * acqua module to handle hotswaping well.
     */
    return route;
};