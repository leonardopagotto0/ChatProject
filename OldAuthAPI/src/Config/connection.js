import mysql2 from 'mysql2/promise'

export default async function conn () {
    return mysql2.createPool(process.env.MYSQL_STRING_CONNECTION);
};