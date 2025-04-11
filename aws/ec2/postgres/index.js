const express = require('express')
const bodyParser = require('body-parser')
const cors = require('cors')
const app = express()

app.use(cors())
app.use(bodyParser.urlencoded({ extended: true }))
app.use(bodyParser.json())

const Pool = require('pg').Pool
const pool = new Pool({
  user: 'username',
  host: 'database-2.csugtdmyzbim.us-east-1.rds.amazonaws.com',
  database: 'postgres',
  password: 'password',
  port: 5432,
})

pool.query('CREATE TABLE IF NOT EXISTS Product (id serial PRIMARY KEY, name VARCHAR (255) UNIQUE NOT NULL)', () => {
  
})

app.get('/', function (req, res) {
  pool.query('SELECT * FROM Product', (error, results) => {
    if (error) {
      throw error
    }
    res.status(200).json(results.rows)
  })
})

app.post('/', function (req, res) {
  pool.query('INSERT INTO Product (name) VALUES ($1)', ['pessego'], (error, results) => {
    if (error) {
      throw error
    }
    res.status(201).end()
  })
})

app.listen(3002)
