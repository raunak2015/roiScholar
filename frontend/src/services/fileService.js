const DEFAULT_MAX_FILE_SIZE = 10 * 1024 * 1024;
const ACCEPTED_EXTENSIONS = ['.pdf', '.doc', '.docx', '.jpg', '.jpeg', '.png'];
const ACCEPTED_MIME_TYPES = new Set([
  'application/pdf',
  'application/msword',
  'application/vnd.openxmlformats-officedocument.wordprocessingml.document',
  'image/jpeg',
  'image/png',
]);

const getFileExtension = (fileName = '') => {
  const lastDot = fileName.lastIndexOf('.');
  return lastDot >= 0 ? fileName.slice(lastDot).toLowerCase() : '';
};

const isAcceptedFile = (file) => {
  if (ACCEPTED_MIME_TYPES.has(file.type)) {
    return true;
  }

  const extension = getFileExtension(file.name);
  return ACCEPTED_EXTENSIONS.includes(extension);
};

export const ACCEPTED_FILE_TYPES_TEXT = 'PDF, DOC, DOCX, JPG, PNG up to 10MB';

export const validateFiles = (files = [], maxFileSize = DEFAULT_MAX_FILE_SIZE) => {
  const validFiles = [];
  const errors = [];

  files.forEach((file) => {
    if (!isAcceptedFile(file)) {
      errors.push(`Unsupported file type: ${file.name}`);
      return;
    }

    if (file.size > maxFileSize) {
      errors.push(`File too large (max 10MB): ${file.name}`);
      return;
    }

    validFiles.push(file);
  });

  return { validFiles, errors };
};

export const createFileEntries = (files = []) =>
  files.map((file) => ({
    id: `${file.name}-${file.size}-${file.lastModified}`,
    name: file.name,
    size: file.size,
    type: file.type || 'unknown',
    uploadedAt: new Date().toISOString(),
    file,
  }));

export const formatFileSize = (bytes = 0) => {
  if (bytes === 0) return '0 B';
  const sizes = ['B', 'KB', 'MB', 'GB'];
  const i = Math.floor(Math.log(bytes) / Math.log(1024));
  const value = bytes / Math.pow(1024, i);
  return `${value.toFixed(value >= 10 || i === 0 ? 0 : 1)} ${sizes[i]}`;
};
