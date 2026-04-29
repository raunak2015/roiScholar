import { useNavigate } from 'react-router-dom';

export default function ROISimulatorCTA() {
  const navigate = useNavigate();

  const handleCompare = () => {
    navigate('/compare');
  };

  const handleSave = () => {
    console.log('Save simulation clicked');
  };

  return (
    <div className="lg:col-span-12 flex flex-col md:flex-row items-center justify-between bg-primary-container p-8 rounded-xl text-white">
      <div className="mb-6 md:mb-0">
        <h4 className="text-2xl font-bold">Ready to compare with other career paths?</h4>
        <p className="opacity-80">Our simulator uses real-time market data from 42 countries.</p>
      </div>
      <div className="flex gap-4">
        <button
          onClick={handleCompare}
          className="bg-surface-container-lowest text-primary px-8 py-4 rounded font-bold hover:scale-105 transition-transform active:scale-95 uppercase tracking-wider text-sm"
        >
          Compare Degrees
        </button>
        <button
          onClick={handleSave}
          className="bg-secondary text-white px-8 py-4 rounded font-bold hover:scale-105 transition-transform active:scale-95 uppercase tracking-wider text-sm"
        >
          Save Simulation
        </button>
      </div>
    </div>
  );
}
