import conn from "../Config/connection.js";

async function createChat(chatID, users)
{
    try {
        const [ result ] = await conn.execute('INSERT INTO chats (id, users) VALUES (?, ?)',
        [chatID, users]);

        if(!result.affectedRows) return false;
        return true;
    } catch (err) {
        throw err;
    }
}

export default createChat;