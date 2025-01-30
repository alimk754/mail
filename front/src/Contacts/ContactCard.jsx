import React from 'react';
import { Mail, Edit2, Trash2 } from 'lucide-react';

const ContactCard = ({ contact, index, onEdit, onDelete }) => {
  return (
    <div className="bg-white rounded-lg shadow-sm border border-gray-200 p-4">
      <div className="flex justify-between items-start">
        <div className="flex flex-col">
          <h3 className="text-lg font-medium text-gray-800">{contact.name}</h3>
          <div className="mt-1">
            {Array.isArray(contact.emails) ? (
              contact.emails.map((email, emailIndex) => (
                <div key={emailIndex} className="flex items-center gap-2 text-gray-600">
                  <Mail className="h-4 w-4" />
                  <span>{email}</span>
                </div>
              ))
            ) : (
              <div className="flex items-center gap-2 text-gray-600">
                <Mail className="h-4 w-4" />
                <span>{contact.emails}</span>
              </div>
            )}
          </div>
        </div>
        <div className="flex gap-1 ml-4">
          <button
            onClick={() => onEdit(index)}
            className="p-1.5 text-gray-600 hover:bg-gray-100 rounded-md transition-colors"
          >
            <Edit2 className="h-4 w-4" />
          </button>
          <button
            onClick={() => onDelete(contact.id)}
            className="p-1.5 text-red-600 hover:bg-red-50 rounded-md transition-colors"
          >
            <Trash2 className="h-4 w-4" />
          </button>
        </div>
      </div>
    </div>
  );
};

export default ContactCard;