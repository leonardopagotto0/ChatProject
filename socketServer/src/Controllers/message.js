import { save } from '../Services/message.js';
import * as Chat from '../Services/chat.js';

export default async function message({io, socket}, data, response)
{
    const user = {
        id: socket.auth.id,
        name: socket.auth.name
    };

    const chatUsers = await Chat.getUsers(data.chatID);

    if(!chatUsers) return response("INVALID_CHAT");
    if(!chatUsers.includes(user.id)) return response("INVALID_CHAT");
    
    const { messageID, timestamp } = await save(data.content, data.chatID, user.id);

    if(!messageID || !timestamp) return response("ERROR_TO_SENT");

    chatUsers.forEach(userID => {
        if(userID == user.id) return;
        io.to(userID).emit('message received', {
            chatID: data.chatID,
            id: messageID,
            from: user.name,
            content: data.content,
            timestamp
        });
    });

    response(null, {messageID, timestamp});
}