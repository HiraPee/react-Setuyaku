const mysql = require("mysql");
const util = require("util");

const database = () => {
  const connection = mysql.createPool({
    connectionLimit: 10,
    host: process.env.MY_SQL_HOST,
    user: process.env.MY_SQL_USER,
    password: process.env.MY_SQL_PASSWORD,
    database: process.env.MY_SQL_DATABASE,
  });
  connection.query = util.promisify(connection.query);
  return connection;
};

exports.database = database;
