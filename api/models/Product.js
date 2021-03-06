const mongoose = require('mongoose');

const productSchema = mongoose.Schema({
  name: { type: String, required: true },
  price: { type: Number, required: true },
  user: {
    type: mongoose.Schema.Types.ObjectId,
    ref: 'User',
  },
  visibility: { type: Boolean, default: true },
  // productImage: { type: String, required: true },
});

module.exports = mongoose.model('Product', productSchema);
