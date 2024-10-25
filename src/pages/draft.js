import React from 'react';
import { BrowserRouter, Routes, Route } from 'react-router-dom'; 
import AddEdit from './pages/addEdit';
import View from './pages/view';
import About from './pages/about';
import { ToastContainer } from 'react-toastify';
import 'react-toastify/dist/ReactToastify.css';
import Header from './components/header';
import Homes from './pages/homes'; 

function App() {
  return (
    <BrowserRouter>
      <div className='app'>
        <Header />
        <ToastContainer position="top-center" />
        <Routes> 
          <Route path='/' element={<Homes />} />
          <Route path='/add' element={<AddEdit />} />
          <Route path='/update/:id' element={<AddEdit />} />
          <Route path='/view/:id' element={<View />} />
          <Route path='/about' element={<About />} />
        </Routes>
      </div>
    </BrowserRouter>
  );
}

export default App;
