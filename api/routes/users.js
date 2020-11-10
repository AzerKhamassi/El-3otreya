const express = require('express');
const userController = require('../controllers/users');
const checkAuth = require('../middlewares/check-auth');
const router = express.Router();

router.post('/signup', userController.signupUser);

router.post('/login', userController.loginUser);

router.get('/me', checkAuth, userController.getCurrentUser);

router.patch('/editpassword', checkAuth, userController.editPassword);

router.get('/:userId', userController.getUser);

router.patch('/:userId', checkAuth, userController.updateUser);

router.delete('/:userId', userController.deleteUser);

module.exports = router;
