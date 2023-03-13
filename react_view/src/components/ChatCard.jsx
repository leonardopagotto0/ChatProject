import React from "react";

import Photo from './subcomponents/Photo';

import '../public/css/chatCard.css';

function ChatCard ({currentChat, ...user}){

    function getMessages(e){
        currentChat.current.chatID = e.currentTarget.id;
        currentChat.current.photo = user.photo;
        currentChat.current.name = user.name;
        currentChat.current.showChat();
    }
    
    return(
        <div className="contact" id={user.chatID} onClick={getMessages}>
            <Photo url={user.photo}/>
            <span>{user.name}</span>
        </div>
    );
}

export default ChatCard;