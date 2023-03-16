import React from "react";
import { Link, useNavigate } from "react-router-dom";

import * as DBcommands from "../lib/commands.js";

import '../public/css/config.css';

function Settings(){

    const navigate = useNavigate();

    async function logoutEvent()
    {
        localStorage.removeItem('userData');
        localStorage.removeItem('api_access_token');
        await DBcommands.Clear();
        navigate('/login', {replace: true});
        return;
    }

    return(
        <div className="config-area">
            <div className="config" onClick={logoutEvent}>
                <span>Logout</span>
                <span>&rarr;</span>
            </div>
            <Link to={"create-grup"}>
                <div className="config">
                    <span>Create a grup</span>
                    <span>&rarr;</span>
                </div>
            </Link>
        </div>
    )
}

export default Settings;