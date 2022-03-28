const express = require('express');
const cors =require('cors');
require('dotenv').config()
const bodyParser = require('body-parser');
const mongoose = require('mongoose');
const jwt = require('jsonwebtoken');
const path = require('path')
const User = require('./models/userModel')

// route imports

const routes = require('./routes/route.js');
const candidateRoutes = require('./routes/candidateRoutes');
const agentRoutes = require('./routes/agentRoutes');
const employerIndividualRoutes = require('./routes/employerIndividualRoutes');
const employerCompanyRoutes  = require('./routes/employerCompanyRoutes');



const { PORT } = process.env 
const { WELCOME_MESSAGE, DATABASE_URL } = process.env


// declare app isntance
const app = express();


// middleware
app.use(cors())
app.use(bodyParser.json())
app.use(bodyParser.urlencoded({extended: true }))
const swaggerUi = require('swagger-ui-express'),
swaggerDocument = require('./swagger.json');
// Middleware for serving static files.
app.use(express.static('public'));
app.use('/public/images', express.static(__dirname + '/public/images'));

app.use(
    '/api-docs',
    swaggerUi.serve, 
    swaggerUi.setup(swaggerDocument)
  );
//  routes to app



app.use(async (req, res, next) => {
    if (req.headers["x-access-token"]) {
      try {
        const accessToken = req.headers["x-access-token"];
        const { userId, exp } = await jwt.verify(accessToken, process.env.JWT_SECRET);
        // If token has expired
        if (exp < Date.now().valueOf() / 1000) {
          return res.status(401).json({
            error: "JWT token has expired, please login to obtain a new one"
          });
        }
        res.locals.loggedInUser = await User.findById(userId);
        next();
      } catch (error) {
        next(error);
      }
    } else {
      next();
    }
  });
  
  app.use('/', routes);

app.use('/agentVerification', agentRoutes)
app.use('/candidateVerification', candidateRoutes)
app.use('/employer' , employerIndividualRoutes)
 app.use('/employer/company' , employerCompanyRoutes)


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
