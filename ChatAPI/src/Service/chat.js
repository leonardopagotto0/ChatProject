import conn from "../Config/connection.js";
import status from '../Model/requestStatus.json' assert {type: 'json'};

async function create(chatID, users)
{
    try {
        const [ result ] = await conn.execute('INSERT INTO chats (id, users) VALUES (?, ?)',
        [chatID, users]);

        if(!result.affectedRows) return false;
        return true;
    } catch (err) {
        throw err;
    }
}

async function fromat(chats, user_id)
{
    try {
        
        const usersID = new Array();

        chats.forEach(chat => {
            chat.users.forEach(userID => {
                if(usersID.includes(userID)) return;
                usersID.push(userID);
            });
        });

        const [ result ] = await conn.query('SELECT id, name, photo from users WHERE id IN (?)',
        [usersID]);
        
        chats.forEach(chat => {
            const chatUsers = new Array();
            chat.users.forEach(userID => {
                result.forEach(user => {
                    if(!chat.name && user.id != user_id && userID == user.id) {
                        chat.name = user.name;
                        chat.photo = user.photo;
                    };
                    if(userID == user.id) return chatUsers.push({
                        name: user.name,
                        photo: user.photo
                    });
                })
            });
            chat.isGrup = !chat.owner ? false : true;
            chat.users = chatUsers;
        });

        return chats;

    } catch (err) {
        throw err;
    }
}

async function list(userID)
{
    try {
        const chatIDs = new Array();
        
        const [ requests ] = await conn.execute('SELECT * FROM requests WHERE `to`= ? OR `from` = ? AND status = ?', 
        [userID, userID, status.ACCEPT]);
        
        requests.forEach(req => chatIDs.push(req.chatID));
        if(!chatIDs[0]) chatIDs.push(null);

        const [ chats ] = await conn.query('SELECT * FROM chats WHERE owner = ? OR id IN (?)',
        [userID, chatIDs]);

        if(!chats[0]) return null;

        return chats;
    } catch (err) {
        throw err;
    }
}

export default {
    create,
    fromat,
    list
}