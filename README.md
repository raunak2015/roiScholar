# 🧭 ROIScholar - STEM Education Loan Clarity Platform

Clear Costs. Real ROI. Smart STEM Decisions.

[![Version](https://img.shields.io/badge/version-1.0.0-blue)](https://github.com/yourusername/ROIScholar)
[![React](https://img.shields.io/badge/React-18.2-61DAFB)](https://reactjs.org/)
[![Node](https://img.shields.io/badge/Node-20.x-339933)](https://nodejs.org/)
[![License](https://img.shields.io/badge/license-MIT-green)](LICENSE)
[![PRs Welcome](https://img.shields.io/badge/PRs-welcome-brightgreen)](CONTRIBUTING.md)

## 📋 Problem Statement

Why do STEM students face education loan anxiety from unclear costs in 2026?

Students struggle with:
- Unclear Costs: Hidden fees, living expenses, insurance, visa costs are not transparent.
- Biased Information: Loan agents may push high-commission products with misleading terms.
- Complex ROI: Break-even is difficult to estimate with varying international salaries.

## 🎯 Solution

ROIScholar is a transparent, data-driven platform that helps STEM students understand education loan costs and ROI for international degrees.

### ✨ Core Features

| Feature | Description | Problem Solved |
|---|---|---|
| Loan Calculator | Real-time EMI, amortization, total interest | Unclear costs |
| ROI Simulator | Break-even analysis, 5-year net gain | Complex ROI |
| University Compare | Side-by-side cost and salary comparison | Biased information |
| Scenario Saver | Save and load loan scenarios | Decision tracking |
| Application Tracker | Multi-step form with progress save | Process clarity |

## 🏗️ Project Structure

### 📁 Complete Folder Structure

```text
ROIScholar/
│
├── frontend/                          # React Frontend Application
│   ├── public/
│   │   ├── index.html
│   │   ├── favicon.ico
│   │   └── robots.txt
│   │
│   ├── src/
│   │   ├── assets/                    # Images, fonts, icons
│   │   │   ├── images/
│   │   │   ├── fonts/
│   │   │   └── icons/
│   │   │
│   │   ├── components/                # Reusable UI Components
│   │   │   ├── Layout/
│   │   │   │   ├── Navbar.jsx
│   │   │   │   ├── Sidebar.jsx
│   │   │   │   ├── Footer.jsx
│   │   │   │   └── Layout.jsx
│   │   │   │
│   │   │   ├── UI/
│   │   │   │   ├── Button.jsx
│   │   │   │   ├── Input.jsx
│   │   │   │   ├── Card.jsx
│   │   │   │   ├── Modal.jsx
│   │   │   │   ├── Loader.jsx
│   │   │   │   ├── Toast.jsx
│   │   │   │   └── Tooltip.jsx
│   │   │   │
│   │   │   ├── Loan/
│   │   │   │   ├── LoanCalculator.jsx
│   │   │   │   ├── AmortizationTable.jsx
│   │   │   │   ├── LoanSummaryCard.jsx
│   │   │   │   └── InterestChart.jsx
│   │   │   │
│   │   │   ├── ROI/
│   │   │   │   ├── ROISimulator.jsx
│   │   │   │   ├── BreakEvenChart.jsx
│   │   │   │   ├── SalaryInput.jsx
│   │   │   │   └── ROIMetrics.jsx
│   │   │   │
│   │   │   ├── University/
│   │   │   │   ├── UniversityCard.jsx
│   │   │   │   ├── CompareTable.jsx
│   │   │   │   ├── CostBreakdown.jsx
│   │   │   │   └── FilterBar.jsx
│   │   │   │
│   │   │   └── Application/
│   │   │       ├── MultiStepForm.jsx
│   │   │       ├── Step1Personal.jsx
│   │   │       ├── Step2University.jsx
│   │   │       ├── Step3Loan.jsx
│   │   │       ├── Step4Documents.jsx
│   │   │       └── ProgressBar.jsx
│   │   │
│   │   ├── pages/                     # Page Components
│   │   │   ├── LandingPage.jsx
│   │   │   ├── LoginPage.jsx
│   │   │   ├── RegisterPage.jsx
│   │   │   ├── Dashboard.jsx
│   │   │   ├── CalculatorPage.jsx
│   │   │   ├── ROISimulatorPage.jsx
│   │   │   ├── CompareUniversities.jsx
│   │   │   ├── ApplicationTracker.jsx
│   │   │   ├── ProfilePage.jsx
│   │   │   └── NotFoundPage.jsx
│   │   │
│   │   ├── features/                  # Redux Slices
│   │   │   ├── auth/
│   │   │   │   ├── authSlice.js
│   │   │   │   └── authAPI.js
│   │   │   ├── loan/
│   │   │   │   ├── loanSlice.js
│   │   │   │   └── loanUtils.js
│   │   │   ├── roi/
│   │   │   │   ├── roiSlice.js
│   │   │   │   └── salaryData.js
│   │   │   ├── university/
│   │   │   │   ├── universitySlice.js
│   │   │   │   └── universityData.js
│   │   │   └── ui/
│   │   │       └── uiSlice.js
│   │   │
│   │   ├── hooks/                     # Custom Hooks
│   │   │   ├── useAuth.js
│   │   │   ├── useDebounce.js
│   │   │   ├── useLoanCalculator.js
│   │   │   ├── useLocalStorage.js
│   │   │   ├── useROISimulator.js
│   │   │   └── useTheme.js
│   │   │
│   │   ├── services/                  # API Services
│   │   │   ├── api.js
│   │   │   ├── authService.js
│   │   │   ├── loanService.js
│   │   │   ├── universityService.js
│   │   │   └── storage.js
│   │   │
│   │   ├── utils/                     # Utility Functions
│   │   │   ├── constants.js
│   │   │   ├── validation.js
│   │   │   ├── formatters.js
│   │   │   ├── calculators.js
│   │   │   └── validators.js
│   │   │
│   │   ├── styles/                    # Global Styles
│   │   │   ├── globals.css
│   │   │   ├── tailwind.css
│   │   │   └── themes.css
│   │   │
│   │   ├── App.jsx
│   │   ├── AppRoutes.jsx
│   │   ├── main.jsx
│   │   └── store.js
│   │
│   ├── .env.example
│   ├── .eslintrc.js
│   ├── .prettierrc
│   ├── index.html
│   ├── package.json
│   ├── vite.config.js
│   └── README.md
│
├── backend/                           # Node.js/Express Backend
│   ├── src/
│   │   ├── config/                    # Configuration
│   │   │   ├── database.js
│   │   │   ├── redis.js
│   │   │   └── passport.js
│   │   │
│   │   ├── models/                    # Database Models
│   │   │   ├── User.model.js
│   │   │   ├── Loan.model.js
│   │   │   ├── University.model.js
│   │   │   ├── Application.model.js
│   │   │   └── SalaryData.model.js
│   │   │
│   │   ├── controllers/               # Business Logic
│   │   │   ├── authController.js
│   │   │   ├── loanController.js
│   │   │   ├── roiController.js
│   │   │   ├── universityController.js
│   │   │   └── applicationController.js
│   │   │
│   │   ├── routes/                    # API Routes
│   │   │   ├── auth.routes.js
│   │   │   ├── loan.routes.js
│   │   │   ├── roi.routes.js
│   │   │   ├── university.routes.js
│   │   │   └── application.routes.js
│   │   │
│   │   ├── middleware/                # Custom Middleware
│   │   │   ├── auth.middleware.js
│   │   │   ├── error.middleware.js
│   │   │   ├── validation.middleware.js
│   │   │   └── rateLimiter.js
│   │   │
│   │   ├── services/                  # Business Services
│   │   │   ├── emailService.js
│   │   │   ├── calculatorService.js
│   │   │   ├── salaryService.js
│   │   │   └── exchangeRateService.js
│   │   │
│   │   ├── utils/                     # Utilities
│   │   │   ├── logger.js
│   │   │   ├── helpers.js
│   │   │   ├── constants.js
│   │   │   └── validators.js
│   │   │
│   │   ├── validations/               # Input Validation
│   │   │   ├── user.validation.js
│   │   │   ├── loan.validation.js
│   │   │   └── application.validation.js
│   │   │
│   │   └── app.js                     # Express App Setup
│   │
│   ├── .env.example
│   ├── .eslintrc.js
│   ├── package.json
│   └── server.js
│
├── database/                          # Database Files
│   ├── migrations/
│   ├── seeds/
│   └── schema.sql
│
├── docs/                              # Documentation
│   ├── API.md
│   ├── DEPLOYMENT.md
│   ├── CONTRIBUTING.md
│   └── USER_GUIDE.md
│
├── tests/                             # Test Files
│   ├── unit/
│   ├── integration/
│   ├── e2e/
│   └── fixtures/
│
├── scripts/                           # Utility Scripts
│   ├── seedDatabase.js
│   ├── backupDatabase.js
│   └── deploy.sh
│
├── .gitignore
├── .dockerignore
├── docker-compose.yml
├── Dockerfile
├── README.md
├── LICENSE
├── package.json
└── .env.example
```

## 🚀 Tech Stack

### 🎨 Frontend

| Technology | Version | Purpose |
|---|---|---|
| React | 18.2.0 | UI Framework |
| Vite | 4.4.0 | Build Tool |
| Tailwind CSS | 3.3.0 | Styling |
| Material UI | 5.14.0 | Component Library |
| Redux Toolkit | 1.9.0 | State Management |
| React Router | 6.14.0 | Routing |
| Formik | 2.4.0 | Form Handling |
| Yup | 1.2.0 | Validation |
| Recharts | 2.7.0 | Charts and Graphs |
| Axios | 1.4.0 | API Calls |
| React Hot Toast | 2.4.0 | Notifications |
| React Helmet | 6.1.0 | SEO |

### ⚙️ Backend

| Technology | Version | Purpose |
|---|---|---|
| Node.js | 20.x | Runtime |
| Express | 4.18.0 | Web Framework |
| MongoDB | 6.0 | Database |
| Mongoose | 7.3.0 | ODM |
| JWT | 9.0.0 | Authentication |
| Bcrypt | 5.1.0 | Password Hashing |
| Redis | 7.0 | Caching |
| Winston | 3.9.0 | Logging |
| Jest | 29.5.0 | Testing |
| Supertest | 6.3.0 | API Testing |

### 🛠️ DevOps and Tools

- Docker
- GitHub Actions
- Vercel
- Render or Heroku
- MongoDB Atlas
- Redis Cloud

## 📦 Installation and Setup

### ✅ Prerequisites

- Node.js 20 or higher
- MongoDB 6 or higher
- Redis 7 or higher
- Git

### 📥 Clone Repository

```bash
git clone https://github.com/yourusername/ROIScholar.git
cd ROIScholar
```

### 🔧 Backend Setup

```bash
cd backend
npm install
cp .env.example .env
```

Update backend .env values:

```env
PORT=5000
MONGODB_URI=mongodb://localhost:27017/roischolar
JWT_SECRET=your_super_secret_key
REDIS_URL=redis://localhost:6379
```

```bash
npm run seed
npm run dev
```

### 💻 Frontend Setup

```bash
cd frontend
npm install
cp .env.example .env
```

Update frontend .env values:

```env
VITE_API_URL=http://localhost:5000/api
```

```bash
npm run dev
```

### 🐳 Docker Setup (Alternative)

```bash
docker-compose up --build
```

Application URLs:
- Frontend: http://localhost:5173
- Backend API: http://localhost:5000
- MongoDB: localhost:27017
- Redis: localhost:6379

## 🎮 Usage Guide

### 🧪 Development Mode

```bash
# Terminal 1
cd backend
npm run dev

# Terminal 2
cd frontend
npm run dev

# Terminal 3 (if local services)
mongod
redis-server
```

### 🏭 Production Build

```bash
cd frontend
npm run build

cd ../backend
npm start
```

Optional PM2:

```bash
pm2 start backend/server.js --name roischolar-backend
pm2 serve frontend/dist 5173 --name roischolar-frontend --spa
```

### ✅ Testing

```bash
cd backend
npm test

cd ../frontend
npm test

cd ..
npm run test:e2e
```

## 📡 API Endpoints

### 🔐 Authentication

| Method | Endpoint | Description |
|---|---|---|
| POST | /api/auth/register | User registration |
| POST | /api/auth/login | User login |
| POST | /api/auth/logout | User logout |
| GET | /api/auth/verify | Verify JWT token |

### 🧮 Loan Calculator

| Method | Endpoint | Description |
|---|---|---|
| POST | /api/loan/calculate | Calculate EMI and amortization |
| GET | /api/loan/scenarios | Get saved scenarios |
| POST | /api/loan/scenarios | Save loan scenario |
| DELETE | /api/loan/scenarios/:id | Delete scenario |

### 📈 ROI Simulator

| Method | Endpoint | Description |
|---|---|---|
| POST | /api/roi/calculate | Calculate ROI and break-even |
| GET | /api/roi/salary-data | Salary data by country |
| GET | /api/roi/history | ROI history |

### 🎓 Universities

| Method | Endpoint | Description |
|---|---|---|
| GET | /api/universities | List all universities |
| GET | /api/universities/:id | University details |
| POST | /api/universities/compare | Compare universities |
| GET | /api/universities/search | Search universities |

## 🗄️ Database Schema

### 👤 User Model

```javascript
{
	name: String, // required
	email: String, // required, unique
	password: String, // required
	preferences: {
		defaultCountry: String,
		defaultDegree: String,
		theme: String
	},
	savedScenarios: [LoanSchema],
	createdAt: Date
}
```

### 💸 Loan Model

```javascript
{
	userId: ObjectId, // ref: 'User'
	university: String,
	tuition: Number,
	livingCosts: Number,
	loanAmount: Number,
	interestRate: Number,
	tenure: Number,
	emi: Number,
	totalInterest: Number,
	savedAt: Date
}
```

## 🔧 Environment Variables

### 🖥️ Frontend (.env)

```env
VITE_API_URL=http://localhost:5000/api
VITE_GOOGLE_ANALYTICS_ID=UA-XXXXX-X
VITE_SENTRY_DSN=your_sentry_dsn
```

### 🧰 Backend (.env)

```env
NODE_ENV=development
PORT=5000
MONGODB_URI=mongodb://localhost:27017/roischolar
REDIS_URL=redis://localhost:6379
JWT_SECRET=your_super_secret_key_here
JWT_EXPIRE=30d
EMAIL_HOST=smtp.gmail.com
EMAIL_USER=your_email@gmail.com
EMAIL_PASS=your_app_password
RAPIDAPI_KEY=your_rapidapi_key
```

## 🚢 Deployment

### ▲ Frontend on Vercel

```bash
npm i -g vercel
cd frontend
vercel --prod
```

### ☁️ Backend on Render

- Create render service configuration.
- Connect repository to Render.
- Enable deploy on push to main.

### 🐳 Docker Deployment

```bash
docker build -t roischolar-frontend ./frontend
docker build -t roischolar-backend ./backend
docker run -p 5173:5173 roischolar-frontend
docker run -p 5000:5000 roischolar-backend
```

## ⚡ Performance Optimization

Implemented:
- Code splitting with lazy loading
- Redis caching for API responses
- Image optimization with WebP
- Debounced search inputs
- Virtualized lists for large datasets
- CDN for static assets

Recommended:
- Add service workers for PWA
- Add Brotli compression
- Add database indexing strategy
- Add API rate-limit analytics

## 🛡️ Security Features

- JWT authentication with refresh tokens
- Password hashing with bcrypt
- XSS protection
- CORS configuration
- Rate limiting
- Helmet security headers
- Input sanitization
- NoSQL injection hardening

## 🧪 Testing Coverage Targets

```text
Statements > 90%
Branches   > 85%
Functions  > 90%
Lines      > 90%
```

Coverage commands:

```bash
cd backend && npm run test:coverage
cd frontend && npm run test:coverage
```

## 📜 Scripts Reference (Root)

```json
{
	"scripts": {
		"dev": "concurrently \"npm run dev:backend\" \"npm run dev:frontend\"",
		"dev:backend": "cd backend && npm run dev",
		"dev:frontend": "cd frontend && npm run dev",
		"build": "npm run build:frontend && npm run build:backend",
		"build:frontend": "cd frontend && npm run build",
		"build:backend": "cd backend && npm run build",
		"test": "npm run test:backend && npm run test:frontend",
		"docker:up": "docker-compose up",
		"docker:down": "docker-compose down",
		"seed": "cd backend && npm run seed"
	}
}
```

## 🤝 Contributing

1. Fork the repository.
2. Create a branch: `git checkout -b feature/AmazingFeature`
3. Commit changes: `git commit -m "Add AmazingFeature"`
4. Push branch: `git push origin feature/AmazingFeature`
5. Open a pull request.

## 📄 License

Distributed under the MIT License. See LICENSE for details.

## 👥 Team

- Project Lead: Your Name
- Frontend Developer: Team Member
- Backend Developer: Team Member
- UI/UX Designer: Team Member

## 🙏 Acknowledgments

- Salary data: Bureau of Labor Statistics, Glassdoor, Levels.fyi
- University data: Official websites and QS rankings
- Exchange rates: ExchangeRate-API
- Icons: Heroicons and Font Awesome

## 📞 Contact and Support

- Project: https://github.com/yourusername/ROIScholar
- Demo: https://roischolar.vercel.app
- Issues: GitHub Issues
- Email: support@roischolar.com

## 🎯 Roadmap

### ✅ Phase 1 (MVP) - Completed

- Loan calculator with EMI
- Basic ROI simulation
- University comparison table

### 🚧 Phase 2 (Current) - In Progress

- User authentication
- Save and load scenarios
- Multi-step application form

### 📅 Phase 3 (Planned)

- Real-time exchange rates
- Scholarship finder
- Community Q and A forum
- Mobile app (React Native)
- AI-powered loan recommendations

## ⚡ Quick Start

```bash
npm install
cd frontend && npm install
cd ../backend && npm install
cp .env.example .env
cd ../frontend && cp .env.example .env
cd .. && docker-compose up --build
```

Visit: http://localhost:5173

Built for STEM students worldwide to make education loan decisions clear, unbiased, and data-driven.