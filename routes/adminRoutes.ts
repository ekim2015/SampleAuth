// testing admin role
const express = require('express')
const router = express.Router()

const { roleVerify } = require('../middleware/auth.ts')

router.use(roleVerify('admin'))

router.get('/admin', (req, res) => {
    res.status(200).send('You are an admin!')
})

module.exports = router
