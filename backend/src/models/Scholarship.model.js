const mongoose = require('mongoose');

const scholarshipSchema = new mongoose.Schema({
  title: {
    type: String,
    required: true,
    trim: true,
  },
  provider: {
    type: String,
    required: true,
  },
  description: {
    type: String,
    required: true,
  },
  amountValue: {
    type: Number,
    required: true, // e.g., 10000
  },
  amountType: {
    type: String,
    enum: ['Fixed', 'Up to', 'Full Tuition'],
    default: 'Fixed',
  },
  countries: [{
    type: String, // e.g., 'USA', 'UK', 'Canada', 'Global'
  }],
  degreeLevels: [{
    type: String, // e.g., 'Bachelors', 'Masters', 'PhD'
  }],
  stemOnly: {
    type: Boolean,
    default: true,
  },
  deadline: {
    type: Date,
  },
  applicationLink: {
    type: String,
  },
  tags: [{
    type: String, // e.g., 'Women in STEM', 'Merit-based', 'Need-based'
  }]
}, { timestamps: true });

module.exports = mongoose.model('Scholarship', scholarshipSchema);
