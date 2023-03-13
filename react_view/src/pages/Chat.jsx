import React, { useCallback, useEffect, useRef, useState } from "react";
import { io } from "socket.io-client";
import { useNavigate } from "react-router-dom";

import UserCard from "../components/UserCard";
import NavbarSession from "../components/NavbarSession";
import ChatArea from "../components/ChatArea";
import * as DBCommands from "../lib/commands.js";

import '../public/css/chat.css';
import logo_img from '../public/images/cat-logo.png'

function Chat ({db}){    

    const currentChatRef = useRef({chatID: null});
    const newChat = useRef();
    const newRequest = useRef();
    const newMessage = useRef();
    const socket = useRef();
    const [ UserData, setUserData ] = useState({});
    const navigate = useNavigate();

    console.log("CHAT PAGE");

    useEffect(function () {
        socket.current = io("http://localhost:8082", {
            auth: {token: localStorage.getItem('api_access_token')},
            autoConnect: false
        });
        
        socket.current.connect();

        socket.current.on('request received', async (data) => {
            DBCommands.addRequest({
                sender: true,
                ...data
            });

            
            if(typeof newRequest.current == 'function'){
                const requests = await DBCommands.getRequests();
                const setRequests = await newRequest.current();

                data.sender = true;
                setRequests(lasts => {
                    return requests;
                });
            }
        });

        socket.current.on('request updated', async (data) => {
            if(data.status == 'ACCEPT') {
                const req = await DBCommands.getRequest(data.id);
                await DBCommands.addChat(req.name, data.chatID, req.photo);
            }

            await DBCommands.removeRequest(data.id);
            
            if(typeof newRequest.current == 'function'){
                const setRequests = await newRequest.current();
                const requests = await DBCommands.getRequests();
                
                setRequests((lastRequests) => {
                    return requests;
                });
            }
        });

        socket.current.on('message received', async (data) => {
            DBCommands.saveMessage(data);
            
            const setMessage = newMessage.current;

            setMessage.showMessage(data);
        });

    }, [])

    useEffect(function () {
        if(!localStorage.getItem('api_access_token') || !localStorage.getItem('userData'))
        return navigate('/login');

        const userData = localStorage.getItem('userData');
        
        setUserData(() => {
            return JSON.parse(userData);
        });
    }, []);

    return(
        <div className="chat-frame">
            <div className="header">
                <div className="logo-space">
                    <img src={logo_img} alt="App logo"/>
                </div>
                <NavbarSession currentChat={currentChatRef} newChat={newChat} socket={socket} newRequest={newRequest}/>
                <div className="foot-wheel">
                    <UserCard name={UserData.name} photo={UserData.photo}/>
                </div>
            </div>
            <div className="area">
                <ChatArea newMessage={newMessage} currentChat={currentChatRef} socket={socket}/> 
            </div>
        </div>
    );
}

export default Chat;