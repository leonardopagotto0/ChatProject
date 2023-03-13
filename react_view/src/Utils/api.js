export const routes = {
    "login": process.env.REACT_APP_AUTH_API_URL + "/login",
    "singup": process.env.REACT_APP_AUTH_API_URL + "/singup",
    "getMessages": process.env.REACT_APP_API_URL + "/chat/msg",
    "getChats": process.env.REACT_APP_API_URL + "/chat",
    "sentRequest": process.env.REACT_APP_API_URL + "/request",
    "getRequests": process.env.REACT_APP_API_URL + '/request',
    "actionRequests": process.env.REACT_APP_API_URL + '/request',
    "createGrup": process.env.REACT_APP_API_URL + '/chat/grup',
}