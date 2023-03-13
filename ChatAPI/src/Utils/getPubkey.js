import axios from 'axios';

async function getPubkey()
{
    try {
        const result = await axios.get(`${process.env.AUTH_SERVICE_URL}/auth/pubkey`);
        const key = result.data.key;
        return key;
    } catch (err) {
        throw err;
    }
}

export default getPubkey;