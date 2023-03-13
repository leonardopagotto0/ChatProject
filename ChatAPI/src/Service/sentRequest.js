import conn from "../Config/connection.js";
import status from '../Model/requestStatus.json' assert {type: 'json'};
import buildID from '../Utils/id.js';

export async function sentRequest (from, to, chatID)
{
    try {
        const requestID = await buildID();
        
        const [result] = await conn.execute('INSERT INTO requests(`id`, `chatID`, `from`, `to`, `status`) VALUES (?, ?, ?, ?, ?)', 
        [requestID, chatID ?? null, from, to, status.ON_HOLD]);

        if(!result.affectedRows) return null;

        return requestID;
    } catch (err) {
        throw err;
    }
}