const express = require('express')
const router = express.Router()

const authCheck = require('../middleware/auth.ts')

// authentication middleware
router.use(authCheck)

// add book to database
router.post('/addBook/:bookID', (req, res) => {
    console.log("Book added!")
})

module.exports = router
