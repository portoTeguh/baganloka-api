import express from "express";
import dotenv from "dotenv";
import mongoose from 'mongoose';
import authRoute from "./routes/auth.js";
import hotelRoute from './routes/hotels.js';
import userRoute from './routes/users.js';
import cookieParser from 'cookie-parser';

const app = express();
dotenv.config();

// mongoose ke mongodb
const connect = async () => {
    try {
        await mongoose.connect(process.env.MONGO, {
            useNewUrlParser: true,
            useUnifiedTopology: true
        });
        console.log('connect to mongodb')
    } catch (error) {
        throw error
    }
}

app.use(cookieParser());
app.use(express.json());

// middleware
app.use('/api/v1/auth', authRoute);
app.use('/api/v1/hotel', hotelRoute);
app.use('/api/v1/user', userRoute);

// handle error midddleware api
app.use((err, req, res, next) => {

    const errStatus = err.status || 500
    const errMessage = err.message || "Something went wrong from server!!"

    return res.status(errStatus).json({
        success: false,
        status: errStatus,
        message: errMessage,
        stack: err.stack
    })
})

// middleware selain route di atas
app.use('*', function(req, res){
    res.send('not found', 404);
})

app.listen(8800, () => {
    connect();
    console.log("Connected to backend");
}); 