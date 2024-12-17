import React, { useContext, useState, useEffect } from 'react';
import { Datacontext } from '../../../main';
import { Plus } from 'lucide-react';
import ContactList from './ContactList';
import ContactForm from './ContactForm';
import { contactService } from './ContactService';

const Contact = () => {
  const { user } = useContext(Datacontext);
  const [showForm, setShowForm] = useState(false);
  const [editIndex, setEditIndex] = useState(null);
  const [contacts, setContacts] = useState([]);
  const [loading, setLoading] = useState(false);
  const [error, setError] = useState(null);
  const [newContact, setNewContact] = useState({
    name: '',
    emails: [''],
  });

  useEffect(() => {
    if (user?.email) {
      fetchContacts();
    }
  }, [user?.email]);

  const fetchContacts = async () => {
    setLoading(true);
    try {
      const data = await contactService.fetchContacts(user.email);
      setContacts(data);
    } catch (error) {
      console.error('Error fetching contacts:', error);
    } finally {
      setLoading(false);
    }
  };

  const handleAddContact = async () => {
    if (newContact.name && newContact.emails[0]) {
      setLoading(true);
      const payload = {
        email: user.email,
        name: newContact.name,
        emails: newContact.emails
      };
      
      try {
        await contactService.addContact(payload);
        await fetchContacts();
        handleClose();
      } catch (error) {
        setError(error.response.data.message);
      } finally {
        setLoading(false);
      }
    }
  };

  const handleDeleteContact = async (contactId) => {
    setLoading(true);
    try {
      await contactService.deleteContact(contactId);
      await fetchContacts();
    } catch (error) {
      console.error('Error deleting contact:', error);
    } finally {
      setLoading(false);
    }
    setEditIndex(null);
  };

  const handleEditContact = (index) => {
    const contact = contacts[index];
    setEditIndex(index);
    setNewContact({
      name: contact.name,
      emails: Array.isArray(contact.emails) ? contact.emails : [contact.emails]
    });
    setShowForm(true);
  };

  const handleUpdateContact = async () => {
    if (newContact.name && newContact.emails[0]) {
      setLoading(true);
      try {
        const payload = {
          email: user.email,
          name: newContact.name,
          emails: newContact.emails
        };
        await contactService.updateContact(contacts[editIndex].id, payload);
        await fetchContacts();
        handleClose();
      } catch (error) {
        setError(error.response.data.message);
      } finally {
        setLoading(false);
      }
    }
  };

  const handleClose = () => {
    setShowForm(false);
    setEditIndex(null);
    setNewContact({ name: '', emails: [''] });
    setError(null);
  };

  const handleNameChange = (value) => {
    setNewContact(prev => ({ ...prev, name: value }));
    setError(null);
  };

  const handleEmailChange = (emailIndex, value) => {
    setNewContact(prev => ({
      ...prev,
      emails: prev.emails.map((email, i) => (i === emailIndex ? value : email)),
    }));
    setError(null);
  };

  const handleAddEmail = () => {
    setNewContact(prev => ({
      ...prev,
      emails: [...prev.emails, ''],
    }));
    setError(null);
  };

  const handleRemoveEmail = (emailIndex) => {
    setNewContact(prev => ({
      ...prev,
      emails: prev.emails.filter((_, i) => i !== emailIndex),
    }));
    setError(null);
  };

  return (
    <div className="p-4 relative">
      <div className="flex gap-4 mb-6">
        <button
          onClick={() => { setShowForm(true); setError(null); }}
          className="flex items-center gap-2 px-4 py-2 bg-blue-600 text-white rounded-md hover:bg-blue-700 transition-colors"
        >
          <Plus className="h-4 w-4" />
          Add New Contact
        </button>
      </div>

      <ContactForm
        showForm={showForm}
        editIndex={editIndex}
        newContact={newContact}
        loading={loading}
        error={error}
        onClose={handleClose}
        onNameChange={handleNameChange}
        onEmailChange={handleEmailChange}
        onAddEmail={handleAddEmail}
        onRemoveEmail={handleRemoveEmail}
        onSubmit={editIndex !== null ? handleUpdateContact : handleAddContact}
      />

      <ContactList
        contacts={contacts}
        loading={loading}
        onEdit={handleEditContact}
        onDelete={handleDeleteContact}
      />
    </div>
  );
};

export default Contact;