import mysql from 'mysql2/promise';

const conn = mysql.createPool(process.env.MYSQL_URL_CONNECTION);

export default conn;