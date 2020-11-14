const Item = require('../models/Item');
const Order = require('../models/Order');

exports.createOrder = async (req, res) => {
  try {
    const items = req.body.products.map((product) => {
      return { product: product._id, quantity: product.quantity };
    });
    const order = new Order({
      user: req.user.userId,
      date: new Date().toISOString(),
      items,
    });
    await order.save();
    res.status(201).json({ order: order });
  } catch (error) {
    res.status(500).json({ error: error });
  }
};

exports.getAllOrders = async (req, res, next) => {
  try {
    const orders = await Order.find().populate('items.product');
    res.status(200).json({ orders: orders });
  } catch (error) {
    console.log(error);
    res.status(500).json({ error: error });
  }
};

exports.getOrdersbyUser = async (req, res, next) => {
  try {
    const orders = await Order.find({ user: req.user.userId })
      .populate({ path: 'products', model: 'Product' })
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
