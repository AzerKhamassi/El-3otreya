const User = require('../models/User');
const bcrypt = require('bcrypt');
const jwt = require('jsonwebtoken');

exports.signupUser = async (req, res) => {
  try {
    hashedPassword = await bcrypt.hash(req.body.password, 10);
    let user = await User.findOne({ email: req.body.email });
    if (user) {
      res.status(409).json({ message: 'User already registered.' });
    } else {
      user = new User({
        name: req.body.name,
        email: req.body.email,
        password: hashedPassword,
        isAdmin: req.body.isAdmin,
      });
      user = await user.save();
      res.status(201).json({ userCreated: user });
    }
  } catch (error) {
    res.status(500).json({ error: error });
  }
};

exports.loginUser = async (req, res) => {
  try {
    let user = await User.findOne({ email: req.body.email });
    if (!user) {
      res.status(401).json({ message: 'Invalid email or password .' });
    } else {
      let isValid = await bcrypt.compare(req.body.password, user.password);
      if (!isValid) {
        res.status(401).json({ message: 'Invalid email or password .' });
      } else {
        const token = await jwt.sign(
          {
            userId: user._id,
            name: user.name,
            email: user.email,
            totalExpenses: user.totalExpenses,
          },
          process.env.JWT_KEY
          // { expiresIn: '1h' }
        );
        res.status(200).json({ token: token, user: user });
      }
    }
  } catch (error) {
    res.status(500).json({ error: error });
  }
};

exports.deleteUser = async (req, res) => {
  try {
    const user = await User.findByIdAndRemove(req.params.userId);
    if (!user) {
      res.status(404).send('The user with the given ID is not found');
    } else {
      res.status(200).json({ message: 'Deleted successfully.' });
    }
  } catch (error) {
    res.status(500).json({ error: error });
  }
};

exports.getCurrentUser = async (req, res) => {
  const user = await User.findById(req.user.userId)
    .populate({
      path: 'products',
      model: 'Product',
    })
    .select('-password');
  res.status(200).json({ user: user });
};

exports.getUser = async (req, res) => {
  try {
    const user = await User.findById(req.params.userId).populate({
      path: 'products',
      model: 'Product',
    });
    if (!user) {
      res.status(404).send('The user with the given ID is not found');
    } else {
      res.status(200).json({ user: user });
    }
  } catch (error) {
    res.status(500).json({ error: error });
  }
};

exports.updateUser = async (req, res) => {
  try {
    const updateOps = {};
    for (const ops of req.body) {
      updateOps[ops.propName] = ops.value;
    }
    updatedUser = await User.findOneAndUpdate(
      { _id: req.user.userId },
      { $set: updateOps },
      { new: true }
    );
    if (!updatedUser) {
      res
        .status(404)
        .json({ message: 'The user with the given ID is not found' });
    } else {
      res
        .status(200)
        .json({ message: 'Updated successfully', user: updatedUser });
    }
  } catch (error) {
    res.status(500).json({ error: error });
  }
};

exports.editPassword = async (req, res) => {
  try {
    let user = await User.findById(req.user.userId);
    if (!user) {
      res.status(401).json({ message: 'Invalid user.' });
    } else {
      let isValid = await bcrypt.compare(req.body.password, user.password);
      if (!isValid) {
        res.status(401).json({ message: 'Invalid password.' });
      } else {
        hashedPassword = await bcrypt.hash(req.body.newPassword, 10);
        user.password = hashedPassword;
        await user.save();
        res.status(200).json({ message: 'Password updated Successfully!' });
      }
    }
  } catch (error) {
    res.status(500).json({ error: error });
  }
};
