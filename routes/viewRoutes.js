const express = require('express');
const viewController = require('../controllers/viewController');
const authController = require('../controllers/authController');

const router = express.Router();

// Middleware for rendering pages
router.get('/community', authController.protect, viewController.getCommunity);
router.get('/member', authController.protect, viewController.getMember);

router.get(
  '/dashboard',
  authController.protect,
  authController.restrictTo('admin'),
  viewController.getDash
);

// router.post('/signup-user', viewController.signUpUser);

router.get('/', viewController.getEvents);
router.use(authController.isLoggedIn);
router.get('/about', viewController.getAbout);
router.get('/blog', viewController.getBlogs);
router.get('/contact', viewController.getContact);
router.get('/login', viewController.getLogin);
router.get('/signup', viewController.getSignup);
router.get('/blog/:slug', viewController.getBlog);
router.get('/settings', viewController.getSettings);

module.exports = router;
