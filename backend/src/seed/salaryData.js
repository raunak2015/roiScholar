const mongoose = require('mongoose');
const dotenv = require('dotenv');
const SalaryData = require('../models/SalaryData.model');
const path = require('path');

dotenv.config({ path: path.join(__dirname, '../../.env') });

const salaryData = [
  {
    country: 'USA',
    degree: 'Computer Science',
    averageStartingSalary: 120000,
    annualGrowthRate: 6,
    currency: 'USD',
  },
  {
    country: 'USA',
    degree: 'Data Science',
    averageStartingSalary: 115000,
    annualGrowthRate: 5.5,
    currency: 'USD',
  },
  {
    country: 'UK',
    degree: 'Computer Science',
    averageStartingSalary: 55000,
    annualGrowthRate: 4,
    currency: 'GBP',
  },
  {
    country: 'Canada',
    degree: 'Computer Science',
    averageStartingSalary: 85000,
    annualGrowthRate: 5,
    currency: 'CAD',
  },
  {
    country: 'India',
    degree: 'Computer Science',
    averageStartingSalary: 1500000,
    annualGrowthRate: 10,
    currency: 'INR',
  },
];

const seedSalaryData = async () => {
  try {
    await mongoose.connect(process.env.MONGODB_URI);
    console.log('Connected to MongoDB');

    await SalaryData.deleteMany();
    console.log('Deleted existing salary data');

    await SalaryData.insertMany(salaryData);
    console.log('Inserted new salary data');

    process.exit();
  } catch (error) {
    console.error('Seeding Error:', error);
    process.exit(1);
  }
};

seedSalaryData();
