import React, {useEffect, useState, useImperativeHandle} from "react";

import * as DBcommand from '../lib/commands';
import { routes } from '../Utils/api';

import ChatCard from "./ChatCard";

function Chats({currentChat, newChat, socket}){

    const [ chats, setChat ] = useState([]);
    
    useImperativeHandle(newChat, () => {
        return async () => setChat;
    });

    useEffect(function () {
        const accessToken = localStorage.getItem('api_access_token');
        const user = JSON.parse(localStorage.getItem('userData'));

        async function request()
        {

            const chats = await DBcommand.getChats();

            if(chats[0]) {
                setChat(last => {
                    return chats;
                });
                return;
            }

            const req = await fetch(routes.getChats, {
                method: 'GET',
                headers: {
                    'Content-Type': 'text',
                    'authorization': `bearer ${accessToken}`
                }
            })

            const result = await req.json();

            if(result.response == 'CHATS_NOT_FOUND'){
                return;
            }
            console.log(result);
            setChat((last) => {
                return result.data.map(chat => {
                    if(!chat.isGrup){
                        DBcommand.addChat(
                            chat.name,
                            chat.id,
                            chat.photo
                        );
                    }else{
                        DBcommand.saveGrup(chat);
                    }
                    return {
                        id: chat.id,
                        name: chat.name,
                        photo: chat.photo
                    }
                });
            });
        }

        request();

    }, [])
    
    return(
        <div>
            {chats.map(chat => {
                return <ChatCard currentChat={currentChat} name={chat.name} photo={chat.photo} chatID={chat.id}/>
            })}
        </div>
    )
}

export default Chats;