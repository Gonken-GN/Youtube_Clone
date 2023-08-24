/**
 * Programmer: Raden Fadhil Anugerah Ardiwilaga
 * Filename: 17 June 2023
 * Contact: fadhilanugrah21@upi.edu
 * Date: server.js
 * Description: This is the code for running the servers
 * */
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
  } catch (error) {

  }
};

export const deleteVideo = async (
  /* @type import('express').Request */ req,
  /** @type import('express').Response */ res,
) => {

};

export const getVideo = async (
  /* @type import('express').Request */ req,
  /** @type import('express').Response */ res,
) => {

};
