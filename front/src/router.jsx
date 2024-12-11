import { RouterProvider } from "react-router-dom";
import { useState} from "react";
import { createBrowserRouter } from "react-router-dom";
import Profile
from "./profile";
import App from "./App"


function Routes(){
    const[data,setdata]=useState({
        "email":"",
        password:""
      });
      const r=createBrowserRouter([
        {
          path: "/",
          element: <App setdata={setdata}></App>
        },
        {
          path: "profile",
          element: <Profile data={data}/>,
        },
      ]);
      return <RouterProvider router={r}></RouterProvider>
}
export default Routes;