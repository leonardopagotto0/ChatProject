import conn from "../Config/DBconnection.js";

async function validateChat(chatID, {from, to})
{
    let fromPresent = false;
    let toPresent = false;
    
    try {
        const [ chat ] = await conn.execute('SELECT users, name FROM chats WHERE id = ?', [chatID]);
        if(!chat[0]) return false;
        
        chat[0].users.forEach(user => {
            if(user == from) fromPresent = true;
            if(user == to) toPresent = true;
        });

        if(!chat[0].name){
            if(!toPresent || !fromPresent) return {type: 'chat', valid: false};
            return {type: 'chat', valid: true};
        }
        
        if(!fromPresent) return {type: 'grup', valid: false, content: null}
        return {type: 'grup', valid: true, content: chat[0].users};
    } catch (err) {
        throw err;
    }
}

export default validateChat;