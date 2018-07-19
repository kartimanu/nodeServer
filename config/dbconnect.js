const mysql = require('mysql');

const connection = mysql.createConnection({
   host     : 'mylocalsql.mysql.database.azure.com',
   user     : 'Tony@mylocalsql',
   password : 'Butterfly1',
   database : 'odk_prod'
 });
 
exports.data = connection;