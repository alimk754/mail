import React from 'react';
import { Mail, Edit2, Trash2, Loader } from 'lucide-react';
import ContactCard from './ContactCard';

const ContactList = ({ contacts, loading, onEdit, onDelete }) => {
  if (loading && !contacts.length) {
    return (
      <div className="flex justify-center items-center p-8">
        <Loader className="h-8 w-8 animate-spin text-blue-600" />
      </div>
    );
  }

  return (
    <div className="space-y-3">
      {contacts.map((contact, index) => (
        <ContactCard 
          key={contact.id}
          contact={contact}
          index={index}
          onEdit={onEdit}
          onDelete={onDelete}
        />
      ))}
    </div>
  );
};

export default ContactList;