import conn from "../Config/connection.js";

export async function createMessage(chatID, owner, content)
{
    try {
        const result = await conn.execute('INSERT INTO chats');
    } catch (err) {
        
    }
}