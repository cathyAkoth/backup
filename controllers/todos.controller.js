// let {Todo, todos} = require('../models/Todo');
const Todo = require('../models/TodoV2')
/*
   CRUD
   C - Create or insert
   R - Read or retrieve
   U - Update or make changes to an existing object]
   D - Delete or remove
*/


class TodoController {
    static async addTodo (data) {
        // let {name, description} = data;
        let todo = new Todo(data);

        await todo.save()
        let todos = await Todo.find();
        return todos;
    }
    static async fetchTodos () {
        return await Todo.find();
    }

    static async getTodo(id) {
        return await Todo.findById(id)
    }

    static async deleteTodo(id) {
        let todo = await this.getTodo(id);

        if(!todo) {
            return "Todo not found"
        } 

        return await Todo.findOneAndRemove({_id: todo._id});
    }

    static async markAsComplete(id, completed) {
        let todo = await this.getTodo(id);

        if(!todo) {
            return "Todo not found"
        } 
        return await Todo.findByIdAndUpdate({_id:id}, {completed: completed})
    }
 }

module.exports = TodoController;
