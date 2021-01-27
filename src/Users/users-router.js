const express = require('express');
const UsersService = require('./users-service')

const usersRouter = express.Router();
const jsonParser = express.json();

usersRouter
    .post('/', jsonParser, (req, res) => {
        const { password } = req.body;
        for (const field of ['full_name', 'email', 'passwprd']) {
            if(!req.body[field]) 
                return res.json(400).json({
                    error: `Missing '${field}' in request body`
                })
        }

        const passwordError = UsersService.validatePassword(password)
        if(passwordError)
            return res.status(400).json({
                error: passwordError
            })

        res.send('ok')
    })


module.exports = usersRouter;