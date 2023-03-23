import axios from 'axios';

async function getPubkey()
{
    try {
        const result = await axios.get(`${process.env.AUTH_SERVICE_URL}/auth/pubkey`);
        const finalKey = JSON.parse(result.data.key);
        console.log(finalKey);
        return finalKey;
    } catch (err) {
        throw err;
    }
}

export default getPubkey;