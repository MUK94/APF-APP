/* eslint-disable */
const Member = require('../models/memberModel');
const APIFeatures = require('./../utils/apiFeatures');
const catchAsync = require('./../utils/catchAsync');
const AppError = require('./../utils/appError');

// @GET ALL MEMBERS
exports.getAllMembers = catchAsync(async (req, res, next) => {
  const features = new APIFeatures(Member.find(), req.query)
    .filter()
    .sort()
    .limitFields()
    .paginate();
  const members = await features.query;

  // SEND RESPONSE
  res.status(200).json({
    status: 'success',
    results: members.length,
    data: {
      members
    }
  });
});
// @GET A MEMBER
exports.getMember = catchAsync(async (req, res, next) => {
  const member = await Member.findById(req.params.id);

  if (!member) {
    return next(new AppError('No member found with that ID', 404));
  }

  res.status(200).json({
    status: 'success',
    data: {
      member
    }
  });
});

// @CREATE MEMBER
exports.createMember = catchAsync(async (req, res, next) => {
  const newMember = await Member.create(req.body);

  res.status(201).json({
    status: 'success',
    data: {
      member: newMember
    }
  });
});

// @UPDATE MEMBER
exports.updateMember = catchAsync(async (req, res, next) => {
  const member = await Member.findByIdAndUpdate(req.params.id, req.body, {
    new: true,
    runValidators: true
  });

  if (!member) {
    return next(new AppError('No member found with that ID', 404));
  }

  res.status(200).json({
    status: 'success',
    data: {
      member
    }
  });
});

// @DELETE MEMBER
exports.deleteMember = catchAsync(async (req, res, next) => {
  const member = await Member.findByIdAndDelete(req.params.id);

  if (!member) {
    return next(new AppError('No member found with that ID', 404));
  }

  res.status(204).json({
    status: 'success',
    data: null
  });
});
