#!/usr/bin/env node

var express  = require('express');
var app      = express();                               // create our app w/ express
var mongoose = require('mongoose');                     // mongoose for mongodb
var morgan = require('morgan');             // log requests to the console (express4)
var bodyParser = require('body-parser');    // pull information from HTML POST (express4)
var methodOverride = require('method-override'); // simulate DELETE and PUT (express4)

mongoose.connect('mongodb://pankaj:test1234@ds015934.mlab.com:15934/todo', function(err, db) {
	if (!err) {
		console.log("Connected to /todo!");
	} else {
		console.dir(err);
	}
});

app.use(express.static(__dirname + '/public'));                 // set the static files location /public/img will be /img for users
app.use(morgan('dev'));                                         // log every request to the console
app.use(bodyParser.urlencoded({'extended':'true'}));            // parse application/x-www-form-urlencoded
app.use(bodyParser.json());                                     // parse application/json
app.use(bodyParser.json({ type: 'application/vnd.api+json' })); // parse application/vnd.api+json as json
app.use(methodOverride());

// listen (start app with node server.js) ======================================
app.listen();
console.log("App listening on port 8080");

    var Todo = mongoose.model('Todo', {
        text : String
    });
	
	app.get('/', function(req, res){
		  res.send('hello world');
		});
 
     app.get('/api/todos', function(req, res) {

        // use mongoose to get all todos in the database
        Todo.find(function(err, todos) {
		console.log("error:"+err);
		console.log("todos:"+todos);
            // if there is an error retrieving, send the error. nothing after res.send(err) will execute
            if (err)
                res.send(err)

            res.json(todos); // return all todos in JSON format
        });
    });

   