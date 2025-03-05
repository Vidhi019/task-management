require('dotenv').config(); 
const express = require('express');
const { connectDB } = require('./config/db');
const taskRouter = require('./router/task');
const userRouter = require('./router/user');
const cors = require('cors');

const app = express();

const port = 3000;

connectDB();

app.use(cors());
app.use(express.json());

app.use("/api/task", taskRouter);
app.use("/api/user", userRouter);

app.get('/', (req, res) => {
    res.send('Hello World!');
    }
);

app.listen(port, () => {
    console.log(`running on http://localhost:${port}`);
    }
);

