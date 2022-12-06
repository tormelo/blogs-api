const express = require('express');
const { categoriesController } = require('../controllers');
const validateToken = require('../middlewares/validateToken');

const router = express.Router();

router.post(
  '/',
  validateToken,
  categoriesController.register,
);

module.exports = router;