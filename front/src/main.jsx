import { createContext, StrictMode, useState } from "react";
import { createRoot } from "react-dom/client";
import { createBrowserRouter, RouterProvider } from "react-router-dom";
import App from "./App";
import SignupPage from './Registeration/SignupPage';
import MainPage from "./MainPage/MainPage";

export const Datacontext=createContext();
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

function Main(){
  const [user,setUser] = useState({
    in:[],
    out:[],
    password:"",
    email:"",
    trash:[],
})
return(
    <StrictMode>
  <Datacontext.Provider value={{user,setUser}}>
    <RouterProvider router={router} />
  </Datacontext.Provider>
  </StrictMode>
)
}



createRoot(document.getElementById("root")).render(
<Main></Main>
);
