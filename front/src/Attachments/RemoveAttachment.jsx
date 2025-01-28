import React from "react";
import { X } from "lucide-react";

const RemoveAttachment = ({index,setAttachments,setError,fileInputRef }) => {
  const removeAttachment = (index) => {
    setAttachments((prev) => prev.filter((_, i) => i !== index));
    setError(null);
    if (fileInputRef.current) {
      fileInputRef.current.value = "";
    }
  };
  return (
    <button
      onClick={() => removeAttachment(index)}
      className="text-gray-500 hover:text-red-500 flex-shrink-0"
      title="Remove file"
    >
      <X size={20} />
    </button>
  );
};

export default RemoveAttachment;
