/* eslint-disable */
// const slugify = require('slugify');
const Event = require('../models/eventModel');
const Post = require('../models/postModel');
const Member = require('../models/memberModel');
const AppError = require('../utils/appError');
const User = require('../models/userModel');
const jwt = require('jsonwebtoken');
const catchAsync = require('../utils/catchAsync');

const signToken = id => {
  return jwt.sign({ id }, process.env.JWT_SECRET, {
    expiresIn: process.env.JWT_EXPIRES_IN
  });
};

const createSendToken = (user, statusCode, res) => {
  const token = signToken(user._id);
  const cookieOptions = {
    expires: new Date(
      // @ts-ignore
      Date.now() + process.env.JWT_COOKIE_EXPIRES_IN * 24 * 60 * 60 * 1000
    ),
    httpOnly: true
  };
  if (process.env.NODE_ENV === 'production') cookieOptions.secure = true;

  res.cookie('jwt', token, cookieOptions);

  // Remove password from output
  user.password = undefined;

  res.status(statusCode).json({
    status: 'success',
    token,
    data: {
      user
    }
  });
};

// SIGNUP USER
exports.signUpUser = catchAsync(async (req, res, next) => {
  const newUser = await User.create({
    name: req.body.name,
    email: req.body.email,
    password: req.body.password,
    passwordConfirm: req.body.passwordConfirm,
    role: req.body.role
  });

  createSendToken(newUser, 201, res.render('base'));
});

exports.getEvents = catchAsync(async (req, res, next) => {
  // 1-) Get data from the database
  const events = await Event.find();

  res.status(200).render('base', {
    title: 'Collaborative Network of African Phage Researchers',
    events
  });
});

exports.getAbout = catchAsync(async (req, res, next) => {
  res.status(200).render('about', {
    title: 'who we are and what we do'
  });
});

exports.getCommunity = catchAsync(async (req, res, next) => {
  const members = await Member.find();

  res.status(200).render('community', {
    title: 'Join our community of scholars',
    members
  });
});

exports.getBlogs = catchAsync(async (req, res, next) => {
  const posts = await Post.find();

  res.status(200).render('blog', {
    title: 'Blog',
    posts
  });
});

exports.getBlog = catchAsync(async (req, res, next) => {
  const post = await Post.findOne({ slug: req.params.slug });

  if (!post) {
    return next(new AppError('There is no post with that name'));
  }

  res.status(200).render('singlePost', {
    title: `${post.name}`,
    post
  });
});

exports.getContact = (req, res, next) => {
  res.status(200).render('contact', {
    title: 'Contact Us'
  });
};

exports.getLogin = (req, res, next) => {
  res.status(200).render('login', {
    title: 'Log into your account'
  });
};

exports.getSignup= (req, res, next) => {
  res.status(200).render('signup', {
    title: 'Sign Up'
  });
};

exports.getDash = (req, res, next) => {
  res.status(200).render('Dashboard', {
    title: 'Dashboard'
  });
};

exports.getSettings = (req, res, next) => {
  res.status(200).render('settings', {
    title: 'Edit Profile'
  });
};

exports.getMember = (req, res, next) => {
  res.status(200).render('member', {
    title: 'Join Our Community'
  });
};
