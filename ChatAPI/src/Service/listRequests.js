import conn from "../Config/connection.js";

export async function listRequest (requestID)
{
    try {
        const [ result ] = await conn.query('SELECT * FROM requests WHERE id IN (?)', 
        [requestID]);

        if(!result[0]) return null;

        return result;
    } catch (err) {
        throw err;
    }
}