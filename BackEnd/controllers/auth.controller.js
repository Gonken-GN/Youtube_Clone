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
  /** @type {import('express').Request} */ req,
  /** @type {import('express').Response} */ res,
  next,
) => {
  const { name, password } = req.body;

  try {
    const user = await User.findOne({ name });

    if (!user) {
      return res.status(401).json({
        status: 'fail',
        message: 'User not found',
      });
    }

    const isCorrect = await bcrypt.compare(password, user.password);

    if (!isCorrect) {
      return res.status(401).json({
        status: 'fail',
        message: 'Wrong password',
      });
    }

    const token = jwt.sign({ id: user._id }, process.env.JWT_SECRET);

    // Remove sensitive data before sending back to the client
    const { password: _, ...data } = user._doc;

    // Setting the cookie
    res.cookie('access_token', token, {
      httpOnly: true,
      // secure: process.env.NODE_ENV === 'production', // Only set to true if using HTTPS
      sameSite: 'strict', // Optional
    });
    return res.status(200).json({
      status: 'success',
      data,
    });
  } catch (err) {
    next(err); // Forward the error to the error-handling middleware

    // Don't send another response here, as next(err) should be handled by a subsequent error-handling middleware
  }
};

export const googleAuth = async (
  /** @type import('express').Request */ req,
  /** @type import('express').Response */ res,
) => {
  const { email } = req.body;
  try {
    const user = await User.findOne({ email });
    if (user) {
      const token = jwt.sign({ id: user._id }, process.env.JWT_SECRET);
      res.cookie('access_token', token, {
        httpOnly: true,
      });
      const response = res.status(200).json({
        status: 'success',
        data: user._doc,
      });
      return response;
    }
    const newUser = User({
      ...req.body,
      fromGoogle: true,
    });
    const savedUser = await newUser.save();
    const token = jwt.sign({ id: user._id }, process.env.JWT_SECRET);
    res.cookie('access_token', token, {
      httpOnly: true,
    });
    const response = res.status(200).json({
      status: 'success',
      data: savedUser._doc,
    });
    return response;
  } catch (error) {
    const response = res.status(500).json({
      status: 'fail',
      message: error.message,
    });
    return response;
  }
};
