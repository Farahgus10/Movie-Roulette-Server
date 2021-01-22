const bcrypt = require('bcryptjs')

const AuthService = {
    getUserWithUserName(db, user_name) {
        return db('users').where({ user_name }).first()
    },
    comparePasswords(password, hash) {
        return bcrypt.compare(password, hash)
    },
    parseBasicToken(token)
}

module.exports = AuthService