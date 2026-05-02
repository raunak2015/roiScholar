const SalaryData = require('../models/SalaryData.model');

// @desc    Get salary data by country and degree
// @route   GET /api/roi/salary-data
// @access  Public
exports.getSalaryData = async (req, res) => {
  try {
    const { country, degree } = req.query;

    if (!country || !degree) {
      return res.status(400).json({ success: false, message: 'Please provide country and degree' });
    }

    const salary = await SalaryData.findOne({
      country: { $regex: new RegExp(country, 'i') },
      degree: { $regex: new RegExp(degree, 'i') },
    });

    if (salary) {
      res.status(200).json({ success: true, data: salary });
    } else {
      // Fallback/Mock data if not in DB
      const mockSalaries = {
        USA: { 'Computer Science': 120000, 'Data Science': 115000 },
        UK: { 'Computer Science': 55000, 'Data Science': 52000 },
        Canada: { 'Computer Science': 85000, 'Data Science': 82000 },
      };

      const fallbackSalary = mockSalaries[country]?.[degree] || 60000;

      res.status(200).json({
        success: true,
        data: {
          country,
          degree,
          averageStartingSalary: fallbackSalary,
          annualGrowthRate: 5,
          currency: country === 'UK' ? 'GBP' : country === 'USA' ? 'USD' : 'CAD',
          isMock: true,
        },
      });
    }
  } catch (error) {
    console.error('Get Salary Data Error:', error);
    res.status(500).json({ success: false, message: 'Server Error' });
  }
};
