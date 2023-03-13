import conn from '../Config/connection.js';
import status from '../Model/requestStatus.json' assert {type: 'json'};

export async function listChats (userID)
{
    try {
        const chatIDs = new Array();
        
        const [ requests ] = await conn.execute('SELECT * FROM requests WHERE `to`= ? OR `from` = ? AND status = ?', 
        [userID, userID, status.ACCEPT]);
        
        requests.forEach(req => chatIDs.push(req.chatID));
        if(!chatIDs[0]) chatIDs.push(null);

        const [ chats ] = await conn.query('SELECT * FROM chats WHERE owner = ? OR id IN (?)',
        [userID, chatIDs]);

        if(!chats[0]) return null;

        return chats;
    } catch (err) {
        throw err;
    }
}