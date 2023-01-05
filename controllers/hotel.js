import Hotel from "../models/Hotel.js";
import { createErr } from "../utils/error.js";

export const createHotel = async (req, res, next) => {
  const newHotel = new Hotel(req.body);

  try {
    const savedHotel = await newHotel.save();
    res.status(200).json(savedHotel);
  } catch (error) {
    const err = createErr(500, "periksa stack error berikut", error);
    next(err);

    // res.status(500).json(error)
  }
};

export const updateHotel = async (req, res, next) => {
  try {
    const updateHotel = await Hotel.findByIdAndUpdate(
      req.params.id,
      {
        $set: req.body,
      },
      { new: true }
    );
    res.status(200).json(updateHotel);
  } catch (error) {
    const err = createErr(500, "periksa stack error berikut", error);
    next(err);

    //res.status(500).json(error)
  }
};

export const deleteHotel = async (req, res, next) => {
  try {
    await Hotel.findByIdAndDelete(req.params.id);
    res.status(200).json("Hotel has been deleted");
  } catch (error) {
    const err = createErr(500, "periksa stack error berikut", error);
    next(err);

    // res.status(500).json(error);
  }
};

export const getDetailHotel = async (req, res, next) => {
  try {
    const hotel = await Hotel.findById(req.params.id);
    res.status(200).json(hotel);
  } catch (error) {
    // res.status(500).json(error)
    const err = createErr(404, "not found hotel!", error);
    next(err);
  }
};

export const getHotels = async (req, res, next) => {
    try {
        const hotels = await Hotel.find()
        res.status(200).json(hotels); 
    } catch (error) {
        const err = createErr(404, "not found hotels!", error);
        next(err)
    }
}