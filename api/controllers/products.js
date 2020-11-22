const Product = require('../models/Product');
const User = require('../models/User');
exports.createProduct = async (req, res) => {
  try {
    let product = new Product({
      name: req.body.name,
      price: req.body.price,
      user: req.user.userId,
      // productImage: req.file.path,
    });
    await User.findOneAndUpdate(
      { _id: req.user.userId },
      { $push: { products: product } }
    );
    product = await product.save();
    res.status(201).json({ createdProduct: product });
  } catch (error) {
    res.status(500).json({ error: error });
  }
};

exports.getAllProducts = async (req, res) => {
  try {
    const products = await Product.find()
      // .populate('user', '-__v -password')
      .select('-__v');
    res.status(200).json({ products: products });
  } catch (error) {
    res.status(500).json({ error: error });
  }
};
exports.getVisibleProducts = async (req, res) => {
  try {
    const products = await Product.find({ visibility: true })
      .populate('user', '-__v -password')
      .select('-__v');
    res.status(200).json({ products: products });
  } catch (error) {
    res.status(500).json({ error: error });
  }
};
exports.getUserProducts = async (req, res) => {
  try {
    const products = await Product.find({ user: req.user.userId })
      .populate('user', '-__v -password')
      .select('-__v');
    res.status(200).json({ products: products });
  } catch (error) {
    res.status(500).json({ error: error });
  }
};

exports.getProduct = async (req, res) => {
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

exports.updateProduct = async (req, res) => {
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

exports.deleteProduct = async (req, res) => {
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
