import express from "express";
import dotenv from "dotenv";
import mongoose from 'mongoose';
import authRoute from "./routes/auth.js";
import hotelRoute from './routes/hotels.js';

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

app.use(express.json());

// middleware
app.use('/api/v1/auth', authRoute);
app.use('/api/v1/hotel', hotelRoute);

app.listen(8800, () => {
    connect();
    console.log("Connected to backend");
}); 