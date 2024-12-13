import React from 'react';
import { Clock, User, AlertTriangle } from 'lucide-react';

const MessageItem = ({ message }) => {
  // Function to get importance color
  const getImportanceColor = (importance) => {
    if (importance == 10) return 'bg-red-500';
    if (importance == 5) return 'bg-yellow-500';
    return 'bg-green-500';
  };

  return (
    <div className="bg-white shadow-md rounded-lg p-4 mb-4 border border-gray-100 hover:shadow-lg transition-shadow duration-300">
      <div className="flex items-center justify-between mb-2">
        <div className="flex items-center space-x-2">
          <User className="text-gray-500" size={16} />
          <span className="font-semibold text-gray-700"><b>from </b>{message.from}</span>
        </div>
        <div 
          className={`${getImportanceColor(message.importance)} w-4 h-4 rounded-full`}
          title={`Importance: ${message.importance}`}
        />
      </div>
      <div className="mb-2">
        <h3 className="text-lg font-semibold text-gray-800"><b>subject</b> :{message.subject}</h3>
      </div>
      <div className="flex items-center text-gray-500 text-sm">
        <Clock className="mr-2" size={14} />
        <span>{message.createdAt}</span>
      </div>
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