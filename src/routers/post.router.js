const express = require('express');
const { postController } = require('../controllers');

const validateToken = require('../middlewares/validateToken');

const router = express.Router();

router.post(
  '/',
  validateToken,
  postController.register,
);

router.get(
  '/',
  validateToken,
  postController.getAll,
);

module.exports = router;