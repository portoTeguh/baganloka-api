import Room from './../models/Room.js';
import Hotel from './../models/Hotel.js';
import { createErr } from './../utils/error.js';

export const createRoom = async (req, res, next) => {
    const hotelId = req.params.hotelId;
    const newRoom = new Room(req.body);

    try {
        const savedRoom = await newRoom.save();
        try {
            await Hotel.findByIdAndUpdate(hotelId, {
                $push: {
                    rooms: savedRoom._id
                }
            })
        } catch (error) {
            const err = createErr(500, "Terjadi kesalahan saat update hotel diserver", error)
            next(err)
        }
        res.status(200).json(savedRoom)
    } catch (error) {
        const err = createErr(500, "Terjadi kesalahan saat input rooms diserver", error)
        next(err)
    }
}

export const getAllRooms = async (req, res, next) => {
    try {
        const rooms = await Room.find();
        res.status(200).json(rooms)
    } catch (error) {
        const err = createErr(404, "Not found rooms", error);
        next(err)
    }
}

export const getDetailRoom = async(req, res, next) => {
    try {
        const room = await Room.findById(req.params.id);
        res.status(200).json(room);
    } catch (error) {
        const err = createErr(404, "Not found details rooms", error);
        next(err)
    }
}

export const deleteRoom = async (req,res,next) => {
    const hotelid = req.params.hotelId
    try {
        await Room.findByIdAndDelete(req.params.id);
        try {
            await Hotel.findByIdAndUpdate(hotelid, {
                $pull: {
                    rooms: req.params.id
                }
            })
        } catch (error) {
            const err = createErr(404, "Failed to delete room id in hotel", error)
            next(err)
        }
        res.status(200).json('Room deleted, and updated in hotel')
    } catch (error) {
        const err = createErr(404, "Failed to delete rooms", error)
        next(err)
    }
    
}

export const updateRoom = async (req, res, next) => {
    try {
        const updateRoom = await Room.findByIdAndUpdate(
            req.params.id,
            { $set: req.body },
            { new: true }
        );
        res.status(200).json(updateRoom)
    } catch (error) {
        next(error)
    }
}

// export const updateRoomAvalaibility = async (req, res, next) {
//     try {
//         await Room.updateOne(
//             { "roomNumbers._id" : req.params.id },
//             {
//                 $push : {
//                     "roomNumbers.$.unavailableDates" : req.body.dates
//                 }
//             }
//         )
//         res.status(200).json("Room status has been updated")
//     } catch (error) {
//         next(err)
//     }
// }