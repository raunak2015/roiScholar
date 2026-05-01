const mongoose = require('mongoose');

const UniversitySchema = new mongoose.Schema({
  name: {
    type: String,
    required: true,
    trim: true,
  },
  country: {
    type: String,
    required: true,
  },
  degree: {
    type: String,
    default: 'Computer Science',
  },
  program: {
    type: String,
    default: 'MS in Computer Science',
  },
  logo: {
    type: String,
  },
  webPages: [String],
  domains: [String],
  totalCost: {
    type: Number,
    required: true,
  },
  costBreakdown: {
    tuition: Number,
    living: Number,
    misc: Number,
  },
  roi: {
    startingSalary: Number,
    breakEvenPeriod: String,
    tenYearProjection: Number,
    projectionPercentage: Number,
  },
  loan: {
    interestRate: Number,
    monthlyEMI: Number,
    totalRepayment: Number,
  },
  visa: {
    title: String,
    icon: String,
    description: String,
  },
}, {
  timestamps: true,
});

UniversitySchema.index({ name: 'text', country: 'text' });

module.exports = mongoose.model('University', UniversitySchema);
