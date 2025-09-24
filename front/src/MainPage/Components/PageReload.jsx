import axios from 'axios';
import { useContext } from 'react';
import { Datacontext } from '../../main';
export const handlePageReload = async (user, setUser) => {
  try {
    let pass=user.password; 
    const response = await axios.post('http://localhost:8080/api/mail/login', {
      email: user.email,
      password: user.password,
    },{
      auth:{
        username: user.email,
        password: user.password
      }
    });
   
    if (response.status === 200) {
      console.log('Login successful:', response.data);
      setUser((u) => response.data);
      setUser(u => ({...u, password: pass}));
    } else {
      console.error('Login failed:', response.data.error);
    }
  } catch (error) {
    console.error('Login failed:', error);
  }
};
