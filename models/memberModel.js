const mongoose = require('mongoose');
// const User = require('./userModel');

const memberSchema = new mongoose.Schema({
  memberName: [
    {
      // @ts-ignore
      type: mongoose.Schema.ObjectId,
      ref: 'User'
    }
  ],
  phone: {
    type: Number,
    required: true,
    unique: true
  },
  profession: {
    type: String,
    required: true,
    minlength: [6, 'Username must be at least 6 characters'],
    maxlength: [30, 'Username must be less than 30 characters']
  },
  location: {
    type: String,
    required: true,
    minlength: [3, 'Username must be at least 3 characters'],
    maxlength: [10, 'Username must be less than 10 characters']
  },
  bio: {
    type: String,
    required: true,
    minlength: [20, 'Username must be at least 20 characters'],
    maxlength: [50, 'Username must be less than 50 characters']
  },
  profileImage: {
    type: String,
    required: [true, 'Image field is required']
  },
  role: {
    type: String,
    default: 'member'
  }
});

// @Populating from Users

memberSchema.pre(/^find/, function(next) {
  this.populate({
    path: 'memberName',
    select: '-role -__v'
  });
  next();
});

const Member = mongoose.model('Member', memberSchema);

module.exports = Member;
