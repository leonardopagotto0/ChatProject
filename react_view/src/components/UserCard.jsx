import React from "react";

import Photo from './subcomponents/Photo';

import '../public/css/userCard.css'

function UserCard(user){
    return(
        <div className="user">
            <Photo url={user.photo}/>
            <span>{user.name}</span>
        </div>
    );
}

export default UserCard;