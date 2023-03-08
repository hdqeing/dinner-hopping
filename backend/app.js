const express = require('express')
const mysql = require('mysql2')
const cors = require('cors')
const nodemailer = require("nodemailer");
var fs = require("fs")

const app = express()
const port = 3000

// connect to db
const connection = mysql.createConnection({
  host: 'dinner-hopping-demo.mysql.database.azure.com',
  user: 'dbadmin',
  password: 'HEdingqing&ZHANGzeyu',
  database: 'data_demo',
  port:3306,
  ssl:{
    rejectUnauthorized: false
  }
})

app.use(express.json());
app.use(cors());
app.options('*', cors());

app.get('/', (req, res) => {
  res.json({"message":'This is API service for dinner hopping web application!'})
})

app.post('/register', (req, res)=>{
  
  let stmt = `INSERT INTO participant(name,email,phonenumber,vegan,vegetarian,englishSpeaker,germanSpeaker,street,houseNumber,host,appetizer,mainCourse,dessert,comment,verified,paid)
            VALUES(?,?,?,?,?,?,?,?,?,?,?,?,?,?,0,0)`;
  let participant_info = [req.body.name,req.body.email,req.body.phonenumber,req.body.vegan,req.body.vegetarian,req.body.englishSpeaker,req.body.germanSpeaker,req.body.street,req.body.houseNumber,req.body.host, req.body.appetizer, req.body.mainCourse, req.body.dessert, req.body.comment];

  // execute the insert statment
  connection.query(stmt, participant_info, (err, results, fields) => {
    if (err) {
      res.json({"message":"Your info cannot be registered in system, please check your input."})
      return console.error(err.message);
    }
    // get inserted id
    res.json({"message":"Conguratulations, you have registered successfully!"})
    console.log('Participant added with Id:' + results.insertId);
  });

})

app.listen(port, () => {
  console.log(`Dinner hopping API service listening on port ${port}`)
})