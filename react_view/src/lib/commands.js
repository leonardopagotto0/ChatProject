import database from "./db.js"

const db = database();

export async function Clear()
{
    await db.delete();
}

export async function addChat(name, id, photo)
{
    await db.chats.add({
        name, id, "photo": photo
    })
}
export async function removeChat(id){
    await db.chats.delete(id);
}
export async function getOnlyChats(){
    return await db.chats.toArray();
}
export function getChat(id){
    return (async()=>{
        return await db.chats.get(id);
    })()
}
export async function getChats(){
    const chats = await db.chats.toArray();
    let grups = await db.grups.toArray();
    const result = new Array();
    return result.concat(chats, grups);
}

export async function addRequest({name, photo, id, sender}){
    await db.requests.add({
        name, id, photo, sender
    });
}
export async function removeRequest(id){
    await db.requests.delete(id);
}
export async function getRequests(){
    return await db.requests.toArray();
}
export async function getRequest(id){
    return await db.requests.get(id);
}
export async function saveMessage({id, chatID, from, content, timestamp}){
    return await db.messages.add({
        id, chatID, from, content, timestamp
    });
}
export async function getMessages(chatID){
    return await db.messages.where("chatID").equals(chatID).sortBy('timestamp');
}

export async function saveGrup({id, name, photo, users}){
    return await db.grups.add({
        id, name, photo, users
    });
}
export async function getGrup({id}){
    return await db.grups.get(id);
}