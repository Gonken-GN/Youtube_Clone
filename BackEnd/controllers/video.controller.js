/**
 * Programmer: Raden Fadhil Anugerah Ardiwilaga
 * Filename: 17 June 2023
 * Contact: fadhilanugrah21@upi.edu
 * Date: server.js
 * Description: This is the code for running the servers
 * */
import User from '../models/User.js';
import Video from '../models/Video.js';

export const addVideo = async (
  /* @type import('express').Request */ req,
  /** @type import('express').Response */ res,
) => {
  try {
    const newVIdeo = new Video({ userId: req.user.id, ...req.body });
    await newVIdeo.save();
    const response = res.status(200).json({
      status: 'success',
      data: newVIdeo,
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

export const updateVideo = async (
  /* @type import('express').Request */ req,
  /** @type import('express').Response */ res,
) => {
  const { id } = req.params;
  try {
    const video = await Video.findById(id);
    if (!video) {
      const response = res.status(404).json({
        status: 'fail',
        message: 'Video not found',
      });
      return response;
    }
    if (req.user.id !== video.userId) {
      const response = res.status(404).json({
        status: 'fail',
        message: 'You can only update your video!',
      });
      return response;
    }
    const updatedVideo = await Video.findByIdAndUpdate(id, {
      $set: req.body,
    }, { new: true });
    const response = res.status(200).json({
      status: 'success',
      data: updatedVideo,
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

export const deleteVideo = async (
  /* @type import('express').Request */ req,
  /** @type import('express').Response */ res,
) => {
  const { id } = req.params;
  try {
    const video = await Video.findById(id);
    if (!video) {
      const response = res.status(404).json({
        status: 'fail',
        message: 'Video not found',
      });
      return response;
    }
    if (req.user.id !== video.userId) {
      const response = res.status(404).json({
        status: 'fail',
        message: 'You can only delete your video!',
      });
      return response;
    }
    await Video.findByIdAndDelete(id);
    const response = res.status(200).json({
      status: 'success',
      message: 'Video deleted successfully',
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

export const getVideo = async (
  /* @type import('express').Request */ req,
  /** @type import('express').Response */ res,
) => {
  const { id } = req.params;
  try {
    const video = await Video.findById(id);
    if (!video) {
      const response = res.status(404).json({
        status: 'fail',
        message: 'Video not found',
      });
      return response;
    }
    const response = res.status(200).json({
      status: 'success',
      data: video,
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

export const addView = async (
  /* @type import('express').Request */ req,
  /** @type import('express').Response */ res,
) => {
  const { id } = req.params;
  try {
    const video = await Video.findById(id);
    if (!video) {
      const response = res.status(404).json({
        status: 'fail',
        message: 'Video not found',
      });
      return response;
    }
    const updatedVideo = await Video.findByIdAndUpdate(id, {
      $inc: { views: 1 },
    }, { new: true });
    const response = res.status(200).json({
      status: 'success',
      data: updatedVideo,
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
export const randomVideo = async (
  /* @type import('express').Request */ req,
  /** @type import('express').Response */ res,
) => {
  try {
    const videos = await Video.aggregate([{ $sample: { size: 40 } }]);
    const response = res.status(200).json({
      status: 'success',
      data: videos,
    });
    return response;
  } catch (error) {
    const response = res.status(404).json({
      status: 'fail',
      message: error.message,
    });
    return response;
  }
};

export const trendVideo = async (
  /* @type import('express').Request */ req,
  /** @type import('express').Response */ res,
) => {
  try {
    const videos = await Video.find().sort({ views: -1 });
    const response = res.status(200).json({
      status: 'success',
      data: videos,
    });
    return response;
  } catch (error) {
    const response = res.status(404).json({
      status: 'fail',
      message: error.message,
    });
    return response;
  }
};

export const subscribedVideo = async (
  /* @type import('express').Request */ req,
  /** @type import('express').Response */ res,
) => {
  try {
    const user = await User.findById(req.user.id);
    const subscribedChannel = user.subscribedUsers;
    const list = await Promise.all(subscribedChannel.map((channelId) => (Video.find({ userId: channelId }))));
    const response = res.status(200).json({
      status: 'success',
      data: list.flat().sort((a, b) => b.createdAt - a.createdAt),
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
