const mongoose  = require('mongoose');

const todoSchema = new mongoose.Schema({
    name: String,
    completed: {
        type: Boolean,
        default: false
    },
    description: {
        type: String
    },
    createdAt: {
        type: Date,
        default: Date.now()
    }
});

const Todo  = mongoose.model('Todo', todoSchema , 'todos')

module.exports = Todo;
