const express = require('express')
const jwt = require('jsonwebtoken')

const privateKey = 'abc134834687234DG*AD*(*$62664'

const authCheck = async (req, res) => {
    try {
        let token = req.headers.authorization
        if (!token) {
            res.status(401).send("Unauthorized to access endpoint.")
            return
        }
    } catch(e) {
        res.status(401).send("Unable to access endpoint.")
    }
}

module.exports = authCheck