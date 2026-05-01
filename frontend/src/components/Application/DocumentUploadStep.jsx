import { useRef, useState } from 'react';
import {
  ACCEPTED_FILE_TYPES_TEXT,
  createFileEntries,
  formatFileSize,
  validateFiles,
} from '../../services/fileService';

export default function DocumentUploadStep({
  documents = [],
  onAddFiles = () => {},
  onRemoveFile = () => {},
}) {
  const [errors, setErrors] = useState([]);
  const fileInputRef = useRef(null);

  const handleFiles = (fileList) => {
    const { validFiles, errors: validationErrors } = validateFiles(
      Array.from(fileList || []),
    );
    setErrors(validationErrors);

    if (validFiles.length) {
      onAddFiles(createFileEntries(validFiles));
    }
  };

  const handleBrowse = () => {
    if (fileInputRef.current) {
      fileInputRef.current.click();
    }
  };

  const handleInputChange = (event) => {
    handleFiles(event.target.files);
    event.target.value = '';
  };

  const handleDrop = (event) => {
    event.preventDefault();
    handleFiles(event.dataTransfer.files);
  };

  const handleDragOver = (event) => {
    event.preventDefault();
  };

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
          <div
            role="button"
            tabIndex={0}
            onClick={handleBrowse}
            onKeyDown={(event) => {
              if (event.key === 'Enter' || event.key === ' ') {
                event.preventDefault();
                handleBrowse();
              }
            }}
            onDrop={handleDrop}
            onDragOver={handleDragOver}
            className="border-2 border-dashed border-outline-variant/30 rounded-lg p-8 text-center cursor-pointer hover:border-primary transition-colors"
          >
            <span className="material-symbols-outlined text-4xl text-on-surface-variant opacity-40 block mb-2">
              cloud_upload
            </span>
            <p className="text-sm font-medium text-on-surface mb-1">Click to upload or drag and drop</p>
            <p className="text-xs text-on-surface-variant">{ACCEPTED_FILE_TYPES_TEXT}</p>
          </div>
          <input
            ref={fileInputRef}
            type="file"
            className="hidden"
            multiple
            accept=".pdf,.doc,.docx,.jpg,.jpeg,.png"
            onChange={handleInputChange}
          />
          {errors.length > 0 && (
            <ul className="mt-3 text-sm text-error space-y-1">
              {errors.map((error, index) => (
                <li key={`${error}-${index}`}>{error}</li>
              ))}
            </ul>
          )}
        </div>

        <div>
          <div className="flex items-center justify-between mb-3">
            <h3 className="text-sm font-semibold text-on-surface">Uploaded Files</h3>
            <span className="text-xs text-on-surface-variant">
              {documents.length} file(s)
            </span>
          </div>
          {documents.length > 0 ? (
            <ul className="space-y-3">
              {documents.map((doc) => (
                <li
                  key={doc.id}
                  className="flex items-center justify-between gap-4 bg-surface-container-low rounded-lg px-4 py-3"
                >
                  <div>
                    <p className="text-sm font-semibold text-on-surface">{doc.name}</p>
                    <p className="text-xs text-on-surface-variant">
                      {formatFileSize(doc.size)}
                    </p>
                  </div>
                  <button
                    type="button"
                    onClick={() => onRemoveFile(doc.id)}
                    className="text-xs font-semibold text-error hover:text-on-surface transition-colors"
                  >
                    Remove
                  </button>
                </li>
              ))}
            </ul>
          ) : (
            <p className="text-sm text-on-surface-variant">No documents uploaded yet.</p>
          )}
        </div>
      </form>
    </div>
  );
}
