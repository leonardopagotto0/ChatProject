import * as Request from '../Services/request.js';
import * as User from '../Services/user.js';

export default async function request({io, socket}, req, response)
{

    const user = {
        id: socket.auth.id,
        name: socket.auth.name,
        photo: socket.auth.photo
    }

    if(!Request.validate.status(req.status)) return response("INVALID_STATUS_FIELD");
    if(req.status == Request.models.status.ON_HOLD) return response("INVALID_STATUS_FIELD");

    if(req.status == Request.models.status.SENT){
        const taget = await User.get(req.to);
        
        if(!taget.id) return response('INVALID_USER_NAME');
        if(taget.id == user.id) return response('INVALID_USER_NAME');

        const requestID = await Request.sent(
            {fromID: user.id, toID: taget.id, chatID: req.chatID}
        );
        
        if(!requestID) return response('ERROR_TO_SENT_REQUEST');

        const reqResponse = {
            id: requestID,
            name: user.name,
            photo: user.photo,
            status: Request.models.status.SENT
        };
        
        response(null, {
            name: req.to,
            photo: taget.photo,
            requestID
        });

        return io.to(taget.id).emit('request received', reqResponse);
    }

    const request = await Request.get(req.id);
    if(!request) return response('INVALID_REQUEST');
    
    const isFromMe = request.from == user.id;

    if(isFromMe && !Request.validate.authorized(req.status))
    return response('INVALID_REQUEST_ACTION');

    const [chatID, success] = await Request.update(
        request.id, req.status, {chatID: request.chatID, users: [request.from, request.to]}
    );
    
    if(!success) return response("ERROR_TO_UPDATE_REQUEST");

    response(null, {
        id: request.id,
        status: req.status,
        chatID
    });

    return io.to(isFromMe ? request.to : request.from).emit('request updated', {
        id: request.id,
        status: req.status,
        chatID
    });
}