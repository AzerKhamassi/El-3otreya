const express = require('express');
const router = express.Router();
const multer = require('multer');
const checkAuth = require('../middlewares/check-auth');
const productsController = require('../controllers/products');

const storage = multer.diskStorage({
  destination: function (req, file, cb) {
    cb(null, './uploads/');
  },
  filename: function (req, file, cb) {
    cb(null, file.originalname);
  },
});

const fileFilter = (req, file, cb) => {
  if (
    file.mimeType === 'image/jpeg' ||
    file.mimeType === 'image/jpg' ||
    file.mimeType === 'image/png'
  ) {
    cb(null, true);
  } else {
    cb(null, false);
  }
};

const upload = multer({
  storage: storage,
  limits: { fileSize: 1024 * 1024 * 3 },
  // fileFilter: fileFilter,
});

router.post(
  '/',
  checkAuth,
  // upload.single('productImage'),
  productsController.createProduct
);

router.get('/', productsController.getAllProducts);

router.get('/visible', productsController.getVisibleProducts);

router.get('/:productId', productsController.getProduct);

router.patch('/:productId', checkAuth, productsController.updateProduct);

router.delete('/:productId', checkAuth, productsController.deleteProduct);

module.exports = router;
