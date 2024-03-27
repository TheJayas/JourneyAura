import express from 'express';
import cookieParser from 'cookie-parser';

const app = express();
app.use(cookieParser());
app.use(express.json());
app.use(express.urlencoded({extended: true}));

//routes
import userRouter from './routes/user.routes.js';
import trainRouter from './routes/train.routes.js';
import stationRouter from './routes/station.routes.js';

app.use('/api/v1/user',userRouter);
app.use('/api/v1/train',trainRouter);
app.use('/api/v1/station',stationRouter);

export {
    app
};