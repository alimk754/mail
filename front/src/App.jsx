import { useState } from "react";
import { Link } from "react-router-dom";

const App = ({setdata}) => {
  const [route,setroute]=useState("/")
  const change =async()=>{
    const response =await fetch("http://localhost:8080/api/mail", {
      method: 'POST',
      headers: {
        'Content-Type': 'application/json'
      },
      body: JSON.stringify({
        "email":"alibb555",
        "password":"25102004"
      })
    }).then(response => {
      console.log('Status:', response.status);
      return response.json();
    })
    .then(data => {
      console.log(data);
      setdata(data);
      setroute("/profile");
    })
    .catch(error => {
      console.error('Error:', error);
    });
  
  }
  return (
    <div>
      <h1>Hello from the main page of the app!</h1>
      <p>Here are some examples of links to other pages</p>
      <nav>
        <ul>
          <li>
            <Link to={route}><button onClick={change}>Profile page</button></Link>
          </li>
        </ul>
      </nav>
    </div>
  );
};
export default App;