import jwt from 'jsonwebtoken';
// import {SigningKey} from "jwks-rsa";
import jwkToPem from 'jwk-to-pem';

export default async function validateToken(token)
{
    try {
        const jwk = JSON.parse(process.env.PUBLIC_KEY)
        const pem = jwkToPem(jwk);

        const result = jwt.verify(token, pem, {
            algorithms: ["RS256"],
        });
        return result;
    } catch (err) {
        throw err;
    }
}