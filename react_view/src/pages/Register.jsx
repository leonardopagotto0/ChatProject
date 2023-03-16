import React, { useCallback, useEffect, useRef } from "react";
import { Link, useNavigate } from "react-router-dom";
import { ToastContainer, toast } from 'react-toastify';

import { routes } from "../Utils/api";

import '../public/css/signup.css';
import "react-toastify/dist/ReactToastify.css";
import logo from '../public/images/cat-logo.png';

function Register()
{
    const navigate = useNavigate();

    const toastConfig = {
        position: "top-center",
        autoClose: 4000,
        hideProgressBar: false,
        closeOnClick: true,
        pauseOnHover: false,
        draggable: true,
        progress: undefined,
        theme: "dark",
    };


    useEffect(() => {
        if(localStorage.getItem('api_access_token') && localStorage.getItem('userData'))
        return navigate('/chat', {replace: true});
    }, []);

    const emailField = useRef(null);
    const usernameField = useRef(null);
    const passwordField = useRef(null);
    const confirmField = useRef(null);

    const singup = useCallback(async function() {
        const email = emailField.current.value;
        const username = usernameField.current.value;
        const password = passwordField.current.value;
        const confirmPassword = confirmField.current.value;
        
        if(password !== confirmPassword) return toast.warning('The fields "password" and "Confirm password" can not be diferent', toastConfig) ;

        try {
            const request = await fetch(routes.singup, {
                body: JSON.stringify({
                    email,
                    username,
                    password
                }),
                method: 'POST',
                headers: {
                    'Content-Type': 'application/json'
                }
            });
    
            const result = await request.json();
    
            if(result.data){
                localStorage.setItem('api_access_token', result.data.accessToken);
                localStorage.setItem('userData', JSON.stringify(
                    {name: result.data.name, photo: result.data.photo}
                ));
                navigate('/chat');
                return;
            }
        } catch (err) {
            toast.error('error communicating with the server!', toastConfig);
            return;
        }

    }, []);

    return (
        <>
            <div className="box">
                <div className="header-singup">
                    <img src={logo} alt="Service logo" />
                </div>
                <div className="objs">
                    <input type="email" placeholder="Email" className="default-input" ref={emailField} />
                    <input type="text" placeholder="Username" className="default-input" ref={usernameField} />
                    <input type="password" placeholder="Password" className="default-input" ref={passwordField} />
                    <input type="password" placeholder="Confirm password" className="default-input" ref={confirmField} />
                    <input type="submit" value="Register" className="submit-btn" onClick={singup} />
                    <span className="terms">Li e concordo com os <Link to="/terms">termos e condições</Link>.</span>
                </div>
            </div>
            <ToastContainer />
        </>
    )
}

export default Register;