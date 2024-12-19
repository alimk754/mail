import React, {useContext ,useState } from 'react';
import axios from 'axios';
import {useNavigate } from 'react-router-dom';
import Header from './Header';
import InputField from './InputField';
import SubmitButton from './SubmitButton';
import { Datacontext } from '../main';
import { Link, Outlet } from 'react-router-dom';


const SignupPage = () => {
  const [formData, setFormData] = useState({
    firstName: '',
    lastName: '',
    username: '',
    mobileNumber: '',
    password: '',
    confirmPassword: ''
  });

  const navigate = useNavigate();
  const {user,setUser} =useContext(Datacontext);

  const[ErrorMessage,setErrorMEssage]=useState(null); 

  const handleChange = (e) => {
    const { name, value } = e.target;
    setFormData(prevState => ({
      ...prevState,
      [name]: value
    }));
    setErrorMEssage(e => null);
  };

  const handleSubmit = async (e) => {
    e.preventDefault();

    // Basic password validation
    if (formData.password !== formData.confirmPassword) {
      setErrorMEssage("Passwords do not match!");
      return;
    }else setErrorMEssage(null);

    try {
      const { username, password } = formData;

      const response = await axios.post('http://localhost:8080/api/mail', {email : username,password : password });

      console.log(response)
      if (response.status === 200) {
        console.log('Signup successful:', response.data);
        setErrorMEssage(null);
        setUser(u=>response.data);
        console.log(user);
        
        navigate('/main page');
      }else 
        console.error('Signup failed:', response.data.error);
      
    } catch (error) {
      setErrorMEssage(error.response.data.message);
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
          <SubmitButton error={ErrorMessage} />
        </form>
        <p className="text-sm !mt-8 text-center text-gray-800">
     have an account ?{' '}
    <Link to="/" className="text-blue-600 font-semibold hover:underline ml-1 whitespace-nowrap">Log in</Link>
    {/* <a href="#" className="text-blue-600 font-semibold hover:underline ml-1 whitespace-nowrap">
      Register here
    </a> */}
  </p>
        
      </div>
    </div>
  );
};

export default SignupPage;