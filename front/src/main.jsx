// import { createContext, StrictMode, useState } from "react";
// import { createRoot } from "react-dom/client";
// import { createBrowserRouter, RouterProvider } from "react-router-dom";
// import App from "./App";
// import SignupPage from './Registeration/SignupPage';
// import MainPage from "./MainPage/MainPage";

// export const Datacontext=createContext();
// const router = createBrowserRouter([
//   {
//     path: "/",
//     element: <App />,
//   },
//   {
//     path: "signup",
//     element: <SignupPage />,
//   },
//   {
//     path: "main page",
//     element: <MainPage />,
//   },
// ]);

// function Main(){
//   const [user,setUser] = useState({
//     in:[],
//     out:[],
//     password:"",
//     email:"",
//     trash:[],
// })
// return(
//     <StrictMode>
//   <Datacontext.Provider value={{user,setUser}}>
//     <RouterProvider router={router} />
//   </Datacontext.Provider>
//   </StrictMode>
// )
// }



// createRoot(document.getElementById("root")).render(
// <Main></Main>
// );
import { createContext, StrictMode, useState, useEffect } from "react";
import { createRoot } from "react-dom/client";
import { createBrowserRouter, RouterProvider } from "react-router-dom";
import App from "./App";
import SignupPage from './Registeration/SignupPage';
import MainPage from "./MainPage/MainPage";

export const Datacontext = createContext();

const router = createBrowserRouter([
  {
    path: "/",
    element: <App />,
  },
  {
    path: "signup",
    element: <SignupPage />,
  },
  {
    path: "main page",
    element: <MainPage />,
  },
]);

function Main() {
  // Initialize state with value from local storage or default value
  const [user, setUser] = useState(() => {
    // Try to get user from local storage
    const savedUser = localStorage.getItem('user');
    return savedUser ? JSON.parse(savedUser) : {
      in: [],
      out: [],
      password: "",
      email: "",
      trash: [],
      userFolder:[],
      drafts:[]
    };
  });

  // Save user to local storage whenever it changes
  useEffect(() => {
    localStorage.setItem('user', JSON.stringify(user));
  }, [user]);

  // Function to update user with local storage
  const updateUser = (newUserData) => {
    // If newUserData is a function, call it with current user
    const updatedUser = typeof newUserData === 'function' 
      ? newUserData(user) 
      : newUserData;
    
    // Update state and automatically save to local storage
    setUser(updatedUser);
  };

  return (
    <StrictMode>
      <Datacontext.Provider value={{ user, setUser: updateUser }}>
        <RouterProvider router={router} />
      </Datacontext.Provider>
    </StrictMode>
  );
}

createRoot(document.getElementById("root")).render(<Main />);