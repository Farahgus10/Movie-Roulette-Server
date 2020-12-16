const express = require('express');
const jsonParset = express.json;
const path = require('path');
const movieRouter = express.Router();



movieRouter
    .route('/myMovies')
    .post((req, res, next) => {
        
    })
