const mongoose = require('mongoose');

const orderSchema = mongoose.Schema({
  // product: {
  //   type: mongoose.Schema.Types.ObjectId,
  //   ref: 'Product',
  //   required: true,
  // },
  user: {
    type: mongoose.Schema.Types.ObjectId,
    ref: 'User',
    required: true,
  },
  products: [{ type: mongoose.Schema.Types.ObjectId, ref: 'product' }],
  // quantity: { type: Number, default: 1 },
});

module.exports = mongoose.model('Order', orderSchema);
