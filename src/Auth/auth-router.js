const express = require('express')
const AuthService = require('./auth-service')

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
                .then(dbUser => {
                    if(!dbUser)
                        return res.status(400).json({ error: 'Incorrect user name or password.'})
                        
                        return AuthService.comparePasswords(loginUser.password, dbUser.password)
                            .then(compareMatch => {
                                if(!compareMatch)
                                    return res.status(400).json({ error: 'Incorrect user name or password.'})

                const sub = dbUser.user_name
                const payload = {
                    user_id: dbUser.id,
                    name: dbUser.name,
                }
                res.send({
                    authToken: AuthService.createJwt(sub, payload),
                })
            })
                        
        }) 
        .catch(next)
        
    })

module.exports = authRouter