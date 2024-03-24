import express from 'express';
import errorMiddleware from './Middleware/error.js';
import cookieParser from 'cookie-parser';

const app = express();
app.use(express.json());
app.use(cookieParser());

// const user = require('');

app.use(errorMiddleware);

export default app;