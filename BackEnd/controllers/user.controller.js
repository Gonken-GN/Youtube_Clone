/**
 * Programmer: Raden Fadhil Anugerah Ardiwilaga
 * Filename: 17 June 2023
 * Contact: fadhilanugrah21@upi.edu
 * Date: server.js
 * Description: This is the code for running the servers
 * */
import User from '../models/User.js';

export const updateUser = async (
  /* @type import('express').Request */ req,
  /** @type import('express').Response */ res,
) => {
  const { id } = req.params;
  if (id === req.user.id) {
    try {
      const updatedUser = await User.findByIdAndUpdate(id, {
        $set: req.body,
      }, { new: true });
      const response = res.status(200).json({
        status: 'success',
        data: updatedUser,
      });
      return response;
    } catch (error) {
      const response = res.status(400).json({
        status: 'fail',
        message: error.message,
      });
      return response;
    }
  } else {
    const response = res.status(403).json({
      status: 'fail',
      message: 'You can only update on your account',
    });
    return response;
  }
};

export const deleteUser = async (
  /* @type import('express').Request */ req,
  /** @type import('express').Response */ res,
) => {
  const { id } = req.params;
  if (id === req.user.id) {
    try {
      await User.findByIdAndDelete(id);
      const response = res.status(200).json({
        status: 'success',
        message: 'User deleted successfully',
      });
      return response;
    } catch (error) {
      const response = res.status(400).json({
        status: 'fail',
        message: error.message,
      });
      return response;
    }
  } else {
    const response = res.status(403).json({
      status: 'fail',
      message: 'You can only delete on your account',
    });
    return response;
  }
};

export const getUser = async (
  /* @type import('express').Request */ req,
  /** @type import('express').Response */ res,
) => {
  const { id } = req.params;
  try {
    const user = await User.findById(id);
    if (!user) {
      const response = res.status(401).json({
        status: 'fail',
        message: 'User not found',
      });
      return response;
    }
    const response = res.status(200).json({
      status: 'success',
      data: user,
    });
    return response;
  } catch (error) {
    const response = res.status(400).json({
      status: 'fail',
      message: error.message,
    });
    return response;
  }
};

export const getAllUser = async (
  /* @type import('express').Request */ req,
  /** @type import('express').Response */ res,
) => {
  try {
    const user = await User.find();
    if (!user) {
      const response = res.status(401).json({
        status: 'fail',
        message: 'User not found',
      });
      return response;
    }
    const response = res.status(200).json({
      status: 'success',
      data: user,
    });
    return response;
  } catch (error) {
    const response = res.status(400).json({
      status: 'fail',
      message: error.message,
    });
    return response;
  }
};

export const subscribe = async (
  /* @type import('express').Request */ req,
  /** @type import('express').Response */ res,
) => {
  const { id } = req.params;
  try {
    const user = await User.findById(req.user.id, {
      $push: { subscribedUsers: id },
    });
    const subscribedUsers = await User.findByIdAndUpdate(id, {
      $inc: { subscribers: 1 },
    });
    const response = res.status(200).json({
      status: 'success',
      message: 'Subscribed successfully',
      data: { user, subscribedUsers },
    });
    return response;
  } catch (error) {
    const response = res.status(400).json({
      status: 'success',
      message: error.message,
    });
    return response;
  }
};

export const unSubscribe = async (
  /* @type import('express').Request */ req,
  /** @type import('express').Response */ res,
) => {
  const { id } = req.params;
  try {
    const user = await User.findById(req.user.id, {
      $pull: { subscribedUsers: id },
    });
    const subscribedUsers = await User.findByIdAndUpdate(id, {
      $inc: { subscribers: -1 },
    });
    const response = res.status(200).json({
      status: 'success',
      message: 'Unsubscribed successfully',
      data: { user, subscribedUsers },
    });
    return response;
  } catch (error) {
    const response = res.status(400).json({
      status: 'success',
      message: error.message,
    });
    return response;
  }
};

export const likeVideo = async (
  /* @type import('express').Request */ req,
  /** @type import('express').Response */ res,
) => {

};

export const dislikeVideo = async (
  /* @type import('express').Request */ req,
  /** @type import('express').Response */ res,
) => {

};
