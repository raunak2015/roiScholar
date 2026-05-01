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
    <div className="w-full flex flex-col md:flex-row items-center justify-between bg-[#1e2b58] p-10 rounded-2xl text-white shadow-xl mt-12">
      <div className="mb-8 md:mb-0">
        <h4 className="text-2xl font-black mb-2">Ready to compare with other career paths?</h4>
        <p className="opacity-70 font-medium">Our simulator uses real-time market data from 42 countries.</p>
      </div>
      <div className="flex gap-4">
        <button
          onClick={handleCompare}
          className="bg-white text-[#1e2b58] px-10 py-3.5 rounded-lg font-black hover:bg-white/90 transition-all active:scale-95 uppercase tracking-widest text-[11px]"
        >
          Compare Degrees
        </button>
        <button
          onClick={handleSave}
          className="bg-[#006a61] text-white px-10 py-3.5 rounded-lg font-black hover:bg-[#005a52] transition-all active:scale-95 uppercase tracking-widest text-[11px]"
        >
          Save Simulation
        </button>
      </div>
    </div>
  );
}
