import React, { useRef, useState } from 'react';
import FilePreview from './FilePreview';
import MessageAttachments from './MessageAttachment';
import EnterAttachment from './EnterAttachment';
import AttachmentInCompose from './AttachmentInCompose';

const FileAttachment = ({ attachments, setAttachments, error, setError,setComeFromDraft,comeFromDraft }) => {
  
  const fileInputRef = useRef(null);
  const [previewFile, setPreviewFile] = useState(null);
  const [isProcessing, setIsProcessing] = useState(false);

  const formatFileSize = (bytes) => {
    if (bytes < 1024) return `${bytes} B`;
    if (bytes < 1024 * 1024) return `${(bytes / 1024).toFixed(2)} KB`;
    if (bytes < 1024 * 1024 * 1024) return `${(bytes / (1024 * 1024)).toFixed(2)} MB`;
  };


  return (
    <div className="space-y-4">
      <EnterAttachment  isProcessing={isProcessing} fileInputRef={fileInputRef} attachments={attachments} setIsProcessing={setIsProcessing} setAttachments={setAttachments} setError={setError}/>

      {attachments.length > 0 &&!comeFromDraft&& (
        <AttachmentInCompose attachments={attachments}formatFileSize={formatFileSize}  setPreviewFile={setPreviewFile} setAttachments={setAttachments} setError={setError} fileInputRef={fileInputRef} />  
      )}
      {attachments.length > 0 &&comeFromDraft&& (
        <MessageAttachments attachments={attachments} comeFromDraft={comeFromDraft} setComeFromDraft={setComeFromDraft} setAttachments={setAttachments} />
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