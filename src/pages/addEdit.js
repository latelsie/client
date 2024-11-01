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

  const handleInputChange = (e) => {
    const { name, value } = e.target;
    setState({ ...state, [name]: value });
  };

  const handleSubmit = (e) => {
    e.preventDefault();
    if (!name || !email || !contact) {
      toast.error('Please provide all required fields.');
      return;
    }

    const dataRef = id ? ref(database, `contacts/${id}`) : push(ref(database, 'contacts'));
    set(dataRef, state)
      .then(() => {
        toast.success(`Contact ${id ? "updated" : "added"} successfully`);
        navigate('/homes');
      })
      .catch((error) => toast.error(error.message));
  };

  return (
    <form onSubmit={handleSubmit}>
      <input type="text" name="name" value={name} onChange={handleInputChange} placeholder="Name" />
      <input type="email" name="email" value={email} onChange={handleInputChange} placeholder="Email" />
      <input type="text" name="contact" value={contact} onChange={handleInputChange} placeholder="Contact" />
      <button type="submit">{id ? "Update" : "Save"}</button>
    </form>
  );
};

export default AddEdit;
