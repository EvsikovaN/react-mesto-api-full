const express = require('express');
const userController = require('../controllers/userController');
const { validateUserId, validateUser, validateAvatar } = require('../utils/validation');

const userRoutes = express.Router();

userRoutes.get('/', userController.getUsers);
userRoutes.get('/me', userController.getUserInfo);
userRoutes.get('/:userId', validateUserId, userController.getUserById);
userRoutes.patch('/me', validateUser, userController.updateProfileInfo);
userRoutes.patch('/me/avatar', validateAvatar, userController.updateAvatar);

module.exports = { userRoutes };
