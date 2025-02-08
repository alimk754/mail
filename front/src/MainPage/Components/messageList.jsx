import React, { useContext, useState } from 'react';
import { Clock, User, ChevronDown, ChevronUp, Trash2, Undo, Move } from 'lucide-react';
import { Datacontext } from '../../main';
import axios from 'axios';
import MessageAttachments from '../../Attachments/MessageAttachment';
import DeleteOptions from './DeleteOptions';
import WarningModel from './WarningModel';
import { retrieveService } from '../../apiController/moveController';
import { deleteTrashService } from '../../apiController/deleteController';
const MessageItem = ({
  handleDeleteDraft,
  handleDoubleCLicking,
  title,
  message,
  handlePageReload,
  isSelected,
  onSelect,
  onMessageUpdate
}) => {
  const [isExpanded, setIsExpanded] = useState(false);
  const { user, setUser } = useContext(Datacontext);
  const [showDeleteDiv, setShowDeleteDiv] = useState(false);
  const [showDeleteWar, setShowDeleteWar] = useState(false);

  const getImportanceColor = (importance) => {
    if (importance == 10) return 'bg-red-500';
    if (importance == 5) return 'bg-yellow-500';
    return 'bg-green-500';
  };

  const retrieve = async () => {
   retrieveService(message,user,onMessageUpdate);
  };

  const handleDeleteFromTrash = async () => {
    deleteTrashService();
  };
  return (
    <div
      className={`bg-white shadow-md rounded-lg mb-4 border ${
        isSelected ? 'border-blue-500 bg-blue-50' : 'border-gray-100'
      } hover:shadow-lg transition-shadow duration-300`}
      onDoubleClick={() => handleDoubleCLicking(message)}
    >
      <div className="p-4 grid grid-cols-12 items-center gap-4">
        {/* Checkbox Column */}
        <div className="col-span-1">
          <input
            type="checkbox"
            checked={isSelected}
            onChange={(e) => onSelect(message.id, e.target.checked)}
            className="w-4 h-4 text-blue-600 rounded focus:ring-blue-500"
            onClick={(e) => e.stopPropagation()}
          />
        </div>

        {/* From Column */}
        <div className="col-span-2 flex items-center space-x-2">
          <User className="text-gray-500" size={16} />
          <span className="font-semibold text-gray-700 truncate">
            from: {user.email === message.from ? "You" : message.from}
          </span>
        </div>

        {/* To Column */}
        <div className="col-span-2 flex items-center space-x-2">
          <User className="text-gray-500" size={16} />
          <span className="font-semibold text-gray-700 truncate">
            to: {user.email === message.to ? "You" : message.to}
          </span>
        </div>

        {/* Subject Column - Adjusted for Trash view */}
        <div className={`${title === "Trash" ? "col-span-2" : "col-span-3"} overflow-hidden`}>
          <h3 className="text-lg font-bold text-gray-800 truncate">
            Subject: {message.subject}
          </h3>
        </div>

        {/* Timestamp Column */}
        <div className="col-span-2 flex items-center text-sm text-gray-500">
          <Clock className="mr-2" size={14} />
          <span className="truncate">{message.createdAt}</span>
        </div>

        {/* Action Buttons Column - Adjusted for Trash view */}
        <div className={`${title === "Trash" ? "col-span-2" : "col-span-1"} flex justify-end space-x-2`}>
          {title === "Trash" ? (
            <>
              <button
                onClick={retrieve}
                className="text-gray-800 font-bold py-2 px-4 rounded flex items-center transition-all duration-300 ease-in-out transform hover:scale-110 hover:text-blue-500"
              >
                <Undo size={20} />
              </button>
              
            </>
          ) : null}
        </div>

        {/* Importance and Expand Icon Column */}
        <div className="col-span-1 flex items-center justify-end space-x-2">
          <div
            className={`${getImportanceColor(message.importance)} w-4 h-4 rounded-full`}
            title={`Importance: ${message.importance}`}
          />
          {isExpanded ? (
            <ChevronUp
              className="cursor-pointer transition-all duration-300 ease-in-out transform hover:text-red-500 hover:scale-110"
              onClick={() => setIsExpanded(!isExpanded)}
            />
          ) : (
            <ChevronDown
              className="cursor-pointer transition-all duration-300 ease-in-out transform hover:text-blue-500 hover:scale-110"
              onClick={() => setIsExpanded(!isExpanded)}
            />
          )}
        </div>
      </div>

      {isExpanded && (
        <div className="p-4 bg-gray-100 border-t">
          {/* Message Details Card */}
          <div className="bg-white rounded-lg p-4 mb-4 shadow-sm">
            <div className="grid grid-cols-2 gap-4 mb-4">
              <div>
                <div className="flex items-center space-x-2 mb-2">
                  <User className="text-gray-500" size={16} />
                  <span className="text-sm text-gray-600">From:</span>
                  <span className="font-medium">
                    {user.email === message.from ? "You" : message.from}
                  </span>
                </div>
                <div className="flex items-center space-x-2">
                  <User className="text-gray-500" size={16} />
                  <span className="text-sm text-gray-600">To:</span>
                  <span className="font-medium">
                    {user.email === message.to ? "You" : message.to}
                  </span>
                </div>
              </div>
              <div>
                <div className="flex items-center space-x-2 mb-2">
                  <span className="text-sm text-gray-600">Subject:</span>
                  <span className="font-medium">{message.subject}</span>
                </div>
                <div className="flex items-center space-x-2">
                  <Clock className="text-gray-500" size={16} />
                  <span className="text-sm text-gray-600">Sent:</span>
                  <span className="font-medium">{message.createdAt}</span>
                </div>
              </div>
            </div>
            
            <div className="border-t pt-2">
              <MessageAttachments attachments={message.attachments} />
              <p className="text-gray-700 break-all whitespace-pre-wrap">{message.message}</p>
            </div>
          </div>
        </div>
      )}

      {/* Modals */}
      {title === "Drafts" && (
        <WarningModel
          isOpen={showDeleteWar}
          onClose={() => setShowDeleteWar(false)}
          onConfirm={() => handleDeleteDraft(message.id)}
          title="Delete This Draft"
          message={`Are you sure you want to delete this Draft?`}
          confirmText="Yes, Delete"
          cancelText="Cancel"
        />
      )}

      {title !== "Drafts" && (
        <WarningModel
          isOpen={showDeleteWar}
          onClose={() => setShowDeleteWar(false)}
          onConfirm={handleDeleteFromTrash}
          title="Delete This Messages"
          message={`Are you sure you want to delete this message from Trash?`}
          confirmText="Yes, Delete"
          cancelText="Cancel"
        />
      )}

      {showDeleteDiv && (
        <DeleteOptions
          onClose={() => setShowDeleteDiv(false)}
          onDeleteForMe={() => DeleteMessage(false)}
          onDeleteForEveryone={() => DeleteMessage(true)}
        />
      )}
    </div>
  );
};
export default MessageItem;