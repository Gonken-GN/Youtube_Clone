/**
 * Programmer: Raden Fadhil Anugerah Ardiwilaga
 * Filename: 17 June 2023
 * Contact: fadhilanugrah21@upi.edu
 * Date: server.js
 * Description: This is the code for running the servers
 * */

import express from 'express';
import {
  addVideo, addView, deleteVideo, getVideo, randomVideo, subscribedVideo, trendVideo, updateVideo,
} from '../controllers/video.controller.js';
import { verifyToken } from '../middleware/verifyToken.js';

const router = express.Router();
router.post('/', verifyToken, addVideo);
router.put('/:id', verifyToken, updateVideo);
router.delete('/:id', verifyToken, deleteVideo);
router.get('/find/:id', getVideo);
router.put('/view/:id', addView);
router.get('/trend', trendVideo);
router.get('/random', randomVideo);
router.get('/subscribed', verifyToken, subscribedVideo);

export default router;
