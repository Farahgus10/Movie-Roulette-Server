const express = require('express')
const AuthService = require('./auth-service')
const bcrypt = require('bcryptjs')

const authRouter = express.Router()
const jsonParser = express.json()

authRouter
    .post('/login', jsonParser, (req, res, next) => {
        const db = req.app.get('db');
        const { user_name, password } = req.body;
        const loginUser = { user_name, password };

        for(const [key, value] of Object.entries(loginUser))
            if(value == null)
                return res.status(400).json({
                    error: `Missing '${key}' in request body`
                })
        
        AuthService.getUserWithUserName(db, loginUser.user_name)
            .then(user => {
                if(!user)
                    return res.status(400).json({
                        error: 'Incorrect user_name or password',
                    })
                    res.send('ok')
            })
            .catch(next)
    })

module.exports = authRouter