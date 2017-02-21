/*jshint node:true*/
module.exports = function(app) {
    function toJsonApiFormat(rawArray) {
        let data = !rawArray ? [] : rawArray.map(aNote => ({
            type: 'notes',
            id: aNote.id,
            attributes: aNote.data.attributes
        }));
        return data;
    };


    let bodyParser = require('body-parser');
    app.use(bodyParser.json({
        type: 'application/*+json'
    }));

    let express = require('express');
    let notesRouter = express.Router();

    let nedb = require('nedb');
    let notebookDB = new nedb({ filename: 'db_file/notes', autoload: true });

    notesRouter.get('/', function(req, res) {
        noteDB.find(req.query).exec(function(error, notes) {
            let data = toJsonApiFormat(notes);
            res.send({ data: data });
        });
    });

    notesRouter.post('/', function(req, res) {
        notebookDB.find({}).sort({ id: -1 }).limit(1).exec(
            function(err, notes) {
                let note = req.body;
                if (notes.length != 0) {
                    note.id = notes[0].id + 1;
                } else {
                    note.id = 1;
                }
                notebookDB.insert(note, function(err, newNote) {
                    res.status(201);
                    let compliantJsonApiData = toJsonApiFormat([newNote]);
                    res.send({ data: compliantJsonApiData[0] });
                });
            })
    });

    notesRouter.get('/:id', function(req, res) {
        res.send({
            'notes': {
                id: req.params.id
            }
        });
    });

    notesRouter.put('/:id', function(req, res) {
        res.send({
            'notes': {
                id: req.params.id
            }
        });
    });

    notesRouter.delete('/:id', function(req, res) {
        res.status(204).end();
    });

    // The POST and PUT call will not contain a request body
    // because the body-parser is not included by default.
    // To use req.body, run:

    //    npm install --save-dev body-parser

    // After installing, you need to `use` the body-parser for
    // this mock uncommenting the following line:
    //
    //app.use('/api/notes', require('body-parser').json());
    app.use('/api/notes', notesRouter);
};
