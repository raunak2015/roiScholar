const mongoose = require('mongoose');

const loanSchema = new mongoose.Schema(
  {
    userId: {
      type: mongoose.Schema.Types.ObjectId,
      ref: 'User',
      required: true,
    },
    university: {
      type: String,
      required: true,
    },
    tuition: {
      type: Number,
      required: true,
    },
    livingCosts: {
      type: Number,
      required: true,
    },
    loanAmount: {
      type: Number,
      required: true,
    },
    interestRate: {
      type: Number,
      required: true,
    },
    tenure: {
      type: Number,
      required: true,
    },
    emi: {
      type: Number,
    },
    totalInterest: {
      type: Number,
    },
  },
  {
    timestamps: true,
  }
);

module.exports = mongoose.model('Loan', loanSchema);
