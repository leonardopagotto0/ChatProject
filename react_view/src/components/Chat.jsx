import React, { useEffect, useImperativeHandle, useRef, useState } from "react";

import * as DBcommands from '../lib/commands';

import MessagesArea from "./MessagesArea";
import UserHeader from "./subcomponents/UserHeader";
import ChatForm from "./subcomponents/ChatForm";
import ChatSettings from "./subcomponents/ChatSettings";

import '../public/css/chatArea.css';

function Chat({socket, newMessage, ...user}){

    const messageRef = React.useRef();
    const showRef = React.useRef();
    const showGoto = useRef();
    const maxScroll = useRef();

    async function sendMessage(){

        if(!messageRef.current.value) return;
        if(!user.chatID) return;
        
        await socket.current.emit('message', {
            chatID: user.chatID,
            content: messageRef.current.value,
        }, async (err, {messageID, timestamp}) => {
            if(messageID){
                const dataFormated = {
                    chatID: user.chatID,
                    id: messageID,
                    from: "me",
                    content: messageRef.current.value,
                    timestamp
                };

                DBcommands.saveMessage(dataFormated);
                await showRef.current.showMessage(dataFormated);
                await gotoEvent();
                messageRef.current.value = '';
                return;
            }
        });
    }

    async function gotoEvent () {
        setTimeout(() => {
            const container = document.getElementById("Teste123");
            
            if(!container) return;

            let maxS = maxScroll.current;
            if(!maxS)maxS = container.scrollHeight - container.clientHeight;

            container.scrollTop = maxS + 100;
        }, 1);
    }

    useImperativeHandle(newMessage, () => {
        return showRef.current;
    });
    
    return(
        <>
            <UserHeader name={user.name} photo={user.photo}/>
            <MessagesArea show={showRef} currentChat={user.chatID} gotoEvent={gotoEvent} showGoto={showGoto} maxScrollRef={maxScroll}/>
            <ChatForm btnGotoSeter={showGoto} messageRef={messageRef} sendMessage={sendMessage} />
        </>
    );
}

export default Chat;