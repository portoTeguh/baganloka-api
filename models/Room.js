import mongoose from "mongoose";
import timezone from 'mongoose-timezone';

const RoomSchema = new mongoose.Schema({
    title: {
        type: String,
        required: true
    },
    price: {
        type: Number,
        required: true
    },
    maxPeople: {
        type: Number,
        required: true
    },
    desc: {
        type: String,
        required: true
    },
    roomNumbers: [
        {
            number: Number,
            unvalaibleDatea: {
                type: [Date]
            }
        }
    ],
    createdAt: {
        type: String
    },
    updatedAt: {
        type: String
    }
})


RoomSchema.plugin(timezone, { paths: ['createdAt', 'updatedAt'], defaultTimezone: 'Asia/Jakarta' })

export default mongoose.model("Room", RoomSchema);