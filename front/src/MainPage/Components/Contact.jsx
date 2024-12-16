import React, { useContext, useState, useEffect } from 'react';
import { Datacontext } from '../../main';
import { Trash2, Plus, Mail, Edit2, X, Loader } from 'lucide-react';
import axios from 'axios';

const Contact = () => {
  const { user } = useContext(Datacontext);
  const [showForm, setShowForm] = useState(false);
  const [editIndex, setEditIndex] = useState(null);
  const [contacts, setContacts] = useState([]);
  const [loading, setLoading] = useState(false);
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
      const { data } = await axios.get(`/api/contacts/${encodeURIComponent(user.email)}`);
      setContacts(Array.isArray(data) ? data : []); 
     
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
      
      console.log('Sending request to:', '/api/contacts');
      console.log('With payload:', payload);
  
      try {
        const response = await axios.post('/api/contacts', payload);
        console.log('Response:', response);
        
        await fetchContacts();
        setNewContact({ name: '', emails: [''] });
        setShowForm(false);
      } catch (error) {
        console.log('Error details:', error.response);
        console.error('Error adding contact:', error);
      } finally {
        setLoading(false);
      }
    }
  };

  const handleDeleteContact = async (contactId) => {
    setLoading(true);
    try {
      await axios.delete(`/api/contacts/${contactId}`);
      await fetchContacts();
    } catch (error) {
      console.error('Error deleting contact:', error);
    } finally {
      setLoading(false);
    }
    setEditIndex(null);
  };

  const handleEditContact = (index) => {
    setEditIndex(index);
    setNewContact(contacts[index]);
    setShowForm(true);
  };

  const handleUpdateContact = async () => {
    if (newContact.name && newContact.emails[0]) {
      setLoading(true);
      try {
        await axios.put(`/api/contacts/${contacts[editIndex].id}`, newContact);
        await fetchContacts();
        setEditIndex(null);
        setNewContact({ name: '', emails: [''] });
        setShowForm(false);
      } catch (error) {
        console.error('Error updating contact:', error);
      } finally {
        setLoading(false);
      }
    }
  };

  const handleAddEmail = () => {
    setNewContact((prev) => ({
      ...prev,
      emails: [...prev.emails, ''],
    }));
  };

  const handleRemoveEmail = (emailIndex) => {
    setNewContact((prev) => ({
      ...prev,
      emails: prev.emails.filter((_, i) => i !== emailIndex),
    }));
  };

  const handleEmailChange = (emailIndex, value) => {
    setNewContact((prev) => ({
      ...prev,
      emails: prev.emails.map((email, i) => (i === emailIndex ? value : email)),
    }));
  };

  const handleClose = () => {
    setShowForm(false);
    setEditIndex(null);
    setNewContact({ name: '', emails: [''] });
  };

  return (
    <div className="p-4 relative">
      <div className="flex gap-4 mb-6">
        <button
          onClick={() => setShowForm(true)}
          className="flex items-center gap-2 px-4 py-2 bg-blue-600 text-white rounded-md hover:bg-blue-700 transition-colors"
        >
          <Plus className="h-4 w-4" />
          Add New Contact
        </button>
      </div>

      {showForm && (
        <div className="fixed inset-0 bg-black bg-opacity-50 flex items-center justify-center z-50">
          <div className="bg-white rounded-lg shadow-xl w-full max-w-md mx-4 relative flex flex-col max-h-[90vh]">
            <div className="flex justify-between items-center p-4 border-b">
              <h2 className="text-xl font-semibold text-gray-800">
                {editIndex !== null ? 'Edit Contact' : 'Add New Contact'}
              </h2>
              <button
                onClick={handleClose}
                className="text-gray-500 hover:text-gray-700"
              >
                <X className="h-5 w-5" />
              </button>
            </div>

            <div className="p-4 space-y-3 overflow-y-auto flex-1">
              <input
                type="text"
                placeholder="Name"
                value={newContact.name}
                onChange={(e) => setNewContact((prev) => ({ ...prev, name: e.target.value }))}
                className="w-full px-3 py-2 border border-gray-300 rounded-md focus:outline-none focus:ring-2 focus:ring-blue-500"
              />

              {newContact.emails.map((email, index) => (
                <div key={index} className="flex gap-2">
                  <input
                    type="email"
                    placeholder="Email"
                    value={email}
                    onChange={(e) => handleEmailChange(index, e.target.value)}
                    className="flex-1 px-3 py-2 border border-gray-300 rounded-md focus:outline-none focus:ring-2 focus:ring-blue-500"
                  />
                  {newContact.emails.length > 1 && (
                    <button
                      onClick={() => handleRemoveEmail(index)}
                      className="p-2 text-red-600 hover:bg-red-50 rounded-md transition-colors"
                    >
                      <Trash2 className="h-5 w-5" />
                    </button>
                  )}
                </div>
              ))}
            </div>

            <div className="p-4 border-t bg-gray-50 rounded-b-lg flex justify-end gap-2">
              <button
                onClick={handleAddEmail}
                className="flex items-center gap-2 px-3 py-2 border border-gray-300 rounded-md hover:bg-gray-100 transition-colors"
              >
                <Plus className="h-4 w-4" />
                Add Email
              </button>

              <button
                onClick={editIndex !== null ? handleUpdateContact : handleAddContact}
                disabled={loading}
                className="flex items-center gap-2 px-3 py-2 bg-blue-600 text-white rounded-md hover:bg-blue-700 transition-colors disabled:opacity-50"
              >
                {loading ? (
                  <Loader className="h-4 w-4 animate-spin" />
                ) : editIndex !== null ? (
                  <>
                    <Edit2 className="h-4 w-4" />
                    Update Contact
                  </>
                ) : (
                  <>
                    <Plus className="h-4 w-4" />
                    Add Contact
                  </>
                )}
              </button>
            </div>
          </div>
        </div>
      )}

      <div className="space-y-3">
        {loading && !contacts.length ? (
          <div className="flex justify-center items-center p-8">
            <Loader className="h-8 w-8 animate-spin text-blue-600" />
          </div>
        ) : (
          contacts.map((contact, index) => (
            <div key={contact.id || index} className="bg-white rounded-lg shadow-sm border border-gray-200 p-4">
              <div className="flex justify-between items-start">
                <div className="flex flex-col">
                  <h3 className="text-lg font-medium text-gray-800">{contact.name}</h3>
                  <div className="mt-1">
                    {contact.emails.map((email, emailIndex) => (
                      <div key={emailIndex} className="flex items-center gap-2 text-gray-600">
                        <Mail className="h-4 w-4" />
                        <span>{email}</span>
                      </div>
                    ))}
                  </div>
                </div>
                <div className="flex gap-1 ml-4">
                  <button
                    onClick={() => handleEditContact(index)}
                    className="p-1.5 text-gray-600 hover:bg-gray-100 rounded-md transition-colors"
                  >
                    <Edit2 className="h-4 w-4" />
                  </button>
                  <button
                    onClick={() => handleDeleteContact(contact.id)}
                    className="p-1.5 text-red-600 hover:bg-red-50 rounded-md transition-colors"
                  >
                    <Trash2 className="h-4 w-4" />
                  </button>
                </div>
              </div>
            </div>
          ))
        )}
      </div>
    </div>
  );
};

export default Contact;