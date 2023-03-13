import conn from "../Config/DBconnection.js";

async function createChat(chatID, users)
{
    try {
        const [ result ] = await conn.execute('INSERT INTO chats (id, users) VALUES (?, ?)',
        [chatID, JSON.stringify(users)]);

        if(!result.affectedRows) return false;
        return true;
    } catch (err) {
        throw err;
    }
}

export default createChat;