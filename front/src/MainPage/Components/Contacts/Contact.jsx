import React, { useContext, useState, useEffect } from 'react';
import { Datacontext } from '../../../main';
import { Plus } from 'lucide-react';
import ContactList from './ContactList';
import ContactForm from './ContactForm';
import SearchContact from './SearchContact';
import { contactService } from './ContactService';

const Contact = () => {
  const { user } = useContext(Datacontext);
  const [showForm, setShowForm] = useState(false);
  const [editIndex, setEditIndex] = useState(null);
  const [contacts, setContacts] = useState([]);
  const [loading, setLoading] = useState(false);
  const [error, setError] = useState(null);
  const [searchTerm, setSearchTerm] = useState('');
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

  const handleSearch = (term) => {
    setSearchTerm(term);
  };

  const filteredContacts = contacts.filter(contact => {
    const search = searchTerm;
    return (
      contact.name.includes(search)
      //  ||
      // (Array.isArray(contact.emails) 
      //   ? contact.emails.some(email => email.includes(search))
      //   : contact.emails.includes(search))
    );
  });

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
      <div className="flex flex-col gap-4 mb-6">
        <SearchContact 
          onSearch={handleSearch}
        />
        
        <div className="flex justify-end">
          <button
            onClick={() => { setShowForm(true); setError(null); }}
            className="flex items-center gap-2 px-4 py-2 bg-blue-600 text-white rounded-md hover:bg-blue-700 transition-colors"
          >
            <Plus className="h-4 w-4" />
            Add New Contact
          </button>
        </div>
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
        contacts={filteredContacts.sort((a, b) => a.name.localeCompare(b.name))}
        loading={loading}
        onEdit={handleEditContact}
        onDelete={handleDeleteContact}
      />
    </div>
  );
};
export default Contact;