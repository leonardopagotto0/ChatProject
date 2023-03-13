import conn from "../Config/connection.js";

async function listUser(name)
{
    try {
        const [ user ] = await conn.execute('SELECT * FROM users WHERE name = ?',
        [name]);

        if(!user) return null;
        return user;
    } catch (err) {
        throw err;
    }
}

export default listUser;