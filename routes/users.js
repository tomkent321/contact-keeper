const express = require('express');
const router = express.Router();
const { check, validationResult } = require('express-validator');

const User = require('../models/User');

// @route   POST api/users
// @desc    Register a user
// @access  Publie
router.post(
  '/',
  [
    check('name', 'Name is requires')
      .not()
      .isEmpty(),
    check('email', 'Must be a valid email').isEmail(),
    check('password', 'Password must be at least 6 characters long').isLength(
      { min: 6 },
      { max: 10 }
    )
  ],
  (req, res) => {
    const errors = validationResult(req);
    if (!errors.isEmpty()) {
      return res.status(400).json({ errors: errors.array() });
    }
    res.send('valid input');
  }
);

module.exports = router;
