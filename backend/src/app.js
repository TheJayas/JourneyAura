import express from 'express';
import cookieParser from 'cookie-parser';

const app = express();
app.use(cookieParser());
app.use(express.json());
app.use(express.urlencoded({extended: true}));

//routes
import userRouter from './routes/user.routes.js';

app.use('/api/v1/user',userRouter);

export {
    app
};