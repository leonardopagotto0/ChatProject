import conn from "../Config/DBconnection.js";

async function validateAddressee(userName)
{
    try {
        const [ result ] = await conn.execute('SELECT id from users WHERE name = ?', [userName]);
        if(!result[0]) return null;
        return result[0].id;
    } catch (err) {
        
    }
}

export default validateAddressee;