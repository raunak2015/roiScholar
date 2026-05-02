const express = require('express');
const cors = require('cors');
const helmet = require('helmet');
const morgan = require('morgan');
const universityRoutes = require('./routes/university.routes');
const scenarioRoutes = require('./routes/scenario.routes');

const app = express();

// Middleware
app.use(helmet());
app.use(cors());
app.use(morgan('dev'));
app.use(express.json());
app.use(express.urlencoded({ extended: true }));

// Health Check
app.get('/health', (req, res) => {
  res.status(200).json({ status: 'OK', message: 'Backend is running' });
});

// Routes
app.use('/api/auth', require('./routes/auth.routes'));
app.use('/api/universities', universityRoutes);
app.use('/api/scenarios', scenarioRoutes);
app.use('/api/applications', require('./routes/application.routes'));
app.use('/api/roi', require('./routes/roi.routes'));
app.use('/api/loan', require('./routes/loan.routes'));

// Error Handling Middleware
app.use((err, req, res, next) => {
  console.error(err.stack);
  res.status(err.status || 500).json({
    success: false,
    message: err.message || 'Internal Server Error',
  });
});

module.exports = app;
