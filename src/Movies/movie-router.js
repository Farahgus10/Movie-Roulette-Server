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

        console.log(newMovie)
    })

movieRouter
    .route('/:movie_id')
    .all(requireAuth)
    
    .delete(requireAuth, (req, res, next) => {
        const db = req.app.get('db')
        
        MovieService.deleteMovie(db, req.params.movie_id)
        .then(numRowsAffected => {
            res.status(204).end()
        })
        .catch(next)
    })
    .patch(requireAuth, jsonParser, (req, res, next) => {
        const db = req.app.get('db')
        const { watched } = req.body;
        const updatedMovies = { watched };

        const numVal = Object.values(updatedMovies).filter(Boolean).length
        if(numVal === 0) {
            return res.status(400).json({ error: `Must not be blank`})
        }
        MovieService.updateMovieList(db, req.params.movie_id, req.params.user_id, updatedMovies)
        .then(movie => {
            res.status(200).json(movie[0])
        }).catch(next)

    })

    module.exports = movieRouter