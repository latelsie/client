import { useEffect, useRef, useState } from "react";
import React from "react";
import Home from "./home";
import './signinsignout.css';

function LocalStorage() {
    const name = useRef();
    const email = useRef();
    const password = useRef();
    const [showHome, setShowHome] = useState(false);
    const [show, setShow] = useState(false);

    useEffect(() => {
       
        const localSignUp = localStorage.getItem("SignUp");
        const localEmail = localStorage.getItem("Email");

        if (localSignUp) {
            setShowHome(true);
        }
        if (localEmail) {
            setShow(true);
        }
    }, []);  
    const handleClick = () => {
        if (name.current.value && email.current.value && password.current.value) {
            localStorage.setItem("name", name.current.value);
            localStorage.setItem("email", email.current.value);
            localStorage.setItem("password", password.current.value);
            localStorage.setItem("SignUp", email.current.value);

            alert('Account Created Successfully');
            window.location.reload();  
        }
    };

    const handleSignIn = () => {
        const localEmail = localStorage.getItem("Email");
        const localPass = localStorage.getItem("password");

        if (email.current.value === localEmail && password.current.value === localPass) {
            localStorage.setItem("SignUp", email.current.value);
            window.location.reload();  
        } else {
            alert('Wrong Credentials!!!');
        }
    };

    return (
        <div>
            {showHome ? <Home /> :

                (show ?
                    <div className="Container">
                        <h1>Hello {localStorage.getItem("name")}</h1>
                     
                        <div className="inputs">
                            <input type="email" placeholder="Email" ref={email}></input>
                        </div>
                        <div className="inputs">
                            <input type="password" placeholder="Password" ref={password}></input>
                        </div>
                        <button onClick={handleSignIn}>Sign In</button>
                    </div>
                    :
                    <div className="Container">
                        <div className="inputs">
                            <input type="text" placeholder="Name" ref={name}></input>
                        </div>
                        <div className="inputs">
                            <input type="email" placeholder="Email" ref={email}></input>
                        </div>
                        <div className="inputs">
                            <input type="password" placeholder="Password" ref={password}></input>
                        </div>
                        <button onClick={handleClick}>Sign Up</button>
                    </div>
                )
            }
        </div>
    );
}

export default LocalStorage;
