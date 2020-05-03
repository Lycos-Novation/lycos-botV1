const mysql = require('mysql');

module.exports = {
    init() {
        var connection = mysql.createConnection({
            host: 'localhost',
            user: 'user',
            password: 'mysecretpassword',
            database : 'my_super_database_name'
        });
 
        connection.connect(function(err) {
            if (err) {
                console.error('error connecting: ' + err.stack);
                return;
            }
            console.log('connected as id ' + connection.threadId);
        });
        global.mysqlcon = connection;
    },
};