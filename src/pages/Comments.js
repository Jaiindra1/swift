import React, { useEffect, useState } from "react";
import { useNavigate } from "react-router-dom";

export default function Comments() {
  const [data, setData] = useState([]);
  const [filtered, setFiltered] = useState([]);
  const [search, setSearch] = useState(localStorage.getItem("search") || "");
  const [sortBy, setSortBy] = useState(localStorage.getItem("sortBy") || "");
  const [sortOrder, setSortOrder] = useState(localStorage.getItem("sortOrder") || "");
  const [page, setPage] = useState(+localStorage.getItem("page") || 1);
  const [pageSize, setPageSize] = useState(+localStorage.getItem("pageSize") || 10);

  const navigate = useNavigate();

  useEffect(() => {
    fetch("https://jsonplaceholder.typicode.com/comments")
      .then(res => res.json())
      .then(res => setData(res));
  }, []);

  useEffect(() => {
    let result = [...data];
    if (search) {
      result = result.filter(item =>
        item.name.toLowerCase().includes(search.toLowerCase()) ||
        item.email.toLowerCase().includes(search.toLowerCase()) ||
        item.body.toLowerCase().includes(search.toLowerCase())
      );
    }

    if (sortBy) {
      result.sort((a, b) => {
        if (a[sortBy] < b[sortBy]) return sortOrder === "asc" ? -1 : 1;
        if (a[sortBy] > b[sortBy]) return sortOrder === "asc" ? 1 : -1;
        return 0;
      });
    }

    setFiltered(result);
    localStorage.setItem("search", search);
    localStorage.setItem("sortBy", sortBy);
    localStorage.setItem("sortOrder", sortOrder);
    localStorage.setItem("page", page);
    localStorage.setItem("pageSize", pageSize);
  }, [data, search, sortBy, sortOrder, page, pageSize]);

  const totalPages = Math.ceil(filtered.length / pageSize);
  const currentData = filtered.slice((page - 1) * pageSize, page * pageSize);

  const handleSort = (key) => {
    if (sortBy !== key) {
      setSortBy(key);
      setSortOrder("asc");
    } else {
      if (sortOrder === "asc") setSortOrder("desc");
      else if (sortOrder === "desc") {
        setSortBy("");
        setSortOrder("");
      } else {
        setSortOrder("asc");
      }
    }
  };

  return (
    <div className="container">
      <div className="navbar">
        <div className="logo"><span className="logo-s">S</span>WIFT</div>
        <div className="profile" onClick={() => navigate("/profile")}>
          <div className="avatar">EH</div>
          <span>Ervin Howell</span>
        </div>
      </div>

      <div className="controls">
        <button onClick={() => handleSort("postId")}>Sort Post ID</button>
        <button onClick={() => handleSort("name")}>Sort Name</button>
        <button onClick={() => handleSort("email")}>Sort Email</button>
        <input
          type="text"
          value={search}
          onChange={(e) => setSearch(e.target.value)}
          placeholder="Search name, email, comment"
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
          {currentData.map(item => (
            <tr key={item.id}>
              <td>{item.postId}</td>
              <td>{item.name}</td>
              <td>{item.email}</td>
              <td>{item.body.slice(0, 40)}...</td>
            </tr>
          ))}
        </tbody>
      </table>

      <div className="pagination">
        <div className="pages">
          {Array.from({ length: totalPages }, (_, i) => (
            <button
              key={i + 1}
              onClick={() => setPage(i + 1)}
              className={page === i + 1 ? "active" : ""}
            >
              {i + 1}
            </button>
          ))}
        </div>
        <select value={pageSize} onChange={e => setPageSize(+e.target.value)}>
          <option value={10}>10 / Page</option>
          <option value={50}>50 / Page</option>
          <option value={100}>100 / Page</option>
        </select>
      </div>
    </div>
  );
}
