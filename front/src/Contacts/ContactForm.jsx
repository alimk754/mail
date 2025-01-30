import React from 'react';
import { X, Plus, Edit2, Loader, AlertCircle, Trash2 } from 'lucide-react';

const ContactForm = ({
  showForm,
  editIndex,
  newContact,
  loading,
  error,
  onClose,
  onNameChange,
  onEmailChange,
  onAddEmail,
  onRemoveEmail,
  onSubmit
}) => {
  if (!showForm) return null;

  return (
    <div className="fixed inset-0 bg-black bg-opacity-50 flex items-center justify-center z-50">
      <div className="bg-white rounded-lg shadow-xl w-full max-w-md mx-4 relative flex flex-col max-h-[90vh]">
        <div className="flex justify-between items-center p-4 border-b">
          <h2 className="text-xl font-semibold text-gray-800">
            {editIndex !== null ? 'Edit Contact' : 'Add New Contact'}
          </h2>
          <button onClick={onClose} className="text-gray-500 hover:text-gray-700">
            <X className="h-5 w-5" />
          </button>
        </div>

        {error && (
          <div className="mx-4 mt-4">
            <div className="flex items-center gap-2 px-4 py-3 bg-red-50 border border-red-200 rounded-md text-red-600 text-sm">
              <AlertCircle className="h-4 w-4 flex-shrink-0" />
              <span>{error}</span>
            </div>
          </div>
        )}

        <div className="p-4 space-y-3 overflow-y-auto flex-1">
          <input
            type="text"
            placeholder="Name"
            value={newContact.name}
            onChange={(e) => onNameChange(e.target.value)}
            className="w-full px-3 py-2 border border-gray-300 rounded-md focus:outline-none focus:ring-2 focus:ring-blue-500"
          />

          {newContact.emails.map((email, index) => (
            <div key={index} className="flex gap-2">
              <input
                type="email"
                placeholder="Email"
                value={email}
                onChange={(e) => onEmailChange(index, e.target.value)}
                className="flex-1 px-3 py-2 border border-gray-300 rounded-md focus:outline-none focus:ring-2 focus:ring-blue-500"
              />
              {newContact.emails.length > 1 && (
                <button
                  onClick={() => onRemoveEmail(index)}
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
            onClick={onAddEmail}
            className="flex items-center gap-2 px-3 py-2 border border-gray-300 rounded-md hover:bg-gray-100 transition-colors"
          >
            <Plus className="h-4 w-4" />
            Add Email
          </button>

          <button
            onClick={onSubmit}
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
  );
};

export default ContactForm;