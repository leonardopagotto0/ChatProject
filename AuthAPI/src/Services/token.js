import jwt from 'jsonwebtoken';
import jwtConfig from '../Config/jwtConfig.js';

export async function format(authorizationToken)
{
    const token = authorizationToken.split(' ')[0];
    return token;
}
export async function validate(token)
{
    try {
        const result = jwt.verify(token, process.env.JWT_PRIVATE_KEY);
        return result;
    } catch (err) {
        throw err;
    }
}
export async function create({email, name, id, photo})
{
    try {
        const token = jwt.sign({email, name, id, photo}, process.env.JWT_PRIVATE_KEY, jwtConfig);
        return token;
    } catch (error) {
        throw error;
    }
}

export default {
    format,
    create,
    validate
}