/*jshint node:true*/
module.exports = function(app) {

    var bodyParser = require('body-parser');
    app.use(bodyParser.json({
        type: 'application/*+json'
    }));

    var express = require('express');
    var notebooksRouter = express.Router();

    var nedb = require('nedb');
    var notebookDB = new nedb({ filename: 'notebooks', autoload: true });
    notebooksRouter.get('/', function(req, res) {
        var criteria = req.query;
        console.log(criteria);
        notebookDB.find(criteria).exec(function(error, notebooks) {
            var data = !notebooks ? [] : notebooks.map(attrs => ({ type: 'notebooks', id: attrs.id, attributes: attrs }));
            console.log(data);
            res.send({ data: data });
        });
    });

    notebooksRouter.post('/', function(req, res) {
        notebookDB.find({}).sort({ id: -1 }).limit(1).exec(
            function(err, notebooks) {
                var noteBook = req.body;
                if (notebooks.length != 0) {
                    noteBook.id = notebooks[0].id + 1;
                } else {
                    noteBook.id = 1;
                }
                notebookDB.insert(noteBook, function(err, newNotebook) {
                    console.log('Done saving noteBook',newNotebook);
                    res.status(201);
                    res.send(newNotebook);
                });
            })
    });

    notebooksRouter.get('/:id', function(req, res) {
        res.send({
            'notebooks': {
                id: req.params.id
            }
        });
    });

    notebooksRouter.put('/:id', function(req, res) {
        res.send({
            'notebooks': {
                id: req.params.id
            }
        });
    });

    notebooksRouter.delete('/:id', function(req, res) {
        res.status(204).end();
    });

    // The POST and PUT call will not contain a request body
    // because the body-parser is not included by default.
    // To use req.body, run:

    //    npm install --save-dev body-parser

    // After installing, you need to `use` the body-parser for
    // this mock uncommenting the following line:
    //
    //app.use('/api/notebooks', require('body-parser').json());
    app.use('/api/notebooks', notebooksRouter);
};
