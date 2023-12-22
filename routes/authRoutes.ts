const bcrypt = require('bcrypt')
const express = require('express')
const jwt = require('jsonwebtoken')

const db = require('../dbInit.ts')
const { regValidator, regSchema } = require('./schema.ts')

const router = express.Router()
const privateKey = 'abc134834687234DG*AD*(*$62664'

router.use(express.json())

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
        let saltRounds = 10
        let { email, username, password } = req.body

        // validate incoming request with Zod function and send error if no success/rejected
        await regValidator(regSchema)

        // if we have one value
        let check = await db.any("SELECT * FROM accounts WHERE username = $1 OR email = $2", [username, email])
        if (check) {
            await res.status(401).send("Email or username already exists!")
        }

        // // use bcrypt to salt and hash password
        let hashed = await bcrypt.hash(password, saltRounds)
        await db.none("INSERT INTO accounts(email, username, password) VALUES ($1, $2, $3)", [email, username, hashed])
        await res.send('Registration completed!')
    } catch(e) {
        await res.status(401).send(e)
    }
})

router.post('/login', async (req, res) => {
    try {
        // query with username
        let body = req.body

        let pw = await db.any('SELECT password FROM accounts WHERE username=$1 OR email=$1', [body.username])
        if (pw) {
            let valid = await bcrypt.compare(body.password, pw)
            if (!valid) {
                res.status(401).write('Password invalid, try again!')
            }
            
            // log in with session token: should expire after 60 minutes
            await jwt.sign({perms: ['superadmin', 'owner']}, privateKey, { algorithm: 'RS256', expiresIn: '1h' })
        }
    } catch(e) {
        res.status(401).send(e)
    }
})

module.exports = router
