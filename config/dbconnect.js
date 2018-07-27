const mysql = require('mysql');

const connection1 = mysql.createConnection({
   host     : 'testodk.mysql.database.azure.com',
   user     : 'testodk@testodk',
   password : 'Super@123',
   database : 'testimportdata'
 });
 
 const connection2 = mysql.createConnection({
  host     : 'testodk.mysql.database.azure.com',
  user     : 'testodk@testodk',
  password : 'Super@123',
  database : 'odk'
});

exports.con2 = connection2;
exports.data = connection1;