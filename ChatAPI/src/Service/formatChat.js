import conn from "../Config/connection.js";

async function formatChats (chats, user_id)
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

export default formatChats;