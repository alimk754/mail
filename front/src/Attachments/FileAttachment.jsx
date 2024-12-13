import React, { useRef ,useState} from 'react';
import FilePreview from './FilePreview';
import { Paperclip, X, File, Image, FileText, Video, Eye } from 'lucide-react';

const FileAttachment = ({ attachments, setAttachments, error, setError }) => {
  const maxFileSize = 200 * 1024 * 1024;
  const fileInputRef = useRef(null);
  const [previewFile, setPreviewFile] = useState(null);

  const formatFileSize = (bytes) => {
    if (bytes < 1024) return `${bytes} B`;
    if (bytes < 1024 * 1024) return `${(bytes / 1024).toFixed(2)} KB`;
    if (bytes < 1024 * 1024 * 1024) return `${(bytes / (1024 * 1024)).toFixed(2)} MB`;
    
  };

  const getFileIcon = (type) => {
    if (type.startsWith('image/')) return Image;
    if (type.startsWith('video/')) return Video;
    if (type.startsWith('text/')) return FileText;
    return File;
  };

  const handleFileSelect = (e) => {
    const files = Array.from(e.target.files);
    
    let valid = true;
    
    files.forEach(file => {
        
      if (file.size > maxFileSize) {
        setError(`File ${file.name} exceeds 200MB limit`);
        valid = false;
      }
    });

    if (valid) {
      setAttachments(prev => [...prev, ...files]);
      setError(null);
    }
    e.target.value = '';
  };

  const removeAttachment = (index) => {
    setAttachments(prev => prev.filter((_, i) => i !== index));
   
    setError(null);
    
    if (fileInputRef.current) {
      fileInputRef.current.value = '';
    }
  };

  return (
    <div className="space-y-4">
      <div className="flex items-center space-x-2">
        <label className="cursor-pointer flex items-center space-x-2 text-blue-600 hover:text-blue-700">
          <Paperclip size={20} />
          <span>Attach files</span>
          <input
            ref={fileInputRef}
            type="file"
            multiple
            onChange={handleFileSelect}
            className="hidden"
            accept="*/*"
          />
        </label>
        {attachments.length > 0 && (
          <span className="text-sm text-gray-500">
            {attachments.length} file{attachments.length !== 1 ? 's' : ''} selected
          </span>
        )}
      </div>

      {attachments.length > 0 && (
        <div className="space-y-2">
          {attachments.map((file, index) => {
            const FileIcon = getFileIcon(file.type);
            return (
              <div
                key={`${file.name}-${index}`}
                className="flex items-center justify-between p-2 bg-gray-50 rounded-lg border border-gray-200"
              >
                <div className="flex items-center space-x-2 flex-1 min-w-0">
                  <FileIcon size={20} className="text-gray-500 flex-shrink-0" />
                  <span className="text-sm text-gray-700 truncate">
                    {file.name}
                  </span>
                  <span className="text-xs text-gray-500 flex-shrink-0">
                    ({formatFileSize(file.size)})
                  </span>
                </div>
                <div className="flex items-center space-x-2">
                  <button
                    onClick={() => setPreviewFile(file)}
                    className="text-gray-500 hover:text-blue-500 flex-shrink-0"
                    title="Preview file"
                  >
                    <Eye size={20} />
                  </button>
                  <button
                    onClick={() => removeAttachment(index)}
                    className="text-gray-500 hover:text-red-500 flex-shrink-0"
                    title="Remove file"
                  >
                    <X size={20} />
                  </button>
                </div>
              </div>
            );
          })}
        </div>
      )}

      {previewFile && (
        <FilePreview
          file={previewFile}
          onClose={() => setPreviewFile(null)}
          formatFileSize={formatFileSize}
        />
      )}

     
    </div>
  );
};

export default FileAttachment;