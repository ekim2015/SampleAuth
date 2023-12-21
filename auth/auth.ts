const bcrypt = require('bcrypt')
const express = require('express')
const jwt = require('jsonwebtoken')

const db = require('../dbInit.ts')
const { regValidator, regSchema } = require('./schema.ts')

const router = express.Router()

router.get('/', async (req, res) => {
    try {
        await res.send("Hello!")
    } catch(e) {
        res.status(401).send(e)
    }
})

// register endpoint
router.post('/register', async (req, res) => {
    try {
        // validate incoming request with Zod function and send error if no success/rejected
        await regValidator(regSchema)
        let { email, username, password } = req.body
        let saltRounds = 10

        let userCheck = await db.one("SELECT * FROM accounts WHERE username = ?", [username])
        if (userCheck) {
            await res.status(409).write("Username already exists.")
        }

        let emailCheck = await db.one("SELECT * FROM accounts WHERE email = ?", [email])
        if (emailCheck) {
            await res.status(409).write("Email already exists.")
        }

        // use bcrypt to salt and hash password
        let hashed = await bcrypt.hash(password, saltRounds)
        let complete = await db.none("INSERT INTO accounts(email, username, password) VALUES (?, ?, ?)", [email, username, hashed])

        // create JSON web token to immediately log user in after registration
        if (complete) {
            await jwt.sign({user: username, pass: hashed}, 'abc123', {algorithm: 'RS256'} , {expiresIn: '1 hours'})
        }

        await res.send('Registration completed!')
    } catch(e) {
        await res.status(401).send(e)
    }
})

module.exports = router
