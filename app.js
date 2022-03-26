const express = require('express');
const cors =require('cors');
require('dotenv').config()
const bodyParser = require('body-parser');
const mongoose = require('mongoose');

// route imports

const userRoutes = require('./routes/userRoutes');
const candidateRoutes = require('./routes/candidateRoutes');
const agentRoutes = require('./routes/agentRoutes');


const { PORT } = process.env 
const { WELCOME_MESSAGE, DATABASE_URL } = process.env


// declare app isntance
const app = express();

// load middleware
app.use(cors())
app.use(bodyParser.json())
app.use(bodyParser.urlencoded({extended: true }))



// load routes to app

app.use('/auth', userRoutes)
app.use('/agentVerification', agentRoutes)
app.use('/candidateVerification', candidateRoutes)

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
