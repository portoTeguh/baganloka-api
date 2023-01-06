import express from 'express';
import { createUser, deleteUser, getDetailUser, getUsers, updateUser } from '../controllers/User.js';

const router = express.Router();

// store
router.post('/', createUser)

// update
router.put('/:id', updateUser)

// delete
router.delete('/:id', deleteUser)

// get detail
router.get('/:id', getDetailUser)

// get all
router.get('/', getUsers)


export default router;