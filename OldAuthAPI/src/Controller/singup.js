import User from "../Services/user.js";
import token from "../Services/token.js";

async function singupController(req, res, next)
{
    const { email, username, password } = req.body

    const userID = await User.create({email, name: username, password});

    if(!userID)
    return res.status(500).json({
        httpStatusCode: 500,
        response: "ERROR_TO_REGISTER",
        msg: null
    })

    const accessToken = await token.create({email, name: username, id: userID, photo: null});

    res.status(201).json({
        httpStatusCode: 201,
        response: "SUCCESS",
        data:{
            accessToken,
            name: username,
            photo: null
        }
    });
}

export default singupController;