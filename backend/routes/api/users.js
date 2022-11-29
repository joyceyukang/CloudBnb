const express = require('express')

const { setTokenCookie, requireAuth } = require('../../utils/auth');
const { User } = require('../../db/models');

const router = express.Router();

const { check } = require('express-validator');
const { handleValidationErrors } = require('../../utils/validation');

const validateSignup = [
  check('email')
    .exists({ checkFalsy: true })
    .isEmail()
    .withMessage('Please provide a valid email.'),
  check('username')
    .exists({ checkFalsy: true })
    .isLength({ min: 4 })
    .withMessage('Please provide a username with at least 4 characters.'),
  check('username')
    .not()
    .isEmail()
    .withMessage('Username cannot be an email.'),
  check('password')
    .exists({ checkFalsy: true })
    .isLength({ min: 6 })
    .withMessage('Password must be 6 characters or more.'),
  handleValidationErrors
];

// Sign up
router.post(
  '/',
  validateSignup
  ,
  async (req, res) => {
    const { firstName, lastName, email, password, username } = req.body;

    const existingEmail = await User.findOne({
      where: { email: email }
    })
    const existingUsername = await User.findOne({
      where: { username: username }
    })


    if (existingEmail) {
      return res.json({
        "message": "User already exists",
        "statusCode": 403,
        "errors": {
          "email": "User with that email already exists"
        }
      })
    }

    if (existingUsername) {
      return res.json({
        "message": "User already exists",
        "statusCode": 403,
        "errors": {
          "username": "User with that username already exists"
        }
      })
    }

    if (!firstName || !lastName || !email || !password || !username ||
      firstName === "" || lastName === "" || email === "" || password === "" || username === "") {
      return res.json({
        "message": "Validation error",
        "statusCode": 400,
        "errors": {
          "email": "Invalid email",
          "username": "Username is required",
          "firstName": "First Name is required",
          "lastName": "Last Name is required"
        }
      })
    }

    let user = await User.signup({ firstName, lastName, email, username, password });
    
    let token = await setTokenCookie(res, user);

    user = user.toJSON()

    user.token = token

    delete user.createdAt
    delete user.updatedAt
    
    return res.json(user);
  }
);

module.exports = router;