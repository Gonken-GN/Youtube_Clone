/**
 * Programmer: Raden Fadhil Anugerah Ardiwilaga
 * Filename: 17 June 2023
 * Contact: fadhilanugrah21@upi.edu
 * Date: server.js
 * Description: This is the code for running the servers
 * */
import User from '../models/User.js';
import Video from '../models/Video.js';

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
    const user = await User.findByIdAndUpdate(req.user.id, {
      $push: { subscribedUsers: id },
    }, { new: true });
    const subscribedUsers = await User.findByIdAndUpdate(id, {
      $inc: { subscribers: 1 },
    }, { new: true });
    const response = res.status(200).json({
      status: 'success',
      message: 'Subscribed successfully',
      data: { user, subscribedUsers },
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

export const unSubscribe = async (
  /* @type import('express').Request */ req,
  /** @type import('express').Response */ res,
) => {
  const { id } = req.params;
  try {
    const user = await User.findByIdAndUpdate(req.user.id, {
      $pull: { subscribedUsers: id },
    }, { new: true });
    const subscribedUsers = await User.findByIdAndUpdate(id, {
      $inc: { subscribers: -1 },
    }, { new: true });
    const response = res.status(200).json({
      status: 'success',
      message: 'Unsubscribed successfully',
      data: { user, subscribedUsers },
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

export const likeVideo = async (
  /* @type import('express').Request */ req,
  /** @type import('express').Response */ res,
) => {
  const { id } = req.user;
  const { videoId } = req.params;
  try {
    const likedVideo = await Video.findByIdAndUpdate(videoId, {
      $addToSet: { likes: id },
      $pull: { dislikes: id },
    }, { new: true });
    const response = res.status(200).json({
      status: 'success',
      message: 'Video has been liked',
      data: likedVideo,
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

export const dislikeVideo = async (
  /* @type import('express').Request */ req,
  /** @type import('express').Response */ res,
) => {
  const { id } = req.user;
  const { videoId } = req.params;
  try {
    const likedVideo = await Video.findByIdAndUpdate(videoId, {
      $addToSet: { dislikes: id },
      $pull: { likes: id },
    }, { new: true });
    const response = res.status(200).json({
      status: 'success',
      message: 'Video has been disliked',
      data: likedVideo,
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
