import conn from "../Config/connection.js";
import { validate } from "uuid";

export default formatIDs(ids)
{
    const validIDs = new Array();

    ids.forEach(id => {
        if(validate(id)) validIDs.push(id);
    });

    const [ users ] = await conn.execute('SELECT * FROM users WHERE id IN (?)'
    [validIDs]);

    if(!users[0]) return null;
    return users;
}