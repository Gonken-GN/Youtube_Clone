/**
 * Programmer: Raden Fadhil Anugerah Ardiwilaga
 * Filename: 17 June 2023
 * Contact: fadhilanugrah21@upi.edu
 * Date: server.js
 * Description: This is the code for running the servers
 * */

import express from 'express';
import { addComment, deleteComment, getComment } from '../controllers/comment.controller.js';
import { verifyToken } from '../middleware/verifyToken.js';

const router = express.Router();
router.post('/', verifyToken, addComment);
router.delete('/:id', verifyToken, deleteComment);
router.get('/:videoId', verifyToken, getComment);

export default router;
