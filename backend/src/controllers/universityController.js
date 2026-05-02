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

/**
 * Compare universities by IDs
 * GET /api/universities/compare?ids=id1,id2,id3
 */
const compareUniversities = async (req, res) => {
  try {
    const { ids } = req.query;
    if (!ids) {
      return res.status(400).json({ success: false, message: 'Please provide university IDs' });
    }

    const idArray = ids.split(',');
    
    // In a real app, you would fetch from MongoDB. 
    // Here we return the basic comparison structure.
    res.status(200).json({
      success: true,
      data: idArray.map(id => ({
        id,
        name: id.split('-')[0].replace(/_/g, ' '),
        // Placeholder data that would normally come from DB
        tuition: 50000,
        living: 20000,
        salary: 100000,
      }))
    });
  } catch (error) {
    console.error('University Comparison Error:', error.message);
    res.status(500).json({ success: false, message: 'Failed to compare universities' });
  }
};

module.exports = {
  searchUniversities,
  compareUniversities
};
