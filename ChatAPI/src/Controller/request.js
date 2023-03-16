import createError from 'http-errors';
import User from "../Service/user.js";
import Request from "../Service/request.js";

export async function listOnHold(req, res, next)
{
    const userID = req.auth.id;
    const userName = req.auth.name;
    const { status } = req.query;
    
    let requests = await User.requests(userID, status);
    requests = await Request.format(requests, userID, userName);
    
    if(!requests) throw createError(404, {body: {
        httpStatusCode: 404,
        response: 'NO_REQUEST_FOUND',
        msg: null
    }});

    res.status(200).json({
        httpStatusCode: 200,
        response: 'SUCCESS',
        msg: null,
        data: requests
    })
}