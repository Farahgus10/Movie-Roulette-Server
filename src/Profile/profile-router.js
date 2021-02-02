const express = require('express');
const ProfileService = require('./profile-services')

const ProfileRoute = express.Router();
const jsonParser = express.json();

ProfileRoute
    .get('/')

module.exports = ProfileRoute