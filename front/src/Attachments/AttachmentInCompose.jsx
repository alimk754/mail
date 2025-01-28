import React from "react";
import ViewAttachment from "./ViewAttachment";
import RemoveAttachment from "./RemoveAttachment";
import { Image, Video, FileText,File } from "lucide-react";

const AttachmentInCompose = ({
  attachments,
  formatFileSize,
  setPreviewFile,
  setAttachments,
  setError,
  fileInputRef
}) => {
  const getFileIcon = (type) => {
    if (type.startsWith("image/")) return Image;
    if (type.startsWith("video/")) return Video;
    if (type.startsWith("text/")) return FileText;
    return File;
  };
  return (
    <div className="space-y-2">
      {attachments.map((attachment, index) => {
        const FileIcon = getFileIcon(attachment.contentType);
        return (
          <div
            key={`${attachment.fileName}-${index}`}
            className="flex items-center justify-between p-2 bg-gray-50 rounded-lg border border-gray-200"
          >
            <div className="flex items-center space-x-2 flex-1 min-w-0">
              <FileIcon size={20} className="text-gray-500 flex-shrink-0" />
              <span className="text-sm text-gray-700 truncate">
                {attachment.fileName}
              </span>
              <span className="text-xs text-gray-500 flex-shrink-0">
                ({formatFileSize(attachment.fileSize)})
              </span>
            </div>

            <div className="flex items-center space-x-2">
              <ViewAttachment
                setPreviewFile={setPreviewFile}
                attachment={attachment}
              />
              <RemoveAttachment
                index={index}
                setAttachments={setAttachments}
                setError={setError}
                fileInputRef={fileInputRef}
              />
            </div>
          </div>
        );
      })}
    </div>
  );
};

export default AttachmentInCompose;
