// @author: Voltaire Bazurto Blacio
// Example Express API route module  

const express = require('express');
const router = express.Router();

function getRandomInt(min, max) {
    return Math.floor(Math.random() * (max - min + 1)) + min;
}

function errorJSON( msg ) {
  return JSON.stringify({
    msg: msg
  });
}

module.exports = function(MySQLConnectionObj){

  // Endpoint retrieves 10 random genes of the aedes_aegypti ADN from EnsemblDB public DB
  // and returns the information in JSON format
  router.get('/random-genes', function(req, res, next){
    const conn = MySQLConnectionObj;
    var startRecord = getRandomInt(0,100);

    //Get 10 random genes from 0 - 100
    var query = 'SELECT * FROM gene LIMIT ' + startRecord + ',10';
    var genes = [];
    conn.query(query, function(err, rows, fields){
        if(err){
            console.log(err);
            const jsonErr = errorJSON('Error trying to retrieve genes data!');

            return;
        }

        for(var x=0; x<rows.length; x++){
            var row = rows[x];

            genes.push({
                type: row['biotype'],
                description: row[ 'description'],
                start: row['seq_region_start'],
                end: row['seq_region_end']
            });

        }

        res.end(JSON.stringify(genes));

      });
  });

  return router;
}
