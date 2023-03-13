import { Server } from 'socket.io';
import dotenv from 'dotenv/config';

import requestPubKey from './src/Services/getPublicKey.js';
import validateAddressee from './src/Services/validateUser.js';
import validateToken from './src/Services/validateToken.js';
import validateChat from './src/Services/validateChat.js';
import * as requestService from './src/Services/request.js';
import * as userService from './src/Services/user.js';
import * as chatService from './src/Services/chat.js';
import * as messageService from './src/Services/message.js';

import socketHandler from './src/Utils/socketHandler.js'
import messageController from './src/Controllers/message.js';
import requestController from './src/Controllers/request.js';

requestPubKey();

const io = new Server({
    cors: {
        origin: '*'
    }
});

io.use(async (socket, next) => {
    if(!socket.handshake.auth.token){
        socket._error({cause: "authorization", err: "authorization token is missing"})
        socket.disconnect();
    }

    try {
        const result = await validateToken(socket.handshake.auth.token);
        socket.auth = result;
        next();
    } catch (error) {
        console.log(error);
    }
});

io.on('connection', (socket) => {

    const handler = new socketHandler({ io, socket });

    socket.use(async (req, next) => {
        try {
            const result = await validateToken(socket.handshake.auth.token);
            if(!result) socket.disconnect();
            next();
        } catch (error) {
            throw error
        }
    });

    socket.join(socket.auth.id);
    
    socket.on('request', handler.controller(requestController));
    socket.on('message', handler.controller(messageController));
    // definir uma variavel de chat permitidos...
    // Criar messageID e reinviar mensagem ao usuario...
})

io.listen(process.env.SOCKET_SERVER_PORT);