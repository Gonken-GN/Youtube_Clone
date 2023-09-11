/**
 * Programmer: Raden Fadhil Anugerah Ardiwilaga
 * Filename: 17 June 2023
 * Contact: fadhilanugrah21@upi.edu
 * Date: server.js
 * Description: This is the code for running the servers
 * */

import express from 'express';
import { signUp, signIn, googleAuth } from '../controllers/auth.controller.js';

const router = express.Router();
router.post('/signup', signUp);
router.post('/signin', signIn);
router.post('/google', googleAuth);

export default router;
