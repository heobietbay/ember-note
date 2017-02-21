import Ember from 'ember';

export default Ember.Route.extend({
    actions: {
        login: function() {
            this.store.query('user', {
                name: this.controller.get('name')
            }).then((data) => {
                if (data.get('length') !== 0) {
                    let user = data.objectAt(0);
                    this.controllerFor('application').set('user', user);
                    this.transitionTo('notebooks');
                } else {
                    console.log('unexpected query result');
                }
            });
        }
    }
});
