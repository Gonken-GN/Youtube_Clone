/**
 * Programmer: Raden Fadhil Anugerah Ardiwilaga
 * Filename: 17 June 2023
 * Contact: fadhilanugrah21@upi.edu
 * Date: server.js
 * Description: This is the code for running the servers
 * */

import express from 'express';
import { deleteUser, updateUser } from '../controllers/user.controller.js';
import { verifyToken } from '../middleware/verifyToken.js';

const router = express.Router();
router.put('/:id', verifyToken, updateUser);
router.delete('/:id', verifyToken, deleteUser);

export default router;
