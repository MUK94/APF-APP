// @ts-nocheck
const mongoose = require('mongoose');
const slugify = require('slugify');
// const validator = require('validator');

const postSchema = new mongoose.Schema(
  {
    name: {
      type: String,
      required: [true, 'A post must have a name'],
      unique: true,
      trim: true,
      minlength: [10, 'A post name must have more or equal then 10 characters'],
      maxlength: [
        100,
        'A post name must have less or equal then 100 characters'
      ]

      // validate: [validator.isAlpha, 'post name must only contain characters']
    },
    slug: String,
    body: {
      type: String,
      required: [true, 'A post must have a body']
    },
    image: {
      type: String,
      required: [true, 'Image field is required']
    },
    category: {
      type: String,
      required: false
    },
    images: [String],
    createdAt: {
      type: Date,
      default: Date.now()
      // select: false
    }
  },
  {
    toJSON: { virtuals: true },
    toObject: { virtuals: true }
  }
);

postSchema.index({ slug: 1 });

postSchema.virtual('durationWeeks').get(function() {
  return this.duration / 7;
});

// DOCUMENT MIDDLEWARE: runs before .save() and .create()
postSchema.pre('save', function(next) {
  this.slug = slugify(this.name, { lower: true });
  next();
});

// QUERY MIDDLEWARE
postSchema.pre(/^find/, function(next) {
  this.find({ secretPost: { $ne: true } });

  this.start = Date.now();
  next();
});

postSchema.post(/^find/, function(docs, next) {
  console.log(`Query took ${Date.now() - this.start} milliseconds!`);
  next();
});

// AGGREGATION MIDDLEWARE
postSchema.pre('aggregate', function(next) {
  this.pipeline().unshift({ $match: { secretPost: { $ne: true } } });

  console.log(this.pipeline());
  next();
});

const Post = mongoose.model('Post', postSchema);

module.exports = Post;
