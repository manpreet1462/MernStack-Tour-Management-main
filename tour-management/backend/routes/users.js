import { deleteUser, getAllUser, getSingleUser, updateUser } from "../controllers/userController.js";
import express from 'express';
import {verifyAdmin, verifyUser} from '../utils/verifyToken.js'
const router=express.Router();

//update a user
router.put('/:id',verifyUser,updateUser);
//delete a user
router.delete('/:id',verifyUser,deleteUser);
//get a single user
router.get('/:id',verifyUser,getSingleUser);
//get all users detail
router.get('/',verifyAdmin,getAllUser);



export default router