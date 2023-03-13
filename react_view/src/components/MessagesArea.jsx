import React, { useCallback, useEffect, useRef, useState } from "react";

import * as DBcommands from '../lib/commands';

import Message from './subcomponents/Message';
import BtnGoto from "./elements/BtnGoto";

function MessagesArea({show, currentChat, showGoto, maxScrollRef, gotoEvent}){

    const [ messages, setMessage ] = React.useState([]);
    const [ scrol, sets ] = React.useState(0);

    useEffect(() => {
        async function exec(){
            if(!currentChat) return;
            setMessage(lasts => []);
            const msgs = await DBcommands.getMessages(currentChat);
            
            msgs.forEach(msg => {
                showMessage(msg);
            });
        }

        exec();

    }, [currentChat]);

    const showMessage = React.useCallback(({id, chatID, content, from}) => {
        if(chatID != currentChat) return;

        gotoEvent();

        let message = {
            id,
            from,
            content,
        }

        setMessage(lastMessages => {
            return [...lastMessages, message];
        });
    });

    const showBtnGoto = useCallback((event) => {
        const maxScroll = !event.currentTarget.scrollTopMax ? event.target.scrollHeight - event.target.clientHeight : event.currentTarget.scrollTopMax;
        const currentScroll = event.currentTarget.scrollTop;
        
        maxScrollRef.current = maxScroll;
        
        const [ goto, setGoto ] = showGoto.current;

        if(maxScroll/100*95 > currentScroll){
            setGoto(() => <BtnGoto Event={gotoEvent} />);
        }
        else {
            setGoto(() => null);
        }
    });

    useEffect(() => {
        setTimeout(() => {
            gotoEvent();
        });
    }, [messages]);

    React.useImperativeHandle(show, () => {
        return {
            showMessage
        }
    });

    return(
        <div className="messages" id="Teste123" onScroll={showBtnGoto}>
            {messages.map(msg => {
                return <Message from={msg.from} content={msg.content} key={msg.id} id={msg.id} />
            })}
        </div>
    )
}

export default MessagesArea;