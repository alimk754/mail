import React, { useContext, useState } from 'react';
import { Clock, User, ChevronDown, ChevronUp, Trash2  } from 'lucide-react';
import { Datacontext } from '../../main';

const MessageItem = ({ message }) => {
  const [isExpanded, setIsExpanded] = useState(false);
  const { user, setUser } = useContext(Datacontext);

  // Function to get importance color
  const getImportanceColor = (importance) => {
    if (importance == 10) return 'bg-red-500';
    if (importance == 5) return 'bg-yellow-500';
    return 'bg-green-500';
  };

  return (
    <div className="bg-white shadow-md rounded-lg mb-4 border border-gray-100 hover:shadow-lg transition-shadow duration-300">
      <div 
        className="p-4 cursor-pointer grid grid-cols-12 items-center gap-4"
        onClick={() => setIsExpanded(!isExpanded)}
      >
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

        {/* Subject Column */}
        <div className="col-span-3">
          <h3 className="text-lg font-bold text-gray-800 truncate">
            Subject: {message.subject}
          </h3>
        </div>

        {/* Timestamp Column */}
        <div className="col-span-3 flex items-center text-sm text-gray-500">
          <Clock className="mr-2" size={14} />
          <span className="truncate">{message.createdAt}</span>
        </div>

        <div className="col-span-1">
          <button className='text-gray-800 font-bold py-2 px-4 rounded flex items-center transition-all duration-300 ease-in-out transform hover:scale-110 hover:text-red-500'>
          <Trash2 size={16} />
          </button>
        </div>

        {/* Importance and Expand Icon Column */}
        <div className="col-span-1 flex items-center justify-end space-x-2">
          <div 
            className={`${getImportanceColor(message.importance)} w-4 h-4 rounded-full`}
            title={`Importance: ${message.importance}`}
          />
          {isExpanded ? <ChevronUp /> : <ChevronDown />}
        </div>
      </div>
      
      {isExpanded && (
        <div className="p-4 bg-gray-100 border-t">
          <div className="mb-2">
            <p className="text-gray-700 break-all">{message.message}</p>
          </div>
        </div>
      )}
    </div>
  );
};

const MessageList = ({ messages }) => {
  return (
    <div className="space-y-4">
      {messages.map((message) => (
        <MessageItem key={message.id} message={message} />
      ))}
    </div>
  );
};

export default MessageList;