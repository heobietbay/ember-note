/*jshint node:true*/
module.exports = function(app) {
    function toJsonApiFormat(rawArray) {
        let data = !rawArray ? [] : rawArray.map(aNote => ({
            type: 'notes',
            id: aNote.id,
            attributes: aNote.data.attributes,
            relationships: aNote.data.relationships
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
    let noteDB = new nedb({ filename: 'db_file/notes', autoload: true });

    notesRouter.get('/', function(req, res) {
        let criteria = { "data.relationships.notebook.data.id": req.query.notebook.id };
        noteDB.find(criteria).exec(function(error, notes) {
            let data = toJsonApiFormat(notes);
            res.send({ data: data });
        });
    });

    notesRouter.post('/', function(req, res) {
        noteDB.find({}).sort({ id: -1 }).limit(1).exec(
            function(err, notes) {
                let note = req.body;
                if (notes.length != 0) {
                    note.id = notes[0].id + 1;
                } else {
                    note.id = 1;
                }
                noteDB.insert(note, function(err, newNote) {
                    res.status(201);
                    let compliantJsonApiData = toJsonApiFormat([newNote]);
                    res.send({ data: compliantJsonApiData[0] });
                });
            })
    });


    notesRouter.patch('/:id', function(req, res) {
        var note = req.body;
        note.id = parseInt(req.params.id);
        noteDB.update({ id: parseInt(req.params.id) },
            note, {},
            function done(err, updatedNote) {
                if (err) {
                    console.log("An error occurs", err);
                    res.status(500);
                    res.send(err);
                } else {
                    noteDB.findOne({ id: parseInt(req.params.id) }, function(err, note) {
                        if (!note) {
                            res.status(404);
                            res.send(err);
                        } else {
                            res.status(201);
                            res.send({ data: toJsonApiFormat([note])[0] });
                        }
                    });
                }
            });
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
        console.log('DEL note by id:', req.params.id);
        noteDB.remove({ id: parseInt(req.params.id) }, {}, function(err, numRemoved) {
            res.status(204).end();
        });

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
