import jwt from "jsonwebtoken";
import { createErr } from "../utils/error.js";

export const verifyToken = (req, res, next) => {
  const token = req.cookies.access_token;

  if (!token) {
    return next(createErr(401, "Not Autheticated"));
  }

  jwt.verify(token, process.env.JWT, (err, user) => {
    if (err) return next(createErr(403, "token is invalid"));
    req.user = user;

    next();
  });
};

export const verifyUser = (req, res, next) => {
    const token = req.cookies.access_token;

    if (!token) {
        return next(createErr(401, "Not Autheticated"));
    }

    jwt.verify(token, process.env.JWT, (err, user) => {
        if (err) return next(createErr(403, "token is invalid"));
        
        if(req.params.id == user.id){
            next();
        }
        else {
            return next(createErr(403, "user not matching"))
        }
    });
};

export const verifyAdmin = (req,res,next) => {
    const token = req.cookies.access_token;

    if (!token) {
        return next(createErr(401, "Not Autheticated"));
    }

    jwt.verify(token, process.env.JWT, (err, user) => {
        if (err) return next(createErr(403, "token is invalid"));
        
        if(req.params.id == user.id && user.isAdmin){
            next();
        }
        else {
            return next(createErr(403, "your not admin"))
        }
    });
}
