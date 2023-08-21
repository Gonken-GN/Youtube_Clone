/**
 * Programmer: Raden Fadhil Anugerah Ardiwilaga
 * Filename: 17 June 2023
 * Contact: fadhilanugrah21@upi.edu
 * Date: server.js
 * Description: This is the code for running the servers
 * */
import User from '../models/User.js';

export const updateUser = async (
  /* @t* ype import('express').Request */ req,
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
      const response = res.status(200).json({
        status: 'success',
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
