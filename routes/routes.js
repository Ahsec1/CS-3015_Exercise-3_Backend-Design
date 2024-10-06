const express = require('express');
const router = express.Router();
const userController = require('../controllers/userController');
const authToken = require('../middleware/authMiddleware'); 
const rateLimiter = require('../middleware/rateLimiterMiddleware');

router.post('/Login', rateLimiter, userController.loginUser);
router.post('/Register', rateLimiter, userController.registerUser);
router.get('/UserProfile', rateLimiter, authToken, userController.fetchUserProfile); 
router.get('/UsersData', rateLimiter, userController.usersData);

module.exports = router;
