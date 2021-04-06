const express = require('express');
const MovieService = require('./movie-service');
const { requireAuth } = require('../Middleware/jwt-auth')
const jsonParser = express.json;
const path = require('path');
const { serialize } = require('v8');
const movieRouter = express.Router();

// const serializeMovie = movie => ({
//     id: movie.id,
//     movie_name: xss(movie.title),
// })

movieRouter
    .route('/')
    .all(requireAuth)
    .get((req, res, next) => {
        const db = req.app.get('db')
        const user_id = req.params.user_id;

        MovieService.getMovies(db, String(req.user.id))
            .then(movie => {
                // res.status(200).json(movie.map(serializeMovie))
                res.status(200).json(movie)
            })
            .catch(next)
    })
    .post(requireAuth, (req, res, next) => {
        const db = req.app.get('db')
        const { id, title, overview, genre_id, release_date, disliked, user_id } = req.body
        const newMovie = { id, title, overview, genre_id, release_date, disliked, user_id }

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

        console.log(newMovie)
    })

movieRouter
    .route('/:movie_id')
    .all(requireAuth)
    .delete((req, res, next) => {
        const db = req.app.get('db')
        
        MovieService.deleteMovie(db, req.params.movie_id)
            .then(res.status(203).send('Deleted'))
    })

    module.exports = movieRouter