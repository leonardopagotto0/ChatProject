import React, { useRef } from "react";
import { useNavigate } from "react-router-dom";

import '../public/css/createGrup.css';
import defaultImage from '../public/images/user00.png';

import { routes } from '../Utils/api';
import * as DBcommands from '../lib/commands.js';

function createGrup(){
    
    const navigate = useNavigate();

    const nameFieldRef = useRef(null);
    const descriptionFieldRef = useRef(null);
    const photoFieldRef = useRef(null);

    async function createGrup()
    {
        const nameField = nameFieldRef.current.value;
        const descriptionField = descriptionFieldRef.current.value;
        const photoField = photoFieldRef.current.value || null;
        
        if(!nameField || !descriptionField) return;

        const request = await fetch(routes.createGrup, {
            method: "POST",
            headers: {
                "Content-Type": "application/json",
                "Authorization": "Bearer " + localStorage.getItem('api_access_token')
            },
            body: JSON.stringify({
                name: nameField,
                photo: photoField,
                desciption: descriptionField, 
            })
        });

        const result = await request.json();

        if(request.status == 201){
            DBcommands.saveGrup(result.data);
            navigate('/chat', {replace: true});
            return;
        }
        
    }


    return(
        <div className="container-create-grup">
            <input type="file" id="grup-img" ref={photoFieldRef}/>
            <label htmlFor="grup-img">
                <img src={defaultImage} alt="" />
            </label>
            <input type="text" placeholder="Name" ref={nameFieldRef}/>
            <textarea name="" id="" cols="30" rows="5" placeholder="Grup description" ref={descriptionFieldRef}></textarea>
            <button onClick={createGrup}>Create</button>
        </div>
    );
}

export default createGrup;