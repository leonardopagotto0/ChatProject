import token from "../Services/token.js";
import User from "../Services/user.js";
import Password from "../Services/password.js";

async function loginContrller(req, res, next)
{
    const { username, password } = req.body

    const user = await User.search(username);

    if(!user)
    return res.status(400).json({
        httpStatusCode: 400,
        response: 'INVALID_CREDENTIALS',
        msg: null
    })

    const validPass = await Password.validate(user.password, password);
    
    if(!validPass)
    return res.status(400).json({
        httpStatusCode: 400,
        response: 'INVALID_CREDENTIALS',
        msg: null
    })

    const accessToken = await token.create({email: user.email, name: user.name, id: user.id, photo: user.photo});

    res.status(200).json({
        httpStatusCode: 200,
        response: "SUCCESS",
        data: {
            user: {
                name: user.name,
                photo: user.photo
            },
            access: accessToken
        }
    });
}

export default loginContrller;