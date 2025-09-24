import axios from 'axios';

const BASE_URL = 'http://localhost:8080/api/contacts';

export const contactService = {
  async fetchContacts(email) {
    const { data } = await axios.get(`${BASE_URL}/${encodeURIComponent(email)}`,{
      auth:{
        username: user.email,
        password: user.password
      }
    });
    return Array.isArray(data) ? data : [];
  },

  async addContact(payload) {
    return await axios.post(`${BASE_URL}/add`, payload,{
      auth:{
        username: user.email,
        password: user.password
      }
    });
  },

  async updateContact(id, payload) {
    return await axios.put(`${BASE_URL}/${id}`, payload,{
      auth:{
        username: user.email,
        password: user.password
      }
    });
  },

  async deleteContact(id) {
    return await axios.delete(`${BASE_URL}/${id}`,{
      auth:{
        username: user.email,
        password: user.password
      }
    });
  }
};