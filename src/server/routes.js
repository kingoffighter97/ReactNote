const express = require('express');
const router = express.Router();
const pg = require('pg');
const path = require('path');
var url = require('url');

//Non API gets
router.get('/', (req, res, next) => {
    console.log("home");
    res.sendFile(path.join(
        __dirname, '..' ,'static', 'index.html'));
});

router.get('/js/bundle.js', (req, res, next) => {
    console.log("bundle");
    res.sendFile(path.join(
        __dirname, '..', 'static', 'js', 'bundle.js'));
});

module.exports = router;