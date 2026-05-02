const Scholarship = require('../models/Scholarship.model');

/**
 * Get all scholarships with optional filtering
 * GET /api/scholarships
 */
exports.getScholarships = async (req, res) => {
  try {
    const { country, degree, stemOnly, search } = req.query;
    let query = {};

    // Filters
    if (country) {
      // Case-insensitive match or check if 'Global' is in the array
      query.countries = { $regex: new RegExp(country, 'i') };
    }
    
    if (degree) {
      query.degreeLevels = { $regex: new RegExp(degree, 'i') };
    }

    if (stemOnly === 'true') {
      query.stemOnly = true;
    }

    if (search) {
      query.$or = [
        { title: { $regex: search, $options: 'i' } },
        { provider: { $regex: search, $options: 'i' } },
        { description: { $regex: search, $options: 'i' } }
      ];
    }

    const scholarships = await Scholarship.find(query).sort({ deadline: 1 }); // Sort by closest deadline

    res.status(200).json({
      success: true,
      count: scholarships.length,
      data: scholarships
    });
  } catch (error) {
    console.error('Fetch Scholarships Error:', error);
    res.status(500).json({ success: false, message: 'Server Error' });
  }
};
