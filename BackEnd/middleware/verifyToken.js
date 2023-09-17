import jwt from 'jsonwebtoken';

import * as dotenv from 'dotenv';

dotenv.config();
// eslint-disable-next-line consistent-return
// eslint-disable-next-line import/prefer-default-export
export const verifyToken = (
  /** @type import('express').Request */ req,
  /** @type import('express').Response */ res,
  next,
  // eslint-disable-next-line consistent-return
) => {
  const token = req.cookies.access_token;
  console.log(token);
  if (!token) {
    const response = res.status(401).json({
      status: 'fail',
      message: 'User not logged in',
    });
    return response;
  }
  // eslint-disable-next-line consistent-return
  jwt.verify(token, process.env.JWT_SECRET, (err, user) => {
    if (err) {
      const response = res.status(403).json({
        status: 'fail',
        message: 'Token is invalid',
      });
      return response;
    }
    req.user = user;
    next();
  });
};
