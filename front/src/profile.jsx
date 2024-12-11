const Profile = (data) => {
    console.log(data);
    return (
      <div>
        <h1>{data.email}</h1>
        <p>So, how are you?</p>
      </div>
    );
  };
  
  export default Profile;