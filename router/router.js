const express = require('express');
const router = express.Router();

const Todo = require('../todoSchema')

router.get('/:id', function (req, res) {
  // GET /api/todos[/id] - get a specific todo item.
  console.log('id:', req.params.id);
  Todo.findOne({_id: req.params.id}).then(function(data) {
    console.log('found single item:', data);
    res.json(data);
  }).catch(function(err) {
    console.log('error finding single item:', err);
    res.json(err);
  })
})

router.put('/:id', function (req, res) {
  // PUT /api/todos[/id] - update a todo item. Returns the modified todo item.
  console.log('attempting put');
  Todo.updateOne(
    {_id: req.params.id},
    {$set:
      {title: req.body.title,
      completed: req.body.completed}}
  ).then(function(item) {
    console.log('found and updated single item', item);
    res.json(item);
  }).catch(function(err) {
    console.log('err updating item', err);
    res.json(err);
  })
})

router.patch('/:id', function (req, res) {
  // PATCH /api/todos[/id] - partially update a todo item. Returns the modified todo item.
  console.log('attempting patch');
  var update
  if (req.body.title) {
    update = {title: req.body.title}
  } else {
    update = {completed: req.body.completed}
  }
  Todo.updateOne(
    {_id: req.params.id},
    {$set: update}
  ).then(function(item) {
    console.log('found and updated single item', item);
    res.json(item);
  }).catch(function(err) {
    console.log('err updating item', err);
    res.json(err);
  })
})

router.delete('/:id', function (req, res) {
  // DELETE /api/todos[/id] - deletes  todo item. Returns the todo item that was deleted.
  console.log('delete the id', req.params.id);
  Todo.deleteOne({_id: req.params.id}).then(function(done) {
    console.log('deleted object');
    res.json(done);
  }).catch(function(err) {
    console.log('delete errored:', err);
    res.json(err);
  })
})

router.get('/', function (req, res) {
  // GET /api/todos/ - return a JSON array of todo items
  console.log('finding all todos');
  Todo.find({}).then(function (data) {
    // the res.json will handle the mongo object (probably)
    console.log('getting data');
    res.json(data);
  }).catch(function (err) {
    console.log('error getting data', err);
    res.json(err);
  })
})

router.post('/', function (req, res) {
  // POST /api/todos/ - post a JSON representation of a todo and have it saved. Returns the saved todo item in JSON.
  // var todo = new Todo({
  //   title: req.body.title,
  //   order: req.body.order,
  //   completed: false
  // });
  //
  // console.log('adding new todo to db:', todo);
  // todo.save().then(function(resp) {
  //   console.log('todo added:', resp);
  //   res.json(todo.toObject());
  // }).catch(function(err) {
  //   console.log('error occured:', err);
  //   res.json(err);
  // })
  Todo.create({title: req.body.title, order: req.body.order, completed: req.body.completed}
  ).then(function(todo) {
    res.status(201).json({
        id: todo._id,
        completed: todo.completed,
        order: todo.order,
        title: todo.title
})
  })
})

module.exports = router
