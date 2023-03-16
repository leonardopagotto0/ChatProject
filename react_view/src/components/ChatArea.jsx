import React, { useEffect } from "react";

import Chat from "./Chat";

function ChatArea({newMessage, currentChat, socket}){

    const [chat, setChat] = React.useState({name: null, photo: null, id: null});

    const showChat = React.useCallback(() => {
        setChat(lastChatID => {
            return {
                name: currentChat.current.name,
                photo: currentChat.current.photo,
                id: currentChat.current.chatID,
            }
        });
    }, []);

    React.useImperativeHandle(currentChat, () => {
        return {
            showChat
        }
    });
    
    return(
        <>
            {chat.name 
                ? <Chat newMessage={newMessage} name={chat.name} photo={chat.photo} chatID={chat.id} isGrup={chat.isGrup} socket={socket}/>
                : <div className="apresentation"><h1>Welcome</h1></div>
            }
        </>
    );
}

export default ChatArea;