const express = require('express');
const router = express.Router();
const pg = require('pg');
const path = require('path');
var url = require('url');

var connectionString = "postgres://ezmlztpzifztqq:ba45038d5ba7fdde885d1af4977156dc5c077851bb060d85cdca725f372e069d@ec2-23-23-220-163.compute-1.amazonaws.com:5432/d1c24qahf2ajjg";

//Get static files
router.get('/', (req, res, next) => {
    res.sendFile(path.join(
        __dirname, '..' ,'static', 'index.html'));
});


router.get('/js/bundle.js', (req, res, next) => {
    res.sendFile(path.join(
        __dirname, '..', 'static', 'js', 'bundle.js'));
});

router.get('/favicon.ico', (req, res, next) => {
    res.sendFile(path.join(
        __dirname, '..', 'static', 'favicon.ico'));
});



router.post('/note/add', (req, res, next) => {
    var receivedString = req.body;

    //DEBUG
    console.log("Received string: " + receivedString);

    // Get a Postgres client from the connection pool
    pg.defaults.ssl = true;
    pg.connect(connectionString, (err, client, done) => {

        // Handle connection errors
        if(err) {
            done();
            console.log("Failed to connect to the server: " + err);
            return res.status(500).json({success: false, id: err});
        }
        else
        {
            console.log("Connected to the server");
        }

        // Form a SQL query to add notes
        client.query("INSERT INTO notes(content) VALUES('" + receivedString + "') RETURNING id", function(err, result) {
            if(err)
            {
                console.log("Failed to execute query: " + err);
                return res.status(500).json({success: false, id: err});
            }
            else
            {
                var newId = result.rows[0].id;
                return res.json(newId);
            }
        });
    });
});


//Get one note
router.get('/note/:id', (req, res, next) => {
    const results = [];
    var targetId = req.params.id; //Gets the note parameter



    pg.defaults.ssl = true;
    pg.connect(connectionString, (err, client, done) => {

        // Handle connection errors
        if(err) {
            done();
            console.log(err);
            return res.status(500).json({success: false, data: err});
        }

        // Get 1 note from the server
        const query = client.query("SELECT * from notes WHERE id=(" + targetId + ");");

        // Stream results back one row at a time
        query.on('row', (row) => {
            results.push(row);
        });

        // close the connection and check returned data
        query.on('end', () => {
            done();
            if (results[0] == undefined)
            {
                return res.status(400).json({success: false, id: err});
            }

            return res.json(results);
        });
    });
});



//Get several notes
router.get('/note', (req, res, next) => {
    var results = [];

    // Get the limit, start and order from the URL
    var limit = req.param("limit");
    var start = req.param("start");
    var order = req.param("order");

    if (limit == undefined) {
        // LIMIT ALL is the same as not having the LIMIT clause
        limit = "ALL";
    }

    if (start == undefined) {
        // OFFSET 0 is the same as not having the OFFSET clause
        start = "0";
    }

    if (order == undefined) {
        order = "DESC";
    }


    pg.defaults.ssl = true;
    pg.connect(connectionString, (err, client, done) => {

        // Handle connection errors
        if(err) {
            done();
            console.log(err);
            return res.status(500).json({success: false, data: err});
        }

        //
        const query = client.query("SELECT * FROM notes ORDER BY date " + order + " LIMIT " + limit + " OFFSET " + start +";");

        // Stream results back one row at a time
        query.on('row', (row) => {
            results.push(row);
        });

        // After all data is returned, close connection and return results
        query.on('end', () => {
            done();
            //If nothing was selected
            if (results[0] == undefined)
            {
                return res.status(400).json({success: false, id: err});
            }

            return res.json(results);
        });
    });
});




//Delete note
router.delete('/note/:id', (req, res, next) => {
    // Grab data from the URL parameters
    const noteId = req.params.id;

    // Get a Postgres client from the connection pool
    pg.defaults.ssl = true;
    pg.connect(connectionString, (err, client, done) => {

        // Handle connection errors
        if(err) {
            done();
            console.log(err);
            return res.status(500).json({success: false, data: err});
        }

        // SQL Query > Delete Data
        client.query("DELETE FROM Note WHERE id=" + noteId + ";");

        return res.json({success: true, data: true});
    });
});



//Update note
router.put('/note/:id', (req, res, next) => {

    // Grab data from the URL parameters
    var targetId = req.params.id;

    // Grab data from http request
    var content = req.body.content;

    // Get a Postgres client from the connection pool
    pg.defaults.ssl = true;
    pg.connect(connectionString, (err, client, done) => {

        // Handle connection errors
        if(err) {
            done();
            console.log(err);
            return res.status(500).json({success: false, data: err});
        }

        //Update Note
        var query = "UPDATE notes SET content = '" + content + "' WHERE id=" + targetId + ";";
        console.log(query);
        client.query(query);

        return res.json({success: true, data: true});
    });
});

router.get('*', (req, res, next) => {
    res.sendFile(path.join(
        __dirname, '..', 'static', 'index.html'));
});

module.exports = router;