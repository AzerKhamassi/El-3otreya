const Product = require('../models/Product');
const User = require('../models/User');
exports.createProduct = async (req, res, next) => {
  try {
    const user = await User.findById(req.user.userId);
    if (!user) {
      res
        .status(404)
        .json({ message: 'The user with the given ID is not found' });
    } else {
      let product = new Product({
        name: req.body.name,
        price: req.body.price,
        user: req.user.userId,
        // productImage: req.file.path,
      });
      product = await product.save();
      res.status(201).json({ createdProduct: product });
    }
  } catch (error) {
    res.status(500).json({ error: error });
  }
};

exports.getAllProducts = async (req, res, next) => {
  try {
    const products = await Product.find()
      .populate('user', '-__v -password')
      .select('-__v');
    res.status(200).json({ products: products });
  } catch (error) {
    res.status(500).json({ error: error });
  }
};

exports.getProduct = async (req, res, next) => {
  try {
    const product = await Product.findById(req.params.productId).select('-__v');
    if (!product) {
      res.status(404).send('The product with the given ID is not found');
    } else {
      res.status(200).json({ product: product });
    }
  } catch (error) {
    res.status(500).json({ error: error });
  }
};

exports.updateProduct = async (req, res, next) => {
  try {
    const updateOps = {};
    for (const ops of req.body) {
      updateOps[ops.propName] = ops.value;
    }
    updatedProduct = await Product.findOneAndUpdate(
      { _id: req.params.productId },
      { $set: updateOps },
      { new: true }
    );
    if (!updatedProduct) {
      res
        .status(404)
        .json({ message: 'The product with the given ID is not found' });
    } else {
      res.status(200).json({ updatedProduct: updatedProduct });
    }
  } catch (error) {
    res.status(500).json({ error: error });
  }
};

exports.deleteProduct = async (req, res, next) => {
  try {
    const product = await Product.findByIdAndRemove(req.params.productId);
    if (!product) {
      res.status(404).send('The product with the given ID is not found');
    } else {
      res.status(200).json({ message: 'Deleted successfully.' });
    }
  } catch (error) {
    res.status(500).json({ error: error });
  }
};
