import express from 'express';
import { createHotel, deleteHotel, getDetailHotel, getHotels, updateHotel } from '../controllers/hotel.js';
import { verifyAdmin } from './../utils/verifyToken.js';

const router = express.Router();

// store
router.post('/', verifyAdmin, createHotel)

// update
router.put('/:id', verifyAdmin ,updateHotel)

// delete
router.delete('/:id', verifyAdmin ,deleteHotel)

// get detail
router.get('/:id', getDetailHotel)

// get all
router.get('/', getHotels)

// get city count
router.get("countByCity", getHotels);
router.get("countByType", getHotels);


export default router;