import conn from "../Config/connection.js";
import id from "./id.js";
import Password from "./password.js";

export default {
    create,
    search
}

export async function create(user = {email, name, password})
{
    const connection = await conn();
    const userID = await id.build();

    const encriptedPassword = await Password.hash(user.password);

    console.log(user, userID, encriptedPassword);
    const [ result ] = await connection.execute('INSERT INTO users (id, email, name, password) VALUES (?, ?, ?, ?)',
    [userID, user.email, user.name, encriptedPassword]);

    if(!result.affectedRows) return null;

    return userID;
}

export async function search(name)
{
    try {
        const connection = await conn();
    
        const [ result ] = await connection.execute('SELECT * FROM users WHERE email=? or name=?',
        [name, name]);

        if(!result[0]) return null;
        return result[0];
    } catch (err) {
        throw err;
    }
}