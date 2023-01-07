import express from 'express';
import {  deleteUser, getDetailUser, getUsers, updateUser } from '../controllers/user.js';
import { verifyAdmin, verifyToken, verifyUser } from '../utils/verifyToken.js';

const router = express.Router();

// check router
router.get("/check-auth", verifyToken, (req, res, next) => {
    res.send('you autheticated')
})
router.get('/checkuser/:id', verifyUser, (req, res, next) => {
    res.send('user autenticated')
})
router.get('/checkadmin/:id', verifyAdmin, (req, res, next) => {
    res.send('admin autenticated')
})

// update
router.put('/:id', updateUser)

// delete
router.delete('/:id', deleteUser)

// get detail
router.get('/:id', getDetailUser)

// get all
router.get('/', getUsers)


// router.get("/*", (req, res, next) => {
//     res.send('Not Found!')
// })


export default router;