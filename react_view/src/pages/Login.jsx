import React, { useRef, useCallback, useEffect } from "react";
import { Link, useNavigate } from "react-router-dom";

import { routes } from "../Utils/api";

import '../public/css/login.css'
import logo from '../public/images/cat-logo.png';

function Login(){

    const navigate = useNavigate();

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

        const request = await fetch(routes.login, {
            body: JSON.stringify({
                username: emailField.current.value,
                password: passwordField.current.value
            }),
            method: 'POST',
            headers: {
                'Content-Type': 'application/json'
            }
        })

        const result = await request.json();
        
        if(!result) return;
        if(result.response == "INVALID_CREDENTIALS") return;

        localStorage.setItem('api_access_token', result.data.access);
        localStorage.setItem('userData', JSON.stringify(result.data.user));

        navigate('/chat');
    }, [])

    return (
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
                <span>Do not have a account? <Link to="/signup">Create one.</Link></span>
            </div>
        </div>
    );
}

export default Login;