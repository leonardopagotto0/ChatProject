import createError from "http-errors";
import Message from "../Service/message.js";

export async function list(req, res, next)
{
    const { userID, chatID } = req.body;
 
    const messages = await Message.list(chatID);

    res.status(200).json({
        httpStatusCode: 200,
        response: 'SUCCESS',
        msg: null,
        data: messages
    });
}

export async function del(req, res, next)
{
    const { userID } = req.body;
    const { msgID } = req.params;

    const deleted = await Message.del(msgID, userID);

    if(!deleted) throw createError(500, {body: {
        httpStatusCode: 500,
        response: 'ERROR_TO_DEDLETE',
        msg: null
    }});

    res.status(204).json({});
}