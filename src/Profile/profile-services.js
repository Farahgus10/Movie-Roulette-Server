const xss = require('xss')
const ProfileServices = {
    insertUserProfile(db, newProfile) {
        return db.insert(newProfile).into('user_profile').returning('*')
    },
    getCurrentUserProfile(db, id) {
        return db.from('user_profile').select(
            'user_profile.id',
            'user_profile.profile_picture',
            'user_profile.genre_like',
            'user_profile.actor',
            'user_profile.user_id',
            'users.full_name',
            'users.email',
        )
        .innerJoin('users', 'users.id', 'user_profile.user_id')
        .where('user_profile.user_id', id)
    },
    getById(db, id) {
        return db.from('user_profile').select(
            'user_profile.profile_picture',
            'user_profile.genre_like',
            'user_profile.actor',
            'user_profile.user_id',
            'users.full_name',
            'users.email',
        )
        .join('users', 'user_profile.user_id', 'users.id')
        .where('user_profile.user_id', id)
        .first()
    },
    updateUserProfile(db, id, updateProfile) {
        return db('user_profile').where('user_id', id).update(updateProfile).returning('*')
    },
    deleteUserProfile(db, id) {
        return db('user_profile').where({ id }).del()
    },
    serializeUserProfile(profile) {
        return {
            id: profile.id,
            profile_picture: xss(profile.profile_picture),
            genre_like: xss(profile.genre_like),
            actor: xss(profile.actor),
            user_id:profile.user_id,
            email:profile.email,
            full_name:profile.full_name
        }
    }
}

module.exports = ProfileServices;