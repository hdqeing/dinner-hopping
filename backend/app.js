const express = require('express')
const mysql = require('mysql2')
const app = express()
const port = 3000
const allowedValue = ["cat", "dog"]

// connect to db
const connection = mysql.createConnection({
  host: 'localhost',
  user: 'root',
  password: 'HDQeing110!',
  database: 'data'
})

app.use(express.json());

app.get('/', (req, res) => {
  res.json({"message":'Hello World!'})
})

app.get('/address', (req, res) => {
    connection.connect()
    connection.query('SELECT * FROM address', (err, rows, fields) => {
  if (err) throw err

  res.json({"street":rows[0].street,"house number":rows[0].housenumber})
})
    connection.end()
})

app.post('/register', (req, res)=>{
    console.log(allowedValue.includes(req.body.animal))
    res.json({"message":"your animal is allowed"})
/*
    if (req.body.animal in allowedValue){
        res.json({"message":"your animal is allowed"})
    } else {
        res.json({"message":"your animal is not allowed"})
    }
*/
   
})

app.listen(port, () => {
  console.log(`Example app listening on port ${port}`)
})