const mongoose = require('mongoose');

const salaryDataSchema = new mongoose.Schema(
  {
    country: {
      type: String,
      required: true,
    },
    degree: {
      type: String,
      required: true,
    },
    averageStartingSalary: {
      type: Number,
      required: true,
    },
    annualGrowthRate: {
      type: Number,
      default: 5,
    },
    currency: {
      type: String,
      default: 'USD',
    },
  },
  {
    timestamps: true,
  }
);

// Compound index for fast lookup
salaryDataSchema.index({ country: 1, degree: 1 }, { unique: true });

module.exports = mongoose.model('SalaryData', salaryDataSchema);
