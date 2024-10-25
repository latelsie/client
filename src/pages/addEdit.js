import React, { useState, useEffect } from 'react';
import { useNavigate, useParams } from 'react-router-dom';
import { ref, set, push, onValue } from 'firebase/database';
import database from '../firebase';
import { toast } from 'react-toastify';

const initialState = {
  name: "",
  email: "",
  contact: ""
};

const AddEdit = () => {
  const [state, setState] = useState(initialState);
  const [data, setData] = useState({});
  const { name, email, contact } = state;
  
  const navigate = useNavigate();
  const { id } = useParams();

  
  const handleInputChange = (e) => {
    const { name, value } = e.target;
    setState({ ...state, [name]: value });
  };

 
  useEffect(() => {
    const dataRef = ref(database, 'contacts');
    onValue(dataRef, (snapshot) => {
      if (snapshot.exists()) {
        setData(snapshot.val());
      } else {
        setData({});
      }
    });
  }, []);


  useEffect(() => {
    if (id && data[id]) {
      setState(data[id]);
    } else {
      setState(initialState);
    }
  }, [id, data]);

  
  const handleSubmit = (e) => {
    e.preventDefault();

    
    if (!name || !email || !contact) {
      toast.error('Please provide all required fields.');
      return;
    }

    
    const dataRef = id ? ref(database, `contacts/${id}`) : push(ref(database, 'contacts'));
    set(dataRef, state)
      .then(() => {
        toast.success(id ? 'Customer Updated Successfully' : 'Customer Added Successfully');
        navigate('/'); 
      })
      .catch((err) => {
        toast.error(err.message);
      });
  };

  return (
    <div>
      <form onSubmit={handleSubmit}>
        <h1>{id ? "Update Customer" : "Add Customer"}</h1>
        <label htmlFor='name'>Name</label>
        <input
          type="text"
          id="name"
          placeholder="Enter your Name"
          name="name"
          value={name || ""}
          onChange={handleInputChange} 
        />

        <label htmlFor='email'>Email</label>
        <input
          type="email"
          id="email"
          placeholder="Enter your Email"
          name="email"
          value={email || ""}
          onChange={handleInputChange} 
        />

        <label htmlFor='contact'>Contact</label>
        <input
          type="number"
          id="contact"
          placeholder="Enter your Contact"
          name="contact"
          value={contact || ""}
          onChange={handleInputChange} 
          required
        />

        <input type="submit" value={id ? "Update" : "Save"} />
      </form>
    </div>
  );
};

export default AddEdit;

