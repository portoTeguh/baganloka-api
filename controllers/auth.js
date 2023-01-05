
import User from "../models/User.js";
import { createErr } from "../utils/error.js";
import moment from "moment-timezone";
import bcrypt from "bcryptjs";

export const register = async(req, res, next) => {
    try {

        const salt = bcrypt.genSaltSync(10);
        const hash = bcrypt.hashSync(req.body.password, salt);

        const newUser = new User({
            username: req.body.username,
            email: req.body.email,
            password: hash,
            createdAt: moment.tz("Asia/Jakarta").format(),
            updatedAt: moment().tz("Asia/Jakarta").format()
        })

        await newUser.save();
        res.status(200).send("User has been created")

    } catch (error) {
        const err = createErr(500, 'lihat stack error', error)
        next(err)
    }
}

export const login = async(req, res, next) => {
    try {
        const user = await User.findOne({
            username: req.body.username
        })
        // apabila username tidak ditemukan
        if(!user) return next(createErr(404, "User Not Found!"))

        // apabila password correct
        const isPasswordCorrect = await bcrypt.compare(req.body.password, user.password)
        if(!isPasswordCorrect) return next(createErr(400, "Wrong password or username"))

        const {password, isAdmin, ...otherDetails} = user

        res.status(200).send(...otherDetails)

    } catch (error) { 
        const err = createErr(500, 'lihat stack error', error)
        next(err)
    }
} 