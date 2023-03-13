import conn from "../Config/DBconnection.js";

export async function getUsers(chatID){
    try {
        const [ chat ] = await conn.execute('SELECT users FROM chats WHERE id = ?', [chatID]);
        if(!chat[0]) return null;
        return chat[0].users;
    } catch (err) {
        throw err;
    }
}