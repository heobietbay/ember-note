import Ember from 'ember';

export default Ember.Route.extend({
    renderTemplate: function() {
        this.render('notebooks/view/notes', {
            into: 'application'
        });
    },
    actions: {
        close: function() {
            let model = this.modelFor(this.routeName);
            let parentNotebookId = model.get('notebook').get('id');
            this.transitionTo('notebooks.view', parentNotebookId);
        }
    }
});
