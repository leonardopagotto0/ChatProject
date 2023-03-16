import conn from "../Config/connection.js";

export async function requests (userID, status)
{
    try {
        let sql;
        const fields = new Array();

        if(!status) {
            sql = 'SELECT * FROM requests WHERE `to`=? OR `from`=?';
            fields.push(userID);
            fields.push(userID);
        }else{
            sql = 'SELECT * FROM requests WHERE status = ? AND `to`=? OR status = ? AND `from`=?';
            fields.push(status);fields.push(userID);fields.push(status);fields.push(userID);
        }
        
        const [ requests ] = await conn.execute(sql, fields);

        if(!requests[0]) return null;
        return requests;
    } catch (err) {
        throw err;
    }
}

export default {
    requests
}