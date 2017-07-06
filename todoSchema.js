const mongoose = require('mongoose');

const todoSchema = new mongoose.Schema({
  title: {
    type: String,
    require: true
  },
  completed: {
    type: Boolean,
    default: false
  },
  order: {
    type: Number
  }
});

todoSchema.methods.toJSON = function () {
  return {
    id: this._id,
    completed: this.completed,
    order: this.order,
    title: this.title
  }
}
const Todos = mongoose.model('todos', todoSchema);


module.exports = Todos;
