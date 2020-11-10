const mongoose = require('mongoose');

const userSchema = mongoose.Schema({
  name: { type: String, required: true },
  email: { type: String, required: true, unique: true },
  password: { type: String, required: true },
  totalExpenses: { type: Number, default: 0 },
  // products: [{ type: mongoose.Schema.Types.ObjectId, ref: 'product' }],

  // orders : [{type: String, ref: 'order'}]
});

module.exports = mongoose.model('User', userSchema);
