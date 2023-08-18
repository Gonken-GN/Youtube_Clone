/**
 * Programmer: Raden Fadhil Anugerah Ardiwilaga
 * Filename: 17 June 2023
 * Contact: fadhilanugrah21@upi.edu
 * Date: server.js
 * Description: This is the code for running the servers
 * */

// import mongoose from 'mongoose';
import bcrypt from 'bcrypt';
import jwt from 'jsonwebtoken';
import User from '../models/User.js';

export const signUp = async (
  /** @type import('express').Request */ req,
  /** @type import('express').Response */ res,
) => {
  const { name, email, password } = req.body;
  try {
    const salt = await bcrypt.genSalt(10);
    const hashPassword = await bcrypt.hash(password, salt);
    const newUser = await User({
      name,
      email,
      password: hashPassword,
    });
    await newUser.save();
    const response = res.status(200).json({
      status: 'success',
      data: newUser,
    });
    return response;
  } catch (err) {
    const response = res.status(500).json({
      status: 'fail',
      message: err.message,
    });
    return response;
  }
};

export const signIn = async (
  /** @type import('express').Request */ req,
  /** @type import('express').Response */ res,
) => {
  const { name, password } = req.body;
  try {
    const user = await User.findOne({ name });
    if (!user) {
      const response = res.status(500).json({
        status: 'fail',
        message: 'User not found',
      });
      return response;
    }
    const isCorrect = await bcrypt.compare(password, user.password);
    if (!isCorrect) {
      const response = res.status(500).json({
        status: 'fail',
        message: 'Wrong password',
      });
      return response;
    }
    const token = jwt.sign({ id: user._id }, process.env.JWT_SECRET);
  } catch (err) {
    const response = res.status(500).json({
      status: 'fail',
      message: err.message,
    });
    return response;
  }
};
