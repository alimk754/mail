import React, { useState } from 'react';
import { Paperclip, X, File, Image, FileText, Video } from 'lucide-react';

const FileAttachment = ({ attachments, setAttachments, error, setError }) => {
  const maxFileSize = 200 * 1024 * 1024; 

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
  };

  const removeAttachment = (index) => {
    setAttachments(prev => prev.filter((_, i) => i !== index));
  };

  return (
    <div className="space-y-4">
      <div className="flex items-center space-x-2">
        <label className="cursor-pointer flex items-center space-x-2 text-blue-600 hover:text-blue-700">
          <Paperclip size={20} />
          <span>Attach files</span>
          <input
            type="file"
            multiple
            onChange={handleFileSelect}
            className="hidden"
            accept="image/*,video/*,application/pdf,text/*"
          />
        </label>
      </div>

      {attachments.length > 0 && (
        <div className="space-y-2">
          {attachments.map((file, index) => {
            const FileIcon = getFileIcon(file.type);
            return (
              <div
                key={index}
                className="flex items-center justify-between p-2 bg-gray-50 rounded-lg border border-gray-200"
              >
                <div className="flex items-center space-x-2">
                  <FileIcon size={20} className="text-gray-500" />
                  <span className="text-sm text-gray-700">{file.name}</span>
                  <span className="text-xs text-gray-500">
                    ({(file.size / 1024).toFixed(1)} KB)
                  </span>
                </div>
                <button
                  onClick={() => removeAttachment(index)}
                  className="text-gray-500 hover:text-red-500"
                >
                  <X size={20} />
                </button>
              </div>
            );
          })}
        </div>
      )}
    </div>
  );
};

export default FileAttachment;