import React, { useState } from 'react';
import axios from 'axios';
import { LoginForm } from './LoginForm';
import { LoginIllustration } from './LoginIllustration';

const LoginPage = () => {
  const [formData, setFormData] = useState({
    username: '',
    password: '',
  });

  const[ErrorMessage,setErrorMEssage]=useState(null); 
 

  const handleInputChange = (e) => {
    const { name, value, type, checked } = e.target;
    setFormData(prevState => ({
      ...prevState,
      [name]: type === 'checkbox' ? checked : value
    }));
    setErrorMEssage(e => null);
  };

  const handleSubmit = async (e) => {
    e.preventDefault();

    try {
      const response = await axios.post('http://localhost:8080/api/mail/login', {email : formData.username, password : formData.password});

      // Handle the response from the backend
      console.log(response);
      if (response.status === 200) {
        setErrorMEssage(null);
        console.log('Login successful:', response.data);
      }else 
        console.error('Login failed:', response.data.error);
      
    } catch (error) {
      setErrorMEssage(error.response.data.message);
    }
  };

  return (
    <div className="font-sans">
      <div className="min-h-screen flex flex-col items-center justify-center py-6 px-4">
        <div className="grid md:grid-cols-2 items-center gap-4 max-w-6xl w-full">
          <LoginForm 
            formData={formData}
            onInputChange={handleInputChange}
            onSubmit={handleSubmit}
            error={ErrorMessage}
            
          />
          <LoginIllustration />
        </div>
      </div>
    </div>
  );
};

export default LoginPage;