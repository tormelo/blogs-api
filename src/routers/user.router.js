const express = require('express');
const { userController } = require('../controllers');
const validateToken = require('../middlewares/validateToken');

const router = express.Router();

router.post(
  '/',
  userController.register,
);

router.get(
  '/',
  validateToken,
  userController.getAll,
);

module.exports = router;