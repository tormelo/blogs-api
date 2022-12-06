const express = require('express');
const { categoriesController } = require('../controllers');
const validateToken = require('../middlewares/validateToken');

const router = express.Router();

router.post(
  '/',
  validateToken,
  categoriesController.register,
);

router.get(
  '/',
  validateToken,
  categoriesController.getAll,
);

module.exports = router;