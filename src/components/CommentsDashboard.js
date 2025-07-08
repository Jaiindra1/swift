import React, { useEffect, useState } from 'react';
import { Link } from 'react-router-dom';

const CommentsDashboard = () => {
  const [comments, setComments] = useState([]);
  const [page, setPage] = useState(1);
  const [pageSize, setPageSize] = useState(10);
  const [searchTerm, setSearchTerm] = useState('');
  const [sortColumn, setSortColumn] = useState(null);
  const [sortOrder, setSortOrder] = useState('asc');

  useEffect(() => {
    const fetchComments = async () => {
      const response = await fetch('https://jsonplaceholder.typicode.com/comments');
      const data = await response.json();
      setComments(data);
    };
    fetchComments();
  }, []);

  const handleSort = (column) => {
    const order = sortColumn === column && sortOrder === 'asc' ? 'desc' : 'asc';
    setSortColumn(column);
    setSortOrder(order);
  };

  const filteredComments = comments
    .filter(comment => 
      comment.name.toLowerCase().includes(searchTerm.toLowerCase()) ||
      comment.email.toLowerCase().includes(searchTerm.toLowerCase())
    )
    .sort((a, b) => {
      if (sortColumn) {
        const modifier = sortOrder === 'asc' ? 1 : -1;
        return a[sortColumn] > b[sortColumn] ? modifier : -modifier;
      }
      return 0;
    });
console.log(comments); // Check if comments are being fetched
  const paginatedComments = filteredComments.slice((page - 1) * pageSize, page * pageSize);

  return (
    <div>
      <h1>Comments Dashboard</h1>
      <input 
        type="text" 
        placeholder="Search by name or email" 
        value={searchTerm} 
        onChange={(e) => setSearchTerm(e.target.value)} 
      />
      <table>
        <thead>
          <tr>
            <th onClick={() => handleSort('postId')}>Post ID</th>
            <th onClick={() => handleSort('name')}>Name</th>
            <th onClick={() => handleSort('email')}>Email</th>
            <th>Profile</th>
          </tr>
        </thead>
        <tbody>
          {paginatedComments.map(comment => (
            <tr key={comment.id}>
              <td>{comment.postId}</td>
              <td>{comment.name}</td>
              <td>{comment.email}</td>
              <td><Link to="/profile">View Profile</Link></td>
            </tr>
          ))}
        </tbody>
      </table>
      <div>
        <button onClick={() => setPage(page > 1 ? page - 1 : 1)}>Previous</button>
        <button onClick={() => setPage(page < Math.ceil(filteredComments.length / pageSize) ? page + 1 : page)}>Next</button>
      </div>
      <select onChange={(e) => setPageSize(Number(e.target.value))} value={pageSize}>
        <option value={10}>10</option>
        <option value={50}>50</option>
        <option value={100}>100</option>
      </select>
    </div>
  );
};

export default CommentsDashboard;
