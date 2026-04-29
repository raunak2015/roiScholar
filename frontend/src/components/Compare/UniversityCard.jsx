export default function UniversityCard({ name, program, logo }) {
  return (
    <div className="bg-surface-container-lowest p-8 rounded-xl shadow-sm relative overflow-hidden">
      <div className="absolute top-0 right-0 w-32 h-32 bg-primary/5 rounded-full -mr-16 -mt-16"></div>
      <div className="flex items-center gap-6 mb-6">
        <div className="w-20 h-20 rounded-lg bg-surface-container-low flex items-center justify-center p-2">
          <img
            alt={`${name} Logo`}
            className="w-full h-full object-contain"
            src={logo}
          />
        </div>
        <div>
          <h2 className="text-2xl font-bold text-primary">{name}</h2>
          <p className="text-on-surface-variant">{program}</p>
        </div>
      </div>
    </div>
  );
}
