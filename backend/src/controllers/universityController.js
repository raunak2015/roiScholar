const axios = require('axios');

/**
 * Search universities using HipoLabs API as a proxy
 * GET /api/universities/search?name=...&country=...
 */
const searchUniversities = async (req, res) => {
  try {
    const { name, country } = req.query;
    
    const response = await axios.get('http://universities.hipolabs.com/search', {
      params: {
        name,
        country
      }
    });

    res.status(200).json(response.data);
  } catch (error) {
    console.error('University Search Error:', error.message);
    res.status(500).json({
      success: false,
      message: 'Failed to fetch universities'
    });
  }
};

module.exports = {
  searchUniversities
};
