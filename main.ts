const express = require('express')
const pgp = require('pg-promise')
const app = express()
const port = 3000

app.use(express.json())

// sample
app.get('/', (req, res) => {
    res.send("Hello world!")
})

app.listen(port, () => {
    console.log("Sample authentication app listening on port ${port}.")
})

