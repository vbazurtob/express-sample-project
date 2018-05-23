// @author: Voltaire Bazurto Blacio
// MySQL connection info for accessing the public EnsemblDB

const mysql =  require('mysql');
const db = 'aedes_aegypti_core_48_1b';
const user = 'anonymous';
const pw = '';
const host = 'ensembldb.ensembl.org';

const sql_conn_data = {
    host: host,
    user: user,
    password: pw,
    database: db
};


const mysql_conn = mysql.createConnection(sql_conn_data);

mysql_conn.connect(function(err){
    if(err){
      console.log('Error trying to connect to MySQL DB  ' + sql_conn_data.database);
      next(err);
    }
});

module.exports = mysql_conn;
