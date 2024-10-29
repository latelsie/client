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
import UserProfile from './pages/userprofile'; 

const PrivateRoute = ({ user, requiredRoles, children }) => {
  if (!user) {
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

  const handleUpdateProfile = (updatedUser) => {
    setUser(updatedUser); // Update the user state with new user data
  };

  return (
    <BrowserRouter>
      <div className="app">
        {user && <Header userRole={user.role} onLogout={handleLogout} />}
        <ToastContainer position="top-center" />

        <Routes>
          <Route path="/login" element={<Login onLogin={handleLogin} />} />
          <Route path="/logout" element={<Logout onLogout={handleLogout} />} />

          {/* Add UserProfile route */}
          <Route path="/profile" element={
            <PrivateRoute user={user}>
              <UserProfile user={user} onUpdate={handleUpdateProfile} />
            </PrivateRoute>
          } />

          <Route path="/homes" element={
            <PrivateRoute user={user}>
              <Homes />
            </PrivateRoute>
          } />

          <Route path="/dashboard" element={
            <PrivateRoute user={user}>
              <DashboardChart salesData={salesData} />
            </PrivateRoute>
          } />

          <Route path="/add" element={
            <PrivateRoute user={user}>
              <AddEdit />
            </PrivateRoute>
          } />

          <Route path="/view/:id" element={
            <PrivateRoute user={user}>
              <View />
            </PrivateRoute>
          } />

          <Route path="/about" element={
            <PrivateRoute user={user}>
              <About />
            </PrivateRoute>
          } />

          <Route path="*" element={<Navigate to="/homes" />} />
        </Routes>
      </div>
    </BrowserRouter>
  );
}

export default App;
