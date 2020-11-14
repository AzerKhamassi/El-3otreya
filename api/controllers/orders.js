const Item = require('../models/Item');
const Order = require('../models/Order');
const User = require('../models/User');

exports.createOrder = async (req, res, next) => {
  try {
    const user = await User.findById(req.user.userId);
    if (!user)
      return res
        .status(404)
        .json({ message: 'The user with the given ID is not found' });

    new Promise((resolve, reject) => {
      const items = [];
      new Promise((r, j) => {
        req.body.products.map(async (product) => {
          const item = new Item({
            product: product,
            quantity: product.quantity,
          });

          item.save().then((res) => {
            items.push(res);
            r(res);
          });
        });
      })
        .then((res) => {
          resolve(items);
        })
        .catch((err) => {
          j(err);
          reject(err);
        });
    }).then(async (resItems) => {
      const order = new Order({
        items: resItems.map((resItem) => resItem._id),
        user: req.user.userId,
        date: new Date().toISOString(),
      });
      await order.save();
      return res.status(201).json({ order: order });
    });
  } catch (error) {
    res.status(500).json({ error: error });
  }
};

exports.getAllOrders = async (req, res, next) => {
  try {
    const orders = await Order.find()
      .populate('items')
      .populate('items.products');
    // .populate({
    //   path: 'items.products',
    // });
    // .select('-__v');
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
