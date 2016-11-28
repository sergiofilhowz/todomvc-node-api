module.exports = function apiRouter(powerRouter, todoModel) {
    'use strict';

    var route = powerRouter.createRouter('/');

    route.get('/', () => {});
    return route;
};