import conn from "../Config/connection.js";

export async function list (chatID)
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

export async function del (msgID, owner)
{
    try {
        const [ result ] = await conn.execute('DELETE FROM messages WHERE id = ? AND owner = ?', 
        [msgID, owner]);

        if(!result.affectedRows) return false;
        return true;
    } catch (err) {
        throw err;
    }
}

export default {
    list,
    del
}