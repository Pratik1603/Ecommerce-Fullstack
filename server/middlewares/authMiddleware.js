import jwt from 'jsonwebtoken';
import { errorHandler } from '../utils/error.js';
export const authMiddleware = (req, res, next) => {
  
  const cookieHeader = req.headers.cookie;
  // console.log(cookieHeader);
// Parse the cookie header to get individual cookies
const cookies = cookieHeader?.split(';').reduce((cookiesObject, cookie) => {
    const [name, value] = cookie.trim().split('=');
    cookiesObject[name] = value;
    return cookiesObject;
}, {});

// Access the access_token and userId from the cookies
const token = cookies.access_token;
  // middleware which gets the token from cooke and validates the user
  if (!token) {
    return next(errorHandler(401, 'Unauthorized'));
  }
  jwt.verify(token, process.env.JWT_SECRET, (err, user) => {
    if (err) {
      return next(errorHandler(401, 'Unauthorized'));
    }
    req.user = user;
    next();
  });
};