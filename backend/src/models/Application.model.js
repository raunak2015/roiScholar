const mongoose = require('mongoose');

const applicationSchema = new mongoose.Schema(
  {
    userId: {
      type: mongoose.Schema.Types.ObjectId,
      ref: 'User',
      required: true,
    },
    fullName: {
      type: String,
      required: true,
    },
    email: {
      type: String,
      required: true,
    },
    phone: {
      type: String,
      required: true,
    },
    educationLevel: {
      type: String,
      required: true,
    },
    university: {
      type: String,
      required: true,
    },
    program: {
      type: String,
      required: true,
    },
    loanAmount: {
      type: Number,
      required: true,
    },
    loanTerm: {
      type: Number,
      required: true,
    },
    documents: [
      {
        name: String,
        url: String,
        uploadedAt: {
          type: Date,
          default: Date.now,
        },
      },
    ],
    status: {
      type: String,
      enum: ['pending', 'reviewing', 'approved', 'rejected'],
      default: 'pending',
    },
  },
  {
    timestamps: true,
  }
);

module.exports = mongoose.model('Application', applicationSchema);
