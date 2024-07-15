var express = require('express')
var cors = require('cors')
var app = express()
var bodyParser = require('body-parser')
var jsonParser = bodyParser.json()
const bcrypt = require('bcrypt');
const saltRounds = 10;
const secret ='Fullstack-Login'
var jwt = require('jsonwebtoken');
const PORT = process.env.PORT || 5000
app.use(cors())


const mysql = require('mysql2')
require('dotenv').config()

// const connection = mysql.createConnection({
//   host:  'localhost', 
//   user:  'root',
//   database: 'history_scan'
// });

const connection = mysql.createConnection({
  host:  'qn66usrj1lwdk1cc.cbetxkdyhwsb.us-east-1.rds.amazonaws.com',
  port: '3306',
  user:  's0fkqstjhbqntsoz',
  password: 'ei47govweu9k0ua5',
  database: 'plfs6opdrag87abs'
});


app.post('/input_qrcode',jsonParser, function (req, res, next) {
 connection.execute(
  'INSERT INTO historyqr(qr_wrist,qr_blood,datetime) VALUES (?,?,CURRENT_TIMESTAMP)',
  [req.body.qr_wrist,req.body.qr_blood],
  function(err, results, fields) {
    if(err){
      res.json({status:'error',massage:err})
      return
    }
    res.json({status:'ok'})
  }
);
})

   app.get('/get_qrcode',jsonParser, function (req, res, next) {
    connection.execute(
     'select * from historyqr ORDER BY his_id DESC',
     function(err, results, fields) {
       if(err){
         res.json({status:'error',massage:err})
         return
       }
       res.json(results)
     }
   );
   
   }) 
    //  app.listen(process.env.PORT || 3000)
 app.listen(PORT, function () {
 
 })


