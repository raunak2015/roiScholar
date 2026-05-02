const path = require('path');
require('dotenv').config({ path: path.join(__dirname, '../../.env') });
const mongoose = require('mongoose');
const Scholarship = require('../models/Scholarship.model');

const MONGODB_URI = process.env.MONGODB_URI || 'mongodb://localhost:27017/roischolar';

const scholarships = [
  {
    title: 'Fulbright Foreign Student Program',
    provider: 'U.S. Department of State',
    description: 'Enables graduate students, young professionals and artists from abroad to study and conduct research in the United States. Highly applicable for STEM fields.',
    amountValue: 0,
    amountType: 'Full Tuition',
    countries: ['USA'],
    degreeLevels: ['Masters', 'PhD'],
    stemOnly: false,
    deadline: new Date('2026-10-15'),
    applicationLink: 'https://foreign.fulbrightonline.org/',
    tags: ['Merit-based', 'Full Ride', 'International']
  },
  {
    title: 'Chevening Scholarships',
    provider: 'UK Government',
    description: 'Fully-funded scholarships to undertake any master\'s course at any UK university. Excellent for emerging STEM leaders.',
    amountValue: 0,
    amountType: 'Full Tuition',
    countries: ['UK'],
    degreeLevels: ['Masters'],
    stemOnly: false,
    deadline: new Date('2026-11-05'),
    applicationLink: 'https://www.chevening.org/',
    tags: ['Leadership', 'Full Ride', 'UK']
  },
  {
    title: 'Women Techmakers Scholars Program',
    provider: 'Google',
    description: 'Awarded based on the candidate’s academic background and demonstrated passion for increasing the involvement of women in computer science.',
    amountValue: 10000,
    amountType: 'Fixed',
    countries: ['USA', 'Canada', 'UK', 'Global'],
    degreeLevels: ['Bachelors', 'Masters', 'PhD'],
    stemOnly: true,
    deadline: new Date('2026-12-01'),
    applicationLink: 'https://www.womentechmakers.com/scholars',
    tags: ['Women in STEM', 'Computer Science', 'Merit-based']
  },
  {
    title: 'DAAD Scholarships',
    provider: 'German Academic Exchange Service',
    description: 'Funding for international students to study in Germany, specifically targeting postgraduate studies in STEM and development-related fields.',
    amountValue: 10000,
    amountType: 'Up to',
    countries: ['Germany'],
    degreeLevels: ['Masters', 'PhD'],
    stemOnly: false,
    deadline: new Date('2026-09-30'),
    applicationLink: 'https://www.daad.de/',
    tags: ['Germany', 'Monthly Stipend']
  },
  {
    title: 'Generation Google Scholarship',
    provider: 'Google',
    description: 'Established to help aspiring students pursuing computer science degrees excel in technology and become leaders in the field.',
    amountValue: 10000,
    amountType: 'Fixed',
    countries: ['USA', 'Canada'],
    degreeLevels: ['Bachelors', 'Masters'],
    stemOnly: true,
    deadline: new Date('2026-05-15'),
    applicationLink: 'https://buildyourfuture.withgoogle.com/scholarships',
    tags: ['Underrepresented Groups', 'Computer Science']
  },
  {
    title: 'Palantir Women in Technology Scholarship',
    provider: 'Palantir Technologies',
    description: 'Supports women in technology by providing financial assistance and a developmental program.',
    amountValue: 7000,
    amountType: 'Fixed',
    countries: ['Global'],
    degreeLevels: ['Bachelors', 'Masters', 'PhD'],
    stemOnly: true,
    deadline: new Date('2026-03-22'),
    applicationLink: 'https://www.palantir.com/students/scholarship/',
    tags: ['Women in STEM', 'Merit-based']
  },
  {
    title: 'Banting Postdoctoral Fellowships',
    provider: 'Government of Canada',
    description: 'Provides funding to the very best postdoctoral applicants, both nationally and internationally, who will positively contribute to the country\'s economic, social and research-based growth.',
    amountValue: 70000,
    amountType: 'Fixed',
    countries: ['Canada'],
    degreeLevels: ['PhD'],
    stemOnly: false,
    deadline: new Date('2026-09-20'),
    applicationLink: 'https://banting.fellowships-bourses.gc.ca/',
    tags: ['Research', 'Postdoctoral']
  },
  {
    title: 'Aga Khan Foundation International Scholarship',
    provider: 'Aga Khan Foundation',
    description: 'Provides a limited number of scholarships each year for postgraduate studies to outstanding students from select developing countries.',
    amountValue: 25000,
    amountType: 'Up to',
    countries: ['USA', 'UK', 'Canada', 'Global'],
    degreeLevels: ['Masters', 'PhD'],
    stemOnly: false,
    deadline: new Date('2026-03-31'),
    applicationLink: 'https://the.akdn/en/what-we-do/developing-human-capacity/education/international-scholarships',
    tags: ['Need-based', 'Half Grant/Half Loan']
  }
];

const seedScholarships = async () => {
  try {
    console.log('Connecting to MongoDB...', MONGODB_URI);
    await mongoose.connect(MONGODB_URI, {
      useNewUrlParser: true,
      useUnifiedTopology: true,
    });
    console.log('MongoDB connected.');

    // Clear existing data
    await Scholarship.deleteMany();
    console.log('Cleared existing scholarships.');

    // Insert new data
    await Scholarship.insertMany(scholarships);
    console.log(`Successfully seeded ${scholarships.length} scholarships.`);

    process.exit(0);
  } catch (error) {
    console.error('Error seeding scholarships:', error);
    process.exit(1);
  }
};

seedScholarships();
