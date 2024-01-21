const express = require('express')
const jwt = require('jsonwebtoken')
const fs = require('fs')

const privateKey = fs.readFileSync('./private.key')

// check if they're an admin
const roleVerify = (role) => {
    return async (req, res, next) => {
        try {
            let header = req.headers['authorization']
            if (!header) {
                return res.status(401).send('Header empty, try again!')
            } 

            let token = header.split(' ')[1]
        
            let verified = await jwt.verify(token, privateKey, { algorithms: ['RS256']  })
            if (!verified) {
                return res.status(401).send('Unable to authorize request.')
            } 

            // check if the admin role is included
            if (!verified['roles'] || !verified['roles'].contains(role)) {
                return res.status(401).send('Not given the proper roles!')
            }

            next()
            
        } catch(e) {
            return res.status(401).send("Error detected.")
        }
    }
}

// check if they're a user
const userVerify = async (req, res, next) => {
    try {
        let header = req.headers['authorization']
        if (!header) {
            return res.status(401).send('Header empty, try again!')
        } 

        let token = header.split(' ')[1]
    
        let verified = await jwt.verify(token, privateKey, { algorithms: ['RS256']  })
        if (!verified) {
            return res.status(401).send('Unable to authorize request.')
        } 

        next()
        
    } catch(e) {
        return res.status(401).send(e)
    }
}

module.exports = { roleVerify, userVerify }