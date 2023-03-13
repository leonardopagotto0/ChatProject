import React from "react";

import '../../public/css/message.css';

function Message(data){
    return(
        <div className={data.from === "me" ? "msg-to" : "msg-from" } id={data.id}>
            <span>{data.content}</span>
        </div>
    );
}

export default Message;