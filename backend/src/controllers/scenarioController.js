const Scenario = require('../models/Scenario.model');

exports.saveScenario = async (req, res) => {
  try {
    const { title, university, degree, inputs, results } = req.body;
    const userId = req.user.id; // Assuming auth middleware attaches user to req

    const scenario = new Scenario({
      user: userId,
      title,
      university,
      degree,
      inputs,
      results,
    });

    await scenario.save();
    res.status(201).json({ success: true, data: scenario });
  } catch (error) {
    console.error('Save Scenario Error:', error);
    res.status(500).json({ success: false, message: 'Failed to save scenario' });
  }
};

exports.getUserScenarios = async (req, res) => {
  try {
    const userId = req.user.id;
    const scenarios = await Scenario.find({ user: userId }).sort({ createdAt: -1 });
    res.status(200).json({ success: true, data: scenarios });
  } catch (error) {
    console.error('Get Scenarios Error:', error);
    res.status(500).json({ success: false, message: 'Failed to retrieve scenarios' });
  }
};

exports.deleteScenario = async (req, res) => {
  try {
    const { id } = req.params;
    const userId = req.user.id;

    const scenario = await Scenario.findOneAndDelete({ _id: id, user: userId });
    if (!scenario) {
      return res.status(404).json({ success: false, message: 'Scenario not found' });
    }

    res.status(200).json({ success: true, message: 'Scenario deleted' });
  } catch (error) {
    console.error('Delete Scenario Error:', error);
    res.status(500).json({ success: false, message: 'Failed to delete scenario' });
  }
};
