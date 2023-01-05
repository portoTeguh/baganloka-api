import express from 'express';
import { createHotel, deleteHotel, getDetailHotel, getHotels, updateHotel } from '../controllers/hotel.js';

const router = express.Router();

// store
router.post('/', createHotel)

// update
router.put('/:id', updateHotel)

// delete
router.delete('/:id', deleteHotel)

// get detail
router.get('/:id', getDetailHotel)

// get all
router.get('/', getHotels)


export default router;