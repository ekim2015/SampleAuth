const bcrypt = require('bcrypt')
const express = require('express')

const { db } = require('../dbInit.ts')
const { regValidator, regSchema } = require('./schema.ts')

const router = express.Router()

router.get('/', async (req, res) => {
    try {
        await db.any('SELECT * FROM accounts;')
        await res.send("Table found!")
    } catch(e) {
        res.send(e)
    }
})

// register endpoint
router.post('/register', async (req, res) => {
    try {
        // let reqBody = await res.json(req.body)
        await db.none('CREATE TABLE Accounts (Username varchar(255), Password varchar(255));')
        await console.log('Table created!')
    } catch(e) {
        throw new Error(e)
    }
})

module.exports = router
