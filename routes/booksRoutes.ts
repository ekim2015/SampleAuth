const express = require('express')
const router = express.Router()

// add book to database
router.post('/addBook/:bookID', (req, res) => {
    console.log("Book added!")
})

module.exports = router
