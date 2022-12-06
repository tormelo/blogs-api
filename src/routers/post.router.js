const express = require('express');
const { postController } = require('../controllers');

const validateToken = require('../middlewares/validateToken');

const router = express.Router();

router.post(
  '/',
  validateToken,
  postController.register,
);

router.put(
  '/:id',
  validateToken,
  postController.update,
);

router.delete(
  '/:id',
  validateToken,
  postController.remove,
);

router.get(
  '/:id',
  validateToken,
  postController.getById,
);

router.get(
  '/',
  validateToken,
  postController.getAll,
);

module.exports = router;