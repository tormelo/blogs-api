const express = require('express');
const { postController } = require('../controllers');

const validateToken = require('../middlewares/validateToken');

const router = express.Router();

router.post(
  '/',
  validateToken,
  postController.register,
);

module.exports = router;