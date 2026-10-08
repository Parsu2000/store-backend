const express = require('express');
const router = express.Router();
const { registerUser, loginUser, getUsers } = require('../controllers/userController');

router.route('/')
  .post(registerUser)
  .get(getUsers);

router.post('/login', loginUser);

module.exports = router;