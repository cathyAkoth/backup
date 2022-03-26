let todos = []; // fictional database for saving todos data

class Todo {
    constructor(name, description) {
        this.name = name;
        this.completed = false;
        this.description = description
        this.id = this.generateId()
    }

    generateId () {
        if(todos.length) {
            let lastItem = todos[todos.length -1]
            return lastItem.id + 1
        }
        return todos.length + 1
    }
}

module.exports = {
    Todo,
    todos
}