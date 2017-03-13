
const express = require('express');
const path = require('path');
const logger = require('morgan');
const cookieParser = require('cookie-parser');
const bodyParser = require('body-parser');
const favicon = require('serve-favicon');
const routes = require('./routes');

const app = express();

// Logger middleware
app.use(logger('dev'));


// Body-parser middleware
app.use(bodyParser.json());
app.use(bodyParser.urlencoded({ extended: false }));

//Adding cookieparser middleware
app.use(cookieParser());


app.use(express.static(path.join(__dirname, '..', 'static')));

//Add routes
app.use('/', routes);

// 404 Handling
app.use((req, res, next) => {
    var err = new Error('Not Found');
    err.status = 404;
    next(err);
});


// Error Handlers ------------

// Dev error handler
app.use((err, req, res, next) => {
    res.status(err.status || 500);
    res.json({
        message: err.message,
        error: err
    });
});


// production error handler
app.use((err, req, res, next) => {
    res.status(err.status || 500);
    res.json({
        message: err.message,
        error: {}
    });
});

module.exports = app;