import User from "../models/User.js";
import { createErr } from "../utils/error.js";

export const createUser = async (req, res, next) => {
  const newUser = new User(req.body);

  try {
    const savedUser = await newUser.save();
    res.status(200).json(savedUser);
  } catch (error) {
    const err = createErr(500, "periksa stack error berikut", error);
    next(err);

    // res.status(500).json(error)
  }
};

export const updateUser = async (req, res, next) => {
  try {
    const updateUser = await User.findByIdAndUpdate(
      req.params.id,
      {
        $set: req.body,
      },
      { new: true }
    );
    res.status(200).json(updateUser);
  } catch (error) {
    const err = createErr(500, "periksa stack error berikut", error);
    next(err);

    //res.status(500).json(error)
  }
};

export const deleteUser = async (req, res, next) => {
  try {
    await User.findByIdAndDelete(req.params.id);
    res.status(200).json("User has been deleted");
  } catch (error) {
    const err = createErr(500, "periksa stack error berikut", error);
    next(err);

    // res.status(500).json(error);
  }
};

export const getDetailUser = async (req, res, next) => {
  try {
    const User = await User.findById(req.params.id);
    res.status(200).json(User);
  } catch (error) {
    // res.status(500).json(error)
    const err = createErr(404, "not found User!", error);
    next(err);
  }
};

export const getUsers = async (req, res, next) => {
    try {
        const Users = await User.find()
        res.status(200).json(Users); 
    } catch (error) {
        const err = createErr(404, "not found Users!", error);
        next(err)
    }
}