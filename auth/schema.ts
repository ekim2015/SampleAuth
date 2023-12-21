const { z, ZodTypeAny } = require('zod')
const express = require('express')

const regSchema = z.object({
    email: z.string({
        required_error: "Email required."
    }).email(),
    username: z.string({
        required_error: "Username required."
    }),
    password: z.string({
        required_error: "Password required."
    })
})

// create custom middleware to handle body validation
// arrow function into route handler
const regValidator = (schema) => async (req, res, next) => {
    // using schema, validate
    try {
        let body = await res.json(req.body)
        await schema.parseAsync(body)
        await console.log('Validated!')
    } catch(e) {
        // could be ZodError or any other error
        res.status(401).send('Validation failed due to ${e}')
    }
}

module.exports = { regValidator, regSchema }

