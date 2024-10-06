require("dotenv").config();
const routes = require('./routes/routes');
const express = require('express');
const bodyParser = require('body-parser');
const loggingMiddleware = require('./middleware/loggingMiddleware');
const rateLimiterMiddleware = require('./middleware/rateLimiterMiddleware');
const app = express();

//middlewares that needs to pass through before request
app.use(loggingMiddleware); 
app.use(rateLimiterMiddleware);
app.use(bodyParser.json());

app.use('/routes', routes); //use the other routes

app.get("/", (req, res) => { //default route
    res.send("CS 3105_AppDev_Backend Exercise - John Michael D. Villagomez");
});

const port = process.env.PORT; //start server
app.listen(port, () => {
    console.log(`Server is running on port ${port}`);
});