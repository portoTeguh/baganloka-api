import User from "../models/User.js";
import { createErr } from "../utils/error.js";
import _ from 'lodash';

export const updateUser = async (req, res, next) => {
  try {
    
    if(req.body.password || req.body.isAdmin){
      const err = createErr(400, "Not Allowed update at username, password, email");
      return next(err)
    }

   const updateFields = {}
   if(req.body.email) updateFields.email = req.body.email
   if(req.body.username) updateFields.username = req.body.username

   const updateUser = await User.findByIdAndUpdate(
    req.params.id,
    {$set: updateFields},
    {new: true}
   )

   const { password, ...other } = updateUser._doc

   res.status(200).json({...other}) 

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
    const user = await User.findById(req.params.id).select(
      "-password -isAdmin"
    );
    res.status(200).json(user);
  } catch (error) {
    // res.status(500).json(error)
    const err = createErr(404, "not found User!", error);
    next(err);
  }
};

export const getUsers = async (req, res, next) => {
  try {
    const users = await User.find().select("-password -isAdmin");
    res.status(200).json(users);
  } catch (error) {
    const err = createErr(404, "not found Users!", error);
    next(err);
  }
};
