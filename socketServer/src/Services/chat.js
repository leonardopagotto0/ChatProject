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

export async function create (chatID, users)
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

export default {
    create,
    getUsers,
}