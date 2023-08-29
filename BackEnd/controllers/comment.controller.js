/**
 * Programmer: Raden Fadhil Anugerah Ardiwilaga
 * Filename: 17 June 2023
 * Contact: fadhilanugrah21@upi.edu
 * Date: server.js
 * Description: This is the code for running the servers
 * */
import Comment from '../models/Comment.js';
import Video from '../models/Video.js';

export const addComment = async (
  /* @type import('express').Request */ req,
  /** @type import('express').Response */ res,
) => {
  try {
    const newComment = new Comment({ ...req.body, userId: req.user.id });
    const savedComment = await newComment.save();
    const response = res.status(200).json({
      status: 'success',
      data: savedComment,
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

export const deleteComment = async (
  /* @type import('express').Request */ req,
  /** @type import('express').Response */ res,
) => {
  const { id } = req.params;
  try {
    const comment = await Comment.findById(req.params.id);
    const video = await Video.findById(req.params.id);
    if (req.user.id === comment.userId || req.user.id === video.userId) {
      await Comment.findByIdAndDelete(id);
      const response = res.status(200).json({
        status: 'success',
        message: 'Comment deleted successfully',
      });
      return response;
    }
    const response = res.status(403).json({
      status: 'fail',
      message: 'You are not allowed to delete this comment',
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

export const getComment = async (
  /* @type import('express').Request */ req,
  /** @type import('express').Response */ res,
) => {
  const { videoId } = req.params;
  try {
    const comments = await Comment.findById(videoId);
    const response = res.status(200).json({
      status: 'success',
      data: comments,
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
