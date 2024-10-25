import React, { useState, useEffect } from 'react';
import { useParams, Link } from 'react-router-dom';
import { ref, get } from 'firebase/database';
import database from '../firebase';

const View = () => {
  const [user, setUser] = useState({});
  const { id } = useParams();

  useEffect(() => {
    const userRef = ref(database, `contacts/${id}`);

    get(userRef)
      .then((snapshot) => {
        if (snapshot.exists()) {
          setUser(snapshot.val());
        } else {
          setUser({});
        }
      })
      .catch((error) => {
        console.error("Error fetching user data: ", error);
      });
  }, [id]);

  return (
    <div className="view-container">
      <div className='card'>
        <div className='card-header'>
          <p>User Contact Detail</p>
        </div>
        <div className='container'>
          <div className="user-info">
            <strong>Id:</strong>
            <span>{id}</span>
            <br />
            <br />

            <strong>Name:</strong>
            <span>{user.name}</span>
            <br />
            <br />

            <strong>Email:</strong>
            <span>{user.email}</span>
            <br />
            <br />

            <strong>Contact:</strong>
            <span>{user.contact}</span>
            <br />
            <br />
          </div>

          <Link to="/">
            <button className='btn btn-edit'>Go Back</button>
          </Link>
        </div>
      </div>
    </div>
  );
};

export default View;

