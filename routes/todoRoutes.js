const router  = require('express').Router()
const TodoController = require('../controllers/todos.controller')


router.get('', async(req, res) => {
    let todos = await TodoController.fetchTodos();
    res.json({
        data: todos
    })
})

router.post('/add', async (req, res) => {
    let data = req.body;
    let todo = await TodoController.addTodo(data)
    
    return res.status(201).json({
        message: todo
    })
})

router.get('/:id', async (req, res) => {
    let { id } = req.params;

    let data =  await TodoController.getTodo(id);

    if(!data) {
        return res.status(404).json({
            message: "Todo not found"
        })
    }
    return res.json({
        data
    })
})

router.put('/:id/check', async(req, res) => {
    let {completed} = req.body
    let {id} = req.params
    let todo = await TodoController.getTodo(id);
    if(!todo) {
        return res.status(404).json({
            message: "Todo not found"
        }) 
    }
    await TodoController.markAsComplete(id, completed);
    return res.json({
        message: "Todo updated successfully"
    })
})

router.delete('/:id/delete', async (req, res)=> {
    let { id } = req.params;

    let data = await TodoController.deleteTodo(id);
    return res.json({
        data
    })
})



module.exports = router;