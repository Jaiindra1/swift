import React, { useEffect, useState } from 'react';
import { useNavigate } from 'react-router-dom';

const Profile = () => {
  const [user, setUser ] = useState(null);
  const history = useNavigate ();

  useEffect(() => {
    const fetchUserData = async () => { // Fixed function name
      const response = await fetch('https://jsonplaceholder.typicode.com/users');
      const data = await response.json();
      setUser (data[0]); // Get the first user
    };
    fetchUserData(); // Call the function
  }, []);

  return (
    <div>
      <h1>User Profile</h1>
      {user ? (
        <div>
          <p>Name: {user.name}</p>
          <p>Email: {user.email}</p>
          <p>Phone: {user.phone}</p>
          <button onClick={() => history.push('/')}>Back to Dashboard</button>
        </div>
      ) : (
        <p>Loading...</p>
      )}
    </div>
  );
};

export default Profile;
