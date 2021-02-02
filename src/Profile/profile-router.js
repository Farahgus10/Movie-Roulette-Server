const express = require('express')
const path = require('path')
const { requireAuth } = require('../Middleware/jwt-auth')
const ProfileService = require('./profile-services')

const ProfileRoute = express.Router()
const jsonParser = express.json()


ProfileRoute
    .route('/current-user')
    .get(requireAuth, (req, res, next) => {
        const db = req.app.get('db');

        ProfileService.getCurrentUserProfile(
            db, 
            String(req.user.id)
        )
        .then(profile => {
            res.json(profile)
        })
        .catch(next)
    })

ProfileRoute
    .route('/')
    .post(requireAuth, jsonParser, (req, res, next) => {
        const db = req.app.get('db');

        const { profile_picture, genre_like, actor } = req.body;
        const newProfile = { profile_picture, genre_like, actor }
        newProfile.user_id = req.user.id

        for (const [key, value] of Object.entries(newProfile))
            if(value == null) {
                return res.status(400).json({ error: `Missing ${key} in request body`})
            }

                ProfileService.insertUserProfile(db, newProfile)
                .then(profile => {
                    res.status(201).location(path.posix.join(req.originalUrl, `/${profile.id}`)).json(profile)
                })
                .catch(next) 
    })

ProfileRoute
    .route('/:user_id')
    .all(requireAuth)
    .all((req, res, next) => {
        const db = req.app.get('db')
        ProfileService.getById(db, req.params.user_id)
        .then(profile => {
            if(!profile) {
                return res.status(404).json({ error: `Profile doesn't exist`})
            }
            res.profile = profile
            next()
            return profile
        })
        .catch(next)
    })
    .get(requireAuth)
    .get((req, res, next) => {
        res.json(ProfileService.serializeUserProfile(res.profile))
    })
    .delete(requireAuth, (res, res, next) => {
        const db = req.app.get('db')
        ProfileService.deleteUserProfile(db, req,params.user_id)
        .then(numRowsAffected => {
            res.status(204).end()
        })
        .catch(next)
    })

    .patch(requireAuth, jsonParser, (req, res, next) => {
        const db = req.app.get('db')
        const { profile_picture, genre_like, actor } = req.body
        const updatedProfile = { profile_picture, genre_like, actor }
        
        const numVal = Object.values(updatedProfile).filter(Boolean).length
        if(numVal === 0) {
            return res.status(400).json({ error: `Must not be blank`})
        }

        ProfileService.updateUserProfile(db, req.params.user_id, updatedProfile)
        .then(profile => {
            res.status(200).json(profile[0])
        }).catch(next)
    })

module.exports = ProfileRoute