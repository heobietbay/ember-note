import Ember from 'ember';

export default Ember.Route.extend({
    model: function(params) {
        let criteria = {notebook : { id: params.notebook_id } };
        return this.store.query('note', criteria);
    },
    actions: {
        addNote: function() {
            let noteBookId = this.paramsFor('notebooks.notes').notebook_id;
            console.log('1.Preparing to get notebook:', noteBookId)
            this.store.findRecord('notebook', noteBookId).then(
                (notebook) => {
                    console.log('2.Found note book', notebook);
                    var note = this.store.createRecord('note', {
                        title: this.controller.get('title'),
                        notebook: notebook
                    });
                    console.log('About to save note', note);
                    note.save().then(() => {
                        console.log('save successful');
                        this.controller.set('title', null);
                        this.refresh();
                    }, function() {
                        console.log('save failed');
                    });
                }
            );
        },
        deleteNote: function(note) {
            console.log('deleting note with title ' + note.get('title'));
            note.deleteRecord();
            note.save();
        }
    }
});
