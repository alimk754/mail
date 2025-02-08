import React, { useContext, useState } from 'react';
import { Clock, User, ChevronDown, ChevronUp, Trash2, Undo, Move } from 'lucide-react';
import { Datacontext } from '../../main';

import MessageAttachments from '../../Attachments/MessageAttachment';
import DeleteOptions from './DeleteOptions';
import WarningModel from './WarningModel';
import { deleteAll } from '../../apiController/deleteController';
import MessageItem from './messageList';
import { MoveController } from '../../apiController/moveController';
const MessageList = ({
  handleDeleteDraft,
  handleDoubleCLicking,
  title,
  messages,
  handlePageReload,
}) => {
  const [selectedMessages, setSelectedMessages] = useState(new Set());
  const [showBulkDeleteWarning, setShowBulkDeleteWarning] = useState(false);
  const { user, setUser } = useContext(Datacontext);
  const [showMoveOptions, setShowMoveOptions] = useState(false);
  const [categoryName, setCategoryName] = useState('');
  const [errorOcurred, setErrorOcurred] = useState(null);
  const [showDeleteOp, setShowDeleteOp] = useState(false);
  const [currentMessages, setCurrentMessages] = useState(messages); 
 /////////////////////////////////////////////////////////////////
  React.useEffect(() => {
    setCurrentMessages(messages);
  }, [messages]);

  const handleMessageUpdate = (messageId) => {//////////////////////////////////
    setCurrentMessages(prevMessages => 
      prevMessages.filter(message => message.id !== messageId)
    );
  };

  const handleSelectMessage = (messageId, isSelected) => {
    setSelectedMessages(prev => {
      const newSet = new Set(prev);
      if (isSelected) {
        newSet.add(messageId);
      } else {
        newSet.delete(messageId);
      }
      return newSet;
    });
  };

  const handleSelectAll = (isSelected) => {
    if (isSelected) {
      setSelectedMessages(new Set(messages.map(m => m.id)));
    } else {
      setSelectedMessages(new Set());
    }
  };

  const handleBulkMove = async () => {
    MoveController(selectedMessages,user,categoryName,setCurrentMessages,setErrorOcurred,setShowMoveOptions,setSelectedMessages,setCategoryName);
  };

  const handleBulkDelete = async (bool = false) => {
      deleteAll(selectedMessages,title,user,bool,setShowDeleteOp,setSelectedMessages,setShowBulkDeleteWarning,setCurrentMessages,setUser);
  };

  return (
    <div className="space-y-4">
      
      {currentMessages.length > 0 && (
        <div className="flex items-center justify-between mb-4 bg-white p-4 rounded-lg shadow">
          <div className="flex items-center space-x-4">
            <input
              type="checkbox"
              checked={selectedMessages.size === messages.length}
              onChange={(e) => handleSelectAll(e.target.checked)}
              className="w-4 h-4 text-blue-600 rounded focus:ring-blue-500"
            />
            <span className="text-sm text-gray-600">
              {selectedMessages.size} selected
            </span>
          </div>

          {selectedMessages.size > 0 && (
            <div className="flex items-center space-x-4">
              {(title !== "Trash" && title !== "Drafts") && <button
                onClick={() => setShowMoveOptions(true)}
                className="flex items-center space-x-2 text-blue-600 hover:text-blue-700"
              >
                <Move size={16} />
                <span>Move Selected</span>
              </button>}
              
              <button
                onClick={(title === "Sent Mails") ? () => setShowDeleteOp(true) : () => setShowBulkDeleteWarning(true)}
                className="flex items-center space-x-2 text-red-600 hover:text-red-700"
              >
                <Trash2 size={16} />
                <span>Delete Selected</span>
              </button>
            </div>
          )}
        </div>
      )}

      {/* Message List */}
      {currentMessages.map((message) => (//
        <MessageItem
          handleDeleteDraft={handleDeleteDraft}
          handleDoubleCLicking={handleDoubleCLicking}
          title={title}
          key={message.id}
          message={message}
          handlePageReload={handlePageReload}
          isSelected={selectedMessages.has(message.id)}
          onSelect={handleSelectMessage}

          onMessageUpdate={handleMessageUpdate} //////////////////////////////////
        />
      ))}

      {(title !== "Sent Mails") && <WarningModel
        isOpen={showBulkDeleteWarning}
        onClose={() => setShowBulkDeleteWarning(false)}
        onConfirm={handleBulkDelete}
        title="Delete Selected Messages"
        message={`Are you sure you want to delete ${selectedMessages.size} selected message(s)?`}
        confirmText="Yes, Delete All"
        cancelText="Cancel"
      />}

      {(title === "Sent Mails")
      && showDeleteOp && <DeleteOptions
        onClose={() => setShowDeleteOp(false)}
        onDeleteForMe={() => handleBulkDelete(false)}

        />}

      {/* Move Options Modal */}
      {showMoveOptions && (
        <div className="fixed inset-0 flex items-center justify-center z-50">
          <div className="fixed inset-0 bg-black opacity-50"></div>
          <div className="bg-white p-6 rounded-lg shadow-xl z-50 w-96">
            <h3 className="text-lg font-bold mb-4">Move to Category</h3>
            <div className="space-y-4">
              <input
                type="text"
                value={categoryName}
                onChange={(e) => setCategoryName(e.target.value)}
                placeholder="Enter category name"
                className="w-full px-4 py-2 border rounded-lg focus:outline-none focus:ring-2 focus:ring-blue-500"
              />
              {errorOcurred && (
        <div className="error-message mt-2 flex items-center">
          <svg className="error-icon" fill="currentColor" viewBox="0 0 20 20">
            <path
              fillRule="evenodd"
              d="M10 18a8 8 0 100-16 8 8 0 000 16zM8.707 7.293a1 1 0 00-1.414 1.414L8.586 10l-1.293 1.293a1 1 0 101.414 1.414L10 11.414l1.293 1.293a1 1 0 001.414-1.414L11.414 10l1.293-1.293a1 1 0 00-1.414-1.414L10 8.586 8.707 7.293z"
              clipRule="evenodd"
            />
          </svg>
          {errorOcurred}
        </div>
      )}
              <div className="flex justify-end space-x-3">
                <button
                  onClick={() => {
                    setShowMoveOptions(false);
                    setCategoryName('');
                    setSelectedMessages(new Set());
                  }}
                  className="px-4 py-2 text-gray-600 hover:text-gray-800 rounded"
                >
                  Cancel
                </button>
                <button
                  onClick={handleBulkMove}
                  disabled={!categoryName.trim()}
                  className={`px-4 py-2 text-white rounded ${
                    categoryName.trim() 
                      ? 'bg-blue-600 hover:bg-blue-700' 
                      : 'bg-gray-400 cursor-not-allowed'
                  }`}
                >
                  Confirm
                </button>
              </div>
            </div>
          </div>
        </div>
      )}
    </div>
  );
};

export default MessageList;