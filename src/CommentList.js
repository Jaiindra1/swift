import React, { useEffect, useState } from "react";
import { useNavigate } from "react-router-dom";
import "./App.css";

const CommentList = () => {
  const [data, setData] = useState([]);
  const [searchTerm, setSearchTerm] = useState("");
  const [currentPage, setCurrentPage] = useState(1);
  const [itemsPerPage, setItemsPerPage] = useState(10);

  const navigate = useNavigate();
  
    const handleClick = (id) => {
  navigate(`/profile/${id}`);
};

  useEffect(() => {
    fetch("https://jsonplaceholder.typicode.com/comments")
      .then((res) => res.json())
      .then((data) => setData(data))
      .catch((error) => console.error("Error fetching data:", error));
  }, []);

  const handleSearch = (e) => {
    setSearchTerm(e.target.value.toLowerCase());
    setCurrentPage(1);
  };

  const handleSort = (key) => {
    const sorted = [...data].sort((a, b) => {
      if (key === "postId") return a[key] - b[key];
      return a[key].toLowerCase().localeCompare(b[key].toLowerCase());
    });
    setData(sorted);
  };

  const filteredData = data.filter(
    (item) =>
      item.name.toLowerCase().includes(searchTerm) ||
      item.email.toLowerCase().includes(searchTerm) ||
      item.body.toLowerCase().includes(searchTerm)
  );

  const paginatedData = filteredData.slice(
    (currentPage - 1) * itemsPerPage,
    currentPage * itemsPerPage
  );

  const totalPages = Math.ceil(filteredData.length / itemsPerPage);

  return (
    <div className="dashboard">
      <header className="header">
        <div className="navbar-logo">
          <span>S</span>
          <span>WIFT</span>
        </div>
        <div className="profile">
          <div className="circle">EH</div>
          <span onClick={handleClick}>Ervin Howell</span>
        </div>
      </header>

      <div className="top-bar">
        <div className="sort-buttons">
          <button onClick={() => handleSort("postId")}>Sort Post ID</button>
          <button onClick={() => handleSort("name")}>Sort Name</button>
          <button onClick={() => handleSort("email")}>Sort Email</button>
        </div>
        <input
          type="text"
          placeholder="Search name, email, comment"
          onChange={handleSearch}
        />
      </div>

      <table>
        <thead>
          <tr>
            <th>Post ID</th>
            <th>Name</th>
            <th>Email</th>
            <th>Comment</th>
          </tr>
        </thead>
        <tbody>
          {paginatedData.map((item) => (
            <tr key={item.id}>
              <td>{item.id}</td>
              <td>
                <span className="name-link" onClick={() => handleClick(item.id)}>
                    {item.name}
                </span>
                </td>
              <td>{item.email}</td>
              <td>{item.body.substring(0, 40)}...</td>
            </tr>
          ))}
        </tbody>
      </table>

      <div className="pagination">
        <span>
          {filteredData.length === 0 ? 0 : (currentPage - 1) * itemsPerPage + 1}
          -
          {Math.min(currentPage * itemsPerPage, filteredData.length)} of{" "}
          {filteredData.length} items
        </span>
        <button
          onClick={() => setCurrentPage((p) => Math.max(p - 1, 1))}
          disabled={currentPage === 1}
        >
          &lt;
        </button>
        <span>{currentPage}</span>
        <button
          onClick={() => setCurrentPage((p) => Math.min(p + 1, totalPages))}
          disabled={currentPage === totalPages}
        >
          &gt;
        </button>
        <select
          value={itemsPerPage}
          onChange={(e) => {
            setItemsPerPage(Number(e.target.value));
            setCurrentPage(1);
          }}
        >
          <option value={10}>10 / Page</option>
          <option value={20}>20 / Page</option>
          <option value={50}>50 / Page</option>
        </select>
      </div>
    </div>
  );
};

export default CommentList;
