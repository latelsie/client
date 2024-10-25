import React, { useEffect, useState } from 'react';
import { ref, onValue, remove } from 'firebase/database';
import { Link } from 'react-router-dom';
import { toast } from 'react-toastify';
import { FontAwesomeIcon } from '@fortawesome/react-fontawesome';  
import { faSearch, faSort } from '@fortawesome/free-solid-svg-icons';  
import database from '../firebase';

const Homes = () => {
  const [data, setData] = useState({});
  const [searchQuery, setSearchQuery] = useState("");  
  const [sortField, setSortField] = useState("name"); 

  useEffect(() => {
    const contactsRef = ref(database, 'contacts');
    const unsubscribe = onValue(contactsRef, (snapshot) => {
      if (snapshot.exists()) {
        setData(snapshot.val());
      } else {
        setData({});
      }
    });

    return () => {
      unsubscribe();
      setData({});
    };
  }, []);

  const onDelete = (id) => {
    if (window.confirm('Are you sure you want to delete the selected record?')) {
      const contactRef = ref(database, `contacts/${id}`);
      remove(contactRef)
        .then(() => {
          toast.success('Record Deleted Successfully');
        })
        .catch((error) => {
          toast.error(error.message);
        });
    }
  };

  const handleSearch = (e) => {
    setSearchQuery(e.target.value);
  };

  const handleSort = (e) => {
    setSortField(e.target.value);
  };

  const filteredAndSortedData = Object.keys(data)
    .filter((id) => {
      const user = data[id];
      const searchLower = searchQuery.toLowerCase();
      return (
        user.name.toLowerCase().includes(searchLower) ||
        user.email.toLowerCase().includes(searchLower) ||
        user.contact.includes(searchQuery)
      );
    })
    .sort((a, b) => {
      if (sortField === "name") {
        return data[a].name.localeCompare(data[b].name);
      } else if (sortField === "email") {
        return data[a].email.localeCompare(data[b].email);
      } else {
        return 0;  
      }
    });

  return (
    <div style={{ marginTop: '100px' }}>
      <div style={{ display: 'flex', justifyContent: 'flex-end', marginBottom: '20px' }}>
        <div style={{ display: 'flex', alignItems: 'center', marginRight: '20px' }}>
          <FontAwesomeIcon icon={faSearch} style={{ marginRight: '10px' }} />
          <input
            type="text"
            placeholder="Search by name, email, or contact"
            value={searchQuery}
            onChange={handleSearch}
            style={{ padding: '5px', width: '300px' }}
          />
        </div>
        <div style={{ display: 'flex', alignItems: 'center' }}>
          <FontAwesomeIcon icon={faSort} style={{ marginRight: '10px' }} />
          <select onChange={handleSort} value={sortField} style={{ padding: '5px' }}>
            <option value="name">Sort by Name</option>
            <option value="email">Sort by Email</option>
          </select>
        </div>
      </div>
      <table className='styled-table' border="1">
        <thead>
          <tr>
            <th style={{ textAlign: 'center' }}>No</th>
            <th style={{ textAlign: 'center' }}>Name</th>
            <th style={{ textAlign: 'center' }}>Email</th>
            <th style={{ textAlign: 'center' }}>Contact</th>
            <th style={{ textAlign: 'center' }}>Action</th>
          </tr>
        </thead>
        <tbody>
          {filteredAndSortedData.length > 0 ? (
            filteredAndSortedData.map((id, index) => (
              <tr key={id}>
                <th scope='row'>{index + 1}</th>
                <td>{data[id].name}</td>
                <td>{data[id].email}</td>
                <td>{data[id].contact}</td>
                <td>
                  <Link to={`/update/${id}`}>
                    <button className='btn btn-edit'>Edit</button>
                  </Link>
                  <button className='btn btn-delete' onClick={() => onDelete(id)}>
                    Delete
                  </button>
                  <Link to={`/view/${id}`}>
                    <button className='btn btn-view'>View</button>
                  </Link>
                </td>
              </tr>
            ))
          ) : (
            <tr>
              <td colSpan="5" style={{ textAlign: 'center' }}>No data found</td>
            </tr>
          )}
        </tbody>
      </table>
    </div>
  );
};

export default Homes;
