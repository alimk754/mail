import React, {useContext ,useState } from 'react';
import { Clock, User, AlertTriangle, ChevronDown, ChevronUp } from 'lucide-react';
import { Datacontext } from '../../main';

const MessageItem = ({ message }) => {
  const [isExpanded, setIsExpanded] = useState(false);
  const {user,setUser} =useContext(Datacontext);

  // Function to get importance color
  const getImportanceColor = (importance) => {
    if (importance == 10) return 'bg-red-500';
    if (importance == 5) return 'bg-yellow-500';
    return 'bg-green-500';
  };

  return (
    <div className="bg-white shadow-md rounded-lg mb-4 border border-gray-100 hover:shadow-lg transition-shadow duration-300">
      <div 
        className="p-4 cursor-pointer flex items-center justify-between"
        onClick={() => setIsExpanded(!isExpanded)}
      >
        <div className="flex items-center space-x-2">
          <User className="text-gray-500" size={16} />
          <span className="font-semibold text-gray-700">from :{user.email === message.from ? "You" : message.from}</span>
        </div>
        <div className="flex items-center space-x-2">
          <User className="text-gray-500" size={16} />
          <span className="font-semibold text-gray-700">to :{user.email === message.to ? "You" : message.to}</span>
        </div>
        <div className="mb-2">
            <h3 className="text-lg font-bold text-gray-800">Subject: {message.subject}</h3>
        </div>
        <div className="flex justify-between text-sm text-gray-500">
    
            <div className="flex items-center">
              <Clock className="mr-2" size={14} />
              <span>{message.createdAt}</span>
            </div>
          </div>
        <div className="flex items-center space-x-2">
          <div 
            className={`${getImportanceColor(message.importance)} w-4 h-4 rounded-full`}
            title={`Importance: ${message.importance}`}
          />
          {isExpanded ? <ChevronUp /> : <ChevronDown />}
        </div>
      
      </div>
      
      {isExpanded && (
        <div className="p-4 bg-gray-50 border-t">
         
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