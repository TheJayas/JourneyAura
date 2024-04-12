import express from 'express';
import cookieParser from 'cookie-parser';
import cors from 'cors';
const app = express();
app.use(cookieParser());
app.use(express.json());
app.use(express.urlencoded({extended: true}));


app.use(cors())
//routes
import userRouter from './routes/user.routes.js';
import trainRouter from './routes/train.routes.js';
import stationRouter from './routes/station.routes.js';
import bookingRouter from './routes/booking.routes.js';
import adminRouter from './routes/admin.routes.js';
import searchRouter from './routes/search.routes.js';

app.use('/api/v1/user',userRouter);
app.use('/api/v1/train',trainRouter);
app.use('/api/v1/station',stationRouter);
app.use('/api/v1/booking',bookingRouter);
app.use('/api/v1/search',searchRouter);
app.use('/api/v1/admin',adminRouter);

export {
    app
};