import createError from 'http-errors';
import listUser from './listUser.js';

async function validateRequest(userName, targetName)
{
    if(targetName == userName) throw createError(400, {body: {
        httpStatusCode: 400,
        response: 'REQUEST_MALFORMED',
        msg: 'You can not set a request to your self'
    }})

    const [ target ] = await listUser(targetName);

    if(!target) throw createError(400, {body: {
        httpStatusCode: 400,
        response: 'USERNAME_NOT_FOUND',
        msg: null
    }});

    return [target.id, target.photo];
}

export default validateRequest;