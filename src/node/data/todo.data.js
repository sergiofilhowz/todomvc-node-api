/**
 * This module will handle data retrieval and querying, you are able to
 * create projections (object layouts), criterias (filtering), and sorts.
 * And then use them whenever you want, you can use one projection with several criterias or not.
 *
 * Check saphyre-data if you want to understand more about this module
 */
module.exports = function todoModel(SaphyreData, models) {
    'use strict';

    var Todo = models.Todo,
        model = SaphyreData.createModel(Todo);

    this.list = list;
    this.get = get;

    model.projection('list', {
        '$id' : 'id',
        'title' : 'title',
        'completed' : 'completed'
    });

    model.criteria('id', {
        name : 'value',
        property : '$id',
        operator : SaphyreData.OPERATOR.EQUAL
    });

    model.sort('recent', {
        '$id' : 'ASC'
    });

    function list() {
        return model.list({
            projection : 'list',
            sort : 'recent'
        });
    }

    function get(id) {
        return model.single({
            projection : 'list',
            criteria : {
                id : { value : id }
            }
        });
    }

    return this;
};