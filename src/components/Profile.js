import React, { useEffect, useState } from 'react';
import { useNavigate } from 'react-router-dom';

const Profile = () => {
  const [user, setUser ] = useState(null);
  const navigate = useNavigate();

  useEffect(() => {
    const fetchUser_Data = async () => {
      const response = await fetch('https://jsonplaceholder.typicode.com/users');
      const data = await response.json();
      setUser (data[0]); // Get the first user
    };
    fetchUser_Data();
  }, []);
console.log(user); // Check if user data is being set
  return (
    <div>
      <h1>User Profile</h1>
      {user ? (
        <div>
          <p>Name: {user.name}</p>
          <p>Email: {user.email}</p>
          <p>Phone: {user.phone}</p>
          <button onClick={() => navigate('/')}>Back to Dashboard</button>
        </div>
      ) : (
        <p>Loading...</p>
      )}
    </div>
  );
};

export default Profile;
