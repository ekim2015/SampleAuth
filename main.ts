const express = require('express')
const pgp = require('pg-promise')

const dbDetails = {
    host: "postgres",
    port: 5432,
    database: 'sample',
    user: 'postgres',
    password: 'testPW'
}

const app = express()
const db = pgp(dbDetails)
const port = 3000

app.use(express.json())

// sample
app.get('/', (req, res) => {
    res.send("Hello world!")
})

app.listen(port, () => {
    console.log("Sample authentication app listening on port ${port}.")
})

