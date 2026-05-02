const Application = require('../models/Application.model');
const emailService = require('../services/emailService');

// @desc    Submit a new loan application
// @route   POST /api/applications
// @access  Private
exports.submitApplication = async (req, res) => {
  try {
    const userId = req.user.id;
    const {
      fullName,
      email,
      phone,
      educationLevel,
      university,
      program,
      loanAmount,
      loanTerm,
    } = req.body;

    // Map uploaded files to document objects
    const documents = req.files ? req.files.map(file => ({
      name: file.originalname,
      url: `/uploads/${file.filename}`
    })) : [];

    const application = await Application.create({
      userId,
      fullName,
      email,
      phone,
      educationLevel,
      university,
      program,
      loanAmount,
      loanTerm,
      documents
    });

    if (application) {
      // Send confirmation email
      await emailService.sendApplicationConfirmation(
        email || req.user.email,
        fullName || req.user.name,
        university
      );

      res.status(201).json({
        success: true,
        data: application,
      });
    } else {
      res.status(400).json({ success: false, message: 'Invalid application data' });
    }
  } catch (error) {
    console.error('Submit Application Error:', error);
    res.status(500).json({ success: false, message: 'Server Error' });
  }
};

// @desc    Get user applications
// @route   GET /api/applications
// @access  Private
exports.getUserApplications = async (req, res) => {
  try {
    const userId = req.user.id;
    const applications = await Application.find({ userId }).sort({ createdAt: -1 });
    res.status(200).json({ success: true, data: applications });
  } catch (error) {
    console.error('Get Applications Error:', error);
    res.status(500).json({ success: false, message: 'Server Error' });
  }
};
