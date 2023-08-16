/**
 * Programmer: Raden Fadhil Anugerah Ardiwilaga
 * Filename: 17 June 2023
 * Contact: fadhilanugrah21@upi.edu
 * Date: server.js
 * Description: This is the code for running the servers
 * */

import express from 'express';
import * as dotenv from 'dotenv';
import bodyParser from 'body-parser';
import mongoose from 'mongoose';

const init = () => {
  // setting up the server
  const server = express();
  server.use(bodyParser.json({ limit: '10mb', extended: true }));
  server.use(bodyParser.urlencoded({ limit: '10mb', extended: true }));

  // register the routes

  // get env from .env file
  dotenv.config();
  // get port from .env
  const PORT = process.env.PORT || 5000;

  // start the server
  mongoose
    .connect(process.env.MONGOOSE_CONNECT_URL)
    .then(() => server.listen(PORT, () => console.log(`Server running on http://localhost:${PORT}`)))
    .catch((error) => console.log(error.message));
};

init();
