import React, { useCallback } from "react";
import { routes } from "../../Utils/api";

import Photo from './Photo';

import '../../public/css/request.css';

function Request({name, photo, id, received, optEvent}){

    const receivedOpts = (<>
        <button onClick={() => optEvent(id, 'ACCEPT', {name, photo})}>ACCEPT</button>
        <button onClick={() => optEvent(id, 'REJECT', {name, photo})}>REJECT</button>
    </>);

    const sentedOpts = (<>
        <button onClick={() => optEvent(id, 'CANCEL')}>CANCEL</button>
    </>);
    
    return(
        <>
            <div className="request">
                <div className="udata">
                    <Photo url={photo} classN={null}/>
                    <span>{name}</span>
                </div>
                <div>
                    {received ? receivedOpts : sentedOpts}
                </div>
            </div>
        </>
    )
}

export default Request;