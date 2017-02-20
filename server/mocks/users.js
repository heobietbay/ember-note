/*jshint node:true*/
module.exports = function(app) {
    var express = require('express');
    var usersRouter = express.Router();

    // Use the body-parser library in this service
    var bodyParser = require('body-parser');

    // Oour request will provide content type <application/vnd.api+json> which is json api compliant
    // so need to tell body-parser to accept that type instead of default <application/json> 
    app.use(bodyParser.json({
        type: 'application/*+json'
    }));

    // Create an embedded table using NEDB if it doesn't yet exist
    var nedb = require('nedb');
    var userDB = new nedb({ filename: 'users', autoload: true });

    usersRouter.get('/', function(req, res) {
        var query = {"data.attributes" : req.query };
        userDB.find(query).exec(function(error, users) {
          var data = users.map( attrs => ( {type: 'users', id: attrs.id, attributes: attrs } ));
          res.send({
              data: data
          });
        });
    });

    // For inserting new user record
    usersRouter.post('/', function(req, res) {
        // Look for the most recently created record and use it to set the id
        // field of our incoming record, which is required by Ember Data
        userDB.find({}).sort({ id: -1 }).limit(1).exec(function(err, users) {
            console.log('Request body', req.body);
            try {
                var user = req.body;
                if (users.length != 0) {
                    user.id = users[0].id + 1;
                } else {
                    user.id = 1;
                }
                // Insert the new record into our datastore, and return the newly
                // created record to Ember Data
                userDB.insert(user, function(err, newUser) {
                    var compliantJsonApiData = [newUser].map(attrs => ({ type: 'users', id: attrs.id, attributes: attrs }));
                    res.status(201);
                    res.send({data: compliantJsonApiData[0]});
                });
            } catch (e) {
                console.log(e);
                res.status(500);
                res.send(e);
            }
        })
    });

    usersRouter.get('/:id', function(req, res) {
        res.send({
            'users': {
                id: req.params.id
            }
        });
    });

    usersRouter.put('/:id', function(req, res) {
        res.send({
            'users': {
                id: req.params.id
            }
        });
    });

    usersRouter.delete('/:id', function(req, res) {
        res.status(204).end();
    });

    // The POST and PUT call will not contain a request body
    // because the body-parser is not included by default.
    // To use req.body, run:

    //    npm install --save-dev body-parser

    // After installing, you need to `use` the body-parser for
    // this mock uncommenting the following line:
    //
    //app.use('/api/users', require('body-parser').json());
    app.use('/api/users', usersRouter);
};
