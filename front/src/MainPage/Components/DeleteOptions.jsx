import React from 'react';

const DeleteOptionsModal = ({ 
  onClose, 
  onDeleteForMe, 
}) => {
  return (
    <div
      className="fixed inset-0 bg-gray-900 bg-opacity-70 flex justify-center items-center z-50"
      onClick={onClose}
    >
      <div
        className="bg-white p-6 rounded-lg shadow-lg text-center space-y-4"
        onClick={(e) => e.stopPropagation()} // Prevent closing when clicking inside the modal
      >
        <h2 className="text-xl font-semibold text-gray-800">Delete Options</h2>
        <p className="text-gray-600">Choose how you want to delete the message:</p>
        <div className="flex justify-center space-x-4">
          <button
            className="px-4 py-2 bg-red-500 text-white rounded hover:bg-red-600"
            onClick={onDeleteForMe}
          >
            Delete
          </button>
          
          <button
            className="px-4 py-2 bg-gray-300 text-gray-800 rounded hover:bg-gray-400"
            onClick={onClose}
          >
            Cancel
          </button>
        </div>
      </div>
    </div>
  );
};

export default DeleteOptionsModal;