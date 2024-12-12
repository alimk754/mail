import React, { useState } from 'react';
import axios from 'axios';
import Header from './Header';
import InputField from './InputField';
import SubmitButton from './SubmitButton';

const SignupPage = () => {
  const [formData, setFormData] = useState({
    firstName: '',
    lastName: '',
    username: '',
    mobileNumber: '',
    password: '',
    confirmPassword: ''
  });

  const handleChange = (e) => {
    const { name, value } = e.target;
    setFormData(prevState => ({
      ...prevState,
      [name]: value
    }));
  };

  const handleSubmit = async (e) => {
    e.preventDefault();

    // Basic password validation
    if (formData.password !== formData.confirmPassword) {
      alert("Passwords do not match!");
      return;
    }

    try {
      const { username, password } = formData;

      const response = await axios.post('http://localhost:8080/api/mail', {email : username,password : password });

      console.log(response)
      if (response.status === 200) 
        console.log('Signup successful:', response.data);
      else 
        console.error('Signup failed:', response.data.error);
      
    } catch (error) {

      console.error('Error occurred during signup:', error.response.data.message);
    }
  };

  return (
    <div className="font-sans">
      <Header />
      <div className="mx-4 mb-4 -mt-16">
        <form 
          onSubmit={handleSubmit}
          className="max-w-4xl mx-auto bg-white shadow-[0_2px_13px_-6px_rgba(0,0,0,0.4)] sm:p-8 p-4 rounded-md"
        >
          <div className="grid md:grid-cols-2 gap-8">
            <InputField 
              label="First Name"
              name="firstName"
              value={formData.firstName}
              onChange={handleChange}
              placeholder="Enter name"
            />
            <InputField 
              label="Last Name"
              name="lastName"
              value={formData.lastName}
              onChange={handleChange}
              placeholder="Enter last name"
            />
            <InputField 
              label="User name"
              name="username"
              type="text"
              value={formData.username}
              onChange={handleChange}
              placeholder="Enter email"
            />
            <InputField 
              label="Mobile No."
              name="mobileNumber"
              type="tel"
              value={formData.mobileNumber}
              onChange={handleChange}
              placeholder="Enter mobile number"
            />
            <InputField 
              label="Password"
              name="password"
              type="password"
              value={formData.password}
              onChange={handleChange}
              placeholder="Enter password"
            />
            <InputField 
              label="Confirm Password"
              name="confirmPassword"
              type="password"
              value={formData.confirmPassword}
              onChange={handleChange}
              placeholder="Enter confirm password"
            />
          </div>
          <SubmitButton />
        </form>
      </div>
    </div>
  );
};

export default SignupPage;