import { listChats } from "../Service/listChats.js";
import validateRequest from "../Service/validateRequest.js";
import createNewGrup from "../Service/createGrup.js";
import formatChats from "../Service/formatChat.js";
import createError from "http-errors";

export async function index (req, res, next)
{
    const { id } = req.auth;
    console.log(id);
    const chats = await listChats(id);
    
    if(!chats) throw createError(404, {body: {
        httpStatusCode: 404,
        response: 'CHATS_NOT_FOUND',
        msg: 'You do not have chats'
    }});

    const chatsformated = await formatChats(chats, id);

    res.status(200).json({
        httpStatusCode: 200,
        response: 'SUCCESS',
        msg: null,
        data: chatsformated
    });
}

export async function createGrup(req, res, next)
{
    const userID = req.auth.id;
    const userName = req.auth.name;

    const { name, photo, description } = req.body;

    const grupData = {
        name, photo
    };
    const userData = {
        ownerID: userID,
        ownerName: userName
    }

    const result = await createNewGrup(grupData, userData);
    
    if(!result) throw createError(500, {body: {
        httpStatusCode: 500,
        response: "ERROR_TO_CREATE",
        msg: null
    }});

    return res.status(201).json({
        httpStatusCode: 201,
        response: "CREATED",
        msg: null,
        data: result
    });
}