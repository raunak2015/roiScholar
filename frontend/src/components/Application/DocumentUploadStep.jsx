export default function DocumentUploadStep() {
  return (
    <div className="grid grid-cols-1 md:grid-cols-2 gap-12">
      <div className="flex flex-col justify-center">
        <h2 className="text-2xl font-bold text-on-surface mb-4 tracking-tight">Upload Documents</h2>
        <p className="text-on-surface-variant leading-relaxed mb-8">
          Upload necessary documents to complete your application.
        </p>
        <div className="flex items-start gap-4 p-4 bg-surface-container-low rounded-lg">
          <span className="material-symbols-outlined text-secondary flex-shrink-0">file_present</span>
          <p className="text-sm text-on-surface-variant">
            Required: Academic transcripts, passport copy, and proof of financial support.
          </p>
        </div>
      </div>

      <form className="space-y-6">
        <div>
          <label className="block text-sm font-semibold text-on-surface mb-2 tracking-tight">
            Upload Documents
          </label>
          <div className="border-2 border-dashed border-outline-variant/30 rounded-lg p-8 text-center cursor-pointer hover:border-primary transition-colors">
            <span className="material-symbols-outlined text-4xl text-on-surface-variant opacity-40 block mb-2">
              cloud_upload
            </span>
            <p className="text-sm font-medium text-on-surface mb-1">Click to upload or drag and drop</p>
            <p className="text-xs text-on-surface-variant">PDF, DOC up to 10MB</p>
          </div>
        </div>
      </form>
    </div>
  );
}
