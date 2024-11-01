import React, { useEffect, useState } from 'react';
import { Link, useLocation, Navigate } from 'react-router-dom';
import { FontAwesomeIcon } from '@fortawesome/react-fontawesome';
import { faHome, faPlus, faInfoCircle, faChartBar, faUser, faQuestionCircle, faSignOutAlt } from '@fortawesome/free-solid-svg-icons';

const Header = ({ userRole, onLogout }) => {
  const [activetab, setactivetab] = useState("homes");
  const location = useLocation();

  useEffect(() => {
    const path = location.pathname.split('/')[1];
    setactivetab(path || "homes");
  }, [location]);

  if (!userRole) {
    return <Navigate to="/login" />;
  }

  return (
    <div className='header'>
      <Link to='/' className='logo'>H App</Link>
      <div className='header-right'>
        <Link to='/homes'><p className={`${activetab === 'homes' ? 'active' : ''}`}><FontAwesomeIcon icon={faHome} /> Home</p></Link>
        <Link to='/add'><p className={`${activetab === 'add' ? 'active' : ''}`}><FontAwesomeIcon icon={faPlus} /> Add</p></Link>
        <Link to='/about'><p className={`${activetab === 'about' ? 'active' : ''}`}><FontAwesomeIcon icon={faInfoCircle} /> About</p></Link>
        <Link to='/dashboard'><p className={`${activetab === 'dashboard' ? 'active' : ''}`}><FontAwesomeIcon icon={faChartBar} /> Dashboard</p></Link>
        <Link to='/profile'><p className={`${activetab === 'profile' ? 'active' : ''}`}><FontAwesomeIcon icon={faUser} /> Profile</p></Link>
        <Link to='/help'><p className={`${activetab === 'help' ? 'active' : ''}`}><FontAwesomeIcon icon={faQuestionCircle} /> Help</p></Link>
        <p className={`${activetab === 'logout' ? 'active' : ''}`} onClick={onLogout}><FontAwesomeIcon icon={faSignOutAlt} /> Logout</p>
      </div>
    </div>
  );
};

export default Header;
