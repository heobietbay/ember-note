/*jshint node:true*/
module.exports = function(app) {

    function toJsonApiFormat(rawArray) {
        let data = !rawArray ? [] : rawArray.map(nbook => ({
            type: 'notebooks',
            id: nbook.id,
            attributes: nbook.data.attributes,
            relationships: nbook.data.relationships
        }));
        return data;
    };

    let bodyParser = require('body-parser');
    app.use(bodyParser.json({
        type: 'application/*+json'
    }));

    let express = require('express');
    let notebooksRouter = express.Router();

    let nedb = require('nedb');
    let notebookDB = new nedb({ filename: 'db_file/notebooks', autoload: true });
    notebooksRouter.get('/', function(req, res) {
        let criteria = { "data.relationships.user.data.id": req.query.user.id };
        notebookDB.find(criteria).exec(function(error, notebooks) {
            let data = toJsonApiFormat(notebooks);
            res.send({ data: data });
        });
    });

    notebooksRouter.post('/', function(req, res) {
        notebookDB.find({}).sort({ id: -1 }).limit(1).exec(
            function(err, notebooks) {
                let noteBook = req.body;
                if (notebooks.length != 0) {
                    noteBook.id = notebooks[0].id + 1;
                } else {
                    noteBook.id = 1;
                }
                notebookDB.insert(noteBook, function(err, newNotebook) {
                    console.log('Done saving noteBook', newNotebook);
                    let compliantJsonApiData = toJsonApiFormat([newNotebook]);
                    res.status(201);
                    res.send({ data: compliantJsonApiData[0] });
                });
            })
    });

    notebooksRouter.get('/:id', function(req, res) {
        console.log('Get notebook by id:', req.params.id)
        notebookDB.findOne({id: parseInt(req.params.id)}, function(err, notebook) {
            if (!notebook) {
                res.status(404);
                res.send(null);
            } else {
                res.status(201);
                res.send({ data: toJsonApiFormat([notebook])[0] });
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
