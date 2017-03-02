import Ember from 'ember';
export default Ember.Route.extend({
	name: 'Base of all route',
    renderTemplate: function() {
        this.render(arguments[0], {
            into: 'application'
        });
    }
});
