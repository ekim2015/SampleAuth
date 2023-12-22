const express = require('express')
const db = require('./dbInit.ts')

const app = express()
const port = 8080

const authRoutes = require("./routes/authRoutes.ts")
const booksRoutes = require("./routes/booksRoutes.ts")

app.use(express.json())
app.use("/auth", authRoutes)
app.use("/books", booksRoutes)

app.get('/', (req, res) => {
    res.send('Welcome!')
})

// if endpoint does not exist
app.use((req, res) => {
    res.status(404)
    res.send('Endpoint not found.')
})

app.listen(port, () => {
    console.log(`Sample authentication app listening on port ${port}.`)
})
