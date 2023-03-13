import conn from "../Config/connection.js";

export async function listMessages (chatID)
{
    try {
        const [ messages ] = await conn.query('SELECT * FROM messages WHERE chatID in (?)', 
        [chatID]);

        if(!messages[0]) return null;

        return messages;
    } catch (err) {
        throw err;
    }
}