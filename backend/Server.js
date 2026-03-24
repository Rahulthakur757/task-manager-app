require('dotenv').config();

const express = require('express');
const app = express();
const cors = require('cors');
app.use(cors());
app.use(express.json());

const connect = require('./src/config/database');
connect();

const auth = require('./src/routes/auth');
const task = require('./src/routes/task')
app.use("/api/v1/auth", auth);
app.use("/api/v1/task", task)

const errorMiddleware = require('./src/middleware/ErrorMiddleware');
app.use(errorMiddleware);

const PORT = process.env.PORT || 3000;

app.listen(PORT,(Error) => {
    if(Error) {
        console.log(Error);
    } else {
        console.log(`Server running on port ${PORT}`);
    };
});