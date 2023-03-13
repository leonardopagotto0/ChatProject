import jwt from 'jsonwebtoken';

export default async function validateToken(token)
{
    try {
        const result = jwt.verify(token, process.env.PUBLIC_KEY);
        return result;
    } catch (err) {
        throw err;
    }
}