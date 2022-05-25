const express = require("express");
const cors = require("cors");
//require("dotenv").config();
const bodyParser = require("body-parser");
const mongoose = require("mongoose");
const jwt = require("jsonwebtoken");
const path = require("path");
const User = require("./models/userModel");
const fs = require("fs");
const session = require("express-session");
const swaggerUI = require("swagger-ui-express");
const swaggerJsDoc = require("swagger-jsdoc");

// route imports

const routes = require("./routes/route.js");
const candidateRoutes = require("./routes/candidateRoutes");
const agentRoutes = require("./routes/agentRoutes");
const employerIndividualRoutes = require("./routes/employerIndividualRoutes");
const employerCompanyRoutes = require("./routes/employerCompanyRoutes");
const productRoutes = require("./routes/routes");
const cartRoutes = require("./routes/cartRoute");

const dotenv = require("dotenv");
dotenv.config();

//TODO reeplace this line of code
// const { PORT } = process.env;
// const { WELCOME_MESSAGE, DATABASE_URL } = process.env;

const DATABASE_URL = "mongodb://127.0.0.1:27017/mukozi_db";

const options = {
  definition: {
    openapi: "3.0.0",
    info: {
      title: "API",
      version: "1.0.0",
      description: " API",
    },
    servers: [
      {
        url: "http://localhost:5000",
      },
    ],
  },
  apis: ["./routes/*.js"],
};

const specs = swaggerJsDoc(options);

// declare app isntance
const app = express();

// middleware
app.use(cors());
app.use(bodyParser.json());
app.use(bodyParser.urlencoded({ extended: true }));

// Middleware for serving static files.
app.use(express.static("public"));
app.use("/public/images", express.static(__dirname + "/public/images"));
app.use("/api-docs", swaggerUI.serve, swaggerUI.setup(specs));

//  routes to app

app.use(async (req, res, next) => {
  if (req.headers["x-access-token"]) {
    try {
      const accessToken = req.headers["x-access-token"];
      const { userId, exp } = await jwt.verify(accessToken, JWT_SECRET);
      // If token has expired
      if (exp < Date.now().valueOf() / 1000) {
        return res.status(401).json({
          error: "JWT token has expired, please login to obtain a new one",
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

app.use("/", routes);

app.use("/agentVerification", agentRoutes);
// app.use('/candidateVerification', candidateRoutes)
app.use("/employer", employerIndividualRoutes);
app.use("/employer/company", employerCompanyRoutes);
app.use("/candidateVerification", productRoutes);
app.use("/shortlist", cartRoutes);

const MONGO_USERNAME = "root";
const MONGO_PASSWORD = "root";

const MONGO_HOSTNAME = "127.0.0.1";
const MONGO_PORT = 27017;
const MONGO_DB = "mukozi";
const REPLICA_SET = "rs0";

const PORT = 5000;
const WELCOME_MESSAGE = "listening at";
const JWT_SECRET = "super secret";

// spin up the server
const url = `mongodb://${MONGO_USERNAME}:${MONGO_PASSWORD}@${MONGO_HOSTNAME}:${MONGO_PORT}/${MONGO_DB}?replicaSet=${REPLICA_SET}`;

mongoose
  .connect(DATABASE_URL, {
    useNewUrlParser: true,
    useUnifiedTopology: true,
  })
  .then(() => {
    // successful connection
    app.listen(PORT, () => {
      let message = `${WELCOME_MESSAGE} http://localhost:${PORT}`;
      console.log(message);
    });
  })
  .catch((error) => {
    console.error("Failed to start the server due to : ", error);
  });
