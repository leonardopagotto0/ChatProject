import React from "react";
import { Link } from "react-router-dom";

import '../public/css/config.css';

function Settings(){
    return(
        <>
            <Link to={"create-grup"}>
                <div className="config">
                    <span>Create a grup</span>
                    <span>&rarr;</span>
                </div>
            </Link>
        </>
    )
}

export default Settings;