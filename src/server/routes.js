const express = require('express');
const router = express.Router();
const pg = require('pg');
const path = require('path');
var url = require('url');


// NEED FIX: connectionString should not be hard coded
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

    var targetId = req.params.id; //Get target ID from the URL

    // Connect to the database
    pg.defaults.ssl = true;
    pg.connect(connectionString, (err, client, done) => {
        // Handle connection errors
        if(err) {
            done();
            console.log(err);
            return res.status(500).json({success: false, data: err});
        }

        // Get 1 note from the server
        const query = client.query("SELECT * from notes WHERE id=" + targetId + ";");

        // Get results back
        // We are getting only 1 note so there should be only 1 element in results
        query.on('row', (row) => {
            row.date = reformatDateTime(row.date);
            results.push(row);
        });

        // Send data back to the client in json format
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

    // Get the limit, start and order values from the string after '?' in the URL/query
    var limit = req.query.limit;
    var start = req.query.start;
    var order = req.query.order;

    if (limit == "") {
        // LIMIT ALL is the same as not having the LIMIT clause
        limit = "ALL";
    }

    if (start == ""  || start <= 0 || start == undefined) {
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



    // Connect to the database
    pg.defaults.ssl = true;
    pg.connect(connectionString, (err, client, done) => {
        // Handle connection errors
        if(err) {
            done();
            console.log(err);
            return res.status(500).json({success: false, data: err});
        }

        // Select all required notes from the database based on limit, start and order
        const query = client.query("SELECT * FROM notes ORDER BY date " + order + " LIMIT " + limit + " OFFSET " + start +";");


        // Add results to the predefined array
        query.on('row', (row) => {
            row.date = reformatDateTime(row.date);
            results.push(row);
        });

        // Send data back to the client
        query.on('end', () => {
            done();

            if (results[0] == undefined)
            {
                return res.status(400).json({success: false, data: err});
            }

            return res.json(results);
        });
    });
});


// Add a new note
router.post('/note/add', (req, res, next) => {
    var receivedString = req.body.content; // get note content from the body of the request

    // Connect to the database
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

        // Form a SQL query to add a new note
        // Get current time
        var now = getCurrentDateTime();
        client.query("INSERT INTO notes(content, date) VALUES('" + receivedString + "', '"+ now +"') RETURNING id", function(err, result) {
            if(err)
            {
                return res.status(500).json({success: false, id: err});
            }
            else
            {
                // Return new ID
                var newId = result.rows[0].id;
                return res.json({id: newId});
            }
        });
    });
});

//Update a note
router.put('/note/:id', (req, res, next) => {
    var targetId = req.params.id;
    var content = req.body.content;


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

        return res.json({success: true});
    });
});


//Delete note
router.delete('/note/:id', (req, res, next) => {
    const noteId = req.params.id;

    pg.defaults.ssl = true;
    pg.connect(connectionString, (err, client, done) => {

        // Handle connection errors
        if(err) {
            done();
            console.log(err);
            return res.status(500).json({success: false, data: err});
        }
        client.query("DELETE FROM notes WHERE id=" + noteId + ";");
        return res.json({success: true});
    });
});




// Go to the home page if the user type in anything else in the URL
// I wanted to implement a 404 Not Found page but I am note sure if it will look like an web app
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

    date = fixDateTimeUnder10(date);
    month = fixDateTimeUnder10(month);
    hour = fixDateTimeUnder10(hour);
    minute = fixDateTimeUnder10(minute);


    return (year+'-'+month+'-'+date+' '+hour+':'+minute);
}

function fixDateTimeUnder10(data) {
    if (data < 10)
    {
        data = '0' + data;
    }

    return data;
}


function reformatDateTime(data) {
    var today = new Date();
    var datePart;


    var diff = today.getDate() - data.getDate();

    switch (diff)
    {
        case 1: // yesterday
            datePart = "Yesterday";
            break;

        case 0: // today
            datePart = "Today";
            break;

        default:
            if (diff > 7)
            {
                var dYear = data.getFullYear();
                var dMonth = data.getMonth()+1; //January is 0
                var dDate = data.getDate();

                dDate = fixDateTimeUnder10(dDate);
                dMonth = fixDateTimeUnder10(dMonth);

                datePart = dYear+'-'+dMonth+'-'+dDate;
            }
            else
            {
                datePart = dayDictionary[data.getDay()];
                console.log(datePart);
            }


            break;
    }

    var dHour = data.getHours();
    var dMinute = data.getMinutes();
    dHour = fixDateTimeUnder10(dHour);
    dMinute = fixDateTimeUnder10(dMinute);


    return datePart + " " + dHour + ":" + dMinute + " UTC";
}

const dayDictionary = {
    0: "Sunday",
    1: "Monday",
    2: "Tuesday",
    3: "Wednesday",
    4: "Thursday",
    5: "Friday",
    6: "Saturday"
};

module.exports = router;