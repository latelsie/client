import React, { useEffect } from "react";
import { useNavigate } from "react-router-dom";
import { toast } from "react-toastify";

const Logout = ({ onLogout }) => {
    const navigate = useNavigate();

    useEffect(() => {
        onLogout();  
        toast.success('Logged out Successfully');  
        navigate('/');  
    }, [onLogout, navigate]);

    return <h1>Logging out.....</h1>;  
}

export default Logout;
