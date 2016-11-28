var testHelper = require('./test.helper'),
    expect = testHelper.expect,
    acqua = testHelper.acqua,
    models = acqua.get('models'),
    Todo = models.Todo;

describe('todo router', () => {
    'use strict';

    beforeEach(() => testHelper.sync());

    it('should list', () => {
        return Todo.create({ title : 'one todo', completed : false })
            .then(() => Todo.create({ title : 'another todo', completed : true }))
            .then(() => testHelper.get('/api/todos'))
            .then(res => {
                res.should.have.status(200);

                expect(res.body).with.length(2);

                expect(res.body[0]).to.have.property('id').equal('1');
                expect(res.body[0]).to.have.property('title').equal('one todo');
                expect(res.body[0]).to.have.property('completed').equal(false);

                expect(res.body[1]).to.have.property('id').equal('2');
                expect(res.body[1]).to.have.property('title').equal('another todo');
                expect(res.body[1]).to.have.property('completed').equal(true);
            });
    });

    it('should create todo', () => {
        return testHelper.get('/api/todos').then(res => {
            res.should.have.status(200);
            expect(res.body).with.length(0);
            return testHelper.post('/api/todos', { title : 'one todo', completed : false });
        })
        .then(res => {
            res.should.have.status(200);
            expect(res.body).to.have.property('id').equal('1');
            expect(res.body).to.have.property('title').equal('one todo');
            expect(res.body).to.have.property('completed').equal(false);

            return testHelper.get('/api/todos');
        }).then(res => {
            res.should.have.status(200);
            expect(res.body).with.length(1);

            expect(res.body[0]).to.have.property('id').equal('1');
            expect(res.body[0]).to.have.property('title').equal('one todo');
            expect(res.body[0]).to.have.property('completed').equal(false);
        });
    });

    it('should create and update todo', () => {
        return testHelper.get('/api/todos').then(res => {
            res.should.have.status(200);
            expect(res.body).with.length(0);
            return testHelper.post('/api/todos', { title : 'one todo', completed : false });
        })
        .then(res => {
            res.should.have.status(200);
            expect(res.body).to.have.property('id').equal('1');
            expect(res.body).to.have.property('title').equal('one todo');
            expect(res.body).to.have.property('completed').equal(false);

            return testHelper.get('/api/todos');
        }).then(res => {
            res.should.have.status(200);
            expect(res.body).with.length(1);

            expect(res.body[0]).to.have.property('id').equal('1');
            expect(res.body[0]).to.have.property('title').equal('one todo');
            expect(res.body[0]).to.have.property('completed').equal(false);

            return testHelper.put('/api/todos/1', { title : 'another todo', completed : true });
        }).then(res => {
            res.should.have.status(200);
            return testHelper.get('/api/todos');
        }).then(res => {
            res.should.have.status(200);

            expect(res.body[0]).to.have.property('id').equal('1');
            expect(res.body[0]).to.have.property('title').equal('another todo');
            expect(res.body[0]).to.have.property('completed').equal(true);
        });
    });

    it('should create and delete todo', () => {
        return testHelper.get('/api/todos').then(res => {
            res.should.have.status(200);
            expect(res.body).with.length(0);
            return testHelper.post('/api/todos', { title : 'one todo', completed : false });
        })
        .then(res => {
            res.should.have.status(200);
            expect(res.body).to.have.property('id').equal('1');
            expect(res.body).to.have.property('title').equal('one todo');
            expect(res.body).to.have.property('completed').equal(false);

            return testHelper.get('/api/todos');
        }).then(res => {
            res.should.have.status(200);
            expect(res.body).with.length(1);

            expect(res.body[0]).to.have.property('id').equal('1');
            expect(res.body[0]).to.have.property('title').equal('one todo');
            expect(res.body[0]).to.have.property('completed').equal(false);

            return testHelper.delete('/api/todos/1');
        }).then(res => {
            res.should.have.status(200);
            return testHelper.get('/api/todos');
        }).then(res => {
            res.should.have.status(200);
            expect(res.body).with.length(0);
        });
    });

    it('should create and delete completed', () => {
        return testHelper.get('/api/todos').then(res => {
            res.should.have.status(200);
            expect(res.body).with.length(0);
            return testHelper.post('/api/todos', { title : 'one todo', completed : false });
        })
        .then(res => {
            res.should.have.status(200);
            expect(res.body).to.have.property('id').equal('1');
            expect(res.body).to.have.property('title').equal('one todo');
            expect(res.body).to.have.property('completed').equal(false);

            return testHelper.get('/api/todos');
        }).then(res => {
            res.should.have.status(200);
            expect(res.body).with.length(1);

            expect(res.body[0]).to.have.property('id').equal('1');
            expect(res.body[0]).to.have.property('title').equal('one todo');
            expect(res.body[0]).to.have.property('completed').equal(false);

            return testHelper.delete('/api/todos');
        }).then(res => {
            res.should.have.status(200);
            return testHelper.get('/api/todos');
        }).then(res => {
            res.should.have.status(200);
            expect(res.body).with.length(1);

            return testHelper.put('/api/todos/1', { title : 'one todo', completed : true });
        }).then(res => {
            res.should.have.status(200);
            return testHelper.get('/api/todos');
        }).then(res => {
            res.should.have.status(200);
            expect(res.body).with.length(1);

            return testHelper.delete('/api/todos');
        }).then(res => {
            res.should.have.status(200);
            return testHelper.get('/api/todos');
        }).then(res => {
            res.should.have.status(200);
            expect(res.body).with.length(0);
        });
    });

});