import React from 'react'
import { Paperclip } from 'lucide-react' 

const EnterAttachment = ({isProcessing,fileInputRef,attachments,setIsProcessing,setAttachments,setError}) => {
    const maxFileSize = 200 * 1024 * 1024;
    const processFile = async (file) => {
        return new Promise((resolve, reject) => {
          const reader = new FileReader();
          reader.onload = () => {
            resolve({
              fileName: file.name,
              contentType: file.type,
              fileSize: file.size,
              data: reader.result.split(',')[1],
              file: file, 
              originalFile: file
            });
          };
          reader.onerror = reject;
          reader.readAsDataURL(file);
          console.log("procced ended")
        });
       
      };
    
      const handleFileSelect = async (e) => {
        const files = Array.from(e.target.files);
        let valid = true;
        
        files.forEach(file => {
          if (file.size > maxFileSize) {
            setError(`File ${file.name} exceeds 200MB limit`);
            valid = false;
          }
        });
    
        if (valid) {
          setIsProcessing(true);
          try {
           
            const processedFiles = await Promise.all(files.map(processFile));
            setAttachments(prev => [...prev, ...processedFiles]);
            setError(null);
          } catch (err) {
            setError('Error processing files. Please try again.');
            console.error('File processing error:', err);
          } finally {
            setIsProcessing(false);
          }
        }
        e.target.value = '';
      };
  return (
    <div className="flex items-center space-x-2">
        <label className={`cursor-pointer flex items-center space-x-2 text-blue-600 hover:text-blue-700 ${isProcessing ? 'opacity-50 cursor-wait' : ''}`}>
          <Paperclip size={20} />
          <span>{isProcessing ? 'Processing...' : 'Attach files'}</span>
          <input
            ref={fileInputRef}
            type="file"
            multiple
            onChange={handleFileSelect}
            className="hidden"
            accept="*/*"
            disabled={isProcessing}
          />
        </label>
        {attachments.length > 0 && (
          <span className="text-sm text-gray-500">
            {attachments.length} file{attachments.length !== 1 ? 's' : ''} selected
          </span>
        )}
      </div>
  )
}

export default EnterAttachment