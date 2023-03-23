import axios from 'axios';

export default async function getPublicKey()
{
    if(!process.env.PUBLIC_KEY){
        try {
            const result = await axios.get('http://localhost:8081/auth/pubkey');
            process.env.PUBLIC_KEY = JSON.stringify(result.data.keys[0]);
        } catch (err) {
            throw err;
        }
    }
}