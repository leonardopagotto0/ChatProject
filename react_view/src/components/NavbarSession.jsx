import React from "react";

import ChatsSession from "./ChatsSession";
import RequestsSession from "./RequestsSession";
import SettingsSession from "./SettingsSession";

function NavbarSession({currentChat, socket, newRequest, newChat}){
    const [ optSelected, optSet ] = React.useState(['Chats', <ChatsSession currentChat={currentChat} newChat={newChat} socket={socket} />]);

    function showOption(element){
        const id = element.target.id;
        if(id === optSelected[0]) return;

        optSet(lastOpt => {
            let selected = document.getElementById(lastOpt[0]);
            selected.classList.remove('nav-opts-slected');
            element.target.classList.add('nav-opts-slected');

            if(id === 'Chats') return ['Chats', <ChatsSession currentChat={currentChat} newChat={newChat} socket={socket} />];
            if(id === 'Requests') return ['Requests', <RequestsSession socket={socket} newRequest={newRequest}/>];
            if(id === 'Settings') return ['Settings', <SettingsSession />];
        });
    }
    
    return (
        <>
            <div className="navbar">
                <button className="nav-opts nav-opts-slected" id="Chats" onClick={showOption}>CHATS</button>      
                <button className="nav-opts" id="Requests" onClick={showOption}>REQUESTS</button>
                <button className="nav-opts" id="Settings" onClick={showOption}>SETTINGS</button>
            </div>
            <div className="container">
                {optSelected[1]}
            </div>
        </>
    );
}

export default NavbarSession;