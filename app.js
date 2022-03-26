const express = require('express');
const cors =require('cors');
require('dotenv').config()
const bodyParser = require('body-parser');
const mongoose = require('mongoose');

// route imports
const todoRoutes = require('./routes/todoRoutes');
const userRoutes = require('./routes/userRoutes');

const { PORT } = process.env 
const { WELCOME_MESSAGE, DATABASE_URL } = process.env


// declare app isntance
const app = express();

// load middleware
app.use(cors())
app.use(bodyParser.json())
app.use(bodyParser.urlencoded({extended: true }))



// load routes to app
app.use('/todos', todoRoutes)
app.use('/auth', userRoutes)

// spin up the server 
mongoose.connect(DATABASE_URL).then(() => {
    // successful connection
    app.listen(PORT, ()=> {
        let message = `${WELCOME_MESSAGE} http://localhost:${PORT}`
        console.log(message)
    })
}).catch(error => {
    console.error("Failed to start the server due to : ",error)
})
