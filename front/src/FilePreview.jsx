import React, { useState, useEffect } from 'react';
import { X, Download, FileText } from 'lucide-react';

const FilePreview = ({ file, onClose,formatFileSize }) => {
  const [content, setContent] = useState(null);
  const [objectUrl, setObjectUrl] = useState(null);

  useEffect(() => {
    if (!file) return;
    const url = URL.createObjectURL(file);
    setObjectUrl(url);
    
    if (file.type.startsWith('text/')) {
      const reader = new FileReader();
      reader.onload = (e) => {
        setContent(e.target.result);
      };
      reader.readAsText(file);
    }

    return () => URL.revokeObjectURL(url);
  }, [file]);

  if (!file) return null;

  const handleDownload = () => {
    const link = document.createElement('a');
    link.href = objectUrl;
    link.download = file.name;
    document.body.appendChild(link);
    link.click();
    document.body.removeChild(link);
  };

  const getPreviewContent = () => {
    
    if (file.type.startsWith('image/')) {
      return (
        <img
          src={objectUrl}
          alt={file.name}
          className="max-w-full h-auto rounded-lg"
        />
      );
    }
    
    
    if (file.type.startsWith('video/')) {
      return (
        <video 
          controls 
          className="max-w-full rounded-lg"
          src={objectUrl}
        >
          Your browser does not support the video tag.
        </video>
      );
    }
    
    
    if (file.type.startsWith('audio/')) {
      return (
        <audio 
          controls 
          className="w-full mt-4"
          src={objectUrl}
        >
          Your browser does not support the audio tag.
        </audio>
      );
    }
    
    
    if (file.type === 'application/pdf') {
      return (
        <iframe
          src={objectUrl}
          className="w-full h-[600px] rounded-lg"
          title="PDF Preview"
        />
      );
    }
    
   
    if (file.type.startsWith('text/')) {
      return content ? (
        <pre className="whitespace-pre-wrap p-4 bg-gray-50 rounded-lg max-h-[600px] overflow-auto">
          {content}
        </pre>
      ) : (
        <div className="p-4 text-center">Loading text content...</div>
      );
    }

    return (
      <div className="p-8 bg-gray-50 rounded-lg text-center">
        <FileText size={48} className="mx-auto mb-4 text-gray-400" />
        <p className="text-lg font-medium mb-2">Preview not available</p>
        <p className="text-sm text-gray-500 mb-4">
          This file type cannot be previewed
        </p>
        <button
          onClick={handleDownload}
          className="inline-flex items-center px-4 py-2 bg-blue-600 text-white rounded-lg hover:bg-blue-700 transition-colors"
        >
          <Download size={20} className="mr-2" />
          Download File
        </button>
      </div>
    );
  };

  return (
    <div className="fixed inset-0 z-40 overflow-hidden">
      <div className="absolute inset-0 bg-black bg-opacity-75" onClick={onClose} />
      <div className="fixed inset-x-0 top-10 mx-auto z-50 bg-white rounded-lg shadow-lg p-4 max-w-4xl max-h-[90vh] overflow-auto">
        <div className="flex justify-between items-center mb-4">
          <div className="flex-1 min-w-0 mr-4">
            <h3 className="text-lg font-medium text-gray-900 truncate">
              {file.name}
            </h3>
            <p className="text-sm text-gray-500">
            {formatFileSize(file.size)}
            </p>
          </div>
          <div className="flex gap-2 flex-shrink-0">
            <button
              onClick={handleDownload}
              className="p-1 hover:bg-gray-100 rounded-full"
              title="Download file"
            >
              <Download size={20} className="text-gray-500" />
            </button>
            <button
              onClick={onClose}
              className="p-1 hover:bg-gray-100 rounded-full"
              title="Close preview"
            >
              <X size={20} className="text-gray-500" />
            </button>
          </div>
        </div>
        <div className="relative overflow-auto">
          {getPreviewContent()}
        </div>
      </div>
    </div>
  );
};

export default FilePreview;