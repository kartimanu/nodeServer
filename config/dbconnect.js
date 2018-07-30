const mysql = require('mysql');
const MySQLEvents = require('mysql-events');

const hostname = 'testodk.mysql.database.azure.com';
const username = 'testodk@testodk';
const password = 'Super@123';

const connection1 = mysql.createConnection({
  host: hostname,
  user: username,
  password: password,
  database: 'testimportdata'
});

const connection2 = mysql.createConnection({
  host: hostname,
  user: username,
  password: password,
  database: 'odk'
});

const dsn = {
  host: hostname,
  user: username,
  password: password
};

exports.myCon = MySQLEvents(dsn);

exports.con2 = connection2;
exports.con1 = connection1;