import React, { useEffect, useState } from "react";
import { useNavigate, useParams } from "react-router-dom";
import "./UserProfile.css";

export default function UserProfile() {
  const { id } = useParams();
  const navigate = useNavigate();
  const [user, setUser] = useState(null);

  const handleClick = () => {
    navigate("/");
  };

  useEffect(() => {
    fetch(`https://jsonplaceholder.typicode.com/users/${id}`)
      .then((res) => res.json())
      .then((data) => setUser(data))
      .catch((err) => console.error("Error fetching user:", err));
  }, [id]);

  if (!user) return <p>Loading...</p>;

  return (
    <div>
      <div className="navbar">
        <div className="navbar-logo">
          <span>S</span>
          <span>WIFT</span>
        </div>
        <div className="navbar-user">
          <div className="navbar-user-icon">EH</div>
          <span>{user.name}</span>
        </div>
      </div>

      <div className="welcome" onClick={handleClick} style={{ cursor: "pointer" }}>
        &larr; Welcome, {user.name}
      </div>

      <div className="profile-card">
        <div className="profile-left">
          <div className="di">
            <div className="profile-avatar">EH</div>
            <div className="di2">
              <div className="profile-name">{user.name}</div>
              <div className="profile-email">{user.email}</div>
            </div>
          </div>

          <div className="profile-field">
            <div className="profile-label">User ID</div>
            <div className="profile-value">{user.id}</div>
          </div>

          <div className="profile-field">
            <div className="profile-label">Email ID</div>
            <div className="profile-value">{user.email}</div>
          </div>

          <div className="profile-field">
            <div className="profile-label">Phone</div>
            <div className="profile-value">{user.phone}</div>
          </div>
        </div>

        <div className="profile-right">
          <div className="profile-field">
            <div className="profile-label">Name</div>
            <div className="profile-value">{user.name}</div>
          </div>

          <div className="profile-field">
            <div className="profile-label">Address</div>
            <div className="profile-value">
              {user.address?.street}, {user.address?.city}
            </div>
          </div>
        </div>
      </div>
    </div>
  );
}
