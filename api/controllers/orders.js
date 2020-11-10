const Order = require('../models/Order');
const Product = require('../models/Product');
const User = require('../models/User');

exports.createOrder = async (req, res, next) => {
  try {
    // const product = await Product.findById(req.body.productId);
    const user = await User.findById(req.body.userId);
    if (!user) {
      res
        .status(404)
        .json({ message: 'The user with the given ID is not found' });
    } else {
      // const products = [];
      // products = req.body.products;
      let order = new Order({
        // product: req.body.productId,
        products: req.body.products,
        user: req.body.userId,
        // quantity: req.body.quantity,
      });
      order = await order.save();
      res.status(201).json({ order: order });
    }
    // if (!product) {
    //   res
    //     .status(404)
    //     .json({ message: 'The product with the given ID is not found' });
    // } else {

    // }
  } catch (error) {
    res.status(500).json({ error: error });
  }
};

exports.getAllOrders = async (req, res, next) => {
  try {
    const orders = await Order.find()
      .populate({ path: 'products', model: 'Product' })
      // .populate('user', '-__v')
      .select('-__v');
    res.status(200).json({ orders: orders });
  } catch (error) {
    res.status(500).json({ error: error });
  }
};

exports.getOrdersbyUser = async (req, res, next) => {
  try {
    const orders = await Order.find({ user: req.user.userId })
      .populate({ path: 'products', model: 'Product' })
      // .populate('user', '-__v')
      .select('-__v');
    res.status(200).json({ orders: orders });
  } catch (error) {
    res.status(500).json({ error: error });
  }
};

exports.getOrder = async (req, res, next) => {
  try {
    const order = await Order.findById(req.params.orderId)
      .populate('product', 'name')
      .select('-__v');
    if (!order) {
      res.status(404).send('The order with the given ID is not found');
    } else {
      res.status(200).json({ order: order });
    }
  } catch (error) {
    res.status(500).json({ error: error });
  }
};

exports.deleteOrder = async (req, res, next) => {
  try {
    const order = await Order.findByIdAndRemove(req.params.orderId);
    if (!order) {
      res.status(404).send('The order with the given ID is not found');
    } else {
      res.status(200).json({ message: 'Deleted successfully.' });
    }
  } catch (error) {
    res.status(500).json({ error: error });
  }
};
