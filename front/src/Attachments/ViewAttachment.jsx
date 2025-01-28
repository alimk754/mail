import React from "react";
import { Eye } from "lucide-react";

const ViewAttachment = ({setPreviewFile,attachment}) => {
  return (
    <button
      onClick={() => setPreviewFile(attachment.originalFile)}
      className="text-gray-500 hover:text-blue-500 flex-shrink-0"
      title="Preview file"
    >
      <Eye size={20} />
    </button>
  );
};

export default ViewAttachment;
