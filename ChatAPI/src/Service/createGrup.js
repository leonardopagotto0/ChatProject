import conn from "../Config/connection.js";
import buildID from "../Utils/id.js";

export async function createGrup({name, photo}, {ownerID, ownerName})
{
    const grupID = await buildID();

    try {

        const users = JSON.stringify([ownerID]);

        const [ result ] = await conn.execute('INSERT INTO chats (id, name, photo, owner, users) VALUES (?, ?, ?, ?, ?)',
        [grupID, name, photo, ownerID, users]);

        if(!result.affectedRows) return null;
        
        return {id: grupID, name, photo, users: [ownerName]};
    } catch (err) {
        throw err;
    }
}

export default createGrup;