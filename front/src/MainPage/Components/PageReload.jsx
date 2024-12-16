// src/utils/apiUtils.js
import axios from 'axios';

export const handlePageReload = async (user, setUser) => {
  try {
    const response = await axios.post('http://localhost:8080/api/mail/login', {
      email: user.email,
      password: user.password,
    });
    console.log(response);
    if (response.status === 200) {
      console.log('Login successful:', response.data);
      setUser((u) => response.data);
    } else {
      console.error('Login failed:', response.data.error);
    }
  } catch (error) {
    console.error('Login failed:', error);
  }
};
