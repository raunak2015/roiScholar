const Loan = require('../models/Loan.model');

/**
 * Calculate EMI and total interest
 * POST /api/loan/calculate
 */
exports.calculateLoan = async (req, res) => {
  try {
    const { loanAmount, interestRate, tenure } = req.body;

    if (!loanAmount || !interestRate || !tenure) {
      return res.status(400).json({ success: false, message: 'Please provide all required fields' });
    }

    const r = interestRate / 12 / 100; // monthly interest rate
    const n = tenure * 12; // number of months

    const emi = (loanAmount * r * Math.pow(1 + r, n)) / (Math.pow(1 + r, n) - 1);
    const totalRepayment = emi * n;
    const totalInterest = totalRepayment - loanAmount;

    res.status(200).json({
      success: true,
      data: {
        emi: Math.round(emi),
        totalInterest: Math.round(totalInterest),
        totalRepayment: Math.round(totalRepayment),
      },
    });
  } catch (error) {
    console.error('Calculate Loan Error:', error);
    res.status(500).json({ success: false, message: 'Server Error' });
  }
};

/**
 * Save a loan scenario
 * POST /api/loan/save
 */
exports.saveLoan = async (req, res) => {
  try {
    const userId = req.user.id;
    const { university, tuition, livingCosts, loanAmount, interestRate, tenure, emi, totalInterest } = req.body;

    const loan = await Loan.create({
      userId,
      university,
      tuition,
      livingCosts,
      loanAmount,
      interestRate,
      tenure,
      emi,
      totalInterest,
    });

    res.status(201).json({ success: true, data: loan });
  } catch (error) {
    console.error('Save Loan Error:', error);
    res.status(500).json({ success: false, message: 'Server Error' });
  }
};
