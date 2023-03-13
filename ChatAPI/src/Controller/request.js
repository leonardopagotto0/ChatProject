import { sentRequest } from "../Service/sentRequest.js";
import { listRequest } from "../Service/listRequests.js";
import reqStatus from '../Model/requestStatus.json' assert {type: 'json'};
import listUserRequests from "../Service/listUserRequests.js";
import createError from 'http-errors';
import { updateRequest } from "../Service/updateRequest.js";
import validateRequest from "../Service/validateRequest.js";
import formatRequests from "../Service/formatRequest.js";
import createChat from "../Service/createChat.js";

export async function sent(req, res, next)
{
    const userID = req.auth.id;
    const userName = req.auth.name;

    const {targetUsername, chatID} = req.body;

    const [targetID, photo] = await validateRequest(userName, targetUsername);
    const requestID = await sentRequest(userID, targetID, chatID);

    if(!requestID) throw createError(500, {body: {
        httpStatusCode: 500,
        response: 'ERROR_TO_SENT',
        msg: 'Try again or wait fell moment and try again.'
    }})

    res.status(201).json({
        httpStatusCode: 201,
        response: "SENT",
        msg: 'Success to sent request.',
        data: {
            requestID,
            photo
        }
    });
}

export async function listOnHold(req, res, next)
{
    const userID = req.auth.id;
    const userName = req.auth.name;
    const { status } = req.query;
    
    let requests = await listUserRequests(userID, status);
    requests = await formatRequests(requests, userID, userName);
    
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

export async function action(req, res, next)
{
    const userID = req.auth.id;
    const {requestID, status} = req.body;
    
    const isStatusValid = Object.keys(reqStatus).includes(status);

    const invalidStatusError = createError(400, {body: {
        httpStatusCode: 400,
        response: 'INVALID_STATUS',
        msg: 'invalid status field'
    }});

    if(!isStatusValid || status == reqStatus.ON_HOLD) throw invalidStatusError;

    const request = await listRequest(requestID);

    if(!request[0]) throw createError(400, {body: {
        httpStatusCode: 400,
        response: 'INVALID_REQUEST',
        msg: 'This request do not exist.'
    }});

    const invalidActionError = createError(400, {body: {
        httpStatusCode: 400,
        response: 'INVALID_ACTION',
        msg: null,
    }});

    if(request[0].status == reqStatus.ACCEPT && request[0].to != userID)
    throw invalidActionError;

    if(request[0].status == reqStatus.CANCEL && request[0].from != userID)
    throw invalidActionError;
    
    const [chatID, Success] = await updateRequest(requestID, status);

    if(!Success) throw createError(500, {body: {
        httpStatusCode: 500,
        response: `ERROR_TO_${status}`,
        msg: 'Try again or wait some time.'
    }})

    if(status !== reqStatus.ACCEPT)
    return res.status(204).json({});

    createChat(chatID, [request[0].from, request[0].to]);

    res.status(200).json({
        httpStatusCode: 200,
        response: 'SUCCESS',
        msg: null,
        data: chatID
    })
}