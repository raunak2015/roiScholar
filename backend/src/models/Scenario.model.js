const mongoose = require('mongoose');

const scenarioSchema = new mongoose.Schema({
  user: {
    type: mongoose.Schema.Types.ObjectId,
    ref: 'User',
    required: true,
  },
  title: {
    type: String,
    required: true,
    default: 'Untitled Scenario',
  },
  university: {
    type: String,
    required: true,
  },
  degree: {
    type: String,
    required: true,
  },
  inputs: {
    loanAmount: Number,
    interestRate: Number,
    tenure: Number,
    tuitionPerYear: Number,
    livingMonthly: Number,
  },
  results: {
    monthlyPayment: Number,
    totalInterest: Number,
    totalRepayment: Number,
  },
}, {
  timestamps: true,
});

module.exports = mongoose.model('Scenario', scenarioSchema);
