import React, { useState } from 'react';
import { BrowserRouter, Routes, Route, Navigate } from 'react-router-dom'; 
import AddEdit from './pages/addEdit';
import View from './pages/view';
import About from './pages/about';
import Homes from './pages/homes';
import Login from './pages/Login';
import Header from './components/header'; 
import Logout from './pages/Logout'; 
import { ToastContainer } from 'react-toastify';
import 'react-toastify/dist/ReactToastify.css';
import DashboardChart from './pages/Dashboardchart'; 

const PrivateRoute = ({ user, requiredRole, children }) => {
  if (!user) {
    return <Navigate to="/login" />;
  }

  if (user.role !== requiredRole) {
    return <Navigate to="/login" />;
  }

  return children;
};

function App() {
  const [user, setUser] = useState(null);
  const [salesData] = useState([
    { day: 'Monday', sales: 120, customers: 30 },
    { day: 'Tuesday', sales: 150, customers: 45 },
    { day: 'Wednesday', sales: 100, customers: 25 },
    { day: 'Thursday', sales: 180, customers: 50 },
    { day: 'Friday', sales: 200, customers: 60 },
  ]);

  const handleLogin = (userData) => {
    console.log("Logging in user:", userData);
    setUser(userData); 
  };

  const handleLogout = () => {
    console.log("Logging out user"); 
    setUser(null); 
  };

  return (
    <BrowserRouter>
      <div className="app">
        {user && <Header userRole={user.role} onLogout={handleLogout} />}
        <ToastContainer position="top-center" />

        <Routes>
          <Route path="/login" element={<Login onLogin={handleLogin} />} />
          <Route path="/logout" element={<Logout onLogout={handleLogout} />} />
          
          <Route path="/" element={
            <PrivateRoute user={user} requiredRole="cashier">
              <Navigate to="/homes" />
            </PrivateRoute>
          } />

          <Route path="/homes" element={
            <PrivateRoute user={user} requiredRole={user?.role}>
              <Homes />
            </PrivateRoute>
          } />

          <Route path="/dashboard" element={
            <PrivateRoute user={user} requiredRole="cashier">
              <DashboardChart salesData={salesData} />
            </PrivateRoute>
          } />

          <Route path="/add" element={
            <PrivateRoute user={user} requiredRole="cashier">
              <AddEdit />
            </PrivateRoute>
          } />

          <Route path="/update/:id" element={
            <PrivateRoute user={user} requiredRole="cashier">
              <AddEdit />
            </PrivateRoute>
          } />

          <Route path="/view/:id" element={
            <PrivateRoute user={user} requiredRole="admin">
              <View />
            </PrivateRoute>
          } />

          <Route path="/about" element={
            <PrivateRoute user={user} requiredRole="cashier">
              <About />
            </PrivateRoute>
          } />

     
          <Route path="/admin" element={
            <PrivateRoute user={user} requiredRole="admin">
              <Homes />
            </PrivateRoute>
          } />

          <Route path="*" element={<Navigate to="/login" />} />
        </Routes>
      </div>
    </BrowserRouter>
  );
}

export default App;
