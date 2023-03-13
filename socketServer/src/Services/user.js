import conn from "../Config/DBconnection.js";

export async function get(userName)
{
    try {
        const [ result ] = await conn.execute('SELECT id, photo FROM users WHERE name = ?', [userName]);
        if(!result[0]) return null;
        return {id: result[0].id, photo: result[0].photo};
    } catch (error) {
        throw error;
    }
}

