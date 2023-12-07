const express = require('express')
const app = express()
const port = 3000

// sample
app.get('/', (req, res) => {
    res.send("Hello world!")
})

app.listen(port, () => {
    console.log("Sample authentication app listening on port ${port}")
})

