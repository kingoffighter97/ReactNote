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
    var limit = req.query.limit;
    var start = req.query.start;
    var order = req.query.order;

    if (limit == "") {
        // LIMIT ALL is the same as not having the LIMIT clause
        limit = "ALL";
    }

    if (start == "") {
        // OFFSET 0 is the same as not having the OFFSET clause
        start = "0";
    }
    else
    {
        // Decrement of start
        --start;
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

// Add a new note
router.post('/note/add', (req, res, next) => {
    var receivedString = req.body.content;

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
        // Get current time
        var now = getCurrentDateTime();


        client.query("INSERT INTO notes(content, date) VALUES('" + receivedString + "', '"+ now +"') RETURNING id", function(err, result) {
            if(err)
            {
                return res.status(500).json({success: false, id: err});
            }
            else
            {
                console.log(result);
                var newId = result.rows[0].id;
                return res.json({id: newId});
            }
        });
    });
});

//Update a note
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
        // Get current time
        var now = getCurrentDateTime();
        var query = "UPDATE notes SET " +
            "content = '" + content + "', " +
            "date = '"+ now +"' " +
            "WHERE id=" + targetId + ";";
        client.query(query);

        return res.json({success: true, id: true});
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





router.get('*', (req, res, next) => {
    res.sendFile(path.join(
        __dirname, '..', 'static', 'index.html'));
});

function getCurrentDateTime() {
    var today = new Date();
    var year = today.getFullYear();
    var month = today.getMonth()+1; //January is 0
    var date = today.getDate();
    var hour = today.getHours();
    var minute = today.getMinutes();

    if(date<10){
        date='0'+date;
    }

    if(month<10){
        month='0'+month;
    }
    return (year+'-'+month+'-'+date+' '+hour+':'+minute);
}

module.exports = router;