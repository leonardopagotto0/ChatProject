import conn from "../Config/connection.js";

export async function deleteMessage (msgID, owner)
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