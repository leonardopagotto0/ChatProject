import React, { useState, useRef, useCallback, useEffect, useImperativeHandle } from "react";
import { ToastContainer, toast } from 'react-toastify';

import Request from "./subcomponents/Request";
import * as DBCommands from "../lib/commands.js";

import '../public/css/requestSession.css';
import { routes } from "../Utils/api";

function Requests({socket, newRequest}){

    const toastConfig = {
        position: "top-center",
        autoClose: 2000,
        hideProgressBar: false,
        closeOnClick: true,
        pauseOnHover: false,
        draggable: true,
        progress: undefined,
        theme: "dark",
    };

    const [ requests, setRequests ] = useState([]);
    const identified = useRef(null);
    
    useImperativeHandle(newRequest, () => {
        return async () => setRequests;
    });

    const sentRequestEvent = useCallback(async () => {
        const targetName = identified.current.value;
        
        if(!targetName) return;

        await socket.current.emit('request', {
            status: 'SENT',
            to: targetName,
            chatID: null
        }, 
        (err, result) => {
            if(err){
                if(err == 'INVALID_USER_NAME') return toast.warning('Invalid username', toastConfig);
                return toast.error('Error to sent request', toastConfig)
            }

            toast.success(`Requet sent to ${result.name}.`, toastConfig);
            setRequests((last) => {
                const res = {
                    id: result.requestID,
                    name: result.name,
                    photo: result.photo,
                    sender: false
                }
                DBCommands.addRequest(res);
                if(!last[0]) return [res];
                return [res, ...last];
            });
        });

        identified.current.value = '';
    }, []);

    const optEvent = useCallback(async (id, status, userData)=>{
        
        if(!id) return;
        if(!status) return;

        await socket.current.emit('request', { id, status}, async function (err, result){
            if(err) return toast.error('Error to update request', toastConfig);
            
            await DBCommands.removeRequest(id);
            if(result.chatID) await DBCommands.addChat(userData.name, result.chatID, userData.photo);
            
            setRequests(lastRequests => {
                const reqs = new Array();
                lastRequests.forEach(req => {
                    if(req.id != id) reqs.push(req);
                });
                return reqs;
            });

        });

    }, []);

    useEffect(() => {
        async function request (){

            const reqs = await DBCommands.getRequests();
            console.log(reqs);
            if(reqs[0]){
                setRequests(lasts => {
                    return reqs;
                });
                return;
            }

            const req = await fetch(routes.getRequests + '/?status=ON_HOLD', {
                method: 'GET',
                headers: {
                    'authorization': 'Bearer ' + localStorage.getItem('api_access_token')
                }
            });

            const result = await req.json();

            if(result.httpStatusCode == 200){
                result.data.forEach(async req => {
                    await DBCommands.addRequest(req);
                });
                setRequests(lasts => {
                    return [...result.data, ...lasts];
                });
            }
        }

        request();
    }, [])

    return(
        <>
            <div className="sent-request">
                <input type="text" placeholder="Username or email" ref={identified}/>
                <input type="submit" value="SENT" onClick={sentRequestEvent} />
            </div>
            <div className="requests">
                {!requests || !requests[0]  ? null : requests.map(req => {
                    return <Request name={req.name} photo={req.photo} id={req.id} received={req.sender} key={req.id} optEvent={optEvent}/>
                })}
            </div>
            <ToastContainer />
        </>
    )
}

export default Requests;


// async function request(){
        //     const req = await fetch(routes.sentRequest, {
        //         method: 'POST',
        //         headers: {
        //             'Content-Type': 'application/json',
        //             'authorization': 'Bearer ' + localStorage.getItem('api_access_token')
        //         },
        //         body: JSON.stringify({
        //             targetUsername: username,
        //             chatID: null
        //         })
        //     });

        //     const result = await req.json();
        
        //     if(result.httpStatusCode == 201){
        //         setRequests(last => {
        //             return [{
        //                 id: result.data.requestID,
        //                 name: username,
        //                 photo: result.data.photo,
        //                 sender: false
        //             }, ...last]
        //         });
        //         identified.current.value = '';
        //         await socket.current.emit('request', {
        //             id: result.data.requestID
        //         });
        //     }
        // }

        // request();

// async function request ()
        // {
        //     const req = await fetch(routes.actionRequests, {
        //         method: 'PUT',
        //         headers: {
        //             'Content-Type': 'application/json',
        //             'authorization': 'Bearer ' + localStorage.getItem('api_access_token')
        //         },
        //         body: JSON.stringify({
        //             requestID: id,
        //             status
        //         })
        //     })

        //     if(req.status === 204){
        //         await socket.current.emit('request', {
        //             id
        //         });
        //         return setRequests(lastRequests => {
        //             const newRequests = new Array();
        //             lastRequests.forEach(reqs => {
        //                 if(reqs.id !== id) newRequests.push(reqs);
        //                 return;
        //             })
        //             return newRequests;
        //         });
        //     }

        //     const result = await req.json();

        //     if(result.httpStatusCode === 200){
        //         return setRequests(lastRequests => {
        //             const newRequests = new Array();
        //             lastRequests.forEach(reqs => {
        //                 console.log(reqs);
        //                 if(reqs.id !== id) newRequests.push(reqs);
        //                 return;
        //             })
        //             return newRequests;
        //         });
        //     }

        // }

        // request();