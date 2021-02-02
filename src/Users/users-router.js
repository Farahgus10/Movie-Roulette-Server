const express = require('express');
const path = require('path')
const UsersService = require('./users-service')

const usersRouter = express.Router();
const jsonParser = express.json();

usersRouter
    .get('/', (req, res, next) => {
        const db = req.app.get('db')
        UsersService.getAllUsers(db)
            .then(user => {
                res.status(200).json(user)
            })
            .catch(next)
    })
    .post('/', jsonParser, (req, res, next) => {
        const { full_name, password, email } = req.body;
        for (const field of ['full_name', 'email', 'password']) {
            if (!req.body[field])
                return res.json(400).json({
                    error: `Missing '${field}' in request body`
                })
        }

        const passwordError = UsersService.validatePassword(password)
        if (passwordError)
            return res.status(400).json({
                error: passwordError
            })

        UsersService.hasEmail(
            req.app.get('db'),
            email
        )
            .then(hasEmail => {
                if (hasEmail)
                    return res.status(400).json({ error: 'We already have an account with that email.' })

                return UsersService.hashPassword(password)
                    .then(hashedPassword => {
                        const newUser = {
                            full_name,
                            password: hashedPassword,
                            email,
                            date_created: 'now()',
                        }

                        return UsersService.insertUser(
                            req.app.get('db'),
                            newUser
                        )
                            .then(user => {
                                res.status(201).location(path.posix.join(req.originalUrl, `/${user.id}`))
                                    .json(UsersService.serializeUser(user))
                            })
                    })
            })
            .catch(next)
    })


module.exports = usersRouter;