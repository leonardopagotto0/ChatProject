import React, { useRef, useCallback, useEffect } from "react";
import { Link, useNavigate } from "react-router-dom";
import { ToastContainer, toast } from "react-toastify";

import { routes } from "../Utils/api";

import '../public/css/login.css'
import "react-toastify/dist/ReactToastify.css";
import logo from '../public/images/cat-logo.png';

function Login(){

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
    const passwordField = useRef(null);

    const handleSubmit = useCallback(async function (btn) {
        btn.preventDefault();

        if(!emailField.current.value) return;
        if(!passwordField.current.value) return;

        
        try {
            const request = await fetch(routes.login, {
                body: JSON.stringify({
                    identifier: emailField.current.value,
                    password: passwordField.current.value
                }),
                method: 'POST',
                headers: {
                    'Content-Type': 'application/json'
                }
            });
            
            const result = await request.json();
            
            if(!result) return;
            if(result.response == "INVALID_CREDENTIALS") {
                passwordField.current.value = '';
                toast.warning("Invalid credentials", toastConfig)
                return;
            };
    
            localStorage.setItem('api_access_token', result.data.access);
            localStorage.setItem('userData', JSON.stringify({"name": result.data.name, "photo": result.data.photo}));

            navigate('/chat');
        } catch (err) {
            console.log(err);
            return toast.error('error communicating with the server', toastConfig)
        }


    }, [])

    return (
        <>
            <div className="containerr">
                <div className="contentt">
                    <header>
                        <img src={logo} alt="chat logo" />
                    </header>
                    <form method="post" onSubmit={handleSubmit}>
                        <input type="text" placeholder="E-mail or username" ref={emailField} />
                        <input type="password" placeholder="password" ref={passwordField} />
                        <input type="submit" value="Login" />
                    </form>
                    <span>Do not have a account? <Link to="/register">Create one.</Link></span>
                </div>
            </div>
            <ToastContainer />
        </>
    );
}

export default Login;