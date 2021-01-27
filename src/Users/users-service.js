const UsersService = {
    validatePassword(password) {
        if(password.length < 6) {
            return 'Password must be longer than 6 characters.'
        }
        if(password.length > 72) {
            return 'Password must be shorter than 72 characters.'
        }
    },
}

module.exports = UsersService