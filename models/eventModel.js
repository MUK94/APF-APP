const mongoose = require('mongoose');

const eventSchema = new mongoose.Schema({
  title: {
    type: String,
    required: true,
    unique: true,
    minlength: [20, 'Username must be at least 20 characters'],
    maxlength: [150, 'Username must be less than 150 characters']
  },
  eventDate: {
    type: Date,
    required: true
  },
  speakerName: {
    type: String,
    required: true
  },
  speakerBio: {
    type: String,
    required: true,
    minlength: [20, 'Username must be at least 20 characters']
  },
  link: {
    type: String,
    required: true
  },
  image: {
    type: String,
    required: [true, 'Image field is required']
  }
});

const Event = mongoose.model('Event', eventSchema);

module.exports = Event;
