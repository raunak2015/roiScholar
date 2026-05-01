import { useState } from 'react';
import { useNavigate } from 'react-router-dom';
import MainNavbar from '../components/Layout/MainNavbar';
import Footer from '../components/Layout/Footer';

export default function CompareUniversities() {
  const navigate = useNavigate();
  const [selectedUniversities, setSelectedUniversities] = useState([]);

  const universities = [
    {
      id: 1,
      name: 'Stanford University',
      program: 'MS in Computer Science',
      location: 'USA',
      logo: 'https://lh3.googleusercontent.com/aida-public/AB6AXuADWAgRn84e8eR__3qFpiaZ30tqMCBYkDqbTFF1GklU2LSayLnT5bHf3tACe4ONnX9D6XTnIN3KQP28k_mogFkMxYpoGrJd0A07BVzonob4B7orGOzfXK_XWgZRe3FfH_kgJG8i-14vajTPjkJKpxacSmJlf8oAK9PCT-wF07FJqItknwAqT_TjRpZ50KQJ5TBuNZ7ThPqr3iyVbEE7JT59ggYhZ4761o-2_ClRK52EfK8kGBXk8aEUzPWFaFSPuUi2pGd0dUtb1Zw',
      totalCost: 125000,
      startingSalary: 165000,
      breakEvenPeriod: '2.2 Years',
    },
    {
      id: 2,
      name: 'University of Toronto',
      program: 'MSc in Applied Computing',
      location: 'Canada',
      logo: 'https://lh3.googleusercontent.com/aida-public/AB6AXuB8yVPeBI7jk4Yjdka1I97JcsOcdJW5CSojfT_cD5uxfU3Q6L_PMNNEcod_UXzV819yk3WIYDP_nwAgwtAUHw4eyJ7tadHb07Rg7e0OzzaF8QSoPFfJiKEjO0h1mz9PXHrgNTwQWfR0zV9a5yLSq-R6x2bzGkRJDdDwio8IsPsAdqxs4TAUA4S1h8CiMn7p6gN1Dxs1-gMAfnMSGr4tjORYtIK8GkN7q0MEMYtpFg241XKooSbEVUGOW7Ipj-ju-gNr_0LpVRFBbCE',
      totalCost: 78000,
      startingSalary: 115000,
      breakEvenPeriod: '2.8 Years',
    },
    {
      id: 3,
      name: 'MIT',
      program: 'MEng in Computer Science',
      location: 'USA',
      logo: 'https://lh3.googleusercontent.com/aida-public/AB6AXuBj5gD8g5q3q5q5q5q5q5q5q5q5q5q5q5q5q5q5q5q5q5q5q5q5q5q5q5q5q5q5q5',
      totalCost: 132000,
      startingSalary: 180000,
      breakEvenPeriod: '2.0 Years',
    },
  ];

  const toggleUniversity = (id) => {
    setSelectedUniversities((prev) =>
      prev.includes(id) ? prev.filter((uni) => uni !== id) : [...prev, id]
    );
  };

  const handleCompare = () => {
    if (selectedUniversities.length >= 2) {
      navigate('/compare-detail');
    }
  };

  return (
    <div className="bg-[#f9f9ff] min-h-screen flex flex-col">
      <MainNavbar userName="JD" />

      <main className="max-w-7xl mx-auto px-8 py-10 flex-grow">
        {/* Header */}
        <div className="mb-12">
          <h1 className="text-4xl font-extrabold tracking-tight text-on-surface mb-2">
            Compare Universities
          </h1>
          <p className="text-on-surface-variant text-lg">
            Select universities to compare financial ROI and other metrics
          </p>
        </div>

        {/* Universities Grid */}
        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6 mb-8">
          {universities.map((uni) => (
            <div
              key={uni.id}
              onClick={() => toggleUniversity(uni.id)}
              className={`p-6 rounded-xl cursor-pointer transition-all ${
                selectedUniversities.includes(uni.id)
                  ? 'bg-primary text-on-primary shadow-lg ring-2 ring-primary'
                  : 'bg-surface-container-low text-on-surface hover:shadow-md'
              }`}
            >
              <div className="flex items-start gap-4 mb-4">
                <img
                  alt={uni.name}
                  src={uni.logo}
                  className="w-16 h-16 rounded-lg object-contain"
                />
                <div className="flex-1">
                  <h3 className="font-bold text-lg">{uni.name}</h3>
                  <p className={`text-sm ${selectedUniversities.includes(uni.id) ? 'opacity-80' : 'text-on-surface-variant'}`}>
                    {uni.program}
                  </p>
                </div>
              </div>

              <div className="space-y-2 text-sm">
                <p>
                  <span className="font-semibold">Location:</span> {uni.location}
                </p>
                <p>
                  <span className="font-semibold">Total Cost:</span> ${uni.totalCost.toLocaleString()}
                </p>
                <p>
                  <span className="font-semibold">Starting Salary:</span> ${uni.startingSalary.toLocaleString()}
                </p>
                <p>
                  <span className="font-semibold">Break-even:</span> {uni.breakEvenPeriod}
                </p>
              </div>

              <div className="mt-4 flex items-center justify-between">
                <span className={`text-xs font-bold uppercase tracking-widest ${selectedUniversities.includes(uni.id) ? 'opacity-70' : 'text-primary'}`}>
                  {selectedUniversities.includes(uni.id) ? 'Selected' : 'Select'}
                </span>
                <input
                  type="checkbox"
                  checked={selectedUniversities.includes(uni.id)}
                  onChange={() => {}}
                  className="w-5 h-5 rounded"
                />
              </div>
            </div>
          ))}
        </div>

        {/* Action Button */}
        <div className="flex justify-center gap-4">
          <button
            onClick={handleCompare}
            disabled={selectedUniversities.length < 2}
            className={`px-8 py-3 rounded-lg font-semibold transition-all ${
              selectedUniversities.length >= 2
                ? 'bg-primary text-on-primary hover:shadow-lg active:scale-95'
                : 'bg-surface-container text-on-surface-variant cursor-not-allowed opacity-50'
            }`}
          >
            Compare {selectedUniversities.length} Universities
          </button>
          <button
            onClick={() => setSelectedUniversities([])}
            className="px-8 py-3 bg-surface-container text-primary rounded-lg font-semibold hover:bg-surface-container-high transition-all active:scale-95"
          >
            Clear Selection
          </button>
        </div>
      </main>

      <Footer />
    </div>
  );
}
