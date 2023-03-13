import conn from "../Config/DBconnection.js";
import id from "../Utils/id.js";

export async function save(message, chatID, userID)
{
    const messageID = await id();
    const timestamp = Math.floor(Date.now()/1000);

    try {
        const [ result ] = await conn.execute('INSERT INTO messages (id, chatID, owner, content, createdAt) VALUES (?, ?, ?, ?, ?)',
        [messageID, chatID, userID, message, timestamp]);

        if(!result.affectedRows) return {messageID: null, timestamp: null};
        return {messageID, timestamp};
    } catch (err) {
        throw err;
    }
}