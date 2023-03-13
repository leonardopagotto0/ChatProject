import conn from "../Config/connection.js";

async function fromatRequests (requests, userID, userName)
{

    if(!requests || !requests[0]) return null;

    try {
        
        const usersID = new Array();

        requests.forEach(request => {
            if(request.from == userID) {
                usersID.push(request.to);
                request.from = userName;
                return;
            }
            if(request.to == userID) {
                usersID.push(request.from);
                request.to = userName;
                return;
            }
        });
        
        const [ result ] = await conn.query('SELECT id, name, photo from users WHERE id IN (?)',
        [usersID]);

        const quantUsers = result.length;

        requests = requests.map(request => {
            let reqFormated;
            for (let index = 0; index < quantUsers; index++) {
                const user = result[index];
                if(user.id == request.from) {
                    reqFormated = {
                        id: request.id,
                        name: user.name,
                        photo: user.photo,
                        sender: true
                    };
                    break;
                }
                if(user.id == request.to) {
                    reqFormated = {
                        id: request.id,
                        name: user.name,
                        photo: user.photo,
                        sender: false
                    };
                    break;
                }
            }
            return reqFormated;
        });

        return requests;
    } catch (err) {
        throw err;
    }
}

export default fromatRequests;