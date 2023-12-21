const express = require('express')
const db = require('./dbInit.ts')

const app = express()
const port = 8080

const authRoutes = require("./auth/auth.ts")

app.use(express.json())
app.use("/auth", authRoutes)

app.get('/', (req, res) => {
    res.send(db)
})

// if endpoint does not exist
app.use((req, res) => {
    res.status(404)
    res.send('Endpoint not found.')
})

app.listen(port, () => {
    console.log(`Sample authentication app listening on port ${port}.`)
})
