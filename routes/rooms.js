
import express from "express";
import { createRoom, deleteRoom, getAllRooms, getDetailRoom } from "../controllers/room.js";
import { verifyAdmin } from './../utils/verifyToken.js';

const router = express.Router();

// store
router.post("/:hotelId", verifyAdmin, createRoom);

// get all room
router.get("/", getAllRooms);

// get detail room
router.get("/:id", getDetailRoom)

// delete room
router.delete("/:id/:hotelId", verifyAdmin, deleteRoom)

export default router;