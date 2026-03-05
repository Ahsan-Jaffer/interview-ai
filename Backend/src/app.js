const express = require('express');
const cookieParser = require('cookie-parser');
const app = express();
const cors = require('cors');

app.use(cors({
    origin: 'http://localhost:5173', // Replace with your frontend URL
    credentials: true, // Allow cookies to be sent with requests
}));

app.use(express.json());
app.use(cookieParser());

/* Require all the routes here */
const authRouter = require('./routes/auth.routes');
const interviewRouter = require('./routes/interview.routes');


/* Using all the routes here */
app.use("/api/auth", authRouter);
app.use("/api/interview", interviewRouter);


module.exports = app;