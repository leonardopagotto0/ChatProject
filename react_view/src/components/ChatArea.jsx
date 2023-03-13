import React, { useEffect } from "react";

import Chat from "./Chat";

function ChatArea({newMessage, currentChat, socket}){

    console.log("CHAT AREA");

    const [chat, setChat] = React.useState({name: null, photo: null, id: null});

    const showChat = React.useCallback(() => {
        setChat(lastChatID => {
            return {
                name: currentChat.current.name,
                photo: currentChat.current.photo,
                id: currentChat.current.chatID,
                isGrup: currentChat.current.isGrup,
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
            <Chat newMessage={newMessage} name={chat.name} photo={chat.photo} chatID={chat.id} isGrup={chat.isGrup} socket={socket}/>
        </>
    );
}

export default ChatArea;