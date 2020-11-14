const mongoose = require('mongoose');

const orderSchema = mongoose.Schema({
  user: {
    type: mongoose.Schema.Types.ObjectId,
    ref: 'User',
    required: true,
  },
  // items: [{ type: String }],
  items: [{ type: mongoose.Schema.Types.ObjectId, ref: 'Item' }],
  date: { type: String, required: true },
});

module.exports = mongoose.model('Order', orderSchema);
