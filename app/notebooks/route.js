import Ember from 'ember';

export default Ember.Route.extend({
    model: function(params) {
        let user = this.controllerFor('application').get('user');
        let criteria = {user : { id: user.id } };
        let res = this.store.query('notebook', criteria);
        return res;
    },
    actions: {
        addNotebook: function() {
            let notebook = this.store.createRecord('notebook', {
                title: this.controller.get('title'),
                user: this.controllerFor('application').get('user')
            });
            notebook.save().then(() => {
                console.log('Save successful');
                this.controller.set('title', null);
                this.refresh();
            }, function(e) {
                console.log('Save failed',e);
            });
        }
    }
});
