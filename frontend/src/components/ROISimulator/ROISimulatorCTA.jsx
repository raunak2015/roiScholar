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
    <div className="w-full flex flex-col md:flex-row items-center justify-between bg-primary p-10 rounded-2xl text-on-primary shadow-xl mt-12">
      <div className="mb-8 md:mb-0">
        <h4 className="text-2xl font-black mb-2">Ready to compare with other career paths?</h4>
        <p className="opacity-70 font-medium">Our simulator uses real-time market data from 42 countries.</p>
      </div>
      <div className="flex gap-4">
        <button
          onClick={handleCompare}
          className="bg-on-primary text-primary px-10 py-3.5 rounded-lg font-black hover:bg-on-primary/90 transition-all active:scale-95 uppercase tracking-widest text-[11px]"
        >
          Compare Degrees
        </button>
        <button
          onClick={handleSave}
          className="bg-secondary text-on-secondary px-10 py-3.5 rounded-lg font-black hover:bg-secondary/90 transition-all active:scale-95 uppercase tracking-widest text-[11px]"
        >
          Save Simulation
        </button>
      </div>
    </div>
  );
}
