import conn from "../Config/DBconnection.js";
import buildID from '../Utils/id.js';

import * as model from '../Models/request.js';
import * as validator from './reqValidator.js';
import createChat from "./createChat.js";

export async function update (requestID, status, {chatID, users})
{
    try {
        let createNewChat = false;

        if(status == model.status.ACCEPT && !chatID) {
            createNewChat = true;
            chatID = await buildID()
        };
        
        const [ result ] = await conn.execute('UPDATE requests SET status=?, chatID=? WHERE id=?', 
        [status, chatID, requestID]);

        if(createNewChat){
            try {
                const created = await createChat(chatID, users);
                console.log("CREATED CHAT? ", created);
            } catch (err) {
                console.log(err);
            }
        }

        if(!result.changedRows) return [null, false];
        return [chatID, true];
    } catch (err) {
        throw err;
    }   
}

export async function sent ({fromID, toID, chatID})
{
    try {
        const requestID = await buildID();

        const [result] = await conn.execute('INSERT INTO requests(`id`, `chatID`, `from`, `to`, `status`) VALUES (?, ?, ?, ?, ?)', 
        [requestID, chatID ?? null, fromID, toID, model.status.ON_HOLD]);

        if(!result.affectedRows) return null;

        return requestID;
    } catch (err) {
        throw err;
    }
}

export async function get (requestID)
{
    try {
        const [ result ] = await conn.execute('SELECT * from requests WHERE id = ?', [requestID]);
        if(!result[0]) return null;
        return result[0];
    } catch (err) {
        throw err;
    }
}

export const models = model;
export const validate = validator;