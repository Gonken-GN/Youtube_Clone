/**
 * Programmer: Raden Fadhil Anugerah Ardiwilaga
 * Filename: 17 June 2023
 * Contact: fadhilanugrah21@upi.edu
 * Date: server.js
 * Description: This is the code for running the servers
 * */

import express from 'express';
import {
  deleteUser, dislikeVideo, getAllUser, getUser, likeVideo, subscribe, unSubscribe, updateUser,
} from '../controllers/user.controller.js';
import { verifyToken } from '../middleware/verifyToken.js';

const router = express.Router();
router.put('/:id', verifyToken, updateUser);
router.delete('/:id', verifyToken, deleteUser);
router.get('/', getAllUser);
router.get('/:id', getUser);
router.put('/subscribe/:id', verifyToken, subscribe);
router.put('/unsubscribe/:id', verifyToken, unSubscribe);
router.put('/like/:videoId', verifyToken, likeVideo);
router.put('/dislike/:videoId', verifyToken, dislikeVideo);

export default router;
