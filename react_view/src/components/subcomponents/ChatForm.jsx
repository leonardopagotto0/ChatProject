import React, { useEffect, useImperativeHandle, useState } from "react";

export default function ChatForm({btnGotoSeter, messageRef, sendMessage})
{

    const [ btnGoto, setBtnGoto ] = useState(null);

    useImperativeHandle(btnGotoSeter, () => [btnGoto, setBtnGoto]);

    return (
        <div className="actions">
            {btnGoto}
            <input type="text" placeholder="Enter your message here" ref={messageRef} />
            <input type="submit" value="SENT" onClick={sendMessage}/>
        </div>
    );
}