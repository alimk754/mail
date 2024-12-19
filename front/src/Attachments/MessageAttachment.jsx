import React, { useState } from 'react';
import { Download, Eye } from 'lucide-react';
import FilePreview from './FilePreview';

const MessageAttachments = ({ attachments }) => {
  const [selectedFile, setSelectedFile] = useState(null);
  

  const base64ToFile = (attachment) => {
   
    const byteCharacters = atob(attachment.data);  
    const byteArrays = [];
    
   
    for (let offset = 0; offset < byteCharacters.length; offset += 1024) {
        const chunk = byteCharacters.slice(offset, offset + 1024);
        const byteNumbers = new Array(chunk.length);
        
        for (let i = 0; i < chunk.length; i++) {
            byteNumbers[i] = chunk.charCodeAt(i);
        }
        
        byteArrays.push(new Uint8Array(byteNumbers));
    }

   
    const blob = new Blob(byteArrays, { type: attachment.contentType });
    
    
    return new File([blob], attachment.fileName, { 
        type: attachment.contentType,
        lastModified: new Date().getTime()
    });
};

  const handleDownload = (attachment) => {
    const file = base64ToFile(attachment);
    const url = URL.createObjectURL(file);
    const link = document.createElement('a');
    link.href = url;
    link.download = attachment.fileName;
    document.body.appendChild(link);
    link.click();
    document.body.removeChild(link);
    URL.revokeObjectURL(url);
  };

  const handlePreview = (attachment) => {
    const file = base64ToFile(attachment);
    setSelectedFile(file);
  };

  const formatFileSize = (bytes) => {
    if (bytes < 1024) return bytes + ' B';
    else if (bytes < 1048576) return (bytes / 1024).toFixed(1) + ' KB';
    else return (bytes / 1048576).toFixed(1) + ' MB';
  };

  if (!attachments || attachments.length === 0) return null;

  return (
    <>
      <div className="mt-4 border-b pb-8 space-y-2">
        <h4 className="text-sm font-semibold text-gray-700 mb-2">Attachments:</h4>
        <div className="grid grid-cols-1 gap-2">
          {attachments.map((attachment, index) => (
            <div 
              key={index}
              className="flex items-center justify-between p-2 bg-white rounded-md border border-gray-200 hover:bg-gray-50"
            >
              <div className="flex items-center space-x-2">
                <div className="text-sm">
                  <p className="font-medium text-gray-700">{attachment.fileName}</p>
                  <p className="text-gray-500 text-xs">{formatFileSize(attachment.fileSize)}</p>
                </div>
              </div>
              <div className="flex items-center space-x-2">
                <button
                  onClick={() => handlePreview(attachment)}
                  className="p-1 hover:bg-gray-100 rounded-full transition-colors duration-200"
                  title="Preview attachment"
                >
                  <Eye size={16} className="text-gray-600 hover:text-blue-600" />
                </button>
                <button
                  onClick={() => handleDownload(attachment)}
                  className="p-1 hover:bg-gray-100 rounded-full transition-colors duration-200"
                  title="Download attachment"
                >
                  <Download size={16} className="text-gray-600 hover:text-blue-600" />
                </button>
              </div>
            </div>
          ))}
        </div>
      </div>

      {selectedFile && (
        <FilePreview 
          file={selectedFile}
          onClose={() => setSelectedFile(null)}
          formatFileSize={formatFileSize}
        />
      )}
    </>
  );
};

export default MessageAttachments;