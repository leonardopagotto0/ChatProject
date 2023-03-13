export default async function healthStatus(req, res, next) 
{
    res.status(200).json({
        "working": true
    });
}