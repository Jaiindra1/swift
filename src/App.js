import React from "react";
import { BrowserRouter as Router, Routes, Route } from "react-router-dom";
import CommentList from "./CommentList";
import UserProfile from "./UserProfile";

function App() {
  return (
    <Router>
      <Routes>
        <Route path="/" element={<CommentList />} />
        <Route path="/profile/:id" element={<UserProfile />} />
      </Routes>
    </Router>
  );
}

export default App;
