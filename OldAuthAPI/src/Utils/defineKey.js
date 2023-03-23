import fs from 'fs/promises';

export async function publicKey(){
    const key = await fs.readFile('./certs/public.pem');
    process.env.PEM_PUBLIC_KEY = key.toString();
}
export async function privateKey(){
    const key = await fs.readFile('./certs/private.pem');
    process.env.JWT_PRIVATE_KEY = key.toString();
}