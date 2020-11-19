const mongoose = require('mongoose');

const orderSchema = mongoose.Schema({
  user: {
    type: mongoose.Schema.Types.ObjectId,
    ref: 'User',
  },
  items: [
    {
      product: {
        type: mongoose.Schema.Types.ObjectId,
        ref: 'Product',
      },
      quantity: { type: Number, required: true },
    },
  ],
  date: { type: Date, required: true },
});

module.exports = mongoose.model('Order', orderSchema);
