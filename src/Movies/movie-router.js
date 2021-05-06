const express = require('express');
const path = require('path');
const { requireAuth } = require('../Middleware/jwt-auth')
const MovieService = require('./movie-service');
const { serialize } = require('v8');

const movieRouter = express.Router();
const jsonParser = express.json;

// const serializeMovie = movie => ({
//     id: movie.id,
//     movie_name: xss(movie.title),
// })

movieRouter
    .route('/')
    .all(requireAuth)
    .get((req, res, next) => {
        const db = req.app.get('db')

        MovieService.getMovies(db, String(req.user.id))
            .then(movie => {
                // res.status(200).json(movie.map(serializeMovie))
                res.status(200).json(movie)
            })
            .catch(next)
    })
    .post(requireAuth, (req, res, next) => {
        const db = req.app.get('db')
        const { id, title, overview, genre_id, release_date, disliked, watched, user_id } = req.body
        const newMovie = { id, title, overview, genre_id, release_date, disliked, watched, user_id }

        //Error checking:
        if(!id) {
            return res.status(400).send('Movie ID required')
        }
        if(!title) {
            return res.status(400).send('Movie Title required')
        }

        MovieService.insertMovie(db, newMovie)
        .then(movie => {
            res.status(201).location(`/myMovies/${movie.id}`).json(movie)
        })
        .catch(next)
    })

movieRouter
    .route('/:movie_id/:user_id')
    .all(requireAuth)
    // .all handles triggers for all methods (GET, DELETE, etc...)
    .all((req, res, next) => {
        const db = req.app.get('db')
        MovieService.getById(db, req.params.movie_id, req.params.user_id)
        .then(movie => {
            if(!movie) { // this runs fine
                return res.status(404).json({ error: `Movie doesn't exist`})
            }
            res.json({movie : movie});
            next()
        })
        .catch(next)
    })
    // .delete(requireAuth, (req, res, next) => {
    //     const db = req.app.get('db')
        
    //     MovieService.deleteMovie(db, req.params.movie_id)
    //     .then(numRowsAffected => {
    //         res.status(204).end()
    //     })
    //     .catch(next)
    // })
    .patch(jsonParser, (req, res, next) => {
        const db = req.app.get('db')
        const { watched } = req.body
        const updatedMovie = { watched }

        // this doesn't run
        const numVal = Object.values(updatedMovie).filter(Boolean).length
        if(numVal === 0) {
            return res.status(400).json({ error: `Must not be blank`})
        }

        MovieService.updateMovie(db, req.params.movie_id, req.params.user_id, updatedMovie)
            .then(movie => {
                console.log(movie) // nothing logs 
                res.status(200).json(movie[0])
            })
            .catch(next)
    })
    

    module.exports = movieRouter