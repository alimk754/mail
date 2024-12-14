import React from 'react';
import { Download } from 'lucide-react';

const MessageAttachments = ({ attachments }) => {
  const base64ToFile = (attachment) => {
    const byteString = atob(attachment.data);
    const byteNumbers = new Array(byteString.length);
    
    for (let i = 0; i < byteString.length; i++) {
      byteNumbers[i] = byteString.charCodeAt(i);
    }
    
    const byteArray = new Uint8Array(byteNumbers);
    const blob = new Blob([byteArray], { type: attachment.contentType });
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

  const formatFileSize = (bytes) => {
    if (bytes < 1024) return bytes + ' B';
    else if (bytes < 1048576) return (bytes / 1024).toFixed(1) + ' KB';
    else return (bytes / 1048576).toFixed(1) + ' MB';
  };

  if (!attachments || attachments.length === 0) return null;

  return (
    <div className="mt-4 space-y-2">
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
            <button
              onClick={() => handleDownload(attachment)}
              className="p-1 hover:bg-gray-100 rounded-full transition-colors duration-200"
              title="Download attachment"
            >
              <Download size={16} className="text-gray-600 hover:text-blue-600" />
            </button>
          </div>
        ))}
      </div>
    </div>
  );
};

export default MessageAttachments;