import Hotel from "../models/Hotel.js";
import Room from "../models/Room.js";
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
        // to get all data
        // const hotels = await Hotel.find()

        // to get by params request
        const {min, max, ...other} = req.query
        const hotels = await Hotel.find(
          {...other, cheapestPrice: {
            $gt: min | 1,
            $lt: max || 999
          }}
        ).limit(req.query.limit)

        res.status(200).json(hotels); 
    } catch (error) {
        const err = createErr(404, "not found hotels!", error);
        next(err)
    }
}

export const countByCity = async (req, res, next) => {
    const cities = req.query.cities.split(",");
    try {
      const list = await Promise.all(
        cities.map((city) => {
          return Hotel.countDocuments({
            city: city
          })
        })
      )
      res.status(200).json(list)
    } catch (error) {
      const err = createErr(404, "not found city!", error);
      next(err)
    }
}

export const countyByType = async (req, res, next) => {
  try {
    const hotelCount = await Hotel.countDocuments({ type: "Hotel" })
    const apartementCount = await Hotel?.countDocuments({ type: "apartement" })
    const resortCount = await Hotel?.countDocuments({ type: "resort" })
    const villaCount = await Hotel?.countDocuments({ type: "villa" })
    const cabinCount = await Hotel?.countDocuments({ type: "cabin" })

    res.status(200).json([
      { type: "hotel", count: hotelCount },
      { type: "apartement", count: apartementCount },
      { type: "resort", count: resortCount },
      { type: "villa", count: villaCount },
      { type: "cabins", count: cabinCount }
    ]);

  } catch (error) {
    const err = createErr(404, "not found type!", error);
    next(err)
  }
}

export const getHotelRooms = async (req, res, next) => {
  try {
      const hotel = await Hotel.findById(req.params.id)
      const list = await Promise.all(hotel.rooms.map((room) => {
        return Room.findById(room)
      }))
      
      res.status(200).json(list)
  } catch (error) {
    const err = createErr(404, "get hotel rooms error!", error);
    next(err)
  }
}