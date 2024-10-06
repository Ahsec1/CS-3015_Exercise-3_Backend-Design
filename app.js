require("dotenv").config();
const routes = require('./routes/routes');
const express = require('express');
const bodyParser = require('body-parser');
const loggingMiddleware = require('./middleware/loggingMiddleware');
const rateLimiterMiddleware = require('./middleware/rateLimiterMiddleware');
const app = express();

app.use(loggingMiddleware);
app.use(rateLimiterMiddleware);
app.use(bodyParser.json());

app.use('/routes', routes);

app.get("/", (req, res) => {
    res.send("AppDev Backend Exercise - John Michael D. Villagomez");
});

const port = process.env.PORT || 3000;
app.listen(port, () => {
    console.log(`Server is running on port ${port}`);
});