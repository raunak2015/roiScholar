import React, { useState, useRef } from 'react';

export default function FileUpload({ 
  onFileSelect, 
  accept = ".pdf,.jpg,.jpeg,.png", 
  maxSizeMB = 5,
  label = "University Offer Letter" 
}) {
  const [file, setFile] = useState(null);
  const [preview, setPreview] = useState(null);
  const [error, setError] = useState('');
  const [isDragging, setIsDragging] = useState(false);
  const fileInputRef = useRef(null);

  const handleFile = (selectedFile) => {
    setError('');
    
    if (!selectedFile) return;

    // Validation: Size
    if (selectedFile.size > maxSizeMB * 1024 * 1024) {
      setError(`File size exceeds ${maxSizeMB}MB limit.`);
      return;
    }

    // Validation: Type
    const fileType = selectedFile.type;
    const isValidType = accept.split(',').some(type => {
      if (type.startsWith('.')) {
        return selectedFile.name.toLowerCase().endsWith(type.toLowerCase());
      }
      return fileType.includes(type);
    });

    if (!isValidType) {
      setError(`Invalid file type. Please upload ${accept}`);
      return;
    }

    setFile(selectedFile);
    onFileSelect?.(selectedFile);

    // Create Preview for images
    if (selectedFile.type.startsWith('image/')) {
      const reader = new FileReader();
      reader.onloadend = () => {
        setPreview(reader.result);
      };
      reader.readAsDataURL(selectedFile);
    } else {
      setPreview(null); // No preview for PDFs yet
    }
  };

  const onDragOver = (e) => {
    e.preventDefault();
    setIsDragging(true);
  };

  const onDragLeave = () => {
    setIsDragging(false);
  };

  const onDrop = (e) => {
    e.preventDefault();
    setIsDragging(false);
    const droppedFile = e.dataTransfer.files[0];
    handleFile(droppedFile);
  };

  const removeFile = (e) => {
    e.stopPropagation();
    setFile(null);
    setPreview(null);
    onFileSelect?.(null);
    if (fileInputRef.current) fileInputRef.current.value = '';
  };

  return (
    <div className="w-full">
      <label className="block text-sm font-bold text-on-surface mb-2">{label}</label>
      
      <div
        onClick={() => fileInputRef.current?.click()}
        onDragOver={onDragOver}
        onDragLeave={onDragLeave}
        onDrop={onDrop}
        className={`relative cursor-pointer rounded-2xl border-2 border-dashed transition-all p-8 flex flex-col items-center justify-center text-center
          ${isDragging 
            ? 'border-primary bg-primary/5 scale-[0.99]' 
            : 'border-outline-variant bg-surface-container-low hover:bg-surface-container hover:border-primary/50'}
          ${error ? 'border-error bg-error/5' : ''}
        `}
      >
        <input
          type="file"
          ref={fileInputRef}
          onChange={(e) => handleFile(e.target.files[0])}
          accept={accept}
          className="hidden"
        />

        {file ? (
          <div className="w-full flex flex-col items-center animate-in zoom-in-95 duration-300">
            {preview ? (
              <img 
                src={preview} 
                alt="Preview" 
                className="w-32 h-32 object-cover rounded-xl shadow-lg mb-4" 
              />
            ) : (
              <div className="w-16 h-16 bg-primary/10 rounded-xl flex items-center justify-center mb-4 text-primary">
                <span className="material-symbols-outlined text-4xl">description</span>
              </div>
            )}
            
            <div className="flex flex-col items-center gap-1">
              <span className="font-bold text-on-surface truncate max-w-xs">{file.name}</span>
              <span className="text-xs text-on-surface-variant">
                {(file.size / 1024 / 1024).toFixed(2)} MB
              </span>
            </div>

            <button
              onClick={removeFile}
              className="mt-6 flex items-center gap-2 px-4 py-2 bg-error/10 text-error rounded-xl font-bold hover:bg-error/20 transition-all text-sm"
            >
              <span className="material-symbols-outlined text-sm">delete</span>
              Remove File
            </button>
          </div>
        ) : (
          <>
            <div className={`w-16 h-16 rounded-full flex items-center justify-center mb-4 transition-all duration-300
              ${isDragging ? 'bg-primary text-on-primary scale-110' : 'bg-surface-container-highest text-on-surface-variant'}
            `}>
              <span className="material-symbols-outlined text-3xl">upload_file</span>
            </div>
            <h3 className="font-bold text-lg mb-1">Click or drag to upload</h3>
            <p className="text-sm text-on-surface-variant mb-4">
              Supports PDF, JPG, or PNG (Max {maxSizeMB}MB)
            </p>
            <div className="px-6 py-2 bg-primary/10 text-primary rounded-xl font-bold text-sm">
              Browse Files
            </div>
          </>
        )}

        {error && (
          <div className="mt-4 flex items-center gap-2 text-error text-xs font-bold animate-in slide-in-from-top-2">
            <span className="material-symbols-outlined text-sm">error</span>
            {error}
          </div>
        )}
      </div>
    </div>
  );
}
