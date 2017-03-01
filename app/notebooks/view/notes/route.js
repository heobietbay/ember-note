import Ember from 'ember';

export default Ember.Route.extend({
    actions: {
        close: function() {
        	let model = this.modelFor(this.routeName);
        	let parentNotebookId = model.get('notebook').get('id');
            this.transitionTo('notebooks.view',parentNotebookId);
        }
    }
});
