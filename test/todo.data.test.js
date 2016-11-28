var testHelper = require('./test.helper'),
    expect = testHelper.expect,
    acqua = testHelper.acqua,
    models = acqua.get('models'),
    Todo = models.Todo,
    todoModel = acqua.get('todoModel');

describe('todoModel', () => {
    'use strict';

    beforeEach(() => testHelper.sync());

    it('should list', () => {
        return Todo.create({ title : 'one todo', completed : false })
            .then(() => Todo.create({ title : 'another todo', completed : true }))
            .then(() => todoModel.list())
            .then(result => {
                expect(result).with.length(2);

                expect(result[0]).to.have.property('id').equal('1');
                expect(result[0]).to.have.property('title').equal('one todo');
                expect(result[0]).to.have.property('completed').equal(false);

                expect(result[1]).to.have.property('id').equal('2');
                expect(result[1]).to.have.property('title').equal('another todo');
                expect(result[1]).to.have.property('completed').equal(true);
            });
    });

    it('should get', () => {
        return Todo.create({ title : 'one todo', completed : false })
            .then(() => todoModel.get(1))
            .then(result => {
                expect(result).to.have.property('id').equal('1');
                expect(result).to.have.property('title').equal('one todo');
                expect(result).to.have.property('completed').equal(false);
            });
    });

});