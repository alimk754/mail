import React from 'react';
import { Link, Outlet } from 'react-router-dom';
export const RegisterPrompt = () => (
  <p className="text-sm !mt-8 text-center text-gray-800">
    Don't have an account ?{' '}
    <Link to="/signup" className="text-blue-600 font-semibold hover:underline ml-1 whitespace-nowrap">Register here</Link>
    {/* <a href="#" className="text-blue-600 font-semibold hover:underline ml-1 whitespace-nowrap">
      Register here
    </a> */}
  </p>
);