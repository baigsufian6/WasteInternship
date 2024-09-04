const mongoose = require('mongoose');

const AvailabilitySchema = new mongoose.Schema({
  user: {
    type: mongoose.Schema.Types.ObjectId,
    ref: 'User',
    required: true
  },
  date: {
    type: Date,
    required: true
  },
  startTime: {
    type: String,
    required: true
  },
  endTime: {
    type: String,
    required: true
  },
  isRecurring: {
    type: Boolean,
    default: false
  },
  dayOfWeek: {
    type: Number,
    min: 0,
    max: 6,
    required: function() { return this.isRecurring; }
  }
}, { timestamps: true });

const Availability = mongoose.model('Availability', AvailabilitySchema);

module.exports = Availability;