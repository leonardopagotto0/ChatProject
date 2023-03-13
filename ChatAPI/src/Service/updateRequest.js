import conn from "../Config/connection.js";
import reqStatus from '../Model/requestStatus.json' assert {type: 'json'};
import id from "../Utils/id.js";

export async function updateRequest (requestID, status)
{
    try {
        let chatID = null;
        if(status == reqStatus.ACCEPT) chatID = await id();
        
        const [ result ] = await conn.execute('UPDATE requests SET status=?, chatID=? WHERE id=?', 
        [status, chatID, requestID]);

        if(!result.changedRows) return [null, false];
        return [chatID, true];
    } catch (err) {
        throw err;
    }   
}