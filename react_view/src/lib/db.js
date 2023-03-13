import Dexie from "dexie"

function database()
{
    const db = new Dexie('chatAPP');

    db.version(1).stores({
        "chats": 'id, name, photo',
        "grups": "id, name, photo, users",
        "requests": 'id, name, photo, sender',
        "messages": 'id, chatID, from, content, timestamp'
    });

    return db;
}

export default database;