import axios from 'axios';

export default async function getPublicKey()
{
    if(!process.env.PUBLIC_KEY){
        try {
            const result = await axios.get('http://localhost:8081/auth/pubkey');
            process.env.PUBLIC_KEY = result.data.key;
        } catch (err) {
            throw err;
        }
    }
}